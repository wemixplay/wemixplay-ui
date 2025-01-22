import React, { type InputHTMLAttributes, type ReactElement } from 'react';
interface PropsType extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    /** input의 type 속성 */
    type?: 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'url';
    /** input 태그가 갖는 value 값 */
    value?: string | number;
    /** 입력 필드에 에러 상태 표시 여부 */
    error?: boolean;
    /** 입력 칠드에 가이드 안내 상태 표시 여부 */
    info?: boolean;
    /**
     * 검색 아이콘으로 사용될 ReactElement (default: `<SvgIcoSearchDefault />`)
     *
     * `ex) searchIcon={<SvgIcoSearch2 />}`
     */
    searchIcon?: ReactElement;
    /**
     * input 박스 내부 value 앞에 노출할 ReactElement
     * type이 search일때는 나타나지 않음
     *
     * `ex) prefixIcon={<SvgIcoSearch2 />}`
     */
    prefixIcon?: ReactElement;
    /**
     * 리셋 아이콘으로 사용될 ReactElement  (default: `<SvgIcoClose />`)
     *
     * `ex) resetIcon={<SvgIcoClose2 />}`
     */
    resetIcon?: ReactElement;
    /** 입력 값 검증을 위한 정규 표현식 또는 함수 */
    validate?: RegExp | ((value: string) => string) | ((value: number) => number);
    /** 리셋 버튼 숨김 처리 여부 */
    hideBtnReset?: boolean;
    /** 값이 변경될 때 호출될 함수 */
    handleChange?: (value: JSONObject, name?: string) => void;
    /** 엔터 키가 눌렸을 때 호출될 함수 */
    handleEnter?: (value: JSONObject, name?: string) => void;
    /** 리셋 버튼이 클릭됐을 때 호출될 함수 */
    handleReset?: (value: JSONObject, name?: string, clickResetBtn?: boolean) => void;
}
/**
 * `TextInput` 컴포넌트는 다양한 유형의 입력 필드를 생성하기 위한 컴포넌트입니다.
 * 이 컴포넌트는 사용자 입력을 받고, 이를 검증하며, 입력 값이 변경될 때마다 지정된 함수를 호출할 수 있습니다.
 *
 * @param {Object} [props.ref] - input 태그의 Element를 가리킬 ref 값
 * @param {string} [props.className] - 입력 필드에 적용될 추가적인 CSS 클래스 이름
 * @param {'email'|'number'|'password'|'search'|'tel'|'text'|'url'} props.type - 입력 필드의 타입
 * @param {string|number} [props.value] - 입력 필드의 현재 값
 * @param {boolean} [props.error] - 입력 필드에 에러 상태 표시 여부
 * @param {boolean} [props.info] - 입력 칠드에 가이드 안내 상태 표시 여부
 * @param {boolean} [props.hideBtnReset] - 리셋 버튼 숨김 처리 여부
 * @param {ReactElement} [props.searchIcon=<SvgIcoSearchDefault />] - 검색 아이콘으로 사용될 ReactElement. 기본값은 `<SvgIcoSearchDefault />`
 * @param {ReactElement} [props.resetIcon=<SvgIcoInputReset/>] - 리셋 아이콘으로 사용될 ReactElement. 기본값은 `<SvgIcoInputReset/>`
 * @param {RegExp | ((value: string) => string) | ((value: number) => number)} [props.validate] - 입력 값 검증을 위한 정규 표현식 또는 함수
 * @param {(value: JSONObject, name?: string) => void} [props.handleChange] - 값이 변경될 때 호출될 함수
 * @param {(value: JSONObject, name?: string) => void} [props.handleEnter] - 엔터 키가 눌렸을 때 호출될 함수
 * @param {(value: JSONObject, name?: string, clickResetBtn?: boolean) => void} [props.handleReset] - 리셋 버튼이 클릭됐을 때 호출될 함수
 */
declare const TextInput: React.ForwardRefExoticComponent<PropsType & React.RefAttributes<HTMLInputElement>>;
export type { PropsType as TextInputProps };
export default TextInput;
