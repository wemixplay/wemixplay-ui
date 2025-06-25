import React from 'react';
import { MouseEvent, ReactElement } from 'react';
type RefreshButtonProps = {
    className?: string;
    /**
     * 리프레셔가 순회를 한 번 하는데 걸리는 시간
     */
    duration?: number | false;
    /**
     * 리프레셔에 숫자 카운트를 보여줄 것인지에 대한 여부
     */
    showCount?: boolean;
    /**
     * 새로고침 아이콘 요소
     */
    iconElement?: ReactElement;
    /**
     * 리프레셔를 클릭했을 때, 동작할 함수
     * @param {MouseEvent<HTMLButtonElement>} e 버튼클릭 이벤트 객체
     */
    disabled?: boolean;
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
    /**
     * 리프레셔가 순회를 한 번 했을 때 동작할 함수
     */
    onRefresh?: () => void;
};
/**
 * `RefreshButton` 컴포넌트는 입력한 시간을 순회했을 때, 특정한 기능을 실행할 수 있게 하는 컴포넌트입니다.
 *
 * `icon size`는 사용하는 컴포넌트 scss 파일에서 .refresh { width : value; height:value}
 *
 * @param {string} [props.className] - 리프레셔 컴포넌트의 스타일을 위한 클래스 이름
 * @param {number | false} [props.duration] - 리프레셔가 순회를 한 번 하는데 걸리는 시간
 * @param {boolean} [props.showCount] - 리프레셔에 숫자 카운트를 보여줄 것인지에 대한 여부
 * @param {ReactElement} [props.iconElement] - 새로고침 아이콘 요소
 * @param {function} [props.onClick] - 리프레셔를 클릭했을 때, 동작할 함수
 * @param {function} [props.onRefresh] - 리프레셔가 순회를 한 번 했을 때 동작할 함수
 */
declare const RefreshButton: ({ className, duration, showCount, iconElement, disabled, onClick, onRefresh }: RefreshButtonProps) => React.JSX.Element;
export default RefreshButton;
export type { RefreshButtonProps };
