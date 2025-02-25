import { ClipboardEvent, MutableRefObject } from 'react';
import { WpEditorPlugin } from '@/components/editor/WpEditor';
import dompurify from 'isomorphic-dompurify';

const { sanitize } = dompurify;

type PasteToPlainTextConfig = {
  /**
   * 에디터에 입력된 내용중 url형식에 매칭이되는 정보를 일반 url 정보와 이미지, 비디오, iframe 등과 같은 media 형식의 url 정보로 분리하여 전달하는 함수
   * 이렇게 매칭된 url 정보를 원하는 형태의 url 형식으로 변경이 가능하도록 하는 함수이기도 함
   * @param {string[]} [params.textUrls] - 이미지, 비디오, iframe 등과 같은 media 형식의 url 정보
   * @param {{ tag: 'img' | 'video' | 'iframe'; src: string }[]} [params.mediaUrls] - 일반 url 정보
   * @returns {string[]} - 대체 url 정보
   */
  onMatchUrlReplace?: (params: {
    textUrls: string[];
    mediaUrls: { tag: 'img' | 'video' | 'iframe'; src: string }[];
  }) => string[];
};

/**
 * PasteToPlainText 클래스는 에디터에 붙여넣기 할 때 HTML 포맷을 제거하고,
 * 텍스트만 남겨서 붙여넣도록 하는 플러그인입니다.
 */
class PasteToPlainText implements WpEditorPlugin<PasteToPlainTextConfig> {
  /** PasteToPlainText 플러그인의 고유 commandKey */
  public commandKey = 'pasteToPlainText';
  /** PasteToPlainText 플러그인의 설정(옵션) 값 */
  public config: PasteToPlainTextConfig = {};
  /** contentEditable div Element를 가르키는 참조값 */
  public contentEditableEl: MutableRefObject<HTMLDivElement>;

  constructor({ contentEditableEl }: { contentEditableEl: MutableRefObject<HTMLDivElement> }) {
    this.contentEditableEl = contentEditableEl;
  }

  /**
   * config 설정 업데이트하는 함수
   * @param {PasteToPlainTextConfig} config - 업데이트할 config 정보
   */
  setConfig(config: PasteToPlainTextConfig) {
    this.config = { ...this.config, ...(config ?? {}) };
  }

  /**
   * 입력된 문자열이 HTML 포맷을 포함하는지 확인하는 함수
   * @param {string} str - 검사할 문자열
   * @returns {boolean} - HTML 포맷 여부
   */
  checkHTMLFormat(str: string) {
    const htmlPattern = /<(div|span|p|img|video|iframe)(\s[^>]*)?>/i;

    return htmlPattern.test(str);
  }

  /**
   * 입력된 문자열에서 이미지, 비디오, iframe 태그의 src 속성을 추출하는 함수
   * @param {string} str - 검사할 문자열
   * @returns {Array} - 추출된 미디어 URL 리스트
   */
  getMediaMatchUrlList(str: string) {
    const regex = /<(img|video|iframe)(?=[^>]*\s+src=["']([^"']+)["'])[^>]*>/g;
    let match: RegExpExecArray | null;
    const srcValues = [];

    while ((match = regex.exec(str)) !== null) {
      srcValues.push({
        tag: match[1],
        src: match[2].startsWith('http') ? match[2] : `https://${match[2]}`
      });
    }

    return srcValues;
  }

  /**
   * 입력된 문자열에서 URL 패턴을 추출하는 함수
   * @param {string} str - 검사할 문자열
   * @returns {Array} - 추출된 URL 리스트
   */
  getUrlMatchList(str: string) {
    const urlRegex = /\bhttps?:\/\/[^\s"']+|www\.[^\s"']+|ftp:\/\/[^\s"']+/gi;

    return (
      (str ?? '').match(urlRegex)?.map((item) => {
        const url = item.trim();
        return url.startsWith('http') ? url : `https://${url}`;
      }) ?? []
    );
  }

  /**
   * 에디터에서 붙여넣기 이벤트 처리 함수. HTML 태그를 제거하고 텍스트만 붙여넣습니다.
   * @param {ClipboardEvent<HTMLDivElement>} [params.event] - clipboard 이벤트
   */
  handlePaste({ event }: { event: ClipboardEvent<HTMLDivElement> }) {
    const selection = window.getSelection();

    /** 클립보드에서 일반 텍스트 */
    const originTextData = sanitize(event.nativeEvent.clipboardData.getData('text'));
    /** 클립보드에서 HTML 형식의 텍스트 */
    const originHtmlTextData = sanitize(event.nativeEvent.clipboardData.getData('text/html'));

    /** 클립보드에서 순수 텍스트 데이터 */
    let plainTextData = event.nativeEvent.clipboardData.getData('text/plain');
    plainTextData = sanitize(plainTextData);

    /** 에디터 최대 문자열 길이값 */
    const ariaValueMax = this.contentEditableEl.current.getAttribute('aria-valuemax');

    // contentEditable 요소의 최대 텍스트 길이를 가져와 텍스트가 초과하지 않도록 자름
    if (ariaValueMax) {
      const currentTextLength = this.contentEditableEl.current.textContent.length;
      const pasteTextLength = plainTextData.length;
      const isAvailableInputLength = Number(ariaValueMax) - (currentTextLength + pasteTextLength);
      // 붙여넣기 된 텍스트가 최대 문자열 길이를 초과하면 붙여넣기 된 텍스트를 제거
      if (isAvailableInputLength < 0) {
        plainTextData = '';
        event.preventDefault();
      }
    }

    // 이미지, 비디오, iframe 태그를 텍스트 URL로 교체
    plainTextData = plainTextData
      .replace(/<img[^>]*src="([^"]*)"[^>]*>/gi, '$1')
      .replace(/<video[^>]*>.*?<\/video>/gi, '')
      .replace(/<iframe[^>]*>.*?<\/iframe>/gi, '');

    /** HTML 포맷을 확인하여 미디어 URL 추출한 배열 값 */
    const matchMediaList = [
      ...new Set(
        this.getMediaMatchUrlList(
          this.checkHTMLFormat(originTextData) ? originTextData : originHtmlTextData
        )
      )
    ];

    /** 순수 텍스트에서 URL 패턴 추출한 배열 값 (중복 제거)*/
    const matchUrlList = [...new Set(this.getUrlMatchList(plainTextData))];

    /** onMatchUrlReplace 함수가 설정되었다면 치환된 URL 리스트 가져옴 */
    const replaceMatchUrlList = [
      ...new Set(
        this.config.onMatchUrlReplace?.({
          textUrls: matchUrlList,
          mediaUrls: matchMediaList
        }) ?? []
      )
    ];
    // 추출된 URL을 치환할 URL로 교체
    matchUrlList.forEach((url, index) => {
      if (replaceMatchUrlList[index]) {
        const escapedUrl = url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const urlWithoutProtocol = url.replace('https://', '');
        if (plainTextData.includes(url)) {
          plainTextData = plainTextData.replace(new RegExp(escapedUrl, 'g'), (match, offset) => {
            const beforeText = plainTextData.slice(Math.max(0, offset - 5), offset);
            return beforeText.includes('src="') ? match : replaceMatchUrlList[index];
          });
        } else if (plainTextData.includes(urlWithoutProtocol)) {
          plainTextData = plainTextData.replace(
            new RegExp(urlWithoutProtocol.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),
            (match, offset) => {
              const beforeText = plainTextData.slice(Math.max(0, offset - 5), offset);
              return beforeText.includes('src="') ? match : replaceMatchUrlList[index];
            }
          );
        }
      }
    });
    if (plainTextData.length > 0) {
      const range = selection.getRangeAt(0);
      range.deleteContents();
      // 수정된 데이터를 contenteditable 요소에 삽입
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = `${plainTextData.replace(/<script\b[^>]*>([\s\S]*?)<\/script>|<style\b[^>]*>([\s\S]*?)<\/style>/gi, '').trim()}&nbsp;`;
      const element = tempDiv.lastChild;

      // tempDiv에 들어간 child를 하나씩 추가
      for (const child of Array.from(tempDiv.childNodes).reverse()) {
        range.insertNode(child);
      }

      tempDiv.remove();

      // 커서를 수정된 텍스트의 끝으로 이동
      range.setStartAfter(element);
      range.setEndAfter(element);
      selection.removeAllRanges();
      selection.addRange(range);
    }

    event.preventDefault();

    // input 이벤트를 트리거하여 에디터 상태 업데이트
    this.contentEditableEl.current.dispatchEvent(new Event('input', { bubbles: true }));
  }
}

export type { PasteToPlainTextConfig };
export default PasteToPlainText;
