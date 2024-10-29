import { SvgIcoBold } from '@/assets/svgs';
import { WpEditorRef } from '@/components/editor/WpEditor';
import { makeCxFunc } from '@/utils/forReactUtils';
import React, { useCallback, useEffect, useState } from 'react';
import { useRef } from 'react';
import style from './ToolBar.module.scss';

const cx = makeCxFunc(style);

type TagType = 'b' | 'i';

type Props = {
  editorRef: React.MutableRefObject<WpEditorRef>;
};

const ToolBar = ({ editorRef }: Props) => {
  const toolbarRef = useRef(null);
  const [isBold, setIsBold] = useState(false);

  //커서가 Editor 안에 있는지 확인 하는 함수
  const checkCursorInEditor = () => {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    if (selection.rangeCount > 0) {
      const commonAncestor = range.commonAncestorContainer;
      // commonAncestor가 divRef의 자식인지 확인
      if (editorRef.current && editorRef.current.contains(commonAncestor)) {
        return true;
      } else {
        const range = document.createRange();
        // divRef 요소의 콘텐츠로 범위를 설정하고 커서를 시작 위치로 이동
        range.selectNodeContents(editorRef.current);
        range.collapse(true); // true: 시작 부분, false: 끝 부분

        // 이전 선택 영역을 모두 제거하고 새 범위를 추가하여 커서를 이동
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
    return false; // 선택된 범위가 없는 경우
  };

  const toggleFormat = (toggleValue: boolean, tagType: TagType) => {
    //커서가 Editor 안에 있는지 체크 후, 없을 시 커서 이동
    checkCursorInEditor();

    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    /** 현재 커서가 포커싱된 Node */
    const focusNode = selection.focusNode;
    console.log('focusNode', focusNode);
    // startContainer와 endContainer의 부모 요소가 있는지 확인하고, 요소 노드인지 확인합니다.
    const startParent = range.startContainer.parentNode;
    const endParent = range.endContainer.parentNode;
    const isTagStart =
      startParent instanceof Element && startParent.tagName.toLowerCase() === tagType;
    const isTagEnd = endParent instanceof Element && endParent.tagName.toLowerCase() === tagType;
    const isCursorTagIn = isTagStart || isTagEnd;

    // 해당 tag 넣기
    if (toggleValue) {
      const tagElem = document.createElement(tagType);
      //선택된게 없고, b태그 안이 아니라면
      if (selection.isCollapsed) {
        // // 선택된 텍스트가 없는 경우: 커서 위치에 빈 해당 태그 삽입
        const parentNode = focusNode.parentNode;
        parentNode.insertBefore(tagElem, focusNode.nextSibling);
        // 커서를 <b> 태그 안으로 이동
        range.setStart(tagElem, 0);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
      } else {
        // 선택된 텍스트가 있을 경우: 텍스트를 해당 태그로 감싸기
        tagElem.appendChild(range.extractContents());
        range.insertNode(tagElem);
      }
      //해당 태그 삭제
    } else {
      // 선택된게 있을 때만
      if (selection.rangeCount > 0) {
        if (isCursorTagIn) {
          // <b> 태그가 감싸고 있을 경우 <b> 태그를 제거합니다.
          const tagParent = isTagStart ? startParent : endParent;
          const grandParent = tagParent.parentNode;
          while (tagParent.firstChild) {
            grandParent.insertBefore(tagParent.firstChild, tagParent);
          }
          grandParent.removeChild(tagParent);
        }
      }
    }

    // 선택 해제
    selection.removeAllRanges();
    selection.addRange(range);
  };

  return (
    <div className={cx('toolbar')} ref={toolbarRef}>
      <button
        onClick={() => {
          toggleFormat(!isBold, 'b');
          setIsBold(!isBold);
        }}
        className={cx(`toolbar-item`, 'bold', isBold ? 'active' : '')}
        aria-label="Format Bold"
      >
        <SvgIcoBold />
      </button>
      {/* <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
        }}
        className={'toolbar-item spaced ' + (isItalic ? 'active' : '')}
        aria-label="Format Italics"
      >
        <i className="format italic" />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
        }}
        className={'toolbar-item spaced ' + (isUnderline ? 'active' : '')}
        aria-label="Format Underline"
      >
        <i className="format underline" />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
        }}
        className={'toolbar-item spaced ' + (isStrikethrough ? 'active' : '')}
        aria-label="Format Strikethrough"
      >
        <i className="format strikethrough" />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left');
        }}
        className="toolbar-item spaced"
        aria-label="Left Align"
      >
        <i className="format left-align" />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center');
        }}
        className="toolbar-item spaced"
        aria-label="Center Align"
      >
        <i className="format center-align" />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right');
        }}
        className="toolbar-item spaced"
        aria-label="Right Align"
      >
        <i className="format right-align" />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify');
        }}
        className="toolbar-item"
        aria-label="Justify Align"
      >
        <i className="format justify-align" />
      </button> */}
    </div>
  );
};

export default ToolBar;
