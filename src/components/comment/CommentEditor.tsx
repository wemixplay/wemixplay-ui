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
import { merge } from 'lodash';

type Props = Omit<WpEditorProps, 'plugin' | 'initialValue'> & {
  /** 추가적인 CSS 클래스명 */
  className?: string;
  /** 댓글 작성자의 이름 또는 React 요소 */
  writerName?: string | ReactElement;
  /** 댓글 작성자의 프로필 이미지 URL */
  writerImg?: string;
  /** 제출 버튼에 표시될 텍스트 또는 요소 */
  btnSubmitText?: ReactElement | string;
  /** 초기 댓글 내용 */
  value?: string;
  /** 제출 버튼 클릭 시 호출되는 함수, 작성된 텍스트 값을 인자로 받음 */
  handleSubmit?: (value: string) => void;
  /** 제출 버튼 비활성화 여부 */
  isSubmitDisabled?: boolean;
};

const cx = makeCxFunc(style);

/**
 * `CommentEditor`는 댓글 작성 및 수정 시 사용되는 에디터 컴포넌트입니다.
 * 작성자의 프로필 정보와 함께 텍스트 입력, 멘션, URL 자동 매칭, 글자 수 카운트 등의 기능을 지원합니다.
 *
 * @component
 * @example
 * <CommentEditor
 *   writerName="John Doe"
 *   writerImg="profile.jpg"
 *   value="This is a comment."
 *   handleSubmit={(value) => console.log(value)}
 * />
 *
 * @param {string} [className] - 추가적인 CSS 클래스명
 * @param {string|ReactElement} [writerName] - 댓글 작성자의 이름 또는 React 요소
 * @param {string} [writerImg] - 댓글 작성자의 프로필 이미지 URL
 * @param {ReactElement|string} [btnSubmitText="POST"] - 제출 버튼에 표시될 텍스트 또는 요소
 * @param {string} [value] - 초기 댓글 내용
 * @param {function} [handleSubmit] - 제출 버튼 클릭 시 호출되는 함수, 작성된 텍스트 값을 인자로 받음
 * @param {WpEditorProps['config']} [config] - 에디터에 대한 설정 객체
 * @param {number} [minLength=1] - 최소 입력 가능한 텍스트 길이
 * @param {number} [maxLength=1000] - 최대 입력 가능한 텍스트 길이
 * @param {string} [placeholder] - 에디터에 표시될 플레이스홀더 텍스트
 * @param {string} [name] - 에디터의 이름 (필드 이름으로 사용됨)
 * @param {function} [handleChange] - 텍스트가 변경될 때 호출되는 함수, 변경된 텍스트와 에디터 이름을 인자로 받음
 * @param {boolean} [isSubmitDisabled=false] - 제출 버튼 비활성화 여부
 */
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
      isSubmitDisabled = false,
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
            config={merge(
              {
                pasteToPlainText: {
                  onMatchUrlReplace: onMatchUrl
                },
                autoUrlMatch: {
                  onMatchUrl: (url) => {
                    return onMatchUrl({ textUrls: [url] });
                  }
                },
                countTextLength: {
                  hideUi: true,
                  onChangeTextLength: setTextLength
                }
              },
              config
            )}
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
            disabled={minLength > textLength || !removeSpaceAndLineBreak(text) || isSubmitDisabled}
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
