import { ChangeEvent, ClipboardEvent, KeyboardEvent, MutableRefObject } from 'react';
import { WpEditorPlugin } from '@/components/editor/WpEditor';

type AutoUrlMatchConfig = {
  onMatchUrl?: (urls: string[]) => string[];
  onChangeMatchUrls?: (urls: string[]) => void;
};

class AutoUrlMatch implements WpEditorPlugin<AutoUrlMatchConfig> {
  public commandKey = 'autoUrlMatch';
  private urls: string[] = [];
  public config: AutoUrlMatchConfig = {
    onMatchUrl: (urls: string[]) => {
      return urls;
    }
  };
  public contentEditableEl: MutableRefObject<HTMLDivElement>;
  private prevUrlList: string[] = [];

  constructor({ contentEditableEl }: { contentEditableEl: MutableRefObject<HTMLDivElement> }) {
    this.contentEditableEl = contentEditableEl;
  }

  setConfig(config) {
    this.config = { ...this.config, ...(config ?? {}) };
  }

  getUrlMatchList(str: string) {
    const urlRegex =
      /(https?:\/\/[^\s/$.?#].[^\s]*)|(www\.[^\s/$.?#].[^\s]*)|(ftp:\/\/[^\s/$.?#].[^\s]*)/gi;

    return (str ?? '').match(urlRegex)?.map((item) => item.trim()) ?? [];
  }

  handleKeyDown({
    selection,
    range,
    event
  }: {
    selection: Selection;
    range: Range;
    event: KeyboardEvent<HTMLDivElement>;
  }) {
    const maxLength = Number(this.contentEditableEl.current.ariaValueMax);
    const currentValueLength = this.contentEditableEl.current.textContent?.length || 0;
    const focusNode = selection.focusNode;
    const selectionRange = selection.getRangeAt(0);

    const offset = selectionRange.startOffset;

    const matchUrlFormatText = this.getUrlMatchList(focusNode.textContent).pop() ?? '';

    if (event.code === 'Space' || event.code === 'Enter' || event.code === 'NumpadEnter') {
      if (focusNode.parentElement?.tagName === 'A') {
        // 현재 커서 위치 가져오기
        const range = selection.getRangeAt(0);
        const cursorPosition = range.startOffset;

        // <a> 태그 내부의 전체 텍스트
        const linkText = focusNode.textContent;

        // 공백 전후로 텍스트 분리
        const beforeSpaceText = linkText.slice(0, cursorPosition);
        const afterSpaceText = linkText.slice(cursorPosition);

        // 기존 <a> 태그에서 텍스트 변경
        focusNode.textContent = beforeSpaceText;
        (focusNode.parentElement as HTMLAnchorElement).href = beforeSpaceText;

        if (event.code === 'Space') {
          event.preventDefault();

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
        } else {
          event.preventDefault();

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
      } else if (
        matchUrlFormatText &&
        offset > 0 &&
        focusNode.nodeType === Node.TEXT_NODE &&
        maxLength >= currentValueLength + 1 &&
        this.config.onMatchUrl
      ) {
        this.config.onMatchUrl([matchUrlFormatText]);

        // 임시 div를 사용하여 HTML 문자열을 파싱
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = `<a href="${matchUrlFormatText.startsWith('http') ? matchUrlFormatText : `https://${matchUrlFormatText}`}" target="_blank">${matchUrlFormatText}</a>`;
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

          event.preventDefault(); // 기본 공백 문자 삽입을 방지

          this.contentEditableEl.current.dispatchEvent(new Event('input', { bubbles: true }));
        }
      }
    }
  }

  handleChange({
    selection,
    range,
    event
  }: {
    selection: Selection;
    range: Range;
    event: ChangeEvent<HTMLDivElement>;
  }) {
    const focusNode = selection.focusNode;

    if (focusNode.parentElement?.tagName === 'A') {
      if (!this.getUrlMatchList(focusNode.textContent).length) {
        // 현재 <a> 태그의 위치와 텍스트를 기억합니다.
        const anchorElement = focusNode.parentElement as HTMLAnchorElement;
        const textContent = anchorElement.textContent || '';

        // <a> 태그를 제거하고 텍스트 노드로 치환합니다.
        const textNode = document.createTextNode(textContent);
        const parentElement = anchorElement.parentElement;

        if (parentElement) {
          // a 태그를 텍스트 노드로 교체
          parentElement.replaceChild(textNode, anchorElement);

          // 새로운 텍스트 노드에서 커서를 유지하기 위해 Range 객체를 사용
          const range = document.createRange();
          const selection = window.getSelection();

          // 커서를 텍스트 노드의 끝으로 위치시킵니다.
          range.setStart(textNode, textNode.length);
          range.collapse(true);

          // 현재 선택 범위를 새로 설정한 위치로 이동합니다.
          selection?.removeAllRanges();
          selection?.addRange(range);
        }
      } else {
        (focusNode.parentElement as HTMLAnchorElement).href = focusNode.textContent;
      }
    }

    const matchAtagsUrls = (event.target.innerHTML || '').match(/<a[^>]*>(.*?)<\/a>/g) ?? [];
    const matchUrls = matchAtagsUrls.map((match) => match.match(/<a[^>]*>(.*?)<\/a>/)[1]);

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
