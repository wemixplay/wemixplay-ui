import React from 'react';
import { TimerProps } from "../timer/Timer";
interface CountdownProps extends Omit<TimerProps, 'duration' | 'useButtons' | 'pausedElement' | 'resumedElement' | 'refreshElement' | 'defaultPaused'> {
    className?: string;
    /**
     * 카운트다운이 종료되는 미래 시점의 타임스탬프
     */
    endTimestamp: number;
}
/**
 * `Countdown` 컴포넌트는 현재부터 endTimestamp 값의 시점에 도달하는 시간까지 카운트다운을 수행하는 함수입니다.
 *
 * @param {string} [props.className] - 카운트다운 컴포넌트의 스타일을 위한 클래스 이름
 * @param {number} [props.endTimestamp] - 카운트다운이 종료되는 미래 시점의 타임스탬프
 * @param {ReactNode} [props.saperator] - 시간 단위 사이에 보여줄 UI
 * @param {boolean} [props.showAllUnits] - 작은 단위의 시간이 입려되어도 모든 단위의 UI를 보여줄 것인지에 대한 여부
 * @param {object} [props.suffix] - 각 단위 뒤에 단위표기를 할 UI
 * @param {function} [props.onEnd] - 카운트다운 종료시 실행할 함수
 */
declare const Countdown: ({ className, endTimestamp, ...rest }: CountdownProps) => React.JSX.Element;
export default Countdown;
export type { CountdownProps };
