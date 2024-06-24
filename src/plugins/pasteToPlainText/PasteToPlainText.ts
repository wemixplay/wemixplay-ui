import { ClipboardEvent, MutableRefObject } from 'react';
import { WpEditorPlugin } from '../../editor';

type PasteToPlainTextConfig = {
  onMatchImgOrVideoUrl?: (urls: { tag: 'img' | 'video' | 'iframe'; src: string }[]) => void;
};

class PasteToPlainText implements WpEditorPlugin<PasteToPlainTextConfig> {
  public commandKey = 'pasteToPlainText';
  public config: PasteToPlainTextConfig = {
    onMatchImgOrVideoUrl: (urls) => {
      //
    }
  };
  public contentEditableEl: MutableRefObject<HTMLDivElement>;

  constructor({ contentEditableEl }: { contentEditableEl: MutableRefObject<HTMLDivElement> }) {
    this.contentEditableEl = contentEditableEl;
  }

  setConfig(config) {
    this.config = { ...this.config, ...(config ?? {}) };
  }

  checkHTMLFormat(str: string) {
    const htmlPattern = /<\/?[a-z][\s\S]*>/i;

    return htmlPattern.test(str);
  }

  getMatchUrlList(str: string) {
    const regex = /<(img|video|iframe)[^>]*\s+src=["']([^"']+)["']/g;
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

  handlePaste({
    selection,
    event
  }: {
    selection: Selection;
    range: Range;
    event: ClipboardEvent<HTMLDivElement>;
  }) {
    const originTextData = event.nativeEvent.clipboardData.getData('text/html');

    if (this.checkHTMLFormat(originTextData)) {
      const plainTextData = event.nativeEvent.clipboardData.getData('text');

      const matchList = this.getMatchUrlList(originTextData);

      const range = selection.getRangeAt(0);
      range.deleteContents();

      // 수정된 데이터를 contenteditable 요소에 삽입
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = `${plainTextData}&nbsp;`;
      const element = tempDiv.firstChild;
      range.insertNode(element);

      // 커서를 수정된 텍스트의 끝으로 이동
      range.setStartAfter(element);
      range.setEndAfter(element);
      selection.removeAllRanges();
      selection.addRange(range);

      this.config.onMatchImgOrVideoUrl(matchList);

      event.preventDefault();
    }
  }
}

export type { PasteToPlainTextConfig };
export default PasteToPlainText;
