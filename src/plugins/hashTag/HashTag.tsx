import React from 'react';
import type { WpEditorPlugin } from '@/components/editor/WpEditor';
import { uniqueId } from 'lodash';
import type { ChangeEvent, MouseEvent, KeyboardEvent, MutableRefObject } from 'react';
import HashList, { HashListRef } from './components/HashList';
import HashContainer from './components/HashContainer';

type HashTagInfo = { id: number; name: string; postCnt?: number } & {
  [key: string]: string | number | undefined; // 추가적인 필드도 허용
};

type HashTagConfig = {
  list: HashTagInfo[];
  listElement?: (item: HashTagInfo) => React.JSX.Element;
  onWriteHash?: (text: string) => void;
  onCompleteHash?: ({
    allHashTag,
    currentHashTag
  }: {
    allHashTag: HashTagInfo[];
    currentHashTag?: HashTagInfo;
  }) => void;
  onOpenHashList?: () => void;
  onCloseHashList?: () => void;
};

class HashTag implements WpEditorPlugin {
  public readonly commandKey = 'hash';
  private _hashId: string;
  private setTargetHashId: (targetHashId: string) => void;
  public contentEditableEl: MutableRefObject<HTMLDivElement>;
  private postHashListRef: HashListRef;
  private currentHashList: HashTagInfo[] = [];
  private _config: HashTagConfig = {
    list: [],
    onWriteHash: (text) => {}
  };
  private setNewConfig: (newConfig: HashTagConfig) => void;

  constructor({ contentEditableEl }: { contentEditableEl: MutableRefObject<HTMLDivElement> }) {
    this.contentEditableEl = contentEditableEl;
  }

  set hashId(id: string) {
    this._hashId = id;
    this.setTargetHashId && this.setTargetHashId(this._hashId);

    if (!id) {
      this.config.onCloseHashList && this.config.onCloseHashList();
    } else {
      this.config.onOpenHashList && this.config.onOpenHashList();
    }
  }

  get hashId() {
    return this._hashId;
  }

  set config(newConfig: HashTagConfig) {
    this._config = newConfig;
    this.setNewConfig && this.setNewConfig(newConfig);
  }

  get config() {
    return this._config;
  }

  setConfig(config: HashTagConfig) {
    this.config = { ...this.config, ...(config ?? {}) };
  }

  component({ plugin }: { plugin: HashTag }) {
    return (
      <HashContainer hash={plugin}>
        {({ config, targetHashId }) => (
          <HashList
            ref={(ref) => {
              this.postHashListRef = ref;
            }}
            contentEditableEl={plugin.contentEditableEl}
            targetHashId={targetHashId}
            list={config.list}
            listElement={config.listElement}
            selectHashItem={(index) => {
              plugin.selectHashItem(index);
            }}
            closeHashList={() => {
              this.hashId = '';
            }}
          />
        )}
      </HashContainer>
    );
  }

  checkValidHashTag(str: string) {
    // 정규식: 해시태그가 '#'로 시작하고, 그 뒤에 국가 문자, 숫자, 밑줄, 이모지가 올 수 있도록 허용
    const regex = /^#[\p{L}\p{N}_\u200d\p{Emoji_Presentation}\uFE0F]*$/u;

    // 해시태그가 '#'만 있어도 true를 반환
    return str === '#' || regex.test(str);
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
    } else if (focusNode) {
      range.setStart(focusNode, focusOffset ?? 0);
      range.collapse(true);
    }

    selection.removeAllRanges();
    selection.addRange(range);
  }

  getAllHashTag() {
    const allHashTagEls = this.contentEditableEl.current.querySelectorAll('.hash');

    return Array.from(allHashTagEls).map((hashTagEl) => {
      return {
        ...Object.fromEntries(Object.entries((hashTagEl as HTMLSpanElement).dataset)),
        name: hashTagEl.textContent.replace('#', '').trim()
      };
    }) as HashTagInfo[];
  }

  getCurrentHashList() {
    this.currentHashList = this.getAllHashTag();

    this.config.onCompleteHash && this.config.onCompleteHash({ allHashTag: this.currentHashList });
  }

  leaveHashTag({
    selection,
    range,
    hash,
    keepTag
  }: {
    selection: Selection;
    range: Range;
    hash?: HashTagInfo;
    keepTag?: boolean;
  }) {
    const target = this.contentEditableEl.current;
    const targetHashId = this.hashId;

    const hashTag = target.querySelector(`#${targetHashId}`) as HTMLSpanElement;
    const existOnlyAtMark = hashTag.firstChild?.textContent?.trim() === '#' && !hash;

    const hashRegex = new RegExp(
      `<span\\s+id="${targetHashId}"([^>]*)class="hash"([^>]*)>(.*?)<\\/span>`,
      'g'
    );

    if (existOnlyAtMark) {
      const shapText = document.createTextNode(hashTag.firstChild?.textContent);

      hashTag.replaceWith(shapText);

      const newRange = document.createRange();

      newRange.setStartAfter(shapText);
      newRange.setEndAfter(shapText);

      selection.removeAllRanges();
      selection.addRange(newRange);

      this.hashId = '';

      return;
    } else if (hash) {
      if (this.currentHashList.every((hashTag) => hashTag.name !== hash.name)) {
        target.innerHTML = target.innerHTML.replace(
          hashRegex,
          `<span id="${targetHashId}" class="hash complete-hash"$1$2>#${hash.name}</span>&nbsp;`
        );

        const newHashTag = target.querySelector(`#${targetHashId}`) as HTMLSpanElement;

        newHashTag.dataset.id = String(hash.id);
        newHashTag.dataset.name = hash.name;
        newHashTag.textContent = `#${hash.name}`;
      } else {
        target.innerHTML = target.innerHTML.replace(
          hashRegex,
          `<span id="${targetHashId}" class="duplicate-hash"$1$2>#${hash.name}</span>&nbsp;`
        );
      }
    } else if (!keepTag) {
      const hashText = selection.focusNode.textContent.trim();

      if (this.currentHashList.every((hash) => hash.name !== hashText.replace('#', ''))) {
        target.innerHTML = target.innerHTML.replace(
          hashRegex,
          `<span id="${targetHashId}" class="hash"$1$2>${hashText}</span>&nbsp;`
        );

        const newHashTag = target.querySelector(`#${targetHashId}`) as HTMLSpanElement;

        newHashTag.dataset.id = '0';
        newHashTag.dataset.name = hashText.replace('#', '');

        this.config.onCompleteHash &&
          this.config.onCompleteHash({
            allHashTag: this.getAllHashTag(),
            currentHashTag: {
              id: Number(newHashTag.dataset.id),
              name: newHashTag.dataset.name
            }
          });
      } else {
        target.innerHTML = target.innerHTML.replace(
          hashRegex,
          `<span id="${targetHashId}" class="duplicate-hash"$1$2>${hashText}</span>&nbsp;`
        );
      }
    }

    this.hashId = '';

    this.restoreSelection({
      selection,
      range,
      focusNode: existOnlyAtMark ? target : target.querySelector(`#${targetHashId}`)?.nextSibling,
      focusOffset: 1,
      focusTopEnd: existOnlyAtMark
    });

    this.contentEditableEl.current.dispatchEvent(new Event('input', { bubbles: true }));
  }

  selectHashItem(index?: number) {
    const range = document.createRange();
    const selection = window.getSelection();

    const hash = this.postHashListRef.handleSubmit(index);

    const maxLength = Number(this.contentEditableEl.current.ariaValueMax);

    if (
      maxLength <=
      (hash?.name ?? '').length + this.contentEditableEl.current.textContent.length
    ) {
      this.hashId = '';

      return;
    }

    this.leaveHashTag({ selection, range, hash });

    this.config.onCompleteHash &&
      this.config.onCompleteHash({ allHashTag: this.getAllHashTag(), currentHashTag: hash });
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

    const focusInHashTag = !!focusNode?.parentElement?.classList?.contains?.('hash');

    const collapseCheckRange = selection.getRangeAt(0);

    if (focusInHashTag && collapseCheckRange.startOffset === collapseCheckRange.endOffset) {
      this.hashId = focusNode.parentElement.id;
      this.config.onWriteHash &&
        this.config.onWriteHash(focusNode?.parentElement?.textContent?.replace('@', ''));
    }
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
    const targetHashId = this.hashId;

    const focusInHashTag = !!selection.focusNode?.parentElement?.classList?.contains?.('hash');
    const focusInDecompleteHashTag =
      focusInHashTag && !selection.focusNode?.parentElement?.classList?.contains?.('complete-hash');

    if (event.code === 'ArrowLeft' || event.code === 'ArrowRight') {
      if (focusInHashTag && !targetHashId) {
        this.hashId = selection.focusNode.parentElement.id;

        this.config.onWriteHash &&
          this.config.onWriteHash(
            selection.focusNode?.parentElement?.textContent?.replace('@', '')
          );
      } else if (targetHashId && selection.focusNode.firstChild?.textContent === '#') {
        this.leaveHashTag({ selection, range });
      } else if (!focusInHashTag && targetHashId) {
        this.hashId = '';
      }
    }

    if (event.code === 'ArrowRight') {
      if (
        targetHashId &&
        focusInDecompleteHashTag &&
        !selection.focusNode.parentElement.nextElementSibling &&
        !event.nativeEvent.isComposing
      ) {
        event.preventDefault();

        this.leaveHashTag({ selection, range });
      } else if (targetHashId && selection.focusNode.firstChild?.textContent === '#') {
        this.leaveHashTag({ selection, range });
      }
    } else if (event.code === 'ArrowUp' || event.code === 'ArrowDown') {
      if (targetHashId) {
        event.preventDefault();

        if (event.code === 'ArrowUp') {
          this.postHashListRef.handleArrowUp();
        } else {
          this.postHashListRef.handleArrowDown();
        }
      }
    } else if (event.code === 'Enter') {
      if (targetHashId && !event.nativeEvent.isComposing) {
        event.preventDefault();

        this.selectHashItem();
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

    const currentInputChar = focusNode?.textContent?.[focusOffset - 1];
    const prevCurrentInputChar = focusNode?.textContent?.[focusOffset - 2];
    const focusInHashTag = !!focusNode?.parentElement?.classList?.contains?.('hash');
    const focusInCompleteHashTag =
      focusInHashTag && !!focusNode?.parentElement?.classList?.contains?.('complete-hash');

    const isStartHash =
      !prevCurrentInputChar?.trim() &&
      focusNode?.nodeType === Node.TEXT_NODE &&
      !focusInHashTag &&
      currentInputChar === '#';

    if (this.hashId && focusInHashTag) {
      this.config.onWriteHash &&
        this.config.onWriteHash(focusNode.parentElement.firstChild.textContent.replace('#', ''));
    }

    if (isStartHash) {
      this.hashId = `hash-${uniqueId()}`;

      // 방금 입력된 # 문자를 <span>으로 교체
      const textContent = focusNode?.textContent ?? '';
      const beforeText = textContent.slice(0, focusOffset - 1);
      const afterText = textContent.slice(focusOffset);

      // 새로운 span 요소 생성
      const span = document.createElement('span');
      span.id = this.hashId;
      span.className = 'hash';
      span.textContent = '#';
      span.dataset.id = '0';
      span.dataset.name = textContent;

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
        focusNode: target.querySelector(`#${this.hashId}`),
        focusOffset: 1
      });
    } else if (focusInHashTag && focusNode.textContent.split(' ').filter((v) => !!v).length > 1) {
      this.hashId = '';

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

      return;
    } else if (focusInHashTag && !this.checkValidHashTag(focusNode.textContent.trim())) {
      this.hashId = '';
      const cursorOffset = selection.getRangeAt(0).startOffset;

      const normalTextNode = document.createTextNode(`${focusNode.textContent} `);

      focusNode.parentElement.parentNode.replaceChild(normalTextNode, focusNode.parentNode);

      const newRange = document.createRange();
      newRange.setStart(normalTextNode, cursorOffset);
      newRange.setEnd(normalTextNode, cursorOffset);
      selection.removeAllRanges();
      selection.addRange(newRange);

      return;
    } else if (
      focusInCompleteHashTag &&
      focusNode.parentElement.dataset.name.trim() !==
        focusNode.parentElement.textContent.replace('#', '').trim()
    ) {
      focusNode.parentElement.classList.replace('complete-hash', '');

      focusNode.parentElement.dataset.id = '0';
      focusNode.parentElement.dataset.name = focusNode.parentElement.textContent
        .replace('#', '')
        .trim();

      // dataset의 모든 속성 삭제
      for (const key in focusNode.parentElement.dataset) {
        delete focusNode.parentElement.dataset[key];
      }

      this.hashId = focusNode.parentElement.id;

      this.restoreSelection({ selection, range, focusNode: focusNode, focusOffset });
    }

    if (!isStartHash && !focusInHashTag) {
      this.hashId = '';
    }

    if (!isStartHash && focusInHashTag && !focusInCompleteHashTag && !this.hashId) {
      this.hashId = focusNode.parentElement.id;
    }

    if (!isStartHash && focusInHashTag && this.hashId && !focusNode.textContent.slice(-1).trim()) {
      this.leaveHashTag({ selection, range });
    }

    if (this.currentHashList.length !== this.getAllHashTag().length) {
      this.getCurrentHashList();
    }
  }

  handleUndoRedo({ selection, range }: { selection: Selection; range: Range }) {
    if ((range.startContainer as HTMLElement).classList?.contains('hash')) {
      const hashTag = range.startContainer as HTMLElement;
      const hashId = hashTag.id;

      if (!this.hashId) {
        this.config.onWriteHash && this.config.onWriteHash(hashTag.innerText.replace('#', ''));

        this.hashId = hashId;
      }
    } else {
      this.hashId = '';
    }
  }

  observe({
    setTargetHashId,
    setConfig
  }: {
    setTargetHashId: (targetHashId: string) => void;
    setConfig: (newConfig: HashTagConfig) => void;
  }) {
    this.setTargetHashId = setTargetHashId;
    this.setNewConfig = setConfig;
  }
}

export type { HashTagConfig, HashTagInfo };
export default HashTag;
