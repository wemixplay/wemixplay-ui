'use client';

import { debounce } from 'lodash';
import React, { ChangeEvent, ReactElement, useCallback, useEffect, useMemo, useState } from 'react';

import { makeCxFunc } from '@/utils/forReactUtils';
import { getFloatFixed } from '@/utils/valueParserUtils';

import { SvgIcoStarOff, SvgIcoStarOn } from '@/assets/svgs';

import style from './Rating.module.scss';

type Props = {
  className?: string;
  /** 최소 평점 */
  min?: number;
  /** 최대 평점 */
  max?: number;
  /** 평점 점수 증가 간격 */
  step?: number;
  /** 평점 아이콘들 간에 간격 (짝수 권장) */
  gap?: number | string;
  /** 평점 아이콘의 높이 값 */
  size?: number | string;
  /** 상위 컴포넌트에서 주입하는 평점 */
  value?: number;
  /**
   * 해당 컴포넌트 안에 input 요소에 반영될 name 값
   *
   * handleChange 2번째 인자에 해당 name 값이 전달됨
   */
  name?: string;
  /** active된 평점 아이콘 */
  onIcon?: ReactElement;
  /** unactive된 평점 아이콘 */
  offIcon?: ReactElement;
  /** readonly 여부 */
  readOnly?: boolean;
  /** 평점 아이콘들 옆에 점수를 나타낼 것인지 여부 */
  showScore?: boolean;
  /** 평점(input 값)이 변경될때 호출되는 함수 */
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  /**
   * 평점(input 값)이 변경될때 호출되는 함수
   *
   * 첫번째 인자로는 평점 값을 두번째 인자로는 name값이 전달됨
   * */
  handleChange?: (value: number, name?: string) => void;
};

const cx = makeCxFunc(style);

/**
 * `Rating` 컴포넌트는 별점과 같은 폄점을 표시하는 데 사용되며, 사용자는 평점을 주거나 평점을 읽기 전용으로 표시할 수 있습니다.
 *
 * @component
 * @param {string} [props.className] - 컴포넌트에 적용할 CSS 클래스 이름.
 * @param {number} [props.min=0] - 최소 평점 값.
 * @param {number} [props.max=5] - 최대 평점 값.
 * @param {number} [props.step=0.5] - 평점 점수의 증가 간격.
 * @param {number} [props.size=40] - 평점 아이콘의 높이 값 (픽셀 단위).
 * @param {number} [props.gap] - 평점 아이콘들 간의 간격 (픽셀 단위).
 * @param {string} [props.name] - input 요소에 반영될 name 값. handleChange 함수의 두 번째 인자로 전달됩니다.
 * @param {ReactElement} [props.onIcon=<SvgIcoStarOn />] - 활성화된 별 아이콘을 표시.
 * @param {ReactElement} [props.offIcon=<SvgIcoStarOff />] - 비활성화된 별 아이콘을 표시.
 * @param {number} [props.value] - 상위 컴포넌트에서 주입하는 별점 값.
 * @param {boolean} [props.readOnly] - 평점이 읽기 전용인지 여부. true일 경우 사용자는 평점을 변경할 수 없습니다.
 * @param {boolean} [props.showScore] - 평점 옆에 점수를 표시할지 여부.
 * @param {function} [props.onChange] - 평점(input 값)이 변경될 때 호출되는 함수. 첫 번째 인자로는 이벤트 객체가 전달됩니다.
 * @param {function} [props.handleChange] - 평점(input 값)이 변경될 때 호출되는 함수. 첫 번째 인자로는 평점 값, 두 번째 인자로는 name 값이 전달됩니다.
 */
const Rating = ({
  className = '',
  min = 0,
  max = 5,
  step = 0.5,
  size = 40,
  gap,
  name,
  onIcon = <SvgIcoStarOn />,
  offIcon = <SvgIcoStarOff />,
  value,
  readOnly,
  showScore,
  onChange,
  handleChange
}: Props) => {
  /** 컴포넌트 내부 별점 값 state */
  const [score, setScore] = useState(0);

  /**
   * 별점이 변경될때 호출되는 함수
   *
   * CPU 사용률을 효율적으로 관리하기 위해 debouce처리
   */
  const handleStarRatioChange = useMemo(
    () =>
      debounce((e: ChangeEvent<HTMLInputElement>) => {
        const { value: targetValue, name } = e.target;
        const numberValue = Number(targetValue);

        // value 값이 없을때만 내부 별점 state를 mutate
        if (typeof value === 'undefined') {
          setScore(numberValue);
        }

        handleChange && handleChange(numberValue, name);
        onChange && onChange(e);
      }, 10),
    [value, onChange, handleChange]
  );

  /**
   * 활성화된 별이 갖는 width 퍼센트를 계산하는 함수
   *
   * @param {number} order - 별의 순서
   * @return {string} order(별의 순서)에 따른 width 퍼센트
   */
  const caculateWidthPercenter = useCallback(
    (order: number) => {
      /** 전체 넓이에서 별 하나가 차지하는 비율 */
      const oneStarRatio = 100 / max;

      /** 현재 별점으로의 전체 width 퍼센트 값 */
      const currentFullPercent = score * oneStarRatio;
      /** 이전 별까지의 width 퍼센트 값 */
      const prevFullWidthPercent = (order - 1) * oneStarRatio;

      /** 순서(order)에 따른 별이 가지는 전체 넓이의 width 비율 */
      const orderWidthPercent =
        currentFullPercent - prevFullWidthPercent > 0
          ? ((currentFullPercent - prevFullWidthPercent) / oneStarRatio) * 100
          : 0;

      // orderWidthPercent가 100이 넘으면 100으로 반환
      return `${orderWidthPercent > 100 ? 100 : orderWidthPercent}%`;
    },
    [max, score]
  );

  /** props.value값과 내부 state인 score를 동기화 */
  useEffect(() => {
    if (value !== undefined && value !== score) {
      setScore(value);
    }
  }, [value, score]);

  return (
    <div className={cx(className, 'stars')} style={{ height: size }}>
      <div className={cx('star-area')} style={{ columnGap: gap }}>
        {Array.from({ length: max }).map((_, index) => (
          <div key={index} className={cx('star')}>
            {offIcon}
            <span className={cx('active')} style={{ width: caculateWidthPercenter(index + 1) }}>
              {onIcon}
            </span>
          </div>
        ))}

        <input
          type="range"
          tabIndex={-1}
          min={min}
          max={max}
          step={step}
          name={name}
          defaultValue={score}
          disabled={readOnly}
          onChange={handleStarRatioChange}
        />
      </div>
      {showScore && (
        <div className={cx('score')}>
          <span className={cx('current')}>{getFloatFixed(score, 1)}</span>
          <span className={cx('max')}>/{max}</span>
        </div>
      )}
    </div>
  );
};

export type { Props as RatingProps };
export default Rating;
