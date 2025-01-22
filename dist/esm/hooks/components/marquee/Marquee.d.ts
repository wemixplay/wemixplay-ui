import React, { CSSProperties, ReactNode } from 'react';
interface BaseProps {
    className?: string;
    /**
     * 마키 방향
     */
    direction?: 'left' | 'right' | 'up' | 'down';
    /**
     * 마키 애니메이션 실행 여부
     */
    off?: boolean;
    /**
     * 커서를 마키 컴포넌트 위에 올릴 시 애니메이션의 중단 여부
     */
    pauseOnMouseEnter?: boolean;
    /**
     * 애니메이션의 반복 횟수이며 입력하지 않으면 infinite가 기본으로 지정됨.
     */
    animationIterationCount?: CSSProperties['animationIterationCount'];
    /**
     * 애니메이션이 한 회 실행되는데 걸리는 시간
     */
    animationDuration?: CSSProperties['animationDuration'];
    /**
     * 애니메이션이 시작하기 전에 걸 수 있는 시간의 딜레이값
     */
    animationDelay?: CSSProperties['animationDelay'];
    /**
     * 마키 요소 사이의 간격(사용하는 곳의 스타일 지정보다 우선 적용됨.)
     */
    spaceBetween?: number;
    /**
     * 애니메이션이 시작할 때, 실행할 수 있는 함수
     */
    onStart?: () => void;
    /**
     * 애니메이션이 한 회 수행되었을 때, 실행할 수 있는 함수
     */
    onIteration?: () => void;
    /**
     * 애니메이션이 종료되었을 때, 실행할 수 있는 함수
     */
    onFinish?: () => void;
}
interface ChildrenProps extends BaseProps {
    /**
     * props 형태로 전달할 수 있는 애니메이션이 적용될 UI요소. children을 자식으로 전달한다면 사용할 수 없음.
     */
    list?: never;
    /**
     * Marquee 컴포넌트의 자식으로 전달할 수 있는 애니메이션이 적용될 UI요소. list를 prop으로 전달한다면 사용할 수 없음.
     */
    children: ReactNode | ReactNode[];
}
interface ListProps extends BaseProps {
    list: ReactNode[];
    children?: never;
}
type ElementProps = ChildrenProps | ListProps;
interface MinimalCountProps extends BaseProps {
    /**
     * 마키 컨테이너 너비와 요소 너비 * 요소 갯수를 보고 얼만큼의 곱으로
     * 총 길이를 정할 것인지에 대한 여부
     */
    minimalAuto?: true;
    /**
     * 요소가 보여질 최소 갯수
     */
    minimalCount?: never;
}
interface MinimalAutoProps extends BaseProps {
    minimalAuto?: false;
    minimalCount?: number;
}
type MinimalProps = MinimalCountProps | MinimalAutoProps;
type Props = ElementProps & MinimalProps;
/**
 * `Marquee` 표현할 UI를 무한으로 좌우, 상하 방향으로 롤링할 수 있는 컴포넌트입니다.
 *
 * @param {string} [props.className] - 마키 컴포넌트의 스타일을 위한 클래스 이름
 * @param {string} [props.direction] - 마키 컴포넌트의 children의 움직임이 흐를 방향
 * @param {React.ReactNode|React.ReactNode[]} [props.children] - 합성 컴포넌트 패턴으로 마키 요소를 주입하고 싶을 때 받을 수 있는 prop
 * @param {React.ReactNode[]} [props.list] - prop 주입으로 마키 요소를 전달하고 싶을 때 사용하는 prop
 * @param {boolean} [props.off] - 마키 애니메이션 작동에 대한 on, off의 boolean 값
 * @param {boolean} [props.pauseOnMouseEnter] - 마키 컴포넌트 영역 위에 커서를 올리면 애니메이션 멈춤을 적용할 것인지에 대한 여부
 * @param {boolean} [props.minimalAuto] - 마키의 자식 요소의 갯수와 그 길이, 마키 컴포넌트의 영역을 고려하여 화면의 크기에 맞출 수 있도록 자동으로 UI를 복사할 것인지에 대한 여부
 * @param {number} [props.minimalCount] - minimalAuto가 falsy라면 마키 자식 요소의 UI를 복제할 수동으로 입력할 수 있는 갯수
 * @param {number} [props.animationIterationCount] - 마키 컴포넌트가 화면에 그려진 이후 마키의 애니메이션이 동작할 횟수
 * @param {number} [props.animationDuration] - 마키 애니메이션이 한 회 순회하는데 걸리는 시간
 * @param {number} [props.animationDelay] - 마키 컴포넌트가 화면에 그려진 이후 애니메이션이 시작하는데 기다릴 시간
 * @param {number} [props.spaceBetween] - 마키 요소 사이의 간격 픽셀값
 * @param {function} [props.onStart] - 마키 애니메이션이 실행될 때 호출할 함수
 * @param {function} [props.onIteration] - 마키 애니메이션이 한 회 순회했을 때 호출할 함수
 * @param {function} [props.onFinish] - 마키 애니메이션이 종료되었을 때 호출할 함수
 */
declare const Marquee: ({ className, direction, children, list, off, pauseOnMouseEnter, minimalAuto, minimalCount, animationIterationCount, animationDuration, animationDelay, spaceBetween, onStart, onIteration, onFinish }: Props) => React.JSX.Element;
export default Marquee;
export type { Props as MarqueeProps };
