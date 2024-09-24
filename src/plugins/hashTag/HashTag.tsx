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
  /** hashtag 리스트 */
  list: HashTagInfo[];
  /** 중복 멘션을 막을건지 여부 */
  detectDuplicate?: boolean;
  /** 해시태그 item을 다르게 커스텀하고 싶을때 전달하는 JSX Element */
  listElement?: (item: HashTagInfo) => React.JSX.Element;
  /**
   * 해시태그 작성 중일때 트리거 되는 함수
   * @param {string} - 작성중인 hashTag 값 (# 제외)
   */
  onWriteHash?: (text: string) => void;
  /**
   * 해시태그 작성이 완료되거나 해시태그 내용이 변경될때 트리거 되는 함수
   * @param {HashTagInfo[]} [params.allHashTag] - 작성된 해시태그 전체 배열
   * @param {HashTagInfo} [params.currentHashTag] - 현재 작성이 완료된 해시태그
   */
  onCompleteHash?: ({
    allHashTag,
    currentHashTag
  }: {
    allHashTag: HashTagInfo[];
    currentHashTag?: HashTagInfo;
  }) => void;
  /** hashtag 리스트가 열릴때 트리거 되는 함수 */
  onOpenHashList?: () => void;
  /** hashtag 리스트가 닫힐때 트리거 되는 함수 */
  onCloseHashList?: () => void;
};

/**
 * HashTag는 에디터에서 해시태그 기능을 사용할 수 있도록 지원하는 플러그인 입니다.
 */
class HashTag implements WpEditorPlugin {
  /** HashTag 플러그인의 고유 commandKey */
  public readonly commandKey = 'hash';
  /** HashTag 클래스 내부 hashId */
  private _hashId: string;
  /** observing 패턴을 위한 targetHashId를 set해주는 외부 함수를 나타내는 함수 */
  private setTargetHashId: (targetHashId: string) => void;
  /** contentEditable div Element를 가르키는 참조값 */
  public contentEditableEl: MutableRefObject<HTMLDivElement>;
  /** hashtag 리스트 UI 컴포넌트를 가르키는 참조값 */
  private hashListRef: HashListRef;
  /** 현재 입력된 hashList를 저장하는 변수 */
  private currentHashList: HashTagInfo[] = [];
  /** HashTag 플러그인의 설정(옵션) 값 */
  private _config: HashTagConfig = {
    list: [],
    onWriteHash: (text) => {}
  };
  /** observing 패턴을 위한 config를 set 해주는 외부 함수를 나타내는 함수 */
  private setNewConfig: (newConfig: HashTagConfig) => void;

  constructor({ contentEditableEl }: { contentEditableEl: MutableRefObject<HTMLDivElement> }) {
    this.contentEditableEl = contentEditableEl;
  }

  /**
   * 내부 인스턴스 값인 _hashId를 set하고 hashId를 변경할때 그에 띠른 함수들을 호출해주는 setter 함수
   */
  set hashId(id: string) {
    this._hashId = id;
    this.setTargetHashId && this.setTargetHashId(this._hashId);

    if (!id) {
      this.config.onCloseHashList && this.config.onCloseHashList();
    } else {
      this.config.onOpenHashList && this.config.onOpenHashList();
    }
  }

  /**
   * 내부 인스턴스 값인 _hashId를 반환하는 getter 함수
   */
  get hashId() {
    return this._hashId;
  }

  /**
   * 내부 인스턴스 값인 _config를 set하고 config가 변경될때 setNewConfig 함수를 호출하는 setter 함수
   */
  set config(newConfig: HashTagConfig) {
    this._config = newConfig;
    this.setNewConfig && this.setNewConfig(newConfig);
  }

  /**
   * 내부 인스턴스 값인 _config를 반환하는 getter 함수
   */
  get config() {
    return this._config;
  }

  /**
   * config setter 함수를 이용하여 config 정보 업데이트하는 함수
   * @param {HashTagConfig} config - 업데이트할 config 정보
   */
  setConfig(config: HashTagConfig) {
    this.config = { ...this.config, ...(config ?? {}) };
  }

  /**
   * HashTag 플러그인과 관련하여 랜더링할 컴포넌트가 있을 시 작성하는데 hashtag는 hashTag 리스트를 mapping하는 컴포넌트를 랜더링
   * @param {HashTag} [params.plugin] - HashTag 클래스로 만들어진 객체
   */
  component({ plugin }: { plugin: HashTag }) {
    return (
      <HashContainer hash={plugin}>
        {({ config, targetHashId }) => (
          <HashList
            ref={(ref) => {
              plugin.hashListRef = ref;
            }}
            contentEditableEl={plugin.contentEditableEl}
            targetHashId={targetHashId}
            list={
              // detectDuplicate가 true라면 현재 이미 등록된 hashTag들은 제외한 리스트 요소만 filter 진행
              config.detectDuplicate
                ? config.list.filter((item) =>
                    this.currentHashList.every((hash) => hash.name !== item.name)
                  )
                : config.list
            }
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

  /**
   * hashTag의 유효성 검사를 하는 함수
   * @param {string} str - hashTag안에 들어가는 텍스트
   */
  checkValidHashTag(str: string) {
    // 정규식: 해시태그가 '#'로 시작하고, 그 뒤에 국가 문자, 숫자, 밑줄, 이모지가 올 수 있도록 허용
    const regex = /^#[\p{L}\p{N}_\u200d\p{Emoji_Presentation}\uFE0F]*$/u;

    // 해시태그가 '#'만 있어도 true를 반환
    return str === '#' || regex.test(str);
  }

  /**
   * 에디터에 현재 등록된 hashTag들을 HashTagInfo 타입의 배열로 가공하여 반환하는 함수
   * @returns {HashTagInfo[]}
   */
  getAllHashTag(): HashTagInfo[] {
    const allHashTagEls = this.contentEditableEl.current.querySelectorAll('.hash');

    return Array.from(allHashTagEls).map((hashTagEl) => {
      return {
        ...Object.fromEntries(Object.entries((hashTagEl as HTMLSpanElement).dataset)),
        name: hashTagEl.textContent.replace('#', '').trim()
      };
    }) as HashTagInfo[];
  }

  /**
   * 에디터에 현재 등록된 hashTag들과 현재 작성한 hashTag 정보를 currentHashList에 업데이트하고 onCompleteHash 함수를 실행하는 함수
   * @param {HashTagInfo} hashTag - 현재 작성한 hashTag 정보 (optional)
   */
  updateCurrentHashList(hashTag?: HashTagInfo) {
    this.currentHashList = this.getAllHashTag();

    if (hashTag) {
      this.currentHashList = [...this.currentHashList, hashTag];
    }

    this.config.onCompleteHash &&
      this.config.onCompleteHash({ allHashTag: this.currentHashList, currentHashTag: hashTag });
  }

  /**
   * hashTag 작성이 끝나고 나서 그 후에 hashTag 정보를 상황에 맞게 파싱 후 커서의 위치를 조정하는 함수
   * @param {HashTagInfo} [params.hash] - hashTag 정보가 명확히 있을때(complete) 전달된 hashTag 정보
   * @param {boolean} [params.keepTag] - hashTag 태그를 상황에 따라 변환하지 않고 현재 태그 상태로 유지하고 싶을때 true로 전달
   */
  leaveHashTag({
    hash,
    keepTag
  }: {
    hash?: HashTagInfo;
    keepTag?: boolean;
  } = {}) {
    const selection = window.getSelection();
    const range = document.createRange();

    /** wpEditor의 contentEditable 요소 */
    const target = this.contentEditableEl.current;
    /** hashTag 태그의 고유 id */
    const targetHashId = this.hashId;

    /** 현재 작성중인 hashTag의 element */
    const hashTag = target.querySelector(`#${targetHashId}`) as HTMLSpanElement;

    if (!hashTag) {
      return;
    }

    /** hashTag 안에 `#`만 존재하는지 확인 */
    const existOnlyHashMark = hashTag.firstChild?.textContent?.trim() === '#' && !hash;

    /** hashtag Element를 찾는 정규식 */
    const hashRegex = new RegExp(
      `<span\\s+id="${targetHashId}"([^>]*)class="hash"([^>]*)>(.*?)<\\/span>`,
      'g'
    );

    if (existOnlyHashMark) {
      /** `#`만 있을 경우 그냥 순수 text의 `#`를 입력하기를 원하는 것으로 판단하여 text만 추출 */
      const shapText = document.createTextNode(hashTag.firstChild?.textContent);

      hashTag.replaceWith(shapText);

      const newRange = document.createRange();

      newRange.setStartAfter(shapText);
      newRange.setEndAfter(shapText);

      selection.removeAllRanges();
      selection.addRange(newRange);

      this.hashId = '';

      return;

      // hash 정보가 존재할 경우
    } else if (hash) {
      // hashTag 중복을 허용하지 않는데 중복 hashTag 정보가 입력되려고 할때 class 선택자에 duplicate-hash 클래스 선택자 표시
      if (
        this.config.detectDuplicate &&
        this.currentHashList.some((hashTag) => hashTag.name === hash.name)
      ) {
        target.innerHTML = target.innerHTML.replace(
          hashRegex,
          `<span id="${targetHashId}" class="duplicate-hash"$1$2>#${hash.name}</span>`
        );
        // 중복을 허용하거나 중복되는 hashTag가 아닐때는 complete-hash 클래스 선택자 추가하여 hashTag Element로 치환
      } else {
        target.innerHTML = target.innerHTML.replace(
          hashRegex,
          `<span id="${targetHashId}" class="hash complete-hash"$1$2>#${hash.name}</span>`
        );

        const newHashTag = target.querySelector(`#${targetHashId}`) as HTMLSpanElement;

        newHashTag.dataset.id = String(hash.id);
        newHashTag.dataset.name = hash.name;
        newHashTag.textContent = `#${hash.name}`;
      }

      // hashTag를 유지하지 않고자 하는 경우
    } else if (!keepTag) {
      const hashText = selection.focusNode.textContent.trim();

      // hashTag 중복을 허용하지 않는데 중복 hashTag 정보가 입력되려고 할때 class 선택자에 duplicate-hash 클래스 선택자 표시
      if (
        this.config.detectDuplicate &&
        this.currentHashList.some((hashTag) => hashTag.name === hash.name)
      ) {
        target.innerHTML = target.innerHTML.replace(
          hashRegex,
          `<span id="${targetHashId}" class="duplicate-hash"$1$2>${hashText}</span>`
        );

        // 중복을 허용하거나 중복되는 hashTag가 아닐때는 complete-hash 클래스 선택자를 제거하여 hashTag Element로 치환
      } else {
        target.innerHTML = target.innerHTML.replace(
          hashRegex,
          `<span id="${targetHashId}" class="hash"$1$2>${hashText}</span>`
        );

        const newHashTag = target.querySelector(`#${targetHashId}`) as HTMLSpanElement;

        newHashTag.dataset.id = '0';
        newHashTag.dataset.name = hashText.replace('#', '');

        this.updateCurrentHashList({
          id: Number(newHashTag.dataset.id),
          name: newHashTag.dataset.name
        });
      }
    }

    this.hashId = '';

    const hashTagNextSibling = target.querySelector(`#${targetHashId}`)?.nextSibling;

    if (Node.TEXT_NODE !== hashTagNextSibling?.TEXT_NODE || hashTagNextSibling?.nodeValue?.trim()) {
      target.querySelector(`#${targetHashId}`).insertAdjacentHTML('afterend', '&nbsp;'); // 공백 추가
    }

    const focusNode = existOnlyHashMark
      ? target
      : target.querySelector(`#${targetHashId}`)?.nextSibling;

    if (existOnlyHashMark) {
      range.selectNodeContents(focusNode);
      range.collapse(false);
    } else {
      range.setStart(focusNode, 1);
      range.collapse(true);
    }

    selection.removeAllRanges();
    selection.addRange(range);

    this.contentEditableEl.current.dispatchEvent(new Event('input', { bubbles: true }));
  }

  /**
   * hashTag 리스트에서 hashTag 요소를 선택하였을 때 호출되는 함수
   * @param index - hashTag 리스트 중 선택된 요소의 index
   */
  selectHashItem(index?: number) {
    /** hashTag 리스트 UI 컴포넌트에 노출되는 hashTag 리스트 중 index에 해당하는 hashTag 정보 */
    const hash = this.hashListRef.handleSubmit(index);
    /** 에디터에 설정된 최대 길이 값 */
    const maxLength = Number(this.contentEditableEl.current.ariaValueMax);

    // 현재 에디터에 작성된 문자열 길이 + 작성될 hashTag를 합한 길이가 에디터에 설정된 최대 길이 값보다 큰 경우
    // hashTag 리스트 UI 컴포넌트를 닫고 어떠한 후작업을 하지 않고 그냥 종료
    if (
      maxLength <=
      (hash?.name ?? '').length + this.contentEditableEl.current.textContent.length
    ) {
      this.hashId = '';

      return;
    }

    this.leaveHashTag({ hash });

    this.updateCurrentHashList(hash);
  }

  /**
   * 에디터를 클릭 했을때 호출되는 함수로써 HashTag 에서는 hashTag를 클릭했을때의 이벤트를 컨트롤
   * @param {MouseEvent<HTMLDivElement>} [params.event] - click 이벤트
   */
  handleClick({ event }: { event: MouseEvent<HTMLDivElement> }) {
    const selection = window.getSelection();

    /** 현재 커서가 포커싱된 Node */
    const focusNode = selection.focusNode;
    /** 포커싱되 Node의 부모 element가 hash 클래스 선택자를 갖고 있는 hashTag 인지 확인 */
    const focusInHashTag = !!focusNode?.parentElement?.classList?.contains?.('hash');

    /** 커서의 위치값을 알기 위한 값 */
    const collapseCheckRange = selection.getRangeAt(0);

    // 포커싱된 곳이 hashTag 안이며 startOffset이 0보다 크고 collapse가 되어있는지 확인된 경우
    if (
      focusInHashTag &&
      collapseCheckRange.startOffset > 0 &&
      collapseCheckRange.startOffset === collapseCheckRange.endOffset
    ) {
      // hashTag 리스트 UI 컴포넌트가 노출되도록 hashTag의 id값을 hashId로 주입
      this.hashId = focusNode.parentElement.id;

      // hashTag의 `#`을 제외한 textContent를 onWriteHash 함수로 전달
      this.config.onWriteHash &&
        this.config.onWriteHash(focusNode?.parentElement?.textContent?.replace('#', ''));
    }
  }

  /**
   * 에디터에서 keydown 이벤트가 발생하였을때 호출되는 함수
   * @param {KeyboardEvent<HTMLDivElement>} [params.event] - keydown 이벤트
   */
  handleKeyDown({ event }: { event: KeyboardEvent<HTMLDivElement> }) {
    const selection = window.getSelection();
    const range = document.createRange();

    /** 현재 선택된 hashId를 나타내며 hashTag 리스트 UI 컴포넌트가 열렸는지도 나타내는 변수이기도 함 */
    const targetHashId = this.hashId;

    /** 현재 커서가 포커싱된 Node */
    const focusNode = selection.focusNode;
    /** 현재 커서가 포커싱된 Node에서의 offset 값 */
    const focusOffset = selection.focusOffset;
    /** 현재 커서가 포커싱된 Node에서의 offset 값 */
    const focusInHashTag = !!focusNode?.parentElement?.classList?.contains?.('hash');
    /** hashTag에 포커싱 되어 있으며 complete-hash 클래스 선택자가 없는 Element에 포커싱이 되어있는지 확인  */
    const focusInDecompleteHashTag =
      focusInHashTag && !focusNode?.parentElement?.classList?.contains?.('complete-hash');

    // left, right 방향키를 눌렀을 때
    if (event.code === 'ArrowLeft' || event.code === 'ArrowRight') {
      // hashTag 리스트 UI 컴포넌트가 안열려있고 focusOffset이 1보다 크며 포커싱 된 태그가 hashTag 라면
      if (focusInHashTag && focusOffset > 1 && !targetHashId) {
        // hashTag의 `@`를 제외한 textContent를 onWriteHash 함수로 전달
        this.config.onWriteHash &&
          this.config.onWriteHash(focusNode?.parentElement?.textContent?.replace('#', ''));

        // hashId를 주입하여 hashTag 리스트 UI 컴포넌트 노출
        this.hashId = focusNode.parentElement.id;

        // hashTag에 포커싱되어 있고, hashId가 존재하며 focusOffset이 1 이하일 때 hashId를 초기화
      } else if (focusInHashTag && targetHashId && focusOffset <= 1) {
        this.hashId = '';

        // hashId가 존재하고 현재 포커싱된 노드의 첫 번째 텍스트가 '#'일 때 hashTag를 떠남
      } else if (targetHashId && focusNode.firstChild?.textContent === '#') {
        this.leaveHashTag();

        // hashId가 존재하고 포커싱된 노드가 hashTag가 아니면 hashId를 초기화
      } else if (targetHashId && !focusInHashTag) {
        this.hashId = '';

        // hashId가 존재하고 포커싱된 노드가 complete-hash 태그가 일때 focusOffset이 mention 텍스트 길이와 같을때 hashId를 초기화
      } else if (
        targetHashId &&
        focusInHashTag &&
        !focusInDecompleteHashTag &&
        focusOffset >= focusNode.textContent.length
      ) {
        this.hashId = '';
      }
    }

    // 오른쪽 방향키를 눌렀을 때
    if (event.code === 'ArrowRight') {
      // hashId가 존재하고 미완성된 hashTag에 포커싱 되어 있으며, 다음 요소가 없고 event가 입력 중이 아닐 때
      if (
        targetHashId &&
        focusInDecompleteHashTag &&
        !focusNode.parentElement.nextElementSibling &&
        !event.nativeEvent.isComposing
      ) {
        event.preventDefault();

        this.leaveHashTag(); // hashTag를 떠남

        // hashId가 존재하고 첫 번째 텍스트가 '#'일 때 hashTag를 떠남
      } else if (targetHashId && focusNode.firstChild?.textContent === '#') {
        this.leaveHashTag();
      }

      // 위쪽 또는 아래쪽 방향키를 눌렀을 때
    } else if (event.code === 'ArrowUp' || event.code === 'ArrowDown') {
      if (targetHashId) {
        event.preventDefault();

        // hashTag 리스트 UI 컴포넌트 내에서 방향키 이동 처리
        if (event.code === 'ArrowUp') {
          this.hashListRef.handleArrowUp();
        } else {
          this.hashListRef.handleArrowDown();
        }
      }

      // 엔터키를 눌렀을 때
    } else if (event.code === 'Enter') {
      if (targetHashId && !event.nativeEvent.isComposing) {
        event.preventDefault();

        // hashTag 항목 선택 (index가 없으면 hashTag 리스트 UI 컴포넌트 내에서 선택된 hash 정보를 넘김)
        this.selectHashItem();

        // hashTag에 포커싱 되어 있고 focusOffset이 1 이하일 때
      } else if (focusInHashTag && focusOffset <= 1) {
        event.preventDefault();

        // hashTag element 바로 이전 영역에 br 태그를 삽입 후 커서를 br 태그 뒤로 조정
        const lineBreakNode = document.createElement('br');
        focusNode.parentElement.parentNode.insertBefore(lineBreakNode, focusNode.parentElement);

        range.setStartAfter(lineBreakNode);
        range.setEndAfter(lineBreakNode);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  }

  /**
   * 에디터에서 onChange 이벤트가 발생하였을때 호출되는 함수
   * @param {ChangeEvent<HTMLDivElement>} [params.event] - change 이벤트
   */
  handleChange({ event }: { event: ChangeEvent<HTMLDivElement> }) {
    const selection = window.getSelection();
    const range = document.createRange();

    /** wpEditor의 contentEditable 요소 */
    const target = this.contentEditableEl.current;
    /** 현재 커서가 포커싱된 Node */
    const focusNode = selection.focusNode;
    /** 현재 커서가 포커싱된 Node에서의 offset 값 */
    const focusOffset = selection.focusOffset;

    /** 방금 입력한 문자 */
    const currentInputChar = focusNode?.textContent?.[focusOffset - 1];
    /** 방금 입력한 문자의 바로 이전 문자 */
    const prevCurrentInputChar = focusNode?.textContent?.[focusOffset - 2];
    /** hashTag 안에 포커싱 되었는지 확인 */
    const focusInHashTag = !!focusNode?.parentElement?.classList?.contains?.('hash');
    /** complete-hash 클래스 선택자가 있는 hashTag에 포커싱이 되어있는지 확인  */
    const focusInCompleteHashTag =
      focusInHashTag && !!focusNode?.parentElement?.classList?.contains?.('complete-hash');

    /** `#`만 입력하여 이제 막 hashTag를 만들고자 하는 경우인지 확인 */
    const isStartHash =
      !prevCurrentInputChar?.trim() &&
      focusNode?.nodeType === Node.TEXT_NODE &&
      !focusInHashTag &&
      currentInputChar === '#';

    // hashId가 존재하고 hashTag에 포커싱이 되어있다면 onWriteHash를 호출하여 현재 입력중인 hashTag text를 전달
    if (this.hashId && focusInHashTag) {
      const parentElement = focusNode.parentElement;
      const text = parentElement.textContent.replace('#', '');

      this.config.onWriteHash && this.config.onWriteHash(text);

      // 현재 입력한 text와 hashTag 리스트 UI 컴포넌트에 노출되는 hash 정보중 첫번째 hash 정보와 text가 같다면
      // 해당 hash의 id를 dataset에 반영하고 아니라면 0을 반영
      if (text === this.config.list[0]?.name) {
        parentElement.dataset.id = String(this.config.list[0].id);
      } else {
        parentElement.dataset.id = '0';
      }

      parentElement.dataset.name = text;

      this.updateCurrentHashList();
    }

    // 이제 막 hashTag를 작성하려할 때
    if (isStartHash) {
      this.hashId = `hash-${uniqueId()}`;

      // 방금 입력된 # 문자 앞에 혹시나 다른 문자가 있을 경우를 대비하여 #를 기준으로 beforeText와 afterText로 나눔
      const textContent = focusNode?.textContent ?? '';
      const beforeText = textContent.slice(0, focusOffset - 1);
      const afterText = textContent.slice(focusOffset);

      // hashTag가 될 새로운 span 요소 생성
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

      const hashTagEl = target.querySelector(`#${this.hashId}`);

      if (!hashTagEl) {
        return;
      }

      range.setStart(hashTagEl, 1);
      range.collapse(true);

      selection.removeAllRanges();
      selection.addRange(range);

      // hashTag에 포커싱이 되어있고 #바로 앞에 포커싱이 되어 있으며 현재 입력한 값이 공백 문자라면
      // hashTag #앞에 입력된 공백을 제거하고 hashTag 바로 이전 요소에 공백 노드 추가
    } else if (focusInHashTag && focusOffset === 1 && currentInputChar === ' ') {
      this.hashId = '';

      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      const hashTagNode = range.startContainer.parentNode;

      // 태그 내의 공백 제거
      hashTagNode.textContent = hashTagNode.textContent.trimStart();

      // 태그 이전에 공백 노드를 생성하여 삽입
      const spaceNode = document.createTextNode(' ');
      hashTagNode.parentNode.insertBefore(spaceNode, hashTagNode);

      // 커서를 새로 삽입된 공백 노드 앞으로 위치
      range.setStartBefore(spaceNode);
      range.setEndBefore(spaceNode);
      selection.removeAllRanges();
      selection.addRange(range);

      // hashTag에 포커싱 되어있지만 hashTag text에 공백 문자가 포함되어 있을때
      // hashTag를 깨고 split으로 분리한 두개의 text로 대체
    } else if (focusInHashTag && focusNode.textContent.split(' ').length > 1) {
      this.hashId = '';

      const [tagText, normalText] = focusNode.textContent.split(' ');

      const spaceNode = document.createTextNode('\u00A0');
      const tagTextNode = document.createTextNode(`${tagText} `);
      const normalTextNode = document.createTextNode(normalText);

      // `#`가 붙어있지 않은 텍스트는 hashTag 바로 뒤의 요소 이전에 삽입
      focusNode.parentNode.parentNode.insertBefore(
        normalTextNode,
        focusNode.parentNode.nextSibling
      );

      // 커서의 위치가 focusNode의 가장 뒤가 아닐때
      if (focusOffset !== focusNode.textContent.length) {
        // hashTag를 깨고 일반 텍스트로 대체
        focusNode.parentElement.replaceWith(tagTextNode);

        range.setStartBefore(normalTextNode);
        range.setEndBefore(normalTextNode);

        // 커서의 위치가 focusNode의 가장 뒤일때
        // 이 경우는 가장 뒷자리에 공백문자를 넣었을 경우!!
      } else {
        // 공백문자를 없앤 문자를 다시 hashTag textContent로 치환
        focusNode.textContent = tagText;

        // hashTag 바로 뒤에 공백문자 삽입
        focusNode.parentNode.parentNode.insertBefore(spaceNode, focusNode.parentNode.nextSibling);

        range.setStartAfter(normalTextNode);
        range.setEndAfter(normalTextNode);
      }

      selection.removeAllRanges();
      selection.addRange(range);

      return;

      // hashTag에 포커싱이 되어있고 hashTag 안에 글자가 hash 유효성에 어긋날때
    } else if (focusInHashTag && !this.checkValidHashTag(focusNode.parentElement.textContent)) {
      this.hashId = '';
      const cursorOffset = selection.getRangeAt(0).startOffset;

      const hashTagNode = focusNode.parentNode;
      const [firstChar, secondChar] = hashTagNode.textContent.split('#');

      if (secondChar && secondChar === focusNode.parentElement.dataset.name) {
        const normalTextNode = document.createTextNode(firstChar);
        hashTagNode.textContent = `#${secondChar}`;

        hashTagNode.parentNode.insertBefore(normalTextNode, hashTagNode);

        const newRange = document.createRange();
        newRange.setStart(normalTextNode, cursorOffset);
        newRange.setEnd(normalTextNode, cursorOffset);
        selection.removeAllRanges();
        selection.addRange(newRange);
      } else if (secondChar) {
        const normalTextNode = document.createTextNode(`${focusNode.textContent} `);

        // hashTag를 깨고 일반 TextNode로 치환
        focusNode.parentElement.parentNode.replaceChild(normalTextNode, focusNode.parentNode);

        const newRange = document.createRange();
        newRange.setStart(normalTextNode, cursorOffset);
        newRange.setEnd(normalTextNode, cursorOffset);
        selection.removeAllRanges();
        selection.addRange(newRange);
      }

      return;

      // 포커싱된 hashTag가 complete-hash이고 dataset의 name과 #를 제외한 textContent와 일치하지 않다면
      // 완성된 hashTag가 아니기 때문에 complete-hash 클래스 선택자 삭제
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

      range.setStart(focusNode, focusOffset);
      range.collapse(true);

      selection.removeAllRanges();
      selection.addRange(range);
    }

    // hashTag에 포커싱되 안되고 hashTag를 작성하려고 하지도 않았을때
    // hashId를 빈문자로 치환 (방어 코드)
    if (!isStartHash && !focusInHashTag) {
      this.hashId = '';
    }

    // hashTag에 포커싱이 되어 있지만 hashId가 부여되지 않았을때
    // hashId를 부여
    if (
      !isStartHash &&
      focusInHashTag &&
      !focusInCompleteHashTag &&
      !this.hashId &&
      focusNode.parentElement?.id
    ) {
      this.hashId = focusNode.parentElement.id;
    }

    // hashTag에 포커싱이 되어 있고 마지막 textContent가 공백일때
    // hashTag를 떠나도록 처리
    if (!isStartHash && focusInHashTag && this.hashId && !focusNode.textContent.slice(-1).trim()) {
      this.leaveHashTag();
    }

    // 현재 등록된 currentHashList 갯수와 입력된 hashTag 갯수가 맞지 않을 경우 currentHashList 업데이트
    if (this.currentHashList.length !== this.getAllHashTag().length) {
      this.updateCurrentHashList();
    }
  }

  /**
   * 에디터에서 undo나 redo를 하였을 경우 호출되는 함수
   */
  handleUndoRedo() {
    const range = document.createRange();

    // undo, redo 시 현재 커서가 hashTag에 포커싱이 되어 있다면
    if ((range.startContainer as HTMLElement).classList?.contains('hash')) {
      const hashTag = range.startContainer as HTMLElement;
      const hashId = hashTag.id;

      if (!this.hashId) {
        // hashTag의 `#`를 제외한 textContent를 onWriteHash 함수로 전달
        this.config.onWriteHash && this.config.onWriteHash(hashTag.innerText.replace('#', ''));

        // hashId를 주입하여 hashTag 리스트 UI 컴포넌트 노출
        this.hashId = hashId;
      }
    } else {
      this.hashId = '';
    }
  }

  /**
   * observig 패턴으로 특정 값이 변경되었을때 같이 실행할 함수를 전달
   * HashTag 플러그인에서는 targetHashId나 config가 변경될때마다 호출될 함수를 전달
   */
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
