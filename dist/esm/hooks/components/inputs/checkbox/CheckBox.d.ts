import React, { InputHTMLAttributes, ReactNode } from 'react';
interface Props extends Pick<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'onBlur' | 'onFocus'> {
    className?: string;
    name?: string;
    /** 체크박스 UI의 크기  */
    size?: 'normal' | 'small';
    /** 체크박스 UI 옆에 나올 텍스트 및 React 엘리먼트 */
    children?: ReactNode | string;
    /** input 태그가 갖는 value 값 */
    checkValue?: string | number | boolean | (string | number)[];
    /** 체크박스가 해제될 때 전달될 값
     *
     * (없다면 undefined로 전달이며 value 값이 배열이라면 무시)
     */
    unCheckValue?: string | number | boolean;
    /** 바인딩할 데이터 값
     *
     * (동일한 name값을 갖는 CheckBox가 여러개 있다면 무조건 `(string | number)[]`로 받아야함)
     */
    value?: string | number | boolean | (string | number)[];
    /** 체크박스가 비활성화 상태인지 여부 */
    disabled?: boolean;
    /** 체크박스가 읽기 전용 상태인지 여부 */
    readOnly?: boolean;
    /** 값이 변경될 때 호출될 함수
     *
     * (체크 상태에 따라 다른 값을 전달) */
    handleChange?: (value: JSONObject, name: string) => void;
}
/**
 * `CheckBox` 컴포넌트는 사용자로부터 체크박스 형태의 입력을 받기 위한 UI 컴포넌트입니다.
 * 이 컴포넌트는 다양한 props를 통해 커스터마이징할 수 있으며, 단일 체크박스 또는 체크박스 그룹으로 사용될 수 있습니다. <br/>
 * 파란색 점선 영역은 Interaction 범위입니다.
 *
 * @param {Object} [props.ref] - input 태그의 Element를 가리킬 ref 값
 * @param {string} [props.className] - 체크박스 컴포넌트의 스타일을 위한 클래스 이름
 * @param {string} [props.name] - input 태그의 name 속성
 * @param {ReactNode|string} [props.children] - 체크박스 UI 옆에 표시될 텍스트 또는 React 엘리먼트
 * @param {string|number|boolean} [props.checkValue] - input 태그가 갖는 value 값
 * @param {string|number|boolean} [props.unCheckValue] - 체크박스가 해제될 때 전달될 값 (없다면 undefined로 전달이며 value 값이 배열이라면 무시)
 * @param {string|number|boolean|(string|number)[]} [props.value] - 체크박스와 바인딩할 데이터 값 (동일한 name 값을 갖는 CheckBox가 여러 개일 경우 배열로 받아야 함)
 * @param {boolean} [props.disabled] - 체크박스가 비활성화 상태인지 여부
 * @param {boolean} [props.readOnly] - 체크박스가 읽기 전용 상태인지 여부
 * @param {Function} [props.handleChange] - 값이 변경될 때 호출될 함수 (체크 상태에 따라 다른 값을 전달)
 * @param {Function} [props.onChange] - input 태그의 기본 onChange 이벤트 핸들러
 * @param {Function} [props.onBlur] - input 태그의 onBlur 이벤트 핸들러
 * @param {Function} [props.onFocus] - input 태그의 onFocus 이벤트 핸들러
 */
declare const CheckBox: React.ForwardRefExoticComponent<Props & React.RefAttributes<HTMLInputElement>>;
export type { Props as CheckBoxProps };
export default CheckBox;
