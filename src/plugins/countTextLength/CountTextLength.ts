import { WpEditorPlugin } from '@/components/editor/WpEditor';
import type { MutableRefObject, KeyboardEvent, ChangeEvent } from 'react';

type CountTextLengthConfig = {
  /** CountTextLength 플러그인에서 제공하는 자체 문자열 길이 표시 UI 숨김 처리의 여부  */
  hideUi?: boolean;
  /**
   * 문자열 길이가 바뀔때마다 트리거되는 함수
   * @param {number} length - 현재 문자열 길이
   */
  onChangeTextLength?: (length: number) => void;
};

class CountTextLength implements WpEditorPlugin<CountTextLengthConfig> {
  /** CountTextLength 플러그인의 고유 commandKey */
  public commandKey = 'countTextLength';
  /** CountTextLength 플러그인의 설정(옵션) 값 */
  public config: CountTextLengthConfig = {};
  /** contentEditable div Element를 가르키는 참조값 */
  public contentEditableEl: MutableRefObject<HTMLDivElement>;
  /** MutationObserver WebAPI를 이용하여 만든 observer 객체 */
  private mutationObserver: MutationObserver;

  constructor({ contentEditableEl }: { contentEditableEl: MutableRefObject<HTMLDivElement> }) {
    this.contentEditableEl = contentEditableEl;
  }

  /**
   * configId setter 함수를 이용하여 config 정보 업데이트하는 함수
   * CountTextLength에서는 문자열 길이 표시 UI에 대한 처음 세팅도 진행
   * MutationObserver를 이용하여 에디터 내용이 바뀔때마다 문자열 길이를 update
   *
   * @param {CountTextLengthConfig} config - 업데이트할 config 정보
   */
  setConfig(config: CountTextLengthConfig) {
    this.config = { ...this.config, ...(config ?? {}) };

    /** wpEditor의 contentEditable 요소 */
    const target = this.contentEditableEl.current;
    const parentEl = target?.parentElement;

    if (!this.config.hideUi && parentEl && !parentEl?.querySelector('.count-text-length-tool')) {
      const el = document.createElement('div');
      el.classList.add('count-text-length-tool');

      // count 업데이트를 위한 element 추가
      const countEl = document.createElement('span');
      countEl.id = 'count';
      countEl.innerHTML = '0';
      el.append(countEl);

      /** maxLength props 를 통해 입력받은 수치 (값이 부여되지 않은 경우에는 element 추가되지 않음) */
      const maxLength = (target as JSONObject).ariaValueMax;

      if (maxLength) {
        const maxLengthEl = document.createElement('span');
        maxLengthEl.className = 'maxLength';
        maxLengthEl.innerHTML = ` / ${maxLength}`;
        el.append(maxLengthEl);
      }

      parentEl.append(el);
    }

    if (typeof window !== 'undefined' && !this.mutationObserver) {
      // MutationObserver 초기화
      this.mutationObserver = new MutationObserver(() => {
        this.countText();
      });

      // contentEditableEl 관찰 시작
      this.mutationObserver.observe(this.contentEditableEl.current, {
        characterData: true,
        subtree: true,
        childList: true
      });
    }
  }

  /**
   * 에디터의 문자열 길이를 계산하는 함수
   */
  countText() {
    const contentEditorEl = this.contentEditableEl.current;

    /** 에디터 textContent 길이 */
    const textContentLength = contentEditorEl.textContent.length;

    if (!this.config.hideUi) {
      const countEl = document.getElementById('count');
      // textContent 길이 값 변경
      countEl.innerHTML = String(textContentLength);

      const maxLength = Number((contentEditorEl as JSONObject).ariaValueMax);

      if (maxLength) {
        // maxLength 값 초과 시 스타일 추가를 위한 클래스 부여
        if (textContentLength > maxLength) {
          countEl.classList.add('error');
        } else {
          countEl.classList.remove('error');
        }
      }
    }

    this.config.onChangeTextLength && this.config.onChangeTextLength(textContentLength);

    // 다른 함수 내에서 textContent 길이 값을 사용하기 위한 리턴
    return textContentLength;
  }

  /**
   * 에디터에서 keydown 이벤트가 발생하였을때 호출되는 함수
   * @param {KeyboardEvent<HTMLDivElement>} [params.event] - keydown 이벤트
   */
  handleKeyDown({ event }: { event: KeyboardEvent<HTMLDivElement> }) {
    const currLength = this.countText();
    const maxLength = Number((this.contentEditableEl.current as JSONObject).ariaValueMax);
    if (maxLength && currLength >= maxLength) {
      // maxLength 초과 시 전체선택, 복사, 잘라내기, 되돌리기, 다시실행, Backspace, delete, 방향키 가능. 이외 입력은 불가하도록 조건 추가.
      const allowKey = [8, 37, 38, 39, 40, 46]; // 8: Backspace, 37~40: 방향키,  46: delete
      const isSelectAll = event.code === 'KeyA' && event.metaKey;
      const isCopy = event.code === 'KeyC' && event.metaKey;
      const isCutSelection = event.code === 'KeyX' && event.metaKey;
      const isUndo = event.code === 'KeyZ' && event.metaKey;

      if (
        !allowKey.includes(event.keyCode) &&
        !isSelectAll &&
        !isCutSelection &&
        !isUndo &&
        !isCopy
      ) {
        event.preventDefault();
      }
    }
  }

  /**
   * 에디터에서 onChange 이벤트가 발생하였을때 호출되는 함수
   * @param {ChangeEvent<HTMLDivElement>} [params.event] - change 이벤트
   */
  handleChange({ event }: { event: ChangeEvent<HTMLDivElement> }) {
    const currLength = this.countText();
    const maxLength = Number(this.contentEditableEl.current.ariaValueMax);

    if (currLength > maxLength) {
      const selection = window.getSelection();
      const range = selection?.getRangeAt(0);

      if (range) {
        // 커서가 위치한 노드와 오프셋을 탐색
        const startContainer = range.startContainer;
        const startOffset = range.startOffset;

        /** 초과된 문자 수 */
        const excessLength = currLength - maxLength;

        // 커서 위치 앞의 텍스트 노드를 찾기
        if (startContainer.nodeType === Node.TEXT_NODE) {
          const textNode = startContainer as Text;

          if (startOffset > 0) {
            /** 초과된 문자열 수를 계산하여 다시 지정할 startOffset 값 */
            const newStartOffset = Math.max(startOffset - excessLength, 0);

            // 커서 위치에서 초과된 문자 수만큼 삭제
            textNode.nodeValue =
              textNode.nodeValue?.slice(0, newStartOffset) +
                textNode.nodeValue?.slice(startOffset) || '';

            const newRange = document.createRange();
            const newSelection = window.getSelection();

            newRange.setStart(textNode, newStartOffset);
            newRange.collapse(true);

            newSelection?.removeAllRanges();
            newSelection?.addRange(newRange);
          }
        }
      }

      event.preventDefault();
    }
  }
}

export type { CountTextLengthConfig };
export default CountTextLength;
