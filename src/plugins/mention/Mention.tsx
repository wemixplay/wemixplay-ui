import React from 'react';
import { uniqueId } from 'lodash-es';
import type { ChangeEvent, MouseEvent, KeyboardEvent, MutableRefObject } from 'react';
import MentionList, { MentionListRef } from './components/MentionList';
import MentionContainer from './components/MentionContainer';
import { WpEditorPlugin } from '@/components/editor/WpEditor';

type MentionInfo = { id: number; name: string; profileImg?: string } & {
  [key: string]: string | number | undefined; // 추가적인 필드도 허용
};

type MentionConfig = {
  list: MentionInfo[];
  listElement?: (item: MentionInfo) => React.JSX.Element;
  onWriteMention?: (text: string) => void;
  onCompleteMention?: ({
    allMention,
    currentMention
  }: {
    allMention: MentionInfo[];
    currentMention: MentionInfo;
  }) => void;
  onCloseMentionList?: () => void;
};

class Mention implements WpEditorPlugin {
  public readonly commandKey = 'mention';
  private _mentionId: string;
  private setTargetMentionId: (targetMentionId: string) => void;
  public contentEditableEl: MutableRefObject<HTMLDivElement>;
  private postMentionListRef: MentionListRef;
  private _config: MentionConfig = {
    list: [],
    onWriteMention: (text) => {}
  };
  private setNewConfig: (newConfig: MentionConfig) => void;

  constructor({ contentEditableEl }: { contentEditableEl: MutableRefObject<HTMLDivElement> }) {
    this.contentEditableEl = contentEditableEl;
  }

  set mentionId(id: string) {
    this._mentionId = id;
    this.setTargetMentionId && this.setTargetMentionId(this._mentionId);

    if (!id) {
      this.config.onCloseMentionList && this.config.onCloseMentionList();
    }
  }

  get mentionId() {
    return this._mentionId;
  }

  set config(newConfig: MentionConfig) {
    this._config = newConfig;
    this.setNewConfig && this.setNewConfig(newConfig);
  }

  get config() {
    return this._config;
  }

  setConfig(config?: MentionConfig) {
    this.config = { ...this.config, ...(config ?? {}) };
  }

  component({ plugin }: { plugin: Mention }) {
    return (
      <MentionContainer mention={plugin}>
        {({ config, targetMentionId }) => (
          <MentionList
            ref={(ref) => {
              plugin.postMentionListRef = ref;
            }}
            targetMentionId={targetMentionId}
            contentEditableEl={plugin.contentEditableEl}
            list={config.list}
            listElement={config.listElement}
            selectMentionItem={() => {
              plugin.selectMentionItem();
            }}
            closeMentionList={() => {
              this.mentionId = '';
            }}
          />
        )}
      </MentionContainer>
    );
  }

  restoreSelection({
    selection,
    range,
    focusNode,
    focusOffset,
    focusTopEnd
  }: {
    selection: Selection;
    range: Range;
    focusNode: Node;
    focusOffset?: number;
    focusTopEnd?: boolean;
  }) {
    if (focusTopEnd) {
      range.selectNodeContents(focusNode);
      range.collapse(false);
    } else {
      range.setStart(focusNode, focusOffset ?? 0);
      range.collapse(true);
    }

    selection.removeAllRanges();
    selection.addRange(range);
  }

  leaveMentionTag({
    selection,
    range,
    mention
  }: {
    selection: Selection;
    range: Range;
    mention?: MentionInfo;
  }) {
    const target = this.contentEditableEl.current;
    const targetMentionId = this.mentionId;

    const mentionTag = target.querySelector(`#${targetMentionId}`);
    const existOnlyAtMark = mentionTag.firstChild?.textContent === '@' && !mention;

    const isWillMention = !!mentionTag?.classList.contains('will-mention');

    const mentionRegex = new RegExp(
      `<span\\s+id="${targetMentionId}"([^>]*)class="mention ${isWillMention ? 'will-mention' : 'unknown-mention'}"([^>]*)>(.*?)<\\/span>`,
      'g'
    );

    if (existOnlyAtMark) {
      target.innerHTML = target.innerHTML.replace(mentionRegex, `@`);
    } else if (mention) {
      target.innerHTML = target.innerHTML.replace(
        mentionRegex,
        `<span id="${targetMentionId}" class="mention complete-mention"$1$2>@${mention.name}</span>&nbsp;`
      );

      const newMentionTag = target.querySelector(`#${targetMentionId}`) as HTMLSpanElement;

      newMentionTag.dataset.id = String(mention.id);
    } else {
      target.innerHTML = target.innerHTML.replace(
        mentionRegex,
        `<span id="${targetMentionId}" class="mention unknown-mention"$1$2>${selection.focusNode.textContent}</span>&nbsp;`
      );
    }

    this.mentionId = '';

    this.restoreSelection({
      selection,
      range,
      focusNode: existOnlyAtMark
        ? target
        : target.querySelector(`#${targetMentionId}`)?.nextSibling,
      focusOffset: 1,
      focusTopEnd: existOnlyAtMark
    });

    this.contentEditableEl.current.dispatchEvent(new Event('input', { bubbles: true }));
  }

  handleClick({
    event,
    selection,
    range
  }: {
    selection: Selection;
    range: Range;
    event: MouseEvent<HTMLDivElement>;
  }) {
    const focusNode = selection.focusNode;

    const focusInDecompleteMentionTag =
      !!focusNode?.parentElement?.classList?.contains?.('will-mention') ||
      !!focusNode?.parentElement?.classList?.contains?.('unknown-mention');

    const collapseCheckRange = selection.getRangeAt(0);

    if (
      focusInDecompleteMentionTag &&
      collapseCheckRange.startOffset === collapseCheckRange.endOffset
    ) {
      this.mentionId = focusNode.parentElement.id;
    }
  }

  selectMentionItem() {
    const range = document.createRange();
    const selection = window.getSelection();

    const mention = this.postMentionListRef.handleSubmit();
    this.leaveMentionTag({ selection, range, mention });

    const allMentionEls = this.contentEditableEl.current.querySelectorAll(
      '.mention.complete-mention'
    );

    const allMention = Array.from(allMentionEls).map((mentionEl) => {
      return Object.fromEntries(Object.entries((mentionEl as HTMLSpanElement).dataset));
    }) as MentionInfo[];

    this.config.onCompleteMention &&
      this.config.onCompleteMention({ allMention, currentMention: mention });
  }

  handleKeyDown({
    event,
    selection,
    range
  }: {
    selection: Selection;
    range: Range;
    event: KeyboardEvent<HTMLDivElement>;
  }) {
    const targetMentionId = this.mentionId;

    const focusInDecompleteMentionTag =
      !!selection.focusNode?.parentElement?.classList?.contains?.('will-mention') ||
      !!selection.focusNode?.parentElement?.classList?.contains?.('unknown-mention');

    if (event.code === 'ArrowLeft' || event.code === 'ArrowRight') {
      if (!targetMentionId && focusInDecompleteMentionTag) {
        this.mentionId = selection.focusNode.parentElement.id;
      } else if (targetMentionId && selection.focusNode.firstChild?.textContent === '@') {
        this.leaveMentionTag({ selection, range });
      } else if (targetMentionId && !focusInDecompleteMentionTag) {
        this.mentionId = '';
      }
    }

    if (event.code === 'Space' || event.code === 'ArrowRight') {
      if (
        targetMentionId &&
        focusInDecompleteMentionTag &&
        !selection.focusNode.parentElement.nextElementSibling
      ) {
        event.preventDefault();

        this.leaveMentionTag({ selection, range });
      } else if (targetMentionId && selection.focusNode.firstChild?.textContent === '@') {
        this.leaveMentionTag({ selection, range });
      }
    } else if (event.code === 'ArrowUp' || event.code === 'ArrowDown') {
      if (targetMentionId) {
        event.preventDefault();

        if (event.code === 'ArrowUp') {
          this.postMentionListRef.handleArrowUp();
        } else {
          this.postMentionListRef.handleArrowDown();
        }
      }
    } else if (event.code === 'Enter') {
      if (targetMentionId && !event.nativeEvent.isComposing) {
        event.preventDefault();

        this.selectMentionItem();
      }
    }
  }

  handleChange({
    event,
    selection,
    range
  }: {
    selection: Selection;
    range: Range;
    event: ChangeEvent<HTMLDivElement>;
  }) {
    const target = this.contentEditableEl.current;

    const focusNode = selection.focusNode;
    const focusOffset = selection.focusOffset;

    const currentInputChar = focusNode.textContent[focusOffset - 1];
    const prevCurrentInputChar = focusNode.textContent[focusOffset - 2];
    const focusInMentionTag = !!focusNode?.parentElement?.classList?.contains?.('mention');
    const focusInCompleteMentionTag =
      !!focusNode?.parentElement?.classList?.contains?.('complete-mention');

    const isStartMention =
      !prevCurrentInputChar?.trim() && !focusInMentionTag && currentInputChar === '@';

    if (this.mentionId && focusInMentionTag) {
      this.config.onWriteMention &&
        this.config.onWriteMention(focusNode.parentElement.firstChild.textContent.replace('@', ''));
    }

    if (isStartMention) {
      this.mentionId = `mention-${uniqueId()}`;

      // 방금 입력된 @ 문자를 <span>으로 교체
      const textContent = focusNode.textContent;
      const beforeText = textContent.slice(0, focusOffset - 1);
      const afterText = textContent.slice(focusOffset);

      // 새로운 span 요소 생성
      const span = document.createElement('span');
      span.id = this.mentionId;
      span.className = 'mention will-mention';
      span.textContent = '@';

      // 기존 텍스트 노드 업데이트
      focusNode.textContent = beforeText;

      // span 요소 삽입
      const parentNode = focusNode.parentNode;
      parentNode.insertBefore(span, focusNode.nextSibling);

      // 남은 텍스트 노드 삽입
      const afterTextNode = document.createTextNode(afterText);
      parentNode.insertBefore(afterTextNode, span.nextSibling);

      this.restoreSelection({
        selection,
        range,
        focusNode: target.querySelector(`#${this.mentionId}`),
        focusOffset: 1
      });
    } else if (focusInCompleteMentionTag) {
      focusNode.parentElement.classList.replace('complete-mention', 'will-mention');

      // dataset의 모든 속성 삭제
      for (const key in focusNode.parentElement.dataset) {
        delete focusNode.parentElement.dataset[key];
      }

      this.mentionId = focusNode.parentElement.id;

      this.restoreSelection({ selection, range, focusNode: focusNode, focusOffset });
    }

    if (!isStartMention && !focusInMentionTag) {
      this.mentionId = '';
    }

    return false;
  }

  handleUndoRedo({ range }: { selection: Selection; range: Range }) {
    if ((range.startContainer as HTMLElement).classList?.contains('mention')) {
      const mentionTag = range.startContainer as HTMLElement;
      const mentionId = mentionTag.id;

      if (!this.mentionId) {
        this.config.onWriteMention &&
          this.config.onWriteMention(mentionTag.innerText.replace('@', ''));

        this.mentionId = mentionId;
      }
    } else {
      this.mentionId = '';
    }
  }

  observe({
    setTargetMentionId,
    setConfig
  }: {
    setTargetMentionId: (targetMentionId: string) => void;
    setConfig: (newConfig: MentionConfig) => void;
  }) {
    this.setTargetMentionId = setTargetMentionId;
    this.setNewConfig = setConfig;
  }
}

export type { MentionConfig, MentionInfo };
export default Mention;
