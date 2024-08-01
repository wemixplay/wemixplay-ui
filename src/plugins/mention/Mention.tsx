import React from 'react';
import { uniqueId } from 'lodash';
import type { ChangeEvent, MouseEvent, KeyboardEvent, MutableRefObject } from 'react';
import MentionList, { MentionListRef } from './components/MentionList';
import MentionContainer from './components/MentionContainer';
import { WpEditorPlugin } from '@/components/editor/WpEditor';

type MentionInfo = { id: number; name: string; profileImg?: string; isOfficial?: boolean } & {
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
    currentMention?: MentionInfo;
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
    if (!focusNode) {
      return;
    }

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
    mention,
    keepTag
  }: {
    selection: Selection;
    range: Range;
    mention?: MentionInfo;
    keepTag?: boolean;
  }) {
    const target = this.contentEditableEl.current;
    const targetMentionId = this.mentionId;

    const mentionTag = target.querySelector(`#${targetMentionId}`);
    const existOnlyAtMark = mentionTag.firstChild?.textContent?.trim() === '@' && !mention;

    const isWillMention = !!mentionTag?.classList.contains('will-mention');

    const mentionRegex = new RegExp(
      `<span\\s+id="${targetMentionId}"([^>]*)class="mention ${isWillMention ? 'will-mention' : 'unknown-mention'}"([^>]*)>(.*?)<\\/span>`,
      'g'
    );

    if (existOnlyAtMark) {
      const atMarkText = document.createTextNode(mentionTag.firstChild?.textContent);

      mentionTag.replaceWith(atMarkText);

      const newRange = document.createRange();

      newRange.setStartAfter(atMarkText);
      newRange.setEndAfter(atMarkText);

      selection.removeAllRanges();
      selection.addRange(newRange);

      range.setStartAfter(atMarkText);
      range.setEndAfter(atMarkText);

      this.mentionId = '';

      return;
    } else if (mention) {
      target.innerHTML = target.innerHTML.replace(
        mentionRegex,
        `<span id="${targetMentionId}" class="mention complete-mention"$1$2>@${mention.name}</span>&nbsp;`
      );

      const newMentionTag = target.querySelector(`#${targetMentionId}`) as HTMLSpanElement;

      newMentionTag.dataset.id = String(mention.id);
      newMentionTag.dataset.name = mention.name;
      newMentionTag.textContent = `@${mention.name}`;
    } else if (!keepTag) {
      const mentionText = selection.focusNode.textContent.trim();

      target.innerHTML = target.innerHTML.replace(
        mentionRegex,
        `<span id="${targetMentionId}" class="mention unknown-mention"$1$2>${mentionText}</span>&nbsp;`
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

    const focusInMentionTag = !!focusNode?.parentElement?.classList?.contains?.('mention');
    // const focusInDecompleteMentionTag =
    //   !!focusNode?.parentElement?.classList?.contains?.('will-mention') ||
    //   !!focusNode?.parentElement?.classList?.contains?.('unknown-mention');

    const collapseCheckRange = selection.getRangeAt(0);

    if (focusInMentionTag && collapseCheckRange.startOffset === collapseCheckRange.endOffset) {
      this.mentionId = focusNode.parentElement.id;
      this.config.onWriteMention &&
        this.config.onWriteMention(focusNode?.parentElement?.textContent?.replace('@', ''));
    }
  }

  selectMentionItem(index?: number) {
    const range = document.createRange();
    const selection = window.getSelection();

    const mention = this.postMentionListRef.handleSubmit(index);
    this.leaveMentionTag({ selection, range, mention });

    const allMentionEls = this.contentEditableEl.current.querySelectorAll(
      '.mention.complete-mention'
    );

    const allMention = Array.from(allMentionEls).map((mentionEl) => {
      return {
        ...Object.fromEntries(Object.entries((mentionEl as HTMLSpanElement).dataset)),
        name: mentionEl.textContent.replace('@', '').trim()
      };
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

    const focusInMentionTag =
      !!selection.focusNode?.parentElement?.classList?.contains?.('mention');
    const focusInDecompleteMentionTag =
      !!selection.focusNode?.parentElement?.classList?.contains?.('will-mention') ||
      !!selection.focusNode?.parentElement?.classList?.contains?.('unknown-mention');

    if (event.code === 'ArrowLeft' || event.code === 'ArrowRight') {
      if (!targetMentionId && focusInMentionTag) {
        this.mentionId = selection.focusNode.parentElement.id;
        this.config.onWriteMention &&
          this.config.onWriteMention(
            selection.focusNode?.parentElement?.textContent?.replace('@', '')
          );
      } else if (targetMentionId && selection.focusNode.firstChild?.textContent === '@') {
        this.leaveMentionTag({ selection, range });
      } else if (targetMentionId && !focusInMentionTag) {
        this.mentionId = '';
      }
    }

    if (event.code === 'ArrowRight') {
      if (
        targetMentionId &&
        focusInDecompleteMentionTag &&
        !selection.focusNode.parentElement.nextElementSibling &&
        !event.nativeEvent.isComposing
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
      !prevCurrentInputChar?.trim() &&
      focusNode.nodeType === Node.TEXT_NODE &&
      !focusInMentionTag &&
      currentInputChar === '@';
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
    } else if (focusInMentionTag && focusNode.textContent.split(' ').length > 1) {
      this.mentionId = '';

      const [tagText, normalText] = focusNode.textContent.split(' ');

      const spaceNode = document.createTextNode('\u00A0');
      const tagTextNode = document.createTextNode(`${tagText} `);
      const normalTextNode = document.createTextNode(normalText);

      focusNode.parentNode.parentNode.insertBefore(
        normalTextNode,
        focusNode.parentNode.nextSibling
      );

      if (focusOffset !== focusNode.textContent.length) {
        focusNode.parentElement.replaceWith(tagTextNode);

        range.setStartBefore(normalTextNode);
        range.setEndBefore(normalTextNode);
      } else {
        focusNode.textContent = tagText;

        focusNode.parentNode.parentNode.insertBefore(spaceNode, focusNode.parentNode.nextSibling);

        range.setStartAfter(normalTextNode);
        range.setEndAfter(normalTextNode);
      }

      selection.removeAllRanges();
      selection.addRange(range);

      const allMentionEls = this.contentEditableEl.current.querySelectorAll(
        '.mention.complete-mention'
      );

      const allMention = Array.from(allMentionEls).map((mentionEl) => {
        return {
          ...Object.fromEntries(Object.entries((mentionEl as HTMLSpanElement).dataset)),
          name: mentionEl.textContent.replace('@', '').trim()
        };
      }) as MentionInfo[];

      this.config.onCompleteMention && this.config.onCompleteMention({ allMention });

      return;
    } else if (
      focusInCompleteMentionTag &&
      focusNode.parentElement.dataset.name.trim() !==
        focusNode.parentElement.textContent.replace('@', '').trim()
    ) {
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

    if (!isStartMention && focusInMentionTag && !focusInCompleteMentionTag && !this.mentionId) {
      this.mentionId = focusNode.parentElement.id;
    }

    if (
      !isStartMention &&
      focusInMentionTag &&
      this.mentionId &&
      !focusNode.textContent.slice(-1).trim()
    ) {
      this.leaveMentionTag({ selection, range });
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
