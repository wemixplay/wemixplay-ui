import { ChangeEvent, KeyboardEvent, MutableRefObject } from 'react';
import { WpEditorPlugin } from '@/components/editor/WpEditor';
import ToolBarContainer from './components/ToolBarContainer';
import React from 'react';

export type ToolbarType = 'b' | 'i' | 'u';

export type ToolbarEvent = {
  eventType: ToolbarType;
  value: boolean;
};

type ToolBarConfig = {
  //config
};

class ToolBar implements WpEditorPlugin {
  public commandKey = 'ToolBar';

  public config: ToolBarConfig = {};
  public contentEditableEl: MutableRefObject<HTMLDivElement>;
  private toolbarEvent: ToolbarEvent = { eventType: null, value: false };

  constructor({ contentEditableEl }: { contentEditableEl: MutableRefObject<HTMLDivElement> }) {
    this.contentEditableEl = contentEditableEl;
  }

  set toolBarEvent(ToolbarEvent: ToolbarEvent) {
    this.toolbarEvent = ToolbarEvent;
  }
  get toolBarEvent(): ToolbarEvent {
    return this.toolbarEvent;
  }

  /**
   * config 설정 업데이트하는 함수
   * @param {AutoUrlMatchConfig} config - 업데이트할 config 정보
   */
  setConfig(config: ToolBarConfig) {
    this.config = { ...this.config, ...(config ?? {}) };
  }

  /**
   * 에디터에서 onChange 이벤트가 발생하였을때 호출되는 함수
   * @param {ChangeEvent<HTMLDivElement>} [params.event] - change 이벤트
   */
  handleChange = ({ event }: { event: ChangeEvent<HTMLDivElement> }) => {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const focusNode = selection.focusNode;

    console.log('focusNode', focusNode);
    console.log('focusNode', focusNode.nodeType);
    console.log('focusNode.parentElement', focusNode.parentElement);
    const isOnEvent = !!this.toolbarEvent.eventType && !!this.toolbarEvent.value;
    // 커서가 텍스트 노드에 있을 때만 처리
    if (isOnEvent && focusNode && focusNode.nodeType === Node.TEXT_NODE) {
      const parentB = focusNode.parentElement.closest('b'); // 커서가 <b> 태그 안에 있는지 확인

      if (parentB) {
        // 커서가 이미 <b> 태그 안에 있는 경우, 아무 작업도 하지 않음
        console.log('커서가 이미 <b> 태그 안에 있습니다.');
        return;
      }

      // 커서가 <b> 태그 밖에 있으면, <b> 태그를 만들어 커서를 그 안으로 넣기
      const boldTag = document.createElement('b');
      boldTag.textContent = event.target.textContent;
      range.deleteContents(); // 선택된 내용을 삭제
      range.insertNode(boldTag); // <b> 태그 삽입

      // 새로 삽입한 <b> 태그 내부로 커서 이동
      const newRange = document.createRange();
      newRange.setStart(boldTag, 0); // <b> 태그 내부의 첫 번째 위치로 커서 설정
      newRange.collapse(true); // 커서 위치를 <b> 태그의 첫 번째 위치로 이동

      // Selection을 업데이트하여 커서 위치를 설정
      selection.removeAllRanges();
      selection.addRange(newRange);
    }
  };
  /**
   * 에디터에서 onChange 이벤트가 발생하였을때 호출되는 함수
   * @param {ChangeEvent<HTMLDivElement>} [params.event] - change 이벤트
   */
  handleClickToolbarBtn = ({ eventType, value }: ToolbarEvent) => {
    this.toolBarEvent = { eventType, value };
    //에디터 안으로 커서 이동
    const target = this.contentEditableEl.current;
    if (value && target) {
      target.focus();
    }
    const selection = window.getSelection();

    // 커서 또는 드래그 영역이 있는지 확인
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const focusNode = selection.focusNode;
    const parentElem = range.commonAncestorContainer.parentElement;

    // 선택된 텍스트가 이미 <b> 태그 안에 있는지 확인
    if (parentElem && parentElem.tagName.toLowerCase() === eventType) {
      // <b> 태그를 제거하고 안의 텍스트만 남김
      const textNode = document.createTextNode(parentElem.textContent);
      parentElem.replaceWith(textNode);

      // 커서를 새 텍스트 노드 끝에 배치
      const newRange = document.createRange();
      newRange.selectNodeContents(textNode);
      newRange.collapse(false);

      selection.removeAllRanges();
      selection.addRange(newRange);
    } else {
      //선택된 텍스트가 있을 때
      if (!range.collapsed) {
        // <b> 태그를 만들어 선택된 텍스트 감싸기
        const boldElem = document.createElement(eventType);
        range.surroundContents(boldElem);

        // <b> 태그 내부에 커서를 배치
        const newRange = document.createRange();
        newRange.selectNodeContents(boldElem);
        newRange.collapse(false);

        selection.removeAllRanges();
        selection.addRange(newRange);
      }
    }
  };

  component({ plugin }: { plugin: ToolBar }) {
    return <ToolBarContainer onClickToolbarBtn={plugin.handleClickToolbarBtn} />;
  }

  /**
   * observig 패턴으로 특정 값이 변경되었을때 같이 실행할 함수를 전달
   * Mention 플러그인에서는 targetMentionId나 config가 변경될때마다 호출될 함수를 전달
   */
  // observe({
  //   handleClickToolbarBtn
  // }: {
  //   handleClickToolbarBtn: ({ eventType, value }: ToolbarEventProps) => void;
  // }) {
  //   this.handleClickToolbarBtn = handleClickToolbarBtn;
  // }

  // const selection = window.getSelection();
  // const range = selection.getRangeAt(0);
  // /** 현재 커서가 포커싱된 Node */
  // const focusNode = selection.focusNode;
  // // startContainer와 endContainer의 부모 요소가 있는지 확인하고, 요소 노드인지 확인합니다.
  // const startParent = range.startContainer.parentNode;
  // const endParent = range.endContainer.parentNode;
  // const isTagStart =
  //   startParent instanceof Element && startParent.tagName.toLowerCase() === eventType;
  // const isTagEnd = endParent instanceof Element && endParent.tagName.toLowerCase() === eventType;
  // const isCursorTagIn = isTagStart || isTagEnd;

  // // 해당 tag 넣기
  // if (value) {
  //   //태그 생성
  //   const tagElem = document.createElement(eventType);
  //   tagElem.appendChild(document.createTextNode('')); // 빈 텍스트 노드 추가
  //   //드래그한 영역이 없을 경우
  //   if (selection.isCollapsed) {
  //     // <b> 태그 생성
  //     tagElem.appendChild(document.createTextNode('')); // 빈 텍스트 노드 추가
  //     // 현재 커서 위치에 <b> 태그 삽입
  //     range.insertNode(tagElem);
  //     // 커서를 삽입한 <b> 태그 내부로 이동
  //     range.setStart(tagElem, 0); // <b> 태그의 첫 번째 위치에 커서를 놓음
  //     range.collapse(true);
  //     selection.removeAllRanges();
  //     selection.addRange(range);
  //   } else {
  //     const range = selection.getRangeAt(0);
  //     const fragment = range.cloneContents();
  //     const hasTag = fragment.querySelector(eventType);
  //     //드래그 영역에 태그가 있는지 확인 후, tag 적용
  //     if (!hasTag) {
  //       tagElem.appendChild(range.extractContents());
  //       range.insertNode(tagElem);
  //     }
  //   }
  //   //해당 태그 삭제
  // } else {
  //   // 선택된게 있을 때만
  //   if (selection.rangeCount > 0) {
  //     if (isCursorTagIn) {
  //       // <b> 태그가 감싸고 있을 경우 <b> 태그를 제거합니다.
  //       const tagParent = isTagStart ? startParent : endParent;
  //       const grandParent = tagParent.parentNode;
  //       while (tagParent.firstChild) {
  //         grandParent.insertBefore(tagParent.firstChild, tagParent);
  //       }
  //       grandParent.removeChild(tagParent);
  //     }
  //   }
  // }

  // // 선택 해제
  // selection.removeAllRanges();
  // selection.addRange(range);
}

export type { ToolBarConfig };
export default ToolBar;
