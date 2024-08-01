'use client';

import React, { ReactElement, useCallback, useState } from 'react';
import style from './CommentEditor.module.scss';
import { makeCxFunc } from '@/utils/forReactUtils';
import CommentWriterInfo from './CommentWriterInfo';
import SolidCapButton from '../buttons/SolidCapButton';
import WpEditor, { WpEditorProps } from '../editor/WpEditor';
import Mention from '@/plugins/mention/Mention';
import HashTag from '@/plugins/hashTag/HashTag';
import AutoUrlMatch from '@/plugins/autoUrlMatch/AutoUrlMatch';
import CountTextLength from '@/plugins/countTextLength/CountTextLength';
import PasteToPlainText from '@/plugins/pasteToPlainText/PasteToPlainText';
import { commaWithValue } from '@/utils/valueParserUtils';

type Props = Omit<WpEditorProps, 'plugin' | 'initialValue' | 'handleChange'> & {
  className?: string;
  writerName?: string;
  writerImg?: string;
  btnSubmitText?: ReactElement | string;
  value?: string;
};

const cx = makeCxFunc(style);

const CommentEditor = ({
  className = '',
  writerName,
  writerImg,
  btnSubmitText = 'POST',
  value,
  config,
  minLength = 1,
  maxLength = 1000,
  placeholder,
  ...editorProps
}: Props) => {
  const [textLength, setTextLength] = useState(value?.length ?? 0);

  const onMatchUrl = useCallback(({ textUrls }: { textUrls: string[] }) => {
    return textUrls.map((url) => `<a href="${url}" target="_blank">${url}</a>`);
  }, []);

  return (
    <div className={cx(className, 'comment-editor')}>
      <CommentWriterInfo
        className={cx('editor-profile')}
        writerName={writerName}
        writerImg={writerImg}
      />
      <div className={cx('editor-area')}>
        <WpEditor
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
          initialValue={value}
          placeholder={placeholder}
          {...editorProps}
        />
      </div>

      <div className={cx('editor-tool')}>
        <em className={cx('counter-current')}>{commaWithValue(textLength)}</em>/
        <span className={cx('counter-max')}>{commaWithValue(maxLength)}</span>
        <SolidCapButton size={'small'} className={cx('btn-post')} disabled={minLength > textLength}>
          {btnSubmitText}
        </SolidCapButton>
      </div>
    </div>
  );
};

export default CommentEditor;
