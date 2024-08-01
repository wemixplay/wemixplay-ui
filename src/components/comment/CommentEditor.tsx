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
import HashTag from '@/plugins/hashTag/HashTag';
import AutoUrlMatch from '@/plugins/autoUrlMatch/AutoUrlMatch';
import CountTextLength from '@/plugins/countTextLength/CountTextLength';
import PasteToPlainText from '@/plugins/pasteToPlainText/PasteToPlainText';
import {
  commaWithValue,
  convertHtmlToMarkdownStr,
  convertMarkdownToHtmlStr
} from '@/utils/valueParserUtils';

type Props = Omit<WpEditorProps, 'plugin' | 'initialValue'> & {
  className?: string;
  writerName?: string;
  writerImg?: string;
  btnSubmitText?: ReactElement | string;
  value?: string;
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

    useEffect(() => {
      if (value && !text) {
        const htmlStr = convertMarkdownToHtmlStr(value);

        setText(htmlStr);
      }
    }, [value, text]);

    useImperativeHandle(ref, () => {
      const { setData } = wpEditorRef.current;

      wpEditorRef.current.setData = (data: string) => {
        const htmlStr = convertMarkdownToHtmlStr(data);
        setData(htmlStr);
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
            ref={wpEditorRef}
            className={cx('editor')}
            plugin={[Mention, HashTag, AutoUrlMatch, PasteToPlainText, CountTextLength]}
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
          />
        </div>

        <div className={cx('editor-tool')}>
          <em className={cx('counter-current')}>{commaWithValue(textLength)}</em>/
          <span className={cx('counter-max')}>{commaWithValue(maxLength)}</span>
          <SolidCapButton
            size={'small'}
            className={cx('btn-post')}
            disabled={minLength > textLength}
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
