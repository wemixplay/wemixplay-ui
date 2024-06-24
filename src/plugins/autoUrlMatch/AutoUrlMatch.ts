import { ClipboardEvent, KeyboardEvent, MutableRefObject } from 'react';
import { WpEditorPlugin } from '@/index';

type AutoUrlMatchConfig = {
  onMatchUrl?: (text: string) => string;
};

class AutoUrlMatch implements WpEditorPlugin<AutoUrlMatchConfig> {
  public commandKey = 'autoUrlMatch';
  public config: AutoUrlMatchConfig = {
    onMatchUrl: (text: string) => {
      return text;
    }
  };
  public contentEditableEl: MutableRefObject<HTMLDivElement>;

  constructor({ contentEditableEl }: { contentEditableEl: MutableRefObject<HTMLDivElement> }) {
    this.contentEditableEl = contentEditableEl;
  }

  setConfig(config) {
    this.config = { ...this.config, ...(config ?? {}) };
  }

  getUrlMatchList(str: string) {
    const regex = /(?:\s|^)https?:\/\/\S*/g;

    return (str ?? '').match(regex)?.map((item) => item.trim()) ?? [];
  }

  handlePaste({
    selection,
    event
  }: {
    selection: Selection;
    range: Range;
    event: ClipboardEvent<HTMLDivElement>;
  }) {
    const plainTextData = event.nativeEvent.clipboardData.getData('text/plain');
    const urlMatchList = this.getUrlMatchList(plainTextData);

    if (urlMatchList.length > 0) {
      const modifiedData = urlMatchList.reduce((acc, cur) => {
        return acc.replace(cur, this.config.onMatchUrl(cur));
      }, plainTextData);

      if (!selection.rangeCount) {
        return;
      }

      const range = selection.getRangeAt(0);
      range.deleteContents();

      // 수정된 데이터를 contenteditable 요소에 삽입
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = `${modifiedData}&nbsp;`;
      const element = tempDiv.firstChild;
      range.insertNode(element);

      // 커서를 수정된 텍스트의 끝으로 이동
      range.setStartAfter(element);
      range.setEndAfter(element);
      selection.removeAllRanges();
      selection.addRange(range);

      event.preventDefault();
    }
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
    const focusNode = selection.focusNode;

    const matchUrlFormatText = this.getUrlMatchList(focusNode.textContent).pop();

    if (event.key === ' ') {
      if (matchUrlFormatText && this.config.onMatchUrl) {
        // 임시 div를 사용하여 HTML 문자열을 파싱
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = this.config.onMatchUrl(matchUrlFormatText);
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
        }
      }
    }
  }
}

export type { AutoUrlMatchConfig };
export default AutoUrlMatch;
