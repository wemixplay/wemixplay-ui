import React, { InputHTMLAttributes, ReactNode } from 'react';
interface PropsType extends Pick<InputHTMLAttributes<HTMLInputElement>, 'name' | 'onChange' | 'onBlur' | 'onFocus'> {
    className?: string;
    /** 라디오박스 UI 옆에 나올 텍스트 및 React 엘리먼트 */
    children?: ReactNode | string;
    /** input 태그가 갖는 checkValue 값 */
    checkValue?: string | number;
    /** 바인딩할 데이터 값
     *
     * (`string | number`로 받아야함)
     */
    value?: string | number;
    size?: 'normal' | 'small';
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
 * RadioBox 컴포넌트는 라디오 버튼을 구현합니다. HTML `<input type="radio">` 요소의 특성을 확장하여
 * React에서 사용하기 쉽도록 만든 컴포넌트입니다.
 *
 * @param {Object} [props.ref] - input 태그의 Element를 가리킬 ref 값
 * @param {string} props.name - input 태그의 name 속성. 폼 제출 시 어떤 라디오 버튼이 선택되었는지 식별하는 데 사용됩니다.
 * @param {function} props.onChange - 값이 변경될 때 호출될 이벤트 핸들러. 사용자가 다른 라디오 버튼을 선택할 때 발생합니다.
 * @param {function} props.onBlur - 요소가 포커스를 잃었을 때 호출될 이벤트 핸들러.
 * @param {function} props.onFocus - 요소에 포커스가 맞춰졌을 때 호출될 이벤트 핸들러.
 * @param {string} [props.className] - 컴포넌트에 적용할 CSS 클래스 이름.
 * @param {ReactNode|string} [props.children] - 라디오박스 UI 옆에 나타낼 텍스트 또는 React 엘리먼트.
 * @param {string|number} [props.checkValue] - input 태그가 갖는 value 값. 라디오 버튼이 선택될 때 이 값이 폼 데이터로 사용됩니다.
 * @param {string|number} [props.value] - 바인딩할 데이터 값. 주로 내부 로직에서 참조하기 위해 사용됩니다.
 * @param {boolean} [props.disabled=false] - 체크박스가 비활성화 상태인지 여부. true로 설정하면 사용자가 클릭할 수 없습니다.
 * @param {boolean} [props.readOnly=false] - 체크박스가 읽기 전용 상태인지 여부. true로 설정하면 사용자의 입력을 받지 않습니다.
 * @param {function} [props.handleChange] - 값이 변경될 때 호출될 함수. 체크 상태에 따라 다른 값을 전달합니다.
 */
declare const RadioBox: React.ForwardRefExoticComponent<PropsType & React.RefAttributes<HTMLInputElement>>;
export type { PropsType as RadioBoxProps };
export default RadioBox;
