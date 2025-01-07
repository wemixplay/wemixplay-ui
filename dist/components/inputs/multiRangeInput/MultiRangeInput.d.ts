import React, { CSSProperties, ChangeEvent } from 'react';
type MultiRangeInputForwardRef = {
    focus: (options?: FocusOptions) => void;
};
type Props = {
    className?: string;
    /** 최소값 */
    min: number;
    /** 최대값 */
    max: number;
    /** 값 변경 크기 */
    step?: number;
    /** thumb 사이즈 */
    thumbSize?: number;
    /** slider 높이 */
    sliderHeight?: number;
    /** thumb 테두리 색상 */
    thumbBorderColor?: CSSProperties['borderColor'];
    /** thumb 색상 */
    thumbColor?: CSSProperties['backgroundColor'];
    /** track 색상 */
    trackColor?: CSSProperties['backgroundColor'];
    /** range 색상 */
    rangeColor?: CSSProperties['backgroundColor'];
    /** 텍스트 입력 영역 표시 여부 */
    showTextInput?: boolean;
    /**
     * handleChange 두번째 인자로 전달될 name 값
     */
    name?: string;
    /**
     * 바인딩할 데이터 값
     */
    value?: number[];
    /**
     * 값이 변경될 때 호출될 함수 (첫번째 인자는 [0, 100]과 같이 배열로 전달)
     */
    handleChange?: (value: JSONObject, name: string) => void;
    /** 값이 변경될 때 호출될 함수 (이벤트를 인자로 하여 호출) */
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};
/**
 * `MultiRangeInput`은 최소값과 최대값을 지정할 수 있게 하는 컴포넌트 입니다.
 *
 * @param {string} [props.className] - 추가적인 CSS 클래스 이름
 * @param {number} [props.min] - 슬라이더의 최소값
 * @param {number} [props.max] - 슬라이더의 최대값
 * @param {number} [props.step] - 슬라이더의 값 변경 단위 (기본값: 1)
 * @param {number} [props.thumbSize] - 슬라이더 thumb의 크기 (픽셀 단위)
 * @param {number} [props.sliderHeight] - 슬라이더의 높이 (픽셀 단위)
 * @param {string} [props.thumbBorderColor] - thumb 테두리 색상
 * @param {string} [props.thumbColor] - thumb 색상
 * @param {string} [props.trackColor] - track 색상
 * @param {string} [props.rangeColor] - range 색상
 * @param {boolean} [props.showTextInput] - 텍스트 입력 영역 표시 여부
 * @param {string} [props.name] - handleChange 두 번째 인자로 전달될 name 값
 * @param {number[]} [props.value] - 바인딩할 데이터 값 (배열 형태)
 * @param {function} [props.handleChange] - 값이 변경될 때 호출될 함수
 * @param {function} [props.onChange] - 값이 변경될 때 호출될 함수 (이벤트를 인자로 받음)
 * @param {React.Ref} ref - 컴포넌트에 대한 참조 객체
 */
declare const MultiRangeInput: React.ForwardRefExoticComponent<Props & React.RefAttributes<MultiRangeInputForwardRef>>;
export type { Props as MultiRangeInputProps };
export default MultiRangeInput;
