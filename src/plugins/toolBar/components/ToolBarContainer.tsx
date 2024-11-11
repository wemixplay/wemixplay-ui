import { SvgIcoBold } from '@/assets/svgs';
import { makeCxFunc } from '@/utils/forReactUtils';
import React, { useState } from 'react';
import { useRef } from 'react';
import { ToolbarEvent, ToolbarType } from '../ToolBar';
import style from './ToolBarContainer.module.scss';

const cx = makeCxFunc(style);

type ToolBarProps = {
  onClickToolbarBtn: ({ eventType, value }: ToolbarEvent) => void;
};

const ToolBarContainer = ({ onClickToolbarBtn }: ToolBarProps) => {
  const toolbarRef = useRef(null);
  const [isBold, setIsBold] = useState(false);

  return (
    <div className={cx('toolbar-container')} ref={toolbarRef}>
      <button
        onClick={() => {
          onClickToolbarBtn({ eventType: 'b', value: !isBold });
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

export default ToolBarContainer;
