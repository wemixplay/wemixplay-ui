import React, { ReactElement } from 'react';
import { WpEditorProps, WpEditorRef } from '../editor/WpEditor';
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
};
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
 */
declare const CommentEditor: React.ForwardRefExoticComponent<Omit<WpEditorProps, "plugin" | "initialValue"> & {
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
} & React.RefAttributes<WpEditorRef>>;
export type { Props as CommentEditorProps };
export default CommentEditor;
