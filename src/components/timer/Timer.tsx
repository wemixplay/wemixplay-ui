'use client';

import React, { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { makeCxFunc } from '@/utils/forReactUtils';
import { pad } from '@/utils/valueParserUtils';

import style from './Timer.module.scss';

const cx = makeCxFunc(style);

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
 * 1밀리초의 숫자 상수값
 */
const ONE_MILLI_SCDS = 1000;

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
const Timer = ({
  className = '',
  duration,
  saperator,
  suffix,
  useButtons = true,
  pausedElement = 'pause',
  resumedElement = 'resume',
  refreshElement = 'refresh',
  defaultPaused = false,
  showAllUnits = false,
  onEnd
}: TimerProps) => {
  // 타이머의 멈춤, 실행의 여부를 표현하는 상태
  const [paused, setPaused] = useState(defaultPaused);

  // 타이머가 종료되었는지 여부를 표현하는 상태
  const [timerEnded, setTimerEnded] = useState(duration === 0);

  // 타이머의 duration값을 표현하는 상태
  const [timerDuration, setTimerDuration] = useState(convertTimeToMs(duration));

  /**
   * 타이머가 동작하는데 남은 ms 단위 값이 할당된 참조 변수
   */
  const runningDurationRef = useRef(timerDuration);

  /**
   * 초 단위의 시간 UI를 보여줄 span 요소의 참조 변수
   */
  const secondsSpanRef = useRef<HTMLSpanElement>(null);

  /**
   * 분 단위의 시간 UI를 보여줄 span 요소의 참조 변수
   */
  const minutesSpanRef = useRef<HTMLSpanElement>(null);

  /**
   * 시간 단위의 시간 UI를 보여줄 span 요소의 참조 변수
   */
  const hoursSpanRef = useRef<HTMLSpanElement>(null);

  /**
   * 일 단위의 시간 UI를 보여줄 span 요소의 참조 변수
   */
  const daysSpanRef = useRef<HTMLSpanElement>(null);

  /**
   * 타이머의 setInterval 반환값을 저장할 참조 변수
   */
  const timerIntervalIdRef = useRef<NodeJS.Timeout>(null);

  /**
   * 현재 타이머의 인터벌이 시작한 시점의 타임스탬프 값을 저장할 참조 변수
   */
  const starTimestampRef = useRef(0);

  /**
   * 타이머가 종료되고 onEnd가 호출된 이후, onEnd의 주소값이 바뀌어 재호출되지 않도록 막기 위한 참조 변수
   */
  const onEndCalledRef = useRef(false);

  /**
   * 원본 duration 값인 timerDuration 변수에서 시간, 분 단위 값이 0 초과 여부에 따라 해당 UI를 보여주는 것에 대한 변수
   */
  const { showDaysCount, showHoursCount, showMinutesCount } = useMemo(() => {
    const { days, hours, minutes } = convertMsToTime(timerDuration);

    return {
      showDaysCount: days > 0,
      showHoursCount: hours > 0,
      showMinutesCount: minutes > 0
    };
  }, [timerDuration]);

  /**
   * 시간값을 타이머의 표기대로 가공해 반환하는 함수
   */
  const formatValueInTimerForm = useCallback((value: number) => pad(value, '0', 2), []);

  /**
   * 요소의 내부 html을 타이머의 시간값으로 할당하는 함수
   */
  const updateSpanInnerHTML = useCallback(
    (element: HTMLSpanElement, value: number) => {
      if (element) element.innerHTML = formatValueInTimerForm(value);
    },
    [formatValueInTimerForm]
  );

  /**
   * 시, 분, 초를 표기하는 모든 span 요소의 내부 html을 runningDurationRef 값으로 초기화하는 함수
   */
  const resetSpanInnerHTML = useCallback(() => {
    const { hours, minutes, seconds } = convertMsToTime(runningDurationRef.current);

    updateSpanInnerHTML(hoursSpanRef.current, hours);
    updateSpanInnerHTML(minutesSpanRef.current, minutes);
    updateSpanInnerHTML(secondsSpanRef.current, seconds);
  }, [updateSpanInnerHTML]);

  /**
   * 인터벌을 제거하는 함수
   */
  const stopInterval = useCallback(() => {
    clearInterval(timerIntervalIdRef.current);
    timerIntervalIdRef.current = null;
  }, []);

  /**
   * starTimestampRef에 이 함수가 호출된 시각의 타임스탬프 값을 할당하고 인터벌 객체를 생성하는 함수
   * @param callback 인터벌을 실행할 콜백함수
   * @param currentInterval 인터벌 ms값
   */
  const createInterval = useCallback(
    (callback: (currentInterval: number) => void, currentInterval: number) => {
      stopInterval();

      starTimestampRef.current = Date.now();

      timerIntervalIdRef.current = setInterval(() => callback(currentInterval), currentInterval);
    },
    [stopInterval]
  );

  /**
   * 인터벌마다 runningDurationRef 인터벌 값을 빼주고, 해당 값으로 시, 분, 초의 값을 계산해 html에 그리는 함수
   * @param currentInterval 인터벌 ms값
   */
  const calcRemainingDurationEveryInterval = useCallback(
    (currentInterval: number) => {
      // 이전 인터벌의 일, 시, 분, 초 값
      const prevFormattedDuration = convertMsToTime(runningDurationRef.current);

      // 이번 인터벌이 감산된 타임스탬프 시간값
      const currentDuration = runningDurationRef.current - currentInterval;

      // 위의 타임스탬프 시간값을 일, 시, 분, 초 형태로 변환
      const currentFormattedDuration = convertMsToTime(currentDuration);

      // 이전 인터벌의 일 단위 값과 이번 인터벌의 일 단위 값이 다르면 일 단위 UI를 업데이트
      if (currentFormattedDuration.days !== prevFormattedDuration.days) {
        updateSpanInnerHTML(daysSpanRef.current, currentFormattedDuration.days);
      }

      // 이전 인터벌의 시간 단위 값과 이번 인터벌의 시간 단위 값이 다르면 시간 단위 UI를 업데이트
      if (currentFormattedDuration.hours !== prevFormattedDuration.hours) {
        updateSpanInnerHTML(hoursSpanRef.current, currentFormattedDuration.hours);
      }

      // 위의 방법으로 분 단위 UI를 업데이트
      if (currentFormattedDuration.minutes !== prevFormattedDuration.minutes) {
        updateSpanInnerHTML(minutesSpanRef.current, currentFormattedDuration.minutes);
      }

      // 초 단위 UI를 업데이트
      updateSpanInnerHTML(secondsSpanRef.current, currentFormattedDuration.seconds);

      // 이전 타이머 값인 runningDurationRef를 이번 인터벌 값이 감산된 currentDuration값으로 동기화합니다.
      runningDurationRef.current = currentDuration;

      // runningDurationRef 0이 되어 타이머가 종료되어야 할 때, 인터벌 객체를 제거 및 timerEnded 상태를 true로 변경
      if (runningDurationRef.current <= 0) {
        stopInterval();
        setTimerEnded(true);

        // 지난 인터벌의 시간값에 ms 단위 값이 존재하여 해당 값으로 인터벌이 한 번 돌았다면, 해당 인터벌을 삭제하고 다시 1000단위 ms값으로 인터벌 객체를 생성
      } else if (currentInterval !== ONE_MILLI_SCDS) {
        stopInterval();

        createInterval(calcRemainingDurationEveryInterval, ONE_MILLI_SCDS);
      }
    },
    [stopInterval, createInterval, updateSpanInnerHTML]
  );

  /**
   * runningDurationRef ms단위 값이 존재하는지 확인하고 있다면 해당 ms값, 아닐시 1초의 인터벌을 생성하는 함수
   */
  const startInterval = useCallback(() => {
    const { restMs } = convertMsToTime(runningDurationRef.current);

    createInterval(calcRemainingDurationEveryInterval, restMs || ONE_MILLI_SCDS);
  }, [createInterval, calcRemainingDurationEveryInterval]);

  /**
   * 멈춤 / 재실행 버튼을 클릭 시, paused의 상태를 반전시키는 함수
   */
  const togglePaused = useCallback(() => {
    // 타이머가 실행되고 있을 때 클릭할 경우
    if (!paused) {
      // 현재 시각 타임스탬프에서 타이머의 현재 인터벌이 시작한 시각의 타임스탬프를 뺀 값을 구합니다.
      const operatedDuration = Date.now() - starTimestampRef.current;

      // 해당 값의 ms단위 값을 구합니다.
      const { restMs } = convertMsToTime(operatedDuration);

      // 타이머가 재실행될 때, 위의 ms단위를 뺀 값에서 시작하기 위해, runningDurationRef 위의 변수를 감산합니다.
      runningDurationRef.current -= restMs;
    }

    setPaused(!paused);
  }, [paused]);

  /**
   * paused 상태에 따라 인터벌 객체를 생성하거나 제거합니다.
   */
  const operateTimer = useCallback(() => {
    if (paused) {
      stopInterval();
    } else if (runningDurationRef.current > 0) {
      startInterval();
    }
  }, [paused, startInterval, stopInterval]);

  /**
   * 타이머의 남은 시간에 대한 ref 변수를 duration 인자값으로 초기화합니다.
   */
  const setRunningDurationRef = useCallback((duration: number) => {
    runningDurationRef.current = duration;
  }, []);

  /**
   * duration 인자값으로 타이머의 모든 환경을 초기화합니다.
   */
  const resetTimer = useCallback(
    (duration: number) => {
      setRunningDurationRef(duration);

      setTimerEnded(duration === 0);
      onEndCalledRef.current = false;

      resetSpanInnerHTML();

      operateTimer();
    },
    [operateTimer, setRunningDurationRef, resetSpanInnerHTML]
  );

  // 부모컴포넌트 재렌더링 시, duration의 무결성확인 및 조건을 통해 타이머를 초기화하는 이펙트함수
  useEffect(() => {
    if (typeof duration !== 'number') {
      const { seconds, minutes, hours } = duration;

      if (typeof seconds === 'number' && seconds >= 60) {
        throw new Error(
          `duration prop에서 seconds의 값(${seconds})은 59 보다 클 수 없으며 이를 초과하는 나머지 값은 분 단위에 더하여 설정해야 합니다!`
        );
      }

      if (typeof minutes === 'number' && minutes >= 60) {
        throw new Error(
          `duration prop에서 minutes의 값(${minutes})은 59 보다 클 수 없으며 이를 초과하는 나머지 값은 시간 단위에 더하여 설정해야 합니다!`
        );
      }

      if (typeof hours === 'number' && hours >= 24) {
        throw new Error(
          `duration prop에서 hours의 값(${hours})은 23 보다 클 수 없으며 이를 초과하는 나머지 값은 일 단위에 더하여 설정해야 합니다!`
        );
      }
    } else {
      if (duration < 0) {
        throw new Error(`duration은 0보다 작을 수 없습니다!`);
      }
    }

    const newDurationMs = convertTimeToMs(duration);

    // 새로 들어온 duration prop이 현재 timerDuration의 값과 다른 경우에만 초기화되도록 조건 확인
    if (newDurationMs !== timerDuration) {
      stopInterval();

      setTimerDuration(newDurationMs);
      resetTimer(newDurationMs);
    }
  }, [duration, timerDuration, resetTimer, stopInterval]);

  // paused에 따른 타이머를 시작 및 종료하는 이펙트함수
  useEffect(() => {
    operateTimer();
  }, [operateTimer]);

  // 타이머 종료 시, onEnd prop함수를 호출하는 함수 (의존성 절단을 위해 useEffect사용)
  useEffect(() => {
    if (timerEnded && !onEndCalledRef.current) {
      onEndCalledRef.current = true;
      onEnd?.();
    }
  }, [timerEnded, onEnd]);

  // paused 상태 변경 시, 화면에 표시할 시, 분, 초의 값
  const { days, hours, minutes, seconds } = convertMsToTime(runningDurationRef.current);

  return (
    <span className={cx('timer-wrapper', className)}>
      {useButtons && (
        <span className={cx('timer-button-container')}>
          <button onClick={togglePaused} className={cx('timer-button')}>
            {paused ? resumedElement : pausedElement}
          </button>
          <button className={cx('timer-button')} onClick={() => resetTimer(timerDuration)}>
            {refreshElement}
          </button>
        </span>
      )}
      <span className={cx('timer-counter-container')}>
        {(showAllUnits || showDaysCount) && (
          <>
            <span className={cx('timer-counter')}>
              <span ref={daysSpanRef}>{formatValueInTimerForm(days)}</span>
              {suffix?.days && <span className={cx('timer-suffix')}>{suffix.days}</span>}
            </span>
            {saperator && <span className={cx('timer-separator')}>{saperator}</span>}
          </>
        )}
        {(showAllUnits || showDaysCount || showHoursCount) && (
          <>
            <span className={cx('timer-counter')}>
              <span ref={hoursSpanRef}>{formatValueInTimerForm(hours)}</span>
              {suffix?.hours && <span className={cx('timer-suffix')}>{suffix.hours}</span>}
            </span>
            {saperator && <span className={cx('timer-separator')}>{saperator}</span>}
          </>
        )}
        {(showAllUnits || showDaysCount || showHoursCount || showMinutesCount) && (
          <>
            <span className={cx('timer-counter')}>
              <span ref={minutesSpanRef}>{formatValueInTimerForm(minutes)}</span>
              {suffix?.minutes && <span className={cx('timer-suffix')}>{suffix.minutes}</span>}
            </span>
            {saperator && <span className={cx('timer-separator')}>{saperator}</span>}
          </>
        )}
        <span className={cx('timer-counter')}>
          <span ref={secondsSpanRef}>{formatValueInTimerForm(seconds)}</span>
          {suffix?.seconds && <span className={cx('timer-suffix')}>{suffix.seconds}</span>}
        </span>
      </span>
    </span>
  );
};

/**
 * ms단위 숫자 값을 TimerDuration 객체 타입으로 변환하는 함수
 * @param ms ms단위 숫자 형태의 duration 값
 * @returns ms단위 duration을 TimerDuration 객체 타입으로 변환한 값
 */
const convertMsToTime = (totalMs: number): TimerDuration => {
  const totalSeconds = totalMs / ONE_MILLI_SCDS;

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.ceil(totalSeconds % 60);

  /**
   * 현재 남은 타이머 시간에서 존재하는 ms단위의 값
   */
  const restMs = totalMs % ONE_MILLI_SCDS;

  return {
    days,
    hours,
    minutes,
    seconds: seconds === 60 ? 59 : seconds,
    restMs
  };
};

/**
 * 시, 분, 초로 구성된 객체의 시간값을 ms단위로 변환하는 함수
 * @param timerDutation 시, 분, 초로 구성된 객체의 시간값
 * @returns 객체의 밀리초 변환값
 */
const convertTimeToMs = (timerDuration: Partial<TimerDuration> | number) => {
  if (typeof timerDuration === 'number') {
    return timerDuration;
  }

  const { days = 0, hours = 0, minutes = 0, seconds = 0 } = timerDuration;

  // 각 시간 단위를 밀리초로 변환
  const daysMs = days * 86400;
  const hoursMs = hours * 3600 * ONE_MILLI_SCDS;
  const minutesMs = minutes * 60 * ONE_MILLI_SCDS;
  const secondsMs = seconds * ONE_MILLI_SCDS;
  const totalMs = daysMs + hoursMs + minutesMs + secondsMs;

  return totalMs;
};

export default Timer;
export type { TimerProps };
