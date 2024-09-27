import { ChangeEvent, KeyboardEvent, MutableRefObject } from 'react';
import { WpEditorPlugin } from '@/components/editor/WpEditor';

type AutoUrlMatchConfig = {
  /**
   * 에디터에 url이 들어갔을때 해당 url 정보를 전달하는 함수
   * @param {string} [url] - 에디터에 들어간 url 정보
   */
  onMatchUrl?: (urls: string) => void;
  /**
   * 에디터의 입력된 url 정보가 변경되었을때 트리거되는 함수
   *  @param {string[]} [urls] - 에디터에 들어간 url 배열 정보
   */
  onChangeMatchUrls?: (urls: string[]) => void;
};
/**
 * AutoUrlMatch는 url 형태와 match가 되는 문자열을 자동으로 <a>태그로 변환하여
 * 하이퍼링크를 만들어주고 매칭된 url 정보를 확인할 수 있게 해주는 플러그인 입니다.
 */
class AutoUrlMatch implements WpEditorPlugin<AutoUrlMatchConfig> {
  /** AutoUrlMatch 플러그인의 고유 commandKey */
  public commandKey = 'autoUrlMatch';
  /** 에디터의 입력된 url 정보 */
  private urls: string[] = [];
  /** AutoUrlMatch 플러그인의 설정(옵션) 값 */
  public config: AutoUrlMatchConfig = {};
  /** contentEditable div Element를 가르키는 참조값 */
  public contentEditableEl: MutableRefObject<HTMLDivElement>;

  constructor({ contentEditableEl }: { contentEditableEl: MutableRefObject<HTMLDivElement> }) {
    this.contentEditableEl = contentEditableEl;
  }

  /**
   * config 설정 업데이트하는 함수
   * @param {AutoUrlMatchConfig} config - 업데이트할 config 정보
   */
  setConfig(config: AutoUrlMatchConfig) {
    this.config = { ...this.config, ...(config ?? {}) };
  }

  /**
   * 특정 문자열에서 url 형식에 맞는 것들만 매칭하여 배열로 반환하는 함수
   * @param {string} str - url 형태를 매칭 검사하고자 하는 문자열
   * @return url 형식에 맞는 문자열 배열 (url 배열)
   */
  getUrlMatchList(str: string) {
    const urlRegex =
      /(https?:\/\/[^\s/$.?#].[^\s]*)|(www\.[^\s/$.?#].[^\s]*)|(ftp:\/\/[^\s/$.?#].[^\s]*)/gi;

    return (str ?? '').match(urlRegex)?.map((item) => item.trim()) ?? [];
  }

  /**
   * 에디터에서 keydown 이벤트가 발생하였을때 호출되는 함수
   * @param {KeyboardEvent<HTMLDivElement>} [params.event] - keydown 이벤트
   */
  handleKeyDown({ event }: { event: KeyboardEvent<HTMLDivElement> }) {
    const selection = window.getSelection();
    const range = document.createRange();

    /** 에디터 최대 문자열 길이값 */
    const maxLength = Number(this.contentEditableEl.current.ariaValueMax);
    /** 현재 에디터 문자열 길이값 */
    const currentValueLength = this.contentEditableEl.current.textContent?.length || 0;
    /** 현재 커서가 포커싱된 Node */
    const focusNode = selection.focusNode;
    /** 현재 커서의 range를 나타내는 값 */
    const selectionRange = selection.getRangeAt(0);
    /** 현재 커서의 시작 offset 값  */
    const offset = selectionRange.startOffset;

    /** 방금 작성되었던 text에서 매칭된 url 값 */
    const matchUrlFormatText = this.getUrlMatchList(focusNode.textContent).pop() ?? '';

    if (event.code === 'Space' || event.code === 'Enter' || event.code === 'NumpadEnter') {
      // 현재 포커싱된 커서의 부모 element가 a 태그인 경우
      if (focusNode.parentElement?.tagName === 'A') {
        const range = selection.getRangeAt(0);
        const cursorPosition = range.startOffset;

        /** <a> 태그 내부의 전체 텍스트 */
        const linkText = focusNode.textContent;

        /** 공백 or 개행 전 텍스트 */
        const beforeSpaceText = linkText.slice(0, cursorPosition);
        /** 공백 or 개행 후 텍스트 */
        const afterSpaceText = linkText.slice(cursorPosition);

        // 기존 <a> 태그에서 텍스트 및 href 변경
        focusNode.textContent = beforeSpaceText;
        (focusNode.parentElement as HTMLAnchorElement).href = beforeSpaceText;

        // 방금 입력된 값이 공백이라면
        if (event.code === 'Space') {
          event.preventDefault();

          // 공백 후 텍스트갸 있다면 해당 텍스트가 url 형식에 맞는지 검사
          // url 형식에 맞다면 새로운 a 태그를 생성하여 하이퍼링크 생성
          if (afterSpaceText) {
            const isUrlLink = !!this.getUrlMatchList(afterSpaceText)[0];

            if (isUrlLink) {
              // 새로운 <a> 태그 생성 및 공백 이후의 텍스트 설정
              const newLink = document.createElement('a');
              newLink.href = afterSpaceText; // 기존 링크와 같은 href 사용
              newLink.textContent = afterSpaceText.startsWith('http')
                ? afterSpaceText
                : `https://${afterSpaceText}`;

              // 기존 <a> 태그 바로 뒤에 새로운 <a> 태그 추가
              focusNode.parentElement.insertAdjacentElement('afterend', newLink);
            } else {
              focusNode.parentElement.parentNode.insertBefore(
                document.createTextNode(afterSpaceText),
                focusNode.parentElement.nextSibling
              );
            }
          }

          // 공백 노드 추가
          const spaceNode = document.createTextNode(' ');
          focusNode.parentElement.parentNode.insertBefore(
            spaceNode,
            focusNode.parentElement.nextSibling
          );

          // 커서를 새로운 <a> 태그 바로 뒤로 이동
          range.setStartAfter(spaceNode);
          range.setEndAfter(spaceNode);
          selection.removeAllRanges();
          selection.addRange(range);

          // 방금 입력된 값이 개행 이라면
        } else {
          event.preventDefault();

          // 개행 후 텍스트갸 있다면 해당 텍스트가 url 형식에 맞는지 검사
          // url 형식에 맞다면 새로운 a 태그를 생성하여 하이퍼링크 생성
          if (afterSpaceText) {
            const isUrlLink = !!this.getUrlMatchList(afterSpaceText)[0];

            if (isUrlLink) {
              /** 새로운 <a> 태그 생성 */
              const newLink = document.createElement('a');
              newLink.href = afterSpaceText; // 기존 링크와 같은 href 사용
              newLink.textContent = afterSpaceText.startsWith('http')
                ? afterSpaceText
                : `https://${afterSpaceText}`;

              // 기존 <a> 태그 바로 뒤에 새로운 <a> 태그 추가
              focusNode.parentElement.insertAdjacentElement('afterend', newLink);
            } else {
              focusNode.parentElement.parentNode.insertBefore(
                document.createTextNode(afterSpaceText),
                focusNode.parentElement.nextSibling
              );
            }
          }

          // 개행 노드 추가
          const lineBreakNode = document.createElement('br');
          focusNode.parentElement.parentNode.insertBefore(
            lineBreakNode,
            focusNode.parentElement.nextSibling
          );

          // 커서를 새로운 <a> 태그 바로 뒤로 이동
          range.setStartAfter(lineBreakNode);
          range.setEndAfter(lineBreakNode);
          selection.removeAllRanges();
          selection.addRange(range);
        }

        if (!beforeSpaceText) {
          focusNode.parentElement.remove();
        }

        this.contentEditableEl.current.dispatchEvent(new Event('input', { bubbles: true }));

        // 현재 포커싱된 커서의 부모 element가 a 태그가 아니고
        // 방금 입력한 값에 매칭된 url이 있으며
        // 커서의 시작 offset이 0보다 크고
        // 현재 포커싱된 노드가 TextNode이며
        // a태그로 감싼후 뒤에 공백노드를 추가할 정도의 길이 여유가 된다면
      } else if (
        matchUrlFormatText &&
        offset > 0 &&
        focusNode.nodeType === Node.TEXT_NODE &&
        maxLength >= currentValueLength + 1
      ) {
        const hrefUrl = matchUrlFormatText.startsWith('http')
          ? matchUrlFormatText
          : `https://${matchUrlFormatText}`;
        this.config.onMatchUrl && this.config.onMatchUrl(hrefUrl);

        // 임시 div를 사용하여 HTML 문자열을 파싱
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = `<a href="${hrefUrl}" target="_blank">${matchUrlFormatText}</a>`;
        const childNodes = Array.from(tempDiv.childNodes);

        if (childNodes.length > 0) {
          const textContent = focusNode.textContent ?? '';
          const start = textContent.indexOf(matchUrlFormatText);
          const end = start + matchUrlFormatText.length;

          // 기존 텍스트를 삭제하고 앵커 요소를 삽입
          range.setStart(focusNode, start);
          range.setEnd(focusNode, end);
          range.deleteContents();

          // 자식 노드를 삽입
          childNodes.forEach((child) => {
            range.insertNode(child);
            range.setStartAfter(child);
          });

          // 커서를 공백 뒤로 이동
          const spaceNode = document.createTextNode('\u00A0');
          range.insertNode(spaceNode);
          range.setStartAfter(spaceNode);
          range.setEndAfter(spaceNode);
          selection.removeAllRanges();
          selection.addRange(range);

          event.preventDefault(); // 기본 공백 or 개행 문자 삽입을 방지

          // 에디터의 innerHTML을 임의로 변경하였기 때문에 input 이벤트를 dispatch
          this.contentEditableEl.current.dispatchEvent(new Event('input', { bubbles: true }));
        }
      }
    }
  }

  /**
   * 에디터에서 onChange 이벤트가 발생하였을때 호출되는 함수
   * @param {ChangeEvent<HTMLDivElement>} [params.event] - change 이벤트
   */
  handleChange({ event }: { event: ChangeEvent<HTMLDivElement> }) {
    const selection = window.getSelection();

    /** 현재 커서가 포커싱된 Node */
    const focusNode = selection.focusNode;

    // 현재 커서가 있는 노드의 부모 element가 a태그 일때
    if (focusNode.parentElement?.tagName === 'A') {
      // a태그 안에 textContent가 url 형식이 아닐경우 일반 Text 노드로 변경
      if (!this.getUrlMatchList(focusNode.textContent).length) {
        // 현재 <a> 태그의 위치와 텍스트를 기억
        const anchorElement = focusNode.parentElement as HTMLAnchorElement;
        const textContent = anchorElement.textContent || '';

        // <a> 태그를 제거하고 텍스트 노드로 치환
        const textNode = document.createTextNode(textContent);
        const parentElement = anchorElement.parentElement;

        if (parentElement) {
          // a 태그를 텍스트 노드로 교체
          parentElement.replaceChild(textNode, anchorElement);

          // 새로운 텍스트 노드에서 커서를 유지하기 위해 Range 객체를 사용
          const range = document.createRange();
          const selection = window.getSelection();

          // 커서를 텍스트 노드의 끝으로 위치
          range.setStart(textNode, textNode.length);
          range.collapse(true);

          // 현재 선택 범위를 새로 설정한 위치로 이동
          selection?.removeAllRanges();
          selection?.addRange(range);
        }
      } else {
        (focusNode.parentElement as HTMLAnchorElement).href = focusNode.textContent;
      }
    }

    // 아래는 이전에 등록된 url 정보와 현재 에디터에 등록된 url정보가 같은지 확인 후
    // 다르다면 onChangeMathUrls를 실행하기 위한 로직

    const matchAtagsUrls = (event.target.innerHTML || '').match(/<a[^>]*>(.*?)<\/a>/g) ?? [];
    const matchUrls = matchAtagsUrls.map((match) => {
      const url = match.match(/<a[^>]*>(.*?)<\/a>/)[1];
      return url.startsWith('http') ? url : `https://${url}`;
    });

    if (
      matchUrls.length !== this.urls.length ||
      !matchUrls.every((url) => this.urls.includes(url))
    ) {
      this.urls = [...matchUrls];
      this.config.onChangeMatchUrls && this.config.onChangeMatchUrls(matchUrls);
    }
  }
}

export type { AutoUrlMatchConfig };
export default AutoUrlMatch;
