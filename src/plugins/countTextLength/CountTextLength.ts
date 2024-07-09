import { WpEditorPlugin } from '@/index';
import type { MutableRefObject } from 'react';

type CountTextLengthConfig = {
  hideUi?: boolean;
  onChangeTextLength?: (length: number) => void;
};

class CountTextLength implements WpEditorPlugin<CountTextLengthConfig> {
  public commandKey = 'countTextLength';
  public config: CountTextLengthConfig = {};
  public contentEditableEl: MutableRefObject<HTMLDivElement>;

  constructor({ contentEditableEl }: { contentEditableEl: MutableRefObject<HTMLDivElement> }) {
    this.contentEditableEl = contentEditableEl;
  }

  setConfig(config) {
    this.config = { ...this.config, ...(config ?? {}) };

    const target = this.contentEditableEl.current;
    const parentEl = target?.parentElement;

    if (!this.config.hideUi && parentEl && !parentEl?.querySelector('.characters')) {
      const el = document.createElement('div');
      el.classList.add('characters');

      // count 업데이트를 위한 element 추가
      const countEl = document.createElement('span');
      countEl.id = 'count';
      countEl.innerHTML = '0';
      el.append(countEl);

      // maxLength props 를 통해 입력받은 수치를 aria-valuemax 에 할당 (값이 부여되지 않은 경우에는 element 추가되지 않음)
      const maxLength = target.ariaValueMax;
      if (maxLength) {
        const maxLengthEl = document.createElement('span');
        maxLengthEl.className = 'maxLength';
        maxLengthEl.innerHTML = ` / ${maxLength}`;
        el.append(maxLengthEl);
      }

      parentEl.append(el);
    }
  }

  countText() {
    const contentEditorEl = this.contentEditableEl.current;

    // 에디터 textContent 길이
    const textContentLength = contentEditorEl.textContent.length;

    if (!this.config.hideUi) {
      // textContent 길이 값 변경
      const countEl = document.getElementById('count');
      countEl.innerHTML = String(textContentLength);

      // maxLength 값 초과 시 스타일 추가를 위한 클래스 부여
      const maxLength = Number(this.contentEditableEl.current.ariaValueMax);
      if (maxLength) {
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

  handleUndoRedo() {
    this.countText();
  }
  handleChange() {
    this.countText();
  }
  handleKeyDown({ event }) {
    const currLength = this.countText();
    const maxLength = Number(this.contentEditableEl.current.ariaValueMax);
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
}

export type { CountTextLengthConfig };
export default CountTextLength;
