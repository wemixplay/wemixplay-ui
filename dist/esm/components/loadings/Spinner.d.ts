import React from 'react';
type Props = {
    className?: string;
    /** Spinner 컴포넌트의 width, height 크기 */
    size?: number;
};
/**
 * `Spinner` 컴포넌트는 로딩 상태를 나타내는 indicator UI를 제공하는 컴포넌트 입니다.
 *
 * @param {string} [props.className] 컴포넌트에 추가될 CSS 클래스명
 * @param {number} [props.size] Spinner 컴포넌트의 width, height 크기
 * @returns
 */
declare const Spinner: ({ className, size }: Props) => React.JSX.Element;
export type { Props as SpinnerProps };
export default Spinner;
