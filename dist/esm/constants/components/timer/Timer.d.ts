import React, { ReactNode } from 'react';
/**
 * @type 타이머의 시, 분, 초, ms단위 값을 key로 가진 객체의 타입
 */
type TimerDuration = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    restMs: number;
};
type OptionalTimerDuration = Partial<TimerDuration>;
type TimerProps = {
    className?: string;
    /**
     * 타이머가 동작할 시간 (ms 단위)
     */
    duration: number | OptionalTimerDuration;
    /**
     * 시간 단위 사이에 보여줄 UI
     */
    saperator?: ReactNode;
    /**
     * 각 단위 뒤에 단위표기를 할 UI
     */
    suffix?: {
        days?: ReactNode;
        hours?: ReactNode;
        minutes?: ReactNode;
        seconds?: ReactNode;
    };
    /**
     * pause/resume, refresh 버튼 사용 유무
     */
    useButtons?: boolean;
    /**
     * useButtons가 true일 때, 멈춤 상태가 아닐 경우 resume 버튼에 보여줄 UI
     */
    pausedElement?: ReactNode;
    /**
     * useButtons가 true일 때, 멈춤 상태일 경우 pause 버튼에 보여줄 UI
     */
    resumedElement?: ReactNode;
    /**
     * useButtons가 true일 때, refresh 버튼에 보여줄 UI
     */
    refreshElement?: ReactNode;
    /**
     * 타이머 컴포넌트가 기본적으로 멈춤 상태일 것인지에 대한 여부
     */
    defaultPaused?: boolean;
    /**
     * 작은 단위의 시간이 입려되어도 모든 단위의 UI를 보여줄 것인지에 대한 여부
     */
    showAllUnits?: boolean;
    /**
     * 타이머 종료시 실행할 함수
     */
    onEnd?: () => void;
};
/**
 * `Timer` 컴포넌트는 입력한 시간에서 1초 씩 감소하는 UI를 보여주는 컴포넌트입니다.
 *
 * @param {string} [props.className] - 타이머 컴포넌트의 스타일을 위한 클래스 이름
 * @param {number|OptionalTimerDuration} [props.duration] - 타이머의 시작값
 * @param {ReactNode} [props.saperator] - 시간 단위 사이에 보여줄 UI
 * @param {object} [props.suffix] - 각 단위 뒤에 단위표기를 할 UI
 * @param {boolean} [props.useButtons] - pause/resume, refresh 버튼 사용 유무
 * @param {ReactNode} [props.pausedElement] - useButtons가 true일 때, 멈춤 상태가 아닐 경우 resume 버튼에 보여줄 UI
 * @param {ReactNode} [props.resumedElement] - useButtons가 true일 때, 멈춤 상태일 경우 pause 버튼에 보여줄 UI
 * @param {ReactNode} [props.refreshElement] - useButtons가 true일 때, refresh 버튼에 보여줄 UI
 * @param {boolean} [props.defaultPaused] - 타이머 컴포넌트가 기본적으로 멈춤 상태일 것인지에 대한 여부
 * @param {boolean} [props.showAllUnits] - 작은 단위의 시간이 입려되어도 모든 단위의 UI를 보여줄 것인지에 대한 여부
 * @param {function} [props.onEnd] - 타이머 종료시 실행할 함수
 */
declare const Timer: ({ className, duration, saperator, suffix, useButtons, pausedElement, resumedElement, refreshElement, defaultPaused, showAllUnits, onEnd }: TimerProps) => React.JSX.Element;
export default Timer;
export type { TimerProps };
