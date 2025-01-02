import React, { ChangeEvent, ReactElement } from 'react';
type Props = {
    className?: string;
    /** 최소 평점 */
    min?: number;
    /** 최대 평점 */
    max?: number;
    /** 평점 점수 증가 간격 */
    step?: number;
    /** 평점 아이콘들 간에 간격 (짝수 권장) */
    gap?: number | string;
    /** 평점 아이콘의 높이 값 */
    size?: number | string;
    /** 상위 컴포넌트에서 주입하는 평점 */
    value?: number;
    /**
     * 해당 컴포넌트 안에 input 요소에 반영될 name 값
     *
     * handleChange 2번째 인자에 해당 name 값이 전달됨
     */
    name?: string;
    /** active된 평점 아이콘 */
    onIcon?: ReactElement;
    /** unactive된 평점 아이콘 */
    offIcon?: ReactElement;
    /** readonly 여부 */
    readOnly?: boolean;
    /** 평점 아이콘들 옆에 점수를 나타낼 것인지 여부 */
    showScore?: boolean;
    /** 평점(input 값)이 변경될때 호출되는 함수 */
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    /**
     * 평점(input 값)이 변경될때 호출되는 함수
     *
     * 첫번째 인자로는 평점 값을 두번째 인자로는 name값이 전달됨
     * */
    handleChange?: (value: number, name?: string) => void;
};
/**
 * `Rating` 컴포넌트는 별점과 같은 폄점을 표시하는 데 사용되며, 사용자는 평점을 주거나 평점을 읽기 전용으로 표시할 수 있습니다.
 *
 * @component
 * @param {string} [props.className] - 컴포넌트에 적용할 CSS 클래스 이름.
 * @param {number} [props.min=0] - 최소 평점 값.
 * @param {number} [props.max=5] - 최대 평점 값.
 * @param {number} [props.step=0.5] - 평점 점수의 증가 간격.
 * @param {number} [props.size=40] - 평점 아이콘의 높이 값 (픽셀 단위).
 * @param {number} [props.gap] - 평점 아이콘들 간의 간격 (픽셀 단위).
 * @param {string} [props.name] - input 요소에 반영될 name 값. handleChange 함수의 두 번째 인자로 전달됩니다.
 * @param {ReactElement} [props.onIcon=<SvgIcoStarOn />] - 활성화된 별 아이콘을 표시.
 * @param {ReactElement} [props.offIcon=<SvgIcoStarOff />] - 비활성화된 별 아이콘을 표시.
 * @param {number} [props.value] - 상위 컴포넌트에서 주입하는 별점 값.
 * @param {boolean} [props.readOnly] - 평점이 읽기 전용인지 여부. true일 경우 사용자는 평점을 변경할 수 없습니다.
 * @param {boolean} [props.showScore] - 평점 옆에 점수를 표시할지 여부.
 * @param {function} [props.onChange] - 평점(input 값)이 변경될 때 호출되는 함수. 첫 번째 인자로는 이벤트 객체가 전달됩니다.
 * @param {function} [props.handleChange] - 평점(input 값)이 변경될 때 호출되는 함수. 첫 번째 인자로는 평점 값, 두 번째 인자로는 name 값이 전달됩니다.
 */
declare const Rating: ({ className, min, max, step, size, gap, name, onIcon, offIcon, value, readOnly, showScore, onChange, handleChange }: Props) => React.JSX.Element;
export type { Props as RatingProps };
export default Rating;
