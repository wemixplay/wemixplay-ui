import React, { ChangeEvent, ClipboardEvent, FocusEvent, KeyboardEvent, MouseEvent, MutableRefObject, TextareaHTMLAttributes } from 'react';
import { MentionConfig } from '../../plugins/mention/Mention';
import { HashTagConfig } from '../../plugins/hashTag/HashTag';
import { AutoUrlMatchConfig } from '../../plugins/autoUrlMatch/AutoUrlMatch';
import { PasteToPlainTextConfig } from '../../plugins/pasteToPlainText/PasteToPlainText';
import { CountTextLengthConfig } from '../../plugins/countTextLength/CountTextLength';
export interface WpEditorPlugin<C extends any = any> {
    commandKey: string;
    contentEditableEl: MutableRefObject<HTMLDivElement>;
    config: C;
    setConfig: (config?: C | undefined) => void;
    component?: <P extends {
        plugin: any;
    }>(props: P) => React.JSX.Element;
    handleClick?: (params: {
        event: MouseEvent<HTMLDivElement>;
    }) => void;
    handleKeyDown?: (params: {
        event: KeyboardEvent<HTMLDivElement>;
    }) => void;
    handleChange?: (params: {
        event: ChangeEvent<HTMLDivElement>;
    }) => void;
    handlePaste?: (params: {
        event: ClipboardEvent<HTMLDivElement>;
    }) => void;
    handleCopy?: (params: {
        event: ClipboardEvent<HTMLDivElement>;
    }) => void;
    handleFocus?: (params: {
        event: FocusEvent<HTMLDivElement>;
    }) => void;
    handleBlur?: (params: {
        event: FocusEvent<HTMLDivElement>;
    }) => void;
    handleUndoRedo?: (params: {
        type: 'historyUndo' | 'historyRedo';
    }) => void;
}
export interface WpEditorPluginConstructor {
    new ({ contentEditableEl }: {
        contentEditableEl: MutableRefObject<HTMLDivElement>;
    }): WpEditorPlugin;
}
type WpEditorRef = HTMLDivElement & {
    setData: (data: string, option?: {
        keepRange?: boolean;
    }) => void;
};
type Props = Omit<TextareaHTMLAttributes<HTMLDivElement>, 'aria-placeholder' | 'value'> & {
    /** 추가적인 CSS 클래스명 */
    className?: string;
    /** 에디터의 이름 (필드 이름으로 사용됨) */
    name?: string;
    /** 초기 값 */
    initialValue?: string;
    /** 에디터에 표시될 플레이스홀더 텍스트 */
    placeholder?: string;
    /** 최대 입력 가능한 텍스트 길이 */
    maxLength?: number;
    /** 플러그인 클래스를 배열로 전달하여 기능 확장 */
    plugin?: WpEditorPluginConstructor[];
    /** 각 플러그인에 대한 설정 객체 */
    config?: {
        mention?: MentionConfig;
        hash?: HashTagConfig;
        autoUrlMatch?: AutoUrlMatchConfig;
        pasteToPlainText?: PasteToPlainTextConfig;
        countTextLength?: CountTextLengthConfig;
    };
    /** 텍스트가 변경될 때 호출되는 함수 */
    handleChange?: (value: string, name?: string) => void;
};
/**
 * `WpEditor`는 텍스트 및 리치 텍스트를 입력할 수 있는 에디터 컴포넌트입니다.
 * 플러그인 시스템을 지원하여 Mention, HashTag, URL 자동 매칭 등의 다양한 기능을 확장할 수 있습니다.
 *
 * @component
 * @example
 * <WpEditor
 *   name="editor"
 *   initialValue="<p>Hello World!</p>"
 *   placeholder="Type something..."
 *   maxLength={500}
 *   plugin={[Mention, HashTag, AutoUrlMatch]}
 *   handleChange={(value) => console.log(value)}
 * />
 *
 * @param {string} [className] - 추가적인 CSS 클래스명
 * @param {string} [name] - 에디터의 이름 (필드 이름으로 사용됨)
 * @param {string} [initialValue] - 초기 값 (HTML 형태)
 * @param {string} [placeholder] - 에디터에 표시될 플레이스홀더 텍스트
 * @param {number} [maxLength] - 최대 입력 가능한 텍스트 길이
 * @param {WpEditorPluginConstructor[]} [plugin] - 플러그인 클래스를 배열로 전달하여 기능 확장
 * @param {object} [config] - 각 플러그인에 대한 설정 객체 (MentionConfig, HashTagConfig 등)
 * @param {function} [handleChange] - 텍스트가 변경될 때 호출되는 함수, 변경된 텍스트와 에디터 이름을 인자로 받음
 */
declare const WpEditor: React.ForwardRefExoticComponent<Omit<React.TextareaHTMLAttributes<HTMLDivElement>, "aria-placeholder" | "value"> & {
    /** 추가적인 CSS 클래스명 */
    className?: string;
    /** 에디터의 이름 (필드 이름으로 사용됨) */
    name?: string;
    /** 초기 값 */
    initialValue?: string;
    /** 에디터에 표시될 플레이스홀더 텍스트 */
    placeholder?: string;
    /** 최대 입력 가능한 텍스트 길이 */
    maxLength?: number;
    /** 플러그인 클래스를 배열로 전달하여 기능 확장 */
    plugin?: WpEditorPluginConstructor[];
    /** 각 플러그인에 대한 설정 객체 */
    config?: {
        mention?: MentionConfig;
        hash?: HashTagConfig;
        autoUrlMatch?: AutoUrlMatchConfig;
        pasteToPlainText?: PasteToPlainTextConfig;
        countTextLength?: CountTextLengthConfig;
    };
    /** 텍스트가 변경될 때 호출되는 함수 */
    handleChange?: (value: string, name?: string) => void;
} & React.RefAttributes<WpEditorRef>>;
export type { Props as WpEditorProps, WpEditorRef };
export default WpEditor;
