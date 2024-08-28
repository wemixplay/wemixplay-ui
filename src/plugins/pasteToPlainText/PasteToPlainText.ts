import { ClipboardEvent, MutableRefObject } from 'react';
import { WpEditorPlugin } from '@/components/editor/WpEditor';

type PasteToPlainTextConfig = {
  onMatchUrlReplace?: (params: {
    textUrls: string[];
    mediaUrls: { tag: 'img' | 'video' | 'iframe'; src: string }[];
  }) => string[];
};

class PasteToPlainText implements WpEditorPlugin<PasteToPlainTextConfig> {
  public commandKey = 'pasteToPlainText';
  public config: PasteToPlainTextConfig = {};
  public contentEditableEl: MutableRefObject<HTMLDivElement>;

  constructor({ contentEditableEl }: { contentEditableEl: MutableRefObject<HTMLDivElement> }) {
    this.contentEditableEl = contentEditableEl;
  }

  setConfig(config) {
    this.config = { ...this.config, ...(config ?? {}) };
  }

  checkHTMLFormat(str: string) {
    const htmlPattern = /<(div|span|p|img|video|iframe)(\s[^>]*)?>/i;

    return htmlPattern.test(str);
  }

  getMediaMatchUrlList(str: string) {
    const regex = /<(img|video|iframe)(?=[^>]*\s+src=["']([^"']+)["'])[^>]*>/g;
    let match: RegExpExecArray | null;
    const srcValues = [];

    while ((match = regex.exec(str)) !== null) {
      srcValues.push({
        tag: match[1],
        src: match[2]
      });
    }

    return srcValues;
  }

  getUrlMatchList(str: string) {
    const urlRegex = /\bhttps?:\/\/[^\s"']+|www\.[^\s"']+|ftp:\/\/[^\s"']+/gi;

    return (str ?? '').match(urlRegex)?.map((item) => item.trim()) ?? [];
  }

  handlePaste({
    selection,
    event
  }: {
    selection: Selection;
    range: Range;
    event: ClipboardEvent<HTMLDivElement>;
  }) {
    const originTextData = event.nativeEvent.clipboardData.getData('text');
    const originHtmlTextData = event.nativeEvent.clipboardData.getData('text/html');

    let plainTextData = event.nativeEvent.clipboardData.getData('text/plain');
    plainTextData = plainTextData.replace(
      /<img[^>]*src="([^"]*)"[^>]*>|<video[^>]*>.*?<\/video>|<iframe[^>]*>.*?<\/iframe>/gi,
      '$1'
    );

    const matchMediaList = this.getMediaMatchUrlList(
      this.checkHTMLFormat(originTextData) ? originTextData : originHtmlTextData
    );

    const matchUrlList = this.getUrlMatchList(plainTextData);
    const replaceMatchUrlList =
      this.config.onMatchUrlReplace?.({
        textUrls: matchUrlList,
        mediaUrls: matchMediaList
      }) ?? [];

    matchUrlList.forEach((url, index) => {
      if (replaceMatchUrlList[index]) {
        plainTextData = plainTextData.replace(url, replaceMatchUrlList[index]);
      }
    });

    const ariaValueMax = this.contentEditableEl.current.getAttribute('aria-valuemax');

    if (ariaValueMax) {
      const maxLength =
        Number(ariaValueMax) - this.contentEditableEl.current.textContent.length - 1;

      if (maxLength > 0) {
        plainTextData = plainTextData.slice(0, maxLength);
      }
    }

    const range = selection.getRangeAt(0);
    range.deleteContents();

    // 수정된 데이터를 contenteditable 요소에 삽입
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = `${plainTextData.replace(/<script\b[^>]*>([\s\S]*?)<\/script>|<style\b[^>]*>([\s\S]*?)<\/style>/gi, '').trim()}&nbsp;`;
    const element = tempDiv.lastChild;

    for (const child of Array.from(tempDiv.childNodes).reverse()) {
      range.insertNode(child);
    }

    tempDiv.remove();

    // 커서를 수정된 텍스트의 끝으로 이동
    range.setStartAfter(element);
    range.setEndAfter(element);
    selection.removeAllRanges();
    selection.addRange(range);

    event.preventDefault();

    this.contentEditableEl.current.dispatchEvent(new Event('input', { bubbles: true }));
  }
}

export type { PasteToPlainTextConfig };
export default PasteToPlainText;
