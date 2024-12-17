'use client';

import React from 'react';
import { MouseEvent, ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import { makeCxFunc } from '@/utils/forReactUtils';
import { SvgIcoRefresh } from '@/assets/svgs';
import style from './RefreshButton.module.scss';

const cx = makeCxFunc(style);

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
const RefreshButton = ({
  className = '',
  duration = 5,
  showCount = true,
  iconElement = <SvgIcoRefresh />,
  disabled = false,
  onClick,
  onRefresh
}: RefreshButtonProps) => {
  /** setInterval 인터벌 id를 기억하는 참조 변수 */
  const intervalIdRef = useRef<number>(null);

  /** 현재 카운트된 값을 저장하는 참조 변수 */
  const countRef = useRef<number | false>(!duration ? false : duration);

  /** 카운트된 값을 보여주는 span 요소를 참조하는 변수 */
  const countSpanRef = useRef<HTMLSpanElement>();

  /** duration을 다 지나고 refreshed 상태인지를 나타내는 상태 */
  const [refreshed, setRefreshed] = useState(false);

  const clearIntervalId = useCallback(() => {
    window.clearInterval(intervalIdRef.current);
    intervalIdRef.current = null;
  }, []);

  /**
   * duration 동안 시간을 순회하면서 매 초 마다 카운트 UI를 업데이트하고 refreshed 상태를 변경할 함수
   */
  const handleIntervalCount = useCallback(() => {
    if (intervalIdRef.current) {
      clearIntervalId();
    }

    if (duration && countSpanRef.current) {
      countRef.current = duration;
      countSpanRef.current.innerHTML = `${countRef.current}`;

      intervalIdRef.current = window.setInterval(() => {
        if (typeof countRef.current === 'number' && countRef.current > 0) {
          countRef.current -= 1;
        } else {
          countRef.current = duration;
        }

        setRefreshed(countRef.current === 0);

        countSpanRef.current.innerHTML = `${countRef.current > 0 ? countRef.current : ''}`;
      }, 1000);
    }
  }, [duration, clearIntervalId]);

  /**
   * 리프레시 버튼을 누르면 동작할 함수
   */
  const handleOnClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      if (!refreshed) {
        setRefreshed(true);

        handleIntervalCount();

        onClick && onClick(e);
      }
    },
    [refreshed, onClick, handleIntervalCount]
  );

  useEffect(() => {
    if (refreshed && countRef.current === 0) {
      countRef.current = -1;
      onRefresh && onRefresh();
    }
  }, [onRefresh, refreshed]);

  useEffect(() => {
    handleIntervalCount();
  }, [handleIntervalCount]);

  useEffect(() => {
    if (disabled) {
      clearIntervalId();
    } else {
      handleIntervalCount();
    }
  }, [disabled, handleIntervalCount, clearIntervalId]);

  useEffect(() => {
    return () => {
      if (intervalIdRef.current) {
        clearIntervalId();
      }
    };
  }, [clearIntervalId]);

  return (
    <span className={cx('refresh', className)}>
      <button className={cx('btn-refresh')} onClick={handleOnClick} disabled={disabled}>
        <i
          className={cx('btn-refresh-ico', { refreshed })}
          onAnimationEnd={() => setRefreshed(false)}
        >
          {iconElement}
        </i>
        {showCount && !!duration && (
          <span ref={countSpanRef} className={cx('btn-refresh-count')}></span>
        )}
      </button>
    </span>
  );
};

export default RefreshButton;
export type { RefreshButtonProps };
