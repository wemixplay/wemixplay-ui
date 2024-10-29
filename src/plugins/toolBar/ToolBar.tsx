import { SvgIcoBold } from '@/assets/svgs';
import { makeCxFunc } from '@/utils/forReactUtils';
import React, { useCallback, useEffect, useState } from 'react';
import { useRef } from 'react';
import style from './ToolBar.module.scss';

const cx = makeCxFunc(style);

const ToolBar = () => {
  const toolbarRef = useRef(null);
  const [isBold, setIsBold] = useState(false);

  const toggleBoldSelection = () => {
    const selection = window.getSelection();
    console.log('selection', selection);
    if (selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const selectedContent = range.extractContents();
    console.log('selectedContent', selectedContent);

    // 선택된 텍스트의 부모 노드를 확인합니다.
    const parent = range.startContainer.parentNode;

    // 선택된 텍스트가 <b> 태그로 감싸져 있는지 확인합니다.
    if ('tagName' in parent && (parent.tagName as string).toLowerCase() === 'b') {
      console.log('!!!!');
      console.log('parent', parent);
      console.log('range', range);
      // font 태그의 내용을 가져옴
      const textContent = parent.textContent;
      console.log('textContent', textContent.toString());
      // font 태그를 제거하고 그 내용을 삽입
      const fragment = document.createDocumentFragment();
      const textNode = document.createTextNode(textContent);
      fragment.appendChild(textNode);
      parent.parentNode.replaceChild(fragment, parent);
      // 커서를 새로 생성된 텍스트 노드의 끝으로 이동
      range.setStart(textNode, textContent.length);
      range.setEnd(textNode, textContent.length);
      selection.removeAllRanges();
      selection.addRange(range);
    } else {
      // <b> 태그가 없으면 <b> 태그를 추가합니다.
      const boldElem = document.createElement('b');
      boldElem.appendChild(selectedContent);
      range.insertNode(boldElem);
    }

    // 선택 영역을 지웁니다.
    selection.removeAllRanges();
  };

  return (
    <div className={cx('toolbar')} ref={toolbarRef}>
      <button
        onClick={() => {
          toggleBoldSelection();
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
