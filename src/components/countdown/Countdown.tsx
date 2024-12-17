import React, { useState, useCallback, useEffect } from 'react';

import { dayjs, getTimestamp } from '@/utils/dateUtils';
import { makeCxFunc } from '@/utils/forReactUtils';

import Timer, { TimerProps } from '@/components/timer/Timer';

import style from './Countdown.module.scss';

const cx = makeCxFunc(style);

interface CountdownProps
  extends Omit<
    TimerProps,
    | 'duration'
    | 'useButtons'
    | 'pausedElement'
    | 'resumedElement'
    | 'refreshElement'
    | 'defaultPaused'
  > {
  className?: string;
  /**
   * 카운트다운이 종료되는 미래 시점의 타임스탬프
   */
  endTimestamp: number;
}

/**
 * 카운트다운 타이머가 동작해야 하는 시간을 계산하는 함수
 * @param endTimestamp 카운트다운이 끝나야하는 시점의 타임스탬프 값
 * @returns endTimestamp에서 현재의 타임스탬프를 뺀 duration
 */
const getRemainingDuration = (endTimestamp: number) => {
  const remaining = getTimestamp(endTimestamp) - dayjs().valueOf();
  return remaining > 0 ? remaining : 0;
};

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
const Countdown = ({ className, endTimestamp, ...rest }: CountdownProps) => {
  /**
   * 컴포넌트가 마운트되는 시점에 endTimestamp에서 현재의 타임스탬프 값을 뺀 카운트다운의 duration
   */
  const [duration, setDuration] = useState(getRemainingDuration(endTimestamp));

  /**
   * 윈도우가 활성화될 때마다, duration의 동기화를 위해 endTimestamp에서 현재의 시간을 빼서 올바른 duration으로 Timer의 남은 시간을 업데이트해주는 함수
   */
  const updateRemainingDuration = useCallback(() => {
    const updatedDuration = getRemainingDuration(endTimestamp);

    setDuration(updatedDuration);
  }, [endTimestamp]);

  // 컴포넌트가 mounted되면 visibilitychange 이벤트 등록, 및 unmounted될 때 이벤트를 클리어하는 이펙트함수
  useEffect(() => {
    window.addEventListener('visibilitychange', updateRemainingDuration);

    return () => {
      window.removeEventListener('visibilitychange', updateRemainingDuration);
    };
  }, [updateRemainingDuration]);

  // endTimestamp가 바뀌면 duration을 업데이트합니다.
  useEffect(() => {
    updateRemainingDuration();
  }, [updateRemainingDuration]);

  return (
    <div className={cx('countdown-wrapper', className)}>
      <Timer duration={duration} useButtons={false} defaultPaused={false} {...rest} />
    </div>
  );
};

export default Countdown;
export type { CountdownProps };
