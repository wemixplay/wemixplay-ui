'use client';

import React, {
  forwardRef,
  ReactElement,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react';
import style from './CommentEditor.module.scss';
import { makeCxFunc } from '@/utils/forReactUtils';
import CommentWriterInfo from './CommentWriterInfo';
import SolidCapButton from '../buttons/SolidCapButton';
import WpEditor, { WpEditorProps, WpEditorRef } from '../editor/WpEditor';
import Mention from '@/plugins/mention/Mention';
// import HashTag from '@/plugins/hashTag/HashTag';
import AutoUrlMatch from '@/plugins/autoUrlMatch/AutoUrlMatch';
import CountTextLength from '@/plugins/countTextLength/CountTextLength';
import PasteToPlainText from '@/plugins/pasteToPlainText/PasteToPlainText';
import {
  commaWithValue,
  convertHtmlToMarkdownStr,
  convertMarkdownToHtmlStr,
  removeSpaceAndLineBreak
} from '@/utils/valueParserUtils';

type Props = Omit<WpEditorProps, 'plugin' | 'initialValue'> & {
  className?: string;
  writerName?: string | ReactElement;
  writerImg?: string;
  btnSubmitText?: ReactElement | string;
  value?: string;
  handleSubmit?: (value: string) => void;
};

const cx = makeCxFunc(style);

const CommentEditor = forwardRef<WpEditorRef, Props>(
  (
    {
      className = '',
      writerName,
      writerImg,
      btnSubmitText = 'POST',
      value,
      config,
      minLength = 1,
      maxLength = 1000,
      placeholder,
      name,
      handleChange,
      handleSubmit,
      ...editorProps
    },
    ref
  ) => {
    const wpEditorRef = useRef<WpEditorRef>();

    const [text, setText] = useState(convertMarkdownToHtmlStr(value ?? ''));
    const [textLength, setTextLength] = useState(value?.length ?? 0);

    const onMatchUrl = useCallback(({ textUrls }: { textUrls: string[] }) => {
      return textUrls.map((url) => `<a href="${url}" target="_blank">${url}</a>`);
    }, []);

    const handleEditorTextChange = useCallback(
      (value: string, name?: string) => {
        const convertValue = convertHtmlToMarkdownStr(value);

        setText(convertValue);
        handleChange && handleChange(convertValue, name);
      },
      [name, handleChange]
    );

    const handleSubmitBtnClick = useCallback(() => {
      handleSubmit && handleSubmit(text);
    }, [text, handleSubmit]);

    useEffect(() => {
      if (value && !text) {
        const htmlStr = convertMarkdownToHtmlStr(value);

        setText(htmlStr);
      }
    }, [value, text]);

    useImperativeHandle(ref, () => {
      const { setData } = wpEditorRef.current;

      wpEditorRef.current.setData = (data: string, option?: { keepRange?: boolean }) => {
        const htmlStr = convertMarkdownToHtmlStr(data);
        setData(htmlStr, option);
      };

      return wpEditorRef.current;
    });

    return (
      <div className={cx(className, 'comment-editor')}>
        <CommentWriterInfo
          className={cx('editor-profile')}
          writerName={writerName}
          writerImg={writerImg}
        />
        <div className={cx('editor-area')}>
          <WpEditor
            className={cx('editor', { filled: text.length })}
            plugin={[Mention, AutoUrlMatch, PasteToPlainText, CountTextLength]}
            config={{
              ...config,
              autoUrlMatch: {
                onMatchUrl: (urls) => {
                  return onMatchUrl({ textUrls: urls });
                }
              },
              countTextLength: {
                hideUi: true,
                onChangeTextLength: setTextLength
              }
            }}
            name={name}
            initialValue={text}
            placeholder={placeholder}
            maxLength={maxLength}
            handleChange={handleEditorTextChange}
            {...editorProps}
            ref={wpEditorRef}
          />
        </div>

        <div className={cx('editor-tool')}>
          <em className={cx('counter-current')}>{commaWithValue(textLength)}</em>/
          <span className={cx('counter-max')}>{commaWithValue(maxLength)}</span>
          <SolidCapButton
            size="medium"
            className={cx('btn-post')}
            disabled={minLength > textLength || !removeSpaceAndLineBreak(text)}
            onClick={handleSubmitBtnClick}
          >
            {btnSubmitText}
          </SolidCapButton>
        </div>
      </div>
    );
  }
);

CommentEditor.displayName = 'CommentEditor';

export type { Props as CommentEditorProps };
export default CommentEditor;
