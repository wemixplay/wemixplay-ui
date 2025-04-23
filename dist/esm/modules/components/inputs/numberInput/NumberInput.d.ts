import React, { ReactElement, HTMLInputAutoCompleteAttribute } from 'react';
import { RippleOption } from '../../ripple/Ripple';
interface Props extends Pick<React.InputHTMLAttributes<HTMLInputElement>, 'className' | 'name' | 'autoComplete' | 'placeholder' | 'disabled' | 'readOnly' | 'onChange' | 'onBlur' | 'onFocus' | 'onKeyDown'> {
    className?: string;
    /** 입력 필드(input) name 값 */
    name?: string;
    /** up, down 버튼을 눌렀을때 증가/감소되는 값 */
    step?: number;
    /** up 버튼을 눌렀을때 증가되는 값 */
    increaseStep?: number;
    /** down 버튼을 눌렀을때 감소되는 값 */
    decreaseStep?: number;
    /** 입력 필드의 현재 값 */
    value?: string;
    /** error 유무 */
    error?: boolean;
    /** 최소값 */
    min?: string | number;
    /** 최대값 */
    max?: string | number;
    /** 정수의 최대 길이 */
    maxLength?: number | string;
    /** 최대 소수점 자리 */
    digit?: number;
    /** 직접 입력 허용 여부 */
    isDirect?: boolean;
    /** 비활성화 여부 */
    disabled?: boolean;
    /** 읽기 전용 활성화 여부 */
    readOnly?: boolean;
    /** placeholder */
    placeholder?: string;
    /** 자동완성 기능 활성화 여부 */
    autoComplete?: HTMLInputAutoCompleteAttribute;
    /** 증가/감소 버튼 UI 숨김 여부 */
    hideButton?: boolean;
    /** up 버튼안에 노출할 icon 컴포넌트 */
    arrowUpElement?: ReactElement;
    /** down 버튼안에 노출할 icon 컴포넌트 */
    arrowDownElement?: ReactElement;
    /** ripple 옵션 */
    rippleOption?: RippleOption;
    /**
     * 값이 변경될 때 호출될 함수
     *
     * @param {string} value - 변경된 값
     * @param {string} name - 입력 필드(input) name 값
     * @param {{ type: 'up' | 'down' }} option - up/down 버튼을 눌렀을 경우 전달
     */
    handleChange?: (value: string, name?: string, option?: {
        type: 'up' | 'down';
    }) => void;
    /**
     * 엔터 키가 눌렸을 때 호출될 함수
     *
     * @param {string} value - 변경된 값
     * @param {string} name - 입력 필드(input) name 값
     */
    handleEnter?: (value: string, name?: string) => void;
}
/**
 * `NumberInput` 컴포넌트는 숫자 값을 입력하기 위한 사용자 정의 가능한 입력 컴포넌트입니다. 증가 및 감소 버튼, 이러한 버튼에 대한 사용자 정의 단계 값, 오류 처리 등을 지원합니다. 기본 HTML 입력 요소의 여러 속성을 확장하여 원활한 통합을 제공합니다.
 *
 *
 * @param {string} [props.className] - 컴포넌트에 적용할 추가 CSS 클래스 이름
 * @param {string} [props.name] - 입력 필드의 name 속성
 * @param {string} [props.autoComplete] - 입력의 자동 완성 기능을 활성화 또는 비활성화
 * @param {string} [props.placeholder] - 입력 필드의 placeholder 텍스트
 * @param {boolean} [props.disabled=false] - true인 경우 입력 필드를 비활성화
 * @param {boolean} [props.readOnly=false] - true인 경우 입력 필드를 읽기 전용으로 만듭니다
 * @param {function} [props.onChange] - 입력 값이 변경될 때 호출되는 콜백 함수
 * @param {function} [props.onBlur] - 입력 필드가 포커스를 잃을 때 호출되는 콜백 함수
 * @param {function} [props.onFocus] - 입력 필드가 포커스를 얻을 때 호출되는 콜백 함수
 * @param {function} [props.onKeyDown] - 입력 필드에서 키가 눌렸을 때 호출되는 콜백 함수
 * @param {number} [props.step=1] - 입력 값이 증가 또는 감소해야 하는 양
 * @param {number} [props.increaseStep] - 증가 버튼을 누를 때 입력 값이 증가해야 하는 양
 * @param {number} [props.decreaseStep] - 감소 버튼을 누를 때 입력 값이 감소해야 하는 양
 * @param {string|number} [props.value] - 입력 필드의 현재 값
 * @param {boolean} [props.error=false] - 입력 필드가 오류 상태인지 나타냅니다
 * @param {string|number} [props.min] - 허용되는 최소 값
 * @param {string|number} [props.max] - 허용되는 최대 값
 * @param {number|string} [props.maxLength] - 정수 부분의 최대 길이
 * @param {number} [props.digit] - 허용되는 최대 소수점 자릿수
 * @param {boolean} [props.isDirect=true] - true인 경우 직접 입력을 허용합니다
 * @param {boolean} [props.hideButton] - 증가/감소 버튼 UI 숨김 여부
 * @param {ReactElement} [props.arrowUpElement=<SvgKeyboardArrowUp2 />] - 증가 버튼 내부에 표시할 사용자 정의 컴포넌트
 * @param {ReactElement} [props.arrowDownElement=<SvgKeyboardArrowDown2 />] - 감소 버튼 내부에 표시할 사용자 정의 컴포넌트
 * @param {Object} [props.rippleOption] - 버튼 클릭 시 리플 효과에 대한 옵션
 * @param {function} [props.handleChange] - 입력 값이 변경될 때 호출되는 콜백 함수, 증가/감소에 대한 추가 옵션 매개변수 포함
 * @param {function} [props.handleEnter] - Enter 키가 눌렸을 때 호출되는 콜백 함수
 *
 * @returns {JSX.Element} NumberInput 컴포넌트
 */
declare const NumberInput: React.ForwardRefExoticComponent<Props & React.RefAttributes<HTMLInputElement>>;
export type { Props as NumberInputProps };
export default NumberInput;
