import React from 'react';
type CounterProps = {
    /** 카운터 컴포넌트의 스타일을 위한 클래스 이름 */
    className?: string;
    /** 카운트 애니메이션의 마지막이 될 수 */
    endValue: number;
    /** 카운트 애니메이션의 시작점이 될 수 */
    startValue?: number;
    /** 카운트 애니메이션이 시작하기 전에 걸 수 있는 딜레이 값 (ms 단위) */
    delay?: number;
    /** 초기 페이지 렌더링 시 카운터 컴포넌트카 뷰포트 아래에 있다면, 카운터 컴포넌트가 화면에 보여지는 시점에 카운터를 작동시킬지에 대한 여부 */
    countOnIntersected?: boolean;
    /** 카운터의 멈춤 여부 */
    pause?: boolean;
    /** 카운트 애니메이션의 시작해서 종료되는 시간의 값 (ms 단위) */
    duration?: number;
    /** 카운트 되는 숫자들을 보여줄 때, 천의 자리를 콤마로 분철하여 표기할 것인지에 대한 여부 */
    separator?: boolean;
    /** 카운터가 startValue부터 endValue까지 순회할 횟수 */
    iterationCount?: number;
    /** 카운트 되는 숫자들을 보여줄 때, 표기할 최소 소숫점 */
    digits?: number;
    /** 멈춤, 재실행 버튼 사용 여부 */
    usePauseResume?: boolean;
    /** 카운터가 전부 순회를 마치고 종료되었을 때, 실행할 함수 */
    onEnd?: () => void;
};
/**
 * `Counter` startValue와 endValue 사이의 숫자를 카운트하여 화면에 보여주는 컴포넌트입니다.
 *
 * @param {string} [props.className] - 카운터 컴포넌트의 스타일을 위한 클래스 이름
 * @param {number} [props.endValue] - 카운트 애니메이션의 마지막이 될 수
 * @param {number} [props.startValue] - 카운트 애니메이션의 시작점이 될 수
 * @param {number} [props.delay] - 카운트 애니메이션이 시작하기 전에 걸 수 있는 딜레이 값 (ms 단위)
 * @param {boolean} [props.startOnIntersected] - 초기 페이지 렌더링 시 카운터 컴포넌트카 뷰포트 아래에 있다면, 카운터 컴포넌트가 화면에 보여지는 시점에 카운터를 작동시킬지에 대한 여부
 * @param {boolean} [props.pause] - 카운터의 멈춤 여부
 * @param {number} [props.duration] - 카운트 애니메이션의 시작해서 종료되는 시간의 값 (ms 단위)
 * @param {boolean} [props.separator] - 카운트되는 숫자들을 보여줄 때, 천의 자리를 콤마로 분철하여 표기할 것인지에 대한 여부
 * @param {number} [props.iterationCount] - 카운터가 startValue부터 endValue까지 순회할 횟수
 * @param {number} [props.digits] - 카운트되는 숫자들을 보여줄 때, 표기할 최소 소숫점
 * @param {boolean} [props.usePauseResume] - 카운터의 멈춤, 재실행 버튼 사용 여부
 * @param {function} [props.onEnd] - 카운터가 전부 순회를 마치고 종료되었을 때, 실행할 함수
 */
declare const Counter: ({ className, endValue, startValue, delay, countOnIntersected, duration, separator, iterationCount, pause, digits, usePauseResume, onEnd }: CounterProps) => React.JSX.Element;
export default Counter;
export type { CounterProps };
