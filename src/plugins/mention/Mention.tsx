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
  /** mention 리스트 */
  list: MentionInfo[];
  /** 최대 mention 갯수 */
  maxMentionCnt?: number;
  /** 중복 멘션을 막을건지 여부 */
  detectDuplicate?: boolean;
  /** 멘션 item을 다르게 커스텀하고 싶을때 전달하는 JSX Element */
  listElement?: (item: MentionInfo) => React.JSX.Element;
  /**
   * 멘션 작성 중일때 트리거 되는 함수
   * @param {string} - 작성중인 mention 값 (@ 제외)
   */
  onWriteMention?: (text: string) => void;
  /**
   * 멘션 작성이 완료되거나 멘션 내용이 변경될때 트리거 되는 함수
   * @param {MentionInfo[]} [params.allMention] - 작성된 mention 전체 배열
   * @param {MentionInfo} [params.currentMention] - 현재 작성이 완료된 mention
   */
  onCompleteMention?: ({
    allMention,
    currentMention
  }: {
    allMention: MentionInfo[];
    currentMention?: MentionInfo;
  }) => void;
  /** metion 리스트가 열릴때 트리거 되는 함수 */
  onOpenMentionList?: () => void;
  /** metion 리스트가 닫힐때 트리거 되는 함수 */
  onCloseMentionList?: () => void;
  /** mention 갯수가 최대보다 크게 작성되려고 할때 트리거 되는 함수 (alert 등이 내용을 따로 처리 가능) */
  onMaxMentionList?: () => void | Promise<void>;
};

/**
 * Mention은 에디터에서 멘션 기능을 사용할 수 있도록 지원하는 플러그인 입니다.
 */
class Mention implements WpEditorPlugin {
  /** Mention 플러그인의 고유 commandKey */
  public readonly commandKey = 'mention';
  /** Mention 클래스 내부 mentionId */
  private _mentionId: string;
  /** observing 패턴을 위한 targetMentionId를 set해주는 외부 함수를 나타내는 함수 */
  private setTargetMentionId: (targetMentionId: string) => void;
  /** contentEditable div Element를 가르키는 참조값 */
  public contentEditableEl: MutableRefObject<HTMLDivElement>;
  /** mentionList UI 컴포넌트를 가르키는 참조값 */
  private mentionListRef: MentionListRef;
  /** 현재 입력된 mentionList를 저장하는 변수 */
  private currentMentionList: MentionInfo[] = [];
  /** Mention 플러그인의 설정(옵션) 값 */
  private _config: MentionConfig = {
    list: [],
    onWriteMention: (text) => {}
  };
  /** observing 패턴을 위한 config를 set 해주는 외부 함수를 나타내는 함수 */
  private setNewConfig: (newConfig: MentionConfig) => void;

  constructor({ contentEditableEl }: { contentEditableEl: MutableRefObject<HTMLDivElement> }) {
    this.contentEditableEl = contentEditableEl;
  }

  /**
   * 내부 인스턴스 값인 _mentionId를 set하고 mentionId를 변경할때 그에 띠른 함수들을 호출해주는 setter 함수
   */
  set mentionId(id: string) {
    this._mentionId = id;
    this.setTargetMentionId && this.setTargetMentionId(this._mentionId);

    if (!id) {
      this.config.onCloseMentionList && this.config.onCloseMentionList();
    } else {
      this.config.onOpenMentionList && this.config.onOpenMentionList();
    }
  }

  /**
   * 내부 인스턴스 값인 _mentionId를 반환하는 getter 함수
   */
  get mentionId() {
    return this._mentionId;
  }

  /**
   * 내부 인스턴스 값인 _config를 set하고 config가 변경될때 setNewConfig 함수를 호출하는 setter 함수
   */
  set config(newConfig: MentionConfig) {
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
   * @param {MentionConfig} config - 업데이트할 config 정보
   */
  setConfig(config?: MentionConfig) {
    this.config = { ...this.config, ...(config ?? {}) };
  }

  /**
   * Mention 플러그인과 관련하여 랜더링할 컴포넌트가 있을 시 작성하는데 mention은 mention 리스트를 mapping하는 컴포넌트를 랜더링
   * @param {Mention} [params.plugin] - Mention 클래스로 만들어진 객체
   */
  component({ plugin }: { plugin: Mention }) {
    return (
      <MentionContainer mention={plugin}>
        {({ config, targetMentionId }) => (
          <MentionList
            ref={(ref) => {
              plugin.mentionListRef = ref;
            }}
            targetMentionId={targetMentionId}
            contentEditableEl={plugin.contentEditableEl}
            list={
              // detectDuplicate가 true라면 현재 mention이 되어있지 않은 리스트 요소만 filter 진행
              config.detectDuplicate
                ? config.list.filter((item) =>
                    this.currentMentionList.every((mention) => mention.name !== item.name)
                  )
                : config.list
            }
            listElement={config.listElement}
            selectMentionItem={(index) => {
              plugin.selectMentionItem(index);
            }}
            closeMentionList={() => {
              this.mentionId = '';
            }}
          />
        )}
      </MentionContainer>
    );
  }

  /**
   * mention의 유효성 검사를 하는 함수
   * @param {string} str - mention 태그안에 들어가는 텍스트
   */
  checkValidMention(str: string) {
    // 정규식: mention이 '@'로 시작하고, 그 뒤에 국가 문자, 숫자, 밑줄이 올 수 있도록 허용
    const regex = /^@[\p{L}\p{N}_]*$/u;

    // mention이 '@'만 있어도 true를 반환
    return str === '@' || regex.test(str);
  }

  /** 현재 완성된 mention 리스트를 모두 탐색하여 onCompleteMention 함수를 호출하고 모든 mention 정보를 배열로 반환하는 함수 */
  getCurrentMentionList() {
    const allMentionEls = this.contentEditableEl.current.querySelectorAll(
      '.mention.complete-mention'
    );

    const allMention = Array.from(allMentionEls).map((mentionEl) => {
      return {
        ...Object.fromEntries(Object.entries((mentionEl as HTMLSpanElement).dataset)),
        name: mentionEl.textContent.replace('@', '').trim()
      };
    }) as MentionInfo[];

    this.currentMentionList = allMention;

    this.config.onCompleteMention && this.config.onCompleteMention({ allMention });

    return allMention;
  }

  /**
   * mention 작성이 끝나고 나서 그 후에 mention 정보를 상황에 맞게 파싱 후 커서의 위치를 조정하는 함수
   * @param {MentionInfo} [params.mention] - mention 정보가 명확히 있을때(complete) 전달된 mention 정보
   * @param {boolean} [params.keepTag] - mention 태그를 상황에 따라 변환하지 않고 현재 태그 상태로 유지하고 싶을때 true로 전달
   */
  leaveMentionTag({ mention, keepTag }: { mention?: MentionInfo; keepTag?: boolean } = {}) {
    const selection = window.getSelection();
    const range = document.createRange();

    /** wpEditor의 contentEditable 요소 */
    const target = this.contentEditableEl.current;
    /** mention 태그의 고유 id */
    const targetMentionId = this.mentionId;

    /** 현재 작성중인 mention의 element */
    const mentionTag = target.querySelector(`#${targetMentionId}`);

    if (!mentionTag) {
      return;
    }

    /** mention 태그안에 `@`만 존재하는지 확인 */
    const existOnlyAtMark = mentionTag?.textContent?.trim() === '@' && !mention;

    /** mention 정보가 작성중인 mention인지 여부 */
    const isWillMention = !!mentionTag?.classList.contains('will-mention');

    /** unkown-mention이나 will-mention을 찾는 정규식 */
    const mentionRegex = new RegExp(
      `<span\\s+id="${targetMentionId}"([^>]*)class="mention ${isWillMention ? 'will-mention' : 'unknown-mention'}"([^>]*)>(.*?)<\\/span>`,
      'g'
    );

    if (existOnlyAtMark) {
      /** `@`만 있을 경우 그냥 순수 text의 `@`를 입력하기를 원하는 것으로 판단하여 text만 추출 */
      const atMarkText = document.createTextNode(mentionTag.firstChild?.textContent);

      mentionTag.replaceWith(atMarkText);

      const newRange = document.createRange();

      newRange.setStartAfter(atMarkText);
      newRange.setEndAfter(atMarkText);

      selection.removeAllRanges();
      selection.addRange(newRange);

      this.mentionId = '';

      return;

      // mention 정보가 존재하면 will-mention이나 unkown-mention을 complete-mention으로 치환
    } else if (mention) {
      target.innerHTML = target.innerHTML.replace(
        mentionRegex,
        `<span id="${targetMentionId}" class="mention complete-mention"$1$2>@${mention.name.trim()}</span>`
      );

      /** 새로 생성된 `complete-mention` Element */
      const newMentionTag = target.querySelector(`#${targetMentionId}`) as HTMLSpanElement;

      // mention에 대한 정보를 dataset에 표기
      newMentionTag.dataset.id = String(mention.id);
      newMentionTag.dataset.name = mention.name.trim();
      newMentionTag.textContent = `@${mention.name.trim()}`;

      // mention 태그를 유지하지 않고자 하는 경우
    } else if (!keepTag) {
      const mentionText = selection.focusNode.textContent.trim();

      // unkown-mention으로 변경
      target.innerHTML = target.innerHTML.replace(
        mentionRegex,
        `<span id="${targetMentionId}" class="mention unknown-mention"$1$2>${mentionText}</span>`
      );
    }

    // mention 리스트 UI컴포넌트가 사라지도록 mentionId를 빈값으로 변경
    this.mentionId = '';

    const mentionTagNextSibling = target.querySelector(`#${targetMentionId}`)?.nextSibling;

    if (
      Node.TEXT_NODE !== mentionTagNextSibling?.TEXT_NODE ||
      mentionTagNextSibling?.nodeValue?.trim()
    ) {
      target.querySelector(`#${targetMentionId}`).insertAdjacentHTML('afterend', '&nbsp;'); // 공백 추가
    }

    const focusNode = existOnlyAtMark
      ? target
      : target.querySelector(`#${targetMentionId}`)?.nextSibling;

    if (existOnlyAtMark) {
      range.selectNodeContents(focusNode);
      range.collapse(false);
    } else {
      range.setStart(focusNode, 1);
      range.collapse(true);
    }

    selection.removeAllRanges();
    selection.addRange(range);

    // 에디터의 innerHTML을 임의로 변경하였기 때문에 input 이벤트를 dispatch
    this.contentEditableEl.current.dispatchEvent(new Event('input', { bubbles: true }));
  }

  /**
   * 에디터를 클릭 했을때 호출되는 함수로써 Mention 에서는 mention 태그를 클릭했을때의 이벤트를 컨트롤
   * @param {MouseEvent<HTMLDivElement>} [params.event] - click 이벤트
   */
  handleClick({ event }: { event: MouseEvent<HTMLDivElement> }) {
    const selection = window.getSelection();

    /** 현재 커서가 포커싱된 Node */
    const focusNode = selection.focusNode;
    /** 포커싱되 Node의 부모 element가 mention 클래스 선택자를 갖고 있는 mention 태그인지 확인 */
    const focusInMentionTag = !!focusNode?.parentElement?.classList?.contains?.('mention');

    /** 커서의 위치값을 알기 위한 값 */
    const collapseCheckRange = selection.getRangeAt(0);

    // 포커싱된 곳이 mention 태그 안이며 startOffset이 0보다 크고 collapse가 되어있는지 확인된 경우
    if (
      focusInMentionTag &&
      collapseCheckRange.startOffset > 0 &&
      collapseCheckRange.startOffset === collapseCheckRange.endOffset
    ) {
      // mention 태그의 `@`를 제외한 textContent를 onWriteMention 함수로 전달
      this.config.onWriteMention &&
        this.config.onWriteMention(focusNode?.parentElement?.textContent?.replace('@', ''));

      // mention 리스트 UI 컴포넌트가 노출되도록 mention 태그의 id값을 mentionId로 주입
      this.mentionId = focusNode.parentElement.id;
    }
  }

  /**
   * mention 리스트에서 mention을 선택하였을 때 호출되는 함수
   * @param index - mentoin 리스트 중 선택된 요소의 index
   */
  async selectMentionItem(index?: number) {
    /** mention 리스트 UI 컴포넌트에 노출되는 mention 리스트 중 index에 해당하는 mention 정보 */
    const mention = this.mentionListRef.handleSubmit(index);
    /** 에디터에 설정된 최대 길이 값 */
    const maxLength = Number(this.contentEditableEl.current.ariaValueMax);

    // 현재 에디터에 작성된 문자열 길이 + 작성될 mention을 합한 길이가 에디터에 설정된 최대 길이 값보다 큰 경우
    // mention 리스트 UI 컴포넌트를 닫고 어떠한 후작업을 하지 않고 그냥 종료
    if (
      maxLength <=
      (mention?.name ?? '').length + this.contentEditableEl.current.textContent.length
    ) {
      this.mentionId = '';

      return;
    }

    /** 현재 입력된 complete-mention 들을 모두 선택한 배열값 */
    const allMentionEls = this.contentEditableEl.current.querySelectorAll(
      '.mention.complete-mention'
    );

    // 설정된 mention 최대 수보다 현재 complete-mention의 길이가 클 경우
    // mention 리스트 UI 컴포넌트를 닫고 onMaxMentionList 함수를 호출
    // onMaxMentionList가 없다면 기본 alert 노출
    if (this.config.maxMentionCnt && this.config.maxMentionCnt <= allMentionEls.length) {
      this.mentionId = '';
      // alert나 모달이 뜰 경우를 대비하여 에디터 포커스 해제
      this.contentEditableEl.current.blur();

      if (this.config.onMaxMentionList) {
        await this.config.onMaxMentionList();
      } else {
        alert(`최대 ${this.config.maxMentionCnt}개 까지 작성이 가능합니다.`);
      }

      return;
    }

    // 선택된 mention 정보를 leaveMentionTag 함수로 전달하고 mention 처리 마무리
    this.leaveMentionTag({ mention });

    // complete-mention 태그 배열을 가지고 mention 정보를 갖는 mention 정보 배열로 가공
    const allMention = Array.from(allMentionEls).map((mentionEl) => {
      return {
        ...Object.fromEntries(Object.entries((mentionEl as HTMLSpanElement).dataset)),
        name: mentionEl.textContent.replace('@', '').trim()
      };
    }) as MentionInfo[];

    // 현재 선택된 mention 배열 정보를 업데이트
    this.currentMentionList = [...allMention, mention];

    this.config.onCompleteMention &&
      this.config.onCompleteMention({
        allMention: this.currentMentionList,
        currentMention: mention
      });
  }

  /**
   * 에디터에서 keydown 이벤트가 발생하였을때 호출되는 함수
   * @param {KeyboardEvent<HTMLDivElement>} [params.event] - keydown 이벤트
   */
  handleKeyDown({ event }: { event: KeyboardEvent<HTMLDivElement> }) {
    const selection = window.getSelection();
    const range = document.createRange();

    /** 현재 선택된 mentionId를 나타내며 mention 리스트 UI 컴포넌트가 열렸는지도 나타내는 변수이기도 함 */
    const targetMentionId = this.mentionId;

    /** 현재 커서가 포커싱된 Node */
    const focusNode = selection.focusNode;
    /** 현재 커서가 포커싱된 Node에서의 offset 값 */
    const focusOffset = selection.focusOffset;
    /** mention 태그 안에 포커싱 되었는지 확인 */
    const focusInMentionTag = !!focusNode?.parentElement?.classList?.contains?.('mention');
    /** unkown-mention, will-mention에 포커싱이 되어있는지 확인  */
    const focusInDecompleteMentionTag =
      !!focusNode?.parentElement?.classList?.contains?.('will-mention') ||
      !!focusNode?.parentElement?.classList?.contains?.('unknown-mention');

    // left, right 방향키를 눌렀을 때
    if (event.code === 'ArrowLeft' || event.code === 'ArrowRight') {
      // mention 리스트 UI 컴포넌트가 안열려있고 focusOffset이 1보다 크며 포커싱 된 태그가 mention 이라면
      if (!targetMentionId && focusOffset > 1 && focusInMentionTag) {
        // mention 태그의 `@`를 제외한 textContent를 onWriteMention 함수로 전달
        this.config.onWriteMention &&
          this.config.onWriteMention(focusNode?.parentElement?.textContent?.replace('@', ''));

        // mentionId를 주입하여 mention 리스트 UI 컴포넌트 노출
        this.mentionId = focusNode.parentElement.id;

        // mention 태그에 포커싱되어 있고, mentionId가 존재하며 focusOffset이 1 이하일 때 mentionId를 초기화
      } else if (focusInMentionTag && targetMentionId && focusOffset <= 1) {
        this.mentionId = '';

        // mentionId가 존재하고 현재 포커싱된 노드의 첫 번째 텍스트가 '@'일 때 mention 태그를 떠남
      } else if (
        focusInMentionTag &&
        targetMentionId &&
        focusNode.firstChild?.textContent === '@'
      ) {
        this.leaveMentionTag();

        // mentionId가 존재하고 포커싱된 노드가 mention 태그가 아니면 mentionId를 초기화
      } else if (targetMentionId && !focusInMentionTag) {
        this.mentionId = '';

        // mentionId가 존재하고 포커싱된 노드가 complete-mention 태그가 일때 focusOffset이 mention 텍스트 길이와 같을때 mentionId를 초기화
      } else if (
        targetMentionId &&
        focusInMentionTag &&
        !focusInDecompleteMentionTag &&
        focusOffset >= focusNode.textContent.length
      ) {
        this.mentionId = '';
      }
    }

    // 오른쪽 방향키를 눌렀을 때
    if (event.code === 'ArrowRight') {
      // mentionId가 존재하고 미완성된 mention 태그에 포커싱 되어 있으며, 다음 요소가 없고 event가 입력 중이 아닐 때
      if (
        targetMentionId &&
        focusInDecompleteMentionTag &&
        !focusNode.parentElement.nextElementSibling &&
        !event.nativeEvent.isComposing
      ) {
        event.preventDefault();

        this.leaveMentionTag(); // mention 태그를 떠남

        // mentionId가 존재하고 첫 번째 텍스트가 '@'일 때 mention 태그를 떠남
      } else if (targetMentionId && focusNode.firstChild?.textContent === '@') {
        this.leaveMentionTag();
      }

      // 위쪽 또는 아래쪽 방향키를 눌렀을 때
    } else if (event.code === 'ArrowUp' || event.code === 'ArrowDown') {
      if (targetMentionId) {
        event.preventDefault();

        // mention 리스트 UI 컴포넌트 내에서 방향키 이동 처리
        if (event.code === 'ArrowUp') {
          this.mentionListRef.handleArrowUp();
        } else {
          this.mentionListRef.handleArrowDown();
        }
      }
      // 엔터키를 눌렀을 때
    } else if (event.code === 'Enter') {
      if (targetMentionId && !event.nativeEvent.isComposing) {
        event.preventDefault();

        // mention 항목 선택 (index가 없으면 mention 리스트 UI 컴포넌트 내에서 선택된 mention 정보를 넘김)
        this.selectMentionItem();

        // mention 태그에 포커싱 되어 있고 focusOffset이 1 이하일 때
      } else if (focusInMentionTag && focusOffset <= 1) {
        event.preventDefault();

        // mention 태그 element 바로 이전 영역에 br 태그를 삽입 후 커서를 br 태그 뒤로 조정
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
    /** mention 태그 안에 포커싱 되었는지 확인 */
    const focusInMentionTag = !!focusNode?.parentElement?.classList?.contains?.('mention');
    /** complete-mention에 포커싱이 되어있는지 확인  */
    const focusInCompleteMentionTag =
      !!focusNode?.parentElement?.classList?.contains?.('complete-mention');

    /** 현재 입력된 complete-mention 들을 모두 선택한 배열값 */
    const allMentionEls = this.contentEditableEl.current.querySelectorAll(
      '.mention.complete-mention'
    );

    /** `@`만 입력하여 이제 막 mention 태그를 만들고자 하는 경우인지 확인 */
    const isStartMention =
      !prevCurrentInputChar?.trim() &&
      focusNode?.nodeType === Node.TEXT_NODE &&
      !focusInMentionTag &&
      currentInputChar === '@';

    // mentionId가 존재하고 mention 태그에 포커싱이 되어있다면 onWriteMention를 호출하여 현재 입력중인 mention text를 전달
    if (this.mentionId && focusInMentionTag) {
      this.config.onWriteMention &&
        this.config.onWriteMention(focusNode.parentElement.firstChild.textContent.replace('@', ''));
    }

    // 이제 막 mentoin 태그를 작성하려할 때
    // 설정된 mention 최대 수보다 현재 complete-mention의 길이가 클 경우
    // onMaxMentionList 함수를 호출
    // onMaxMentionList가 없다면 기본 alert 노출
    if (isStartMention && (allMentionEls ?? []).length >= this.config.maxMentionCnt) {
      if (this.config.onMaxMentionList) {
        this.config.onMaxMentionList();
      } else {
        alert(`최대 ${this.config.maxMentionCnt}개 까지 작성이 가능합니다.`);
      }

      // 이제 막 mentoin 태그를 작성하려할 때
    } else if (isStartMention) {
      const range = document.createRange();

      this.mentionId = `mention-${uniqueId()}`;

      // 방금 입력된 @ 문자 앞에 혹시나 다른 문자가 있을 경우를 대비하여 @를 기준으로 beforeText와 afterText로 나눔
      const textContent = focusNode.textContent;
      const beforeText = textContent.slice(0, focusOffset - 1);
      const afterText = textContent.slice(focusOffset);

      // mention 태그가 될 새로운 span 요소 생성
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

      range.setStart(target.querySelector(`#${this.mentionId}`), 1);
      range.collapse(true);

      selection.removeAllRanges();
      selection.addRange(range);

      // mention 태그에 포커싱이 되어있고 @바로 앞에 포커싱이 되어 있으며 현재 입력한 값이 공백 문자라면
      // mention 태그 @앞에 입력된 공백을 제거하고 mentoin 태그 바로 이전 요소에 공백 노드 추가
    } else if (focusInMentionTag && focusOffset === 1 && currentInputChar === ' ') {
      this.mentionId = '';

      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      const mentionNode = range.startContainer.parentNode;

      // 태그 내의 공백 제거
      mentionNode.textContent = mentionNode.textContent.trimStart();

      // 태그 이전에 공백 노드를 생성하여 삽입
      const spaceNode = document.createTextNode(' ');
      mentionNode.parentNode.insertBefore(spaceNode, mentionNode);

      // 커서를 새로 삽입된 공백 노드 앞으로 위치
      range.setStartBefore(spaceNode);
      range.setEndBefore(spaceNode);

      selection.removeAllRanges();
      selection.addRange(range);

      // mention 태그에 포커싱 되어있지만 mention 태그 text에 공백 문자가 포함되어 있을때
      // mention 태그를 깨고 split으로 분리한 두개의 text로 대체
    } else if (focusInMentionTag && focusNode.textContent.split(' ').length > 1) {
      this.mentionId = '';

      const range = document.createRange();

      const [tagText, normalText] = focusNode.textContent.split(' ');

      const spaceNode = document.createTextNode('\u00A0');
      const tagTextNode = document.createTextNode(`${tagText} `);
      const normalTextNode = document.createTextNode(normalText);

      // `@`가 붙어있지 않은 텍스트는 mention 태그 바로 뒤의 요소 이전에 삽입
      focusNode.parentNode.parentNode.insertBefore(
        normalTextNode,
        focusNode.parentNode.nextSibling
      );

      // 커서의 위치가 focusNode의 가장 뒤가 아닐때
      if (focusOffset !== focusNode.textContent.length) {
        // mention 태그를 깨고 일반 텍스트로 대체
        focusNode.parentElement.replaceWith(tagTextNode);

        range.setStartBefore(normalTextNode);
        range.setEndBefore(normalTextNode);

        // 커서의 위치가 focusNode의 가장 뒤일때
        // 이 경우는 가장 뒷자리에 공백문자를 넣었을 경우!!
      } else {
        // 공백문자를 없앤 문자를 다시 mention 태그 textContent로 치환
        focusNode.textContent = tagText;

        // mention 태그 바로 뒤에 공백문자 삽입
        focusNode.parentNode.parentNode.insertBefore(spaceNode, focusNode.parentNode.nextSibling);

        range.setStartAfter(normalTextNode);
        range.setEndAfter(normalTextNode);
      }

      selection.removeAllRanges();
      selection.addRange(range);

      return;

      // mention 태그에 포커싱이 되어있고 mention 태그 안에 글자가 mention 유효성에 어긋날때
    } else if (focusInMentionTag && !this.checkValidMention(focusNode.textContent)) {
      this.mentionId = '';
      const cursorOffset = selection.getRangeAt(0).startOffset;

      const normalTextNode = document.createTextNode(`${focusNode.textContent} `);

      // mention 태그를 깨고 일반 TextNode로 치환
      focusNode.parentElement.parentNode.replaceChild(normalTextNode, focusNode.parentNode);

      const newRange = document.createRange();
      newRange.setStart(normalTextNode, cursorOffset);
      newRange.setEnd(normalTextNode, cursorOffset);
      selection.removeAllRanges();
      selection.addRange(newRange);

      return;

      // 포커싱된 mention 태그가 complete-mention이고 dataset의 name과 @를 제외한 textContent와 일치하지 않다면
      // 완성된 mention이 아니기 때문에 다시 미완성 mention(will-mention)으로 변경
    } else if (
      focusInCompleteMentionTag &&
      focusNode.parentElement.dataset.name.trim() !==
        focusNode.parentElement.textContent.replace('@', '').trim()
    ) {
      const range = document.createRange();

      focusNode.parentElement.classList.replace('complete-mention', 'will-mention');

      // dataset의 모든 속성 삭제
      for (const key in focusNode.parentElement.dataset) {
        delete focusNode.parentElement.dataset[key];
      }

      this.mentionId = focusNode.parentElement.id;

      range.setStart(focusNode, focusOffset ?? 0);
      range.collapse(true);

      selection.removeAllRanges();
      selection.addRange(range);
    }

    // mention태그에 포커싱되 안되고 mention을 작성하려고 하지도 않았을때
    // mentionId를 빈문자로 치환 (방어 코드)
    if (!isStartMention && !focusInMentionTag) {
      this.mentionId = '';
    }

    // mention 태그에 포커싱이 되어 있지만 mentionId가 부여되지 않았을때
    // mentionId를 부여
    if (
      !isStartMention &&
      focusInMentionTag &&
      !focusInCompleteMentionTag &&
      !this.mentionId &&
      focusNode.parentElement?.id
    ) {
      this.mentionId = focusNode.parentElement.id;
    }

    // mention 태그에 포커싱이 되어 있고 마지막 textContent가 공백일때
    // mention 태그를 떠나도록 처리
    if (
      !isStartMention &&
      focusInMentionTag &&
      this.mentionId &&
      !focusNode.textContent.slice(-1).trim()
    ) {
      this.leaveMentionTag();
    }

    // 현재 등록된 currentMentionList 갯수와 입력된 mention 갯수가 맞지 않을 경우 currentMentionList 업데이트
    if (this.currentMentionList.length !== allMentionEls.length) {
      this.getCurrentMentionList();
    }

    return false;
  }

  /**
   * 에디터에서 undo나 redo를 하였을 경우 호출되는 함수
   */
  handleUndoRedo() {
    const range = document.createRange();

    // undo, redo 시 현재 커서가 mention 태그에 포커싱이 되어 있다면
    if ((range.startContainer as HTMLElement).classList?.contains('mention')) {
      const mentionTag = range.startContainer as HTMLElement;
      const mentionId = mentionTag.id;

      if (!this.mentionId) {
        // mention 태그의 `@`를 제외한 textContent를 onWriteMention 함수로 전달
        this.config.onWriteMention &&
          this.config.onWriteMention(mentionTag.innerText.replace('@', ''));

        // mentionId를 주입하여 mention 리스트 UI 컴포넌트 노출
        this.mentionId = mentionId;
      }
    } else {
      this.mentionId = '';
    }
  }

  /**
   * observig 패턴으로 특정 값이 변경되었을때 같이 실행할 함수를 전달
   * Mention 플러그인에서는 targetMentionId나 config가 변경될때마다 호출될 함수를 전달
   */
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
