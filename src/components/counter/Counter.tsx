'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { makeCxFunc } from '@/utils/forReactUtils';

import style from './Counter.module.scss';
import { formatNumberValueWithComma, splitNumberStringByComma } from '@/utils/valueParserUtils';

const cx = makeCxFunc(style);

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
const Counter = ({
  className = '',
  endValue = 0,
  startValue = 0,
  delay = 0,
  countOnIntersected = true,
  duration = 1500,
  separator = true,
  iterationCount = 1,
  pause = false,
  digits = 0,
  usePauseResume = false,
  onEnd
}: CounterProps) => {
  /**
   * startOnIntersected prop이 true일 시 옵저버 감지를 위하여 참조를 걸기 위한 참조 변수
   */
  const counterElRef = useRef<HTMLSpanElement>(null);

  /**
   * 매 주사율마다 다음 주사율에 계산될 숫자를 저장하기 위한 참조 변수
   */
  const nextFrameValueRef = useRef(startValue);

  /**
   * 애니메이션이 시작한 시간을 기억하기 위한 참조 변수
   */
  const startTimeRef = useRef(0);

  /**
   * 카운터의 남은 시간을 기억하는 참조 변수
   */
  const remainingTimeRef = useRef(duration);

  /**
   * 애니메이션의 id값을 기억하기 위한 참조 변수
   */
  const animationIdRef = useRef<number | null>(null);

  /**
   * 카운터 애니메이션을 resolve하는 함수를 저장하는 참조 변수
   */
  const runnerFunctionRef = useRef<(timestamp: number) => void>(null);

  /**
   * 카운터의 상태를 저장하는 ref
   * @example go - 카운터가 정상적으로 작동하고 있는 경우의 상태
   * @example props-changed - props가 변경되어 카운터를 강제종료해야할 때, 설정하는 상태
   * @example paused - 카운터가 멈춰있는 상태
   */
  const counterStatusRef = useRef<'go' | 'props-changed' | 'paused'>(pause ? 'paused' : 'go');

  const abortControllerRef = useRef<AbortController>(null);

  const [paused, setPaused] = useState(pause);

  const [counterEnd, setCounterEnd] = useState(false);

  /**
   * 카운터 애니메이션이 진행될 방향
   */
  const direction = useMemo<'up' | 'down'>(
    () => (endValue > startValue ? 'up' : 'down'),
    [endValue, startValue]
  );

  /**
   * 애니메이션에서 보여줄 숫자들의 소숫점 자릿수
   */
  const endValueDecimalDigit = useMemo(
    () => (digits === undefined ? getDicimalLength(endValue) : digits),
    [digits, endValue]
  );

  /**
   * 다음 주사율에 계산될 숫자를 계산하는 함수
   * @param timestamp - 타임스탬프 값
   */
  const calcNextFrameValue = useCallback(
    (timestamp: number) => {
      const progress = timestamp - startTimeRef.current;

      remainingTimeRef.current = duration - progress;

      return startValue + (endValue - startValue) * (progress / duration);
    },
    [duration, endValue, startValue]
  );

  /**
   * 렌더링 타임에 보여질 값을 표현하고자 하는 소숫점으로 반올림, 절삭 및 콤마로 분철처리를 수행하는 함수
   * @param nextRenderValue - 다음 프레임에 화면에 보여져야 할 정제되지 않은 값
   */
  const roundDownValueByDigit = useCallback(
    (nextRenderValue: number) => {
      const [integerPart, decimalPart] = splitNumberStringByComma(String(nextRenderValue));

      const roundDownDecimal =
        endValueDecimalDigit && decimalPart ? `.${decimalPart.slice(0, endValueDecimalDigit)}` : '';

      const nextValueRoundDown = integerPart + roundDownDecimal;

      if (separator) {
        return formatNumberValueWithComma(nextValueRoundDown);
      }
      return nextValueRoundDown;
    },
    [endValueDecimalDigit, separator]
  );

  /**
   * 다음 주사율에 맞는 숫자값을 nextFrameValue.current에 저장하고 calcNextRenderValue 함수를 호출하는 함수
   * @param timestamp - requestAnimationFrame의 callback 함수가 주입하는 타임스탬프 값
   */
  const updateValue = useCallback(
    (timestamp: number) => {
      const nextFrameValue = calcNextFrameValue(timestamp);

      nextFrameValueRef.current = nextFrameValue;

      return roundDownValueByDigit(nextFrameValue);
    },
    [calcNextFrameValue, roundDownValueByDigit]
  );

  /**
   * 다음 렌더링 타임에 보여질 숫자가 최종적으로 계산된 후, 해당 숫자를 카운터 요소에 렌더하는 함수
   * @param valueToBeRendered - 이번 프레임에 화면에 보여줄 최종 숫자값
   */
  const renderValue = useCallback((valueToBeRendered: string) => {
    const { current: counterEl } = counterElRef;

    if (counterEl) {
      counterEl.innerHTML = valueToBeRendered;
    }
  }, []);

  /**
   * 카운터를 초기화하기 위해 ref 변수들을 리셋하는 함수
   */
  const resetCounterRefValues = useCallback(() => {
    nextFrameValueRef.current = startValue;
    remainingTimeRef.current = duration;
    startTimeRef.current = performance.now();
    animationIdRef.current = null;
    counterStatusRef.current = 'go';
  }, [startValue, duration]);

  /**
   * 매 프레임마다 카운트가 진행되는 숫자들을 그리기 위해 requestAnimationFrame를 실행하는 함수
   * @example break - props가 바뀌어서 카운터를 다시 실행하기 위해 resolve에 반환하는 값
   * @example done - 정상적으로 모든 카운트 순회를 마치고 resolve에 반환하는 값
   */
  const performAnimation = useCallback((): Promise<'break' | 'done'> => {
    return new Promise((resolve) => {
      /** requestAnimationFrame를 실행하는 함수 */
      const run = (timestamp: number) => {
        // props가 바뀌었으면 현재 카운터 순회에서 벗어남
        if (counterStatusRef.current === 'props-changed') {
          return resolve('break');
        }

        /** 값이 endValue를 지나친 경우인지 여부 */
        const exceedsEndValue =
          direction === 'up'
            ? nextFrameValueRef.current >= endValue
            : nextFrameValueRef.current <= endValue;

        if (exceedsEndValue) {
          renderValue(roundDownValueByDigit(endValue));
          return resolve('done');
        }

        renderValue(updateValue(timestamp));
        animationIdRef.current = requestAnimationFrame(run);
      };

      // 카운터를 처음부터 돌리기 위해 ref 값 초기화
      resetCounterRefValues();

      // 멈춤, 재실행 시 이전까지 진행하고 있던 run 함수의 참조를 위해 저장
      runnerFunctionRef.current = run;

      // 애니메이션 시작
      animationIdRef.current = requestAnimationFrame(run);
    });
  }, [endValue, direction, resetCounterRefValues, renderValue, updateValue, roundDownValueByDigit]);

  /**
   * 카운터를 시작하는 함수
   */
  const operateCounter = useCallback(async () => {
    for (let i = 0; i < iterationCount; i++) {
      if (delay > 0) {
        const delayResult = await waitWithAbort(delay, abortControllerRef.current.signal);

        // delay 도중에 멈춤 상태가 되어 대기를 해야하는 경우
        if (counterStatusRef.current === 'paused') {
          i--;
          continue;
        }

        // delay 도중에 props가 바뀌어 리셋이 필요한 경우
        if (delayResult === 'aborted') {
          break;
        }
      }

      const iterationResult = await performAnimation();

      // 애니메이션이 동작하는 도중에 props가 바뀌어 리셋이 필요한 경우
      if (iterationResult === 'break') {
        break;
      }

      // 애니메이션의 모든 순회가 끝난 경우
      if (i === iterationCount - 1 && iterationResult === 'done') {
        setCounterEnd(true);
      }
    }

    // 순회가 끝나고 카운터가 종료된 후, 러너함수 메모리 해제
    runnerFunctionRef.current = null;
  }, [delay, iterationCount, performAnimation]);

  /**
   * 카운터를 실행하는 함수
   */
  const setCounter = useCallback(() => {
    if (countOnIntersected && typeof Window !== 'undefined') {
      const io = new IntersectionObserver(
        ([{ intersectionRatio }]) => {
          if (intersectionRatio > 0) {
            operateCounter();

            io.disconnect();
          }
        },
        {
          root: null,
          rootMargin: '100px 0px',
          threshold: [0.1, 0.2, 0.3, 0.4, 0.5, 0.7, 0.8, 0.9, 1.0]
        }
      );

      io.observe(counterElRef.current);
    } else {
      operateCounter();
    }
  }, [countOnIntersected, operateCounter]);

  /**
   * 카운터를 멈춤, 재실행하는 함수
   */
  const onTogglePauseResume = useCallback(() => {
    if (paused) {
      // 애니메이션 재개

      counterStatusRef.current = 'go';

      if (runnerFunctionRef.current) {
        // delay 도중에 pause를 바꾸는게 아니라 카운터가 작동하다가 변경된 경우 (이 경우는 러너 함수가 존재함)
        startTimeRef.current = performance.now() - (duration - remainingTimeRef.current);
        requestAnimationFrame(runnerFunctionRef.current);
      }
    } else {
      // 애니메이션 정지
      counterStatusRef.current = 'paused';
      cancelAnimationFrame(animationIdRef.current);
    }

    setPaused(!paused);
  }, [duration, paused]);

  // 이 effect는 props가 변경되어 카운터를 초기화하기 위해 존재합니다.
  useEffect(() => {
    abortControllerRef.current = new AbortController();

    // 초기값 UI 바인딩
    renderValue(roundDownValueByDigit(startValue));

    // pause prop의 값대로 paused 상태 초기화
    setPaused(pause);

    // 카운터 리셋 후에 참조할 멈춤 상태 설정
    setTimeout(() => {
      counterStatusRef.current = pause ? 'paused' : 'go';
    }, 20);

    // 카운터 실행
    setCounter();

    return () => {
      // props 의존성이 변경되어 리셋을 위해 abort 실행
      abortControllerRef.current.abort();

      // props가 바뀐 경우 run 함수에서 애니메이션 반복을 break하기 위해 ref값 변경
      counterStatusRef.current = 'props-changed';
    };
  }, [
    startValue,
    endValue,
    delay,
    duration,
    separator,
    iterationCount,
    digits,
    pause,
    renderValue,
    roundDownValueByDigit,
    setCounter
  ]);

  // 카운터가 정상적으로 종료되었을 때, onEnd함수를 호출할 수 있는 effect 함수
  useEffect(() => {
    if (counterEnd) {
      onEnd?.();

      setCounterEnd(false);
    }
  }, [counterEnd, onEnd]);

  return (
    <span className={cx('counter-wrapper', className)}>
      <span ref={counterElRef} className={cx('counter-value')} />
      {usePauseResume && (
        <button onClick={onTogglePauseResume}>{paused ? 'resume' : 'pause'}</button>
      )}
    </span>
  );
};

/**
 * 숫자값에서 소숫점이 몇 째 자리까지 존재하는지 확인하는 함수
 * @param value 몇 째 자리 소숫점까지 존재하는지 확인하려는 숫자값
 * @returns 숫자값이 가진 소숫점의 자리
 */
const getDicimalLength = (value: number): number =>
  splitNumberStringByComma(String(value))[1]?.length || 0;

/**
 * delay 도중 props가 변경되었을 때, 카운터의 순회를 break할 수 있는 함수
 * @param delay - 카운터의 ms단위 delay 값
 * @param signal - AbortController의 시그널 객체
 *
 * @example aborted - delay 도중 props가 변경되었을 경우 resolve에 반환할 값
 * @example pass - 정상적으로 delay 시간이 지나갔을 때 resolve에 반환할 값
 */
const waitWithAbort = (delay: number, signal: AbortSignal): Promise<'aborted' | 'pass'> => {
  return new Promise((resolve) => {
    const timeoutId = setTimeout(() => {
      resolve('pass');
    }, delay);

    signal.addEventListener('abort', () => {
      clearTimeout(timeoutId);

      resolve('aborted');
    });
  });
};

export default Counter;
export type { CounterProps };
