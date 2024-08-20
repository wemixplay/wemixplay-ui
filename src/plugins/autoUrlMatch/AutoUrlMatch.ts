import { ChangeEvent, ClipboardEvent, KeyboardEvent, MutableRefObject } from 'react';
import { WpEditorPlugin } from '@/components/editor/WpEditor';

type AutoUrlMatchConfig = {
  onMatchUrl?: (urls: string[]) => string[];
};

class AutoUrlMatch implements WpEditorPlugin<AutoUrlMatchConfig> {
  public commandKey = 'autoUrlMatch';
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

    if (event.code === 'Space' || event.code === 'Enter') {
      if (
        matchUrlFormatText &&
        offset > 0 &&
        focusNode.nodeType === Node.TEXT_NODE &&
        maxLength >= currentValueLength + 1 &&
        this.config.onMatchUrl
      ) {
        // 임시 div를 사용하여 HTML 문자열을 파싱
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = this.config.onMatchUrl([matchUrlFormatText])[0] || '';
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
}

export type { AutoUrlMatchConfig };
export default AutoUrlMatch;
