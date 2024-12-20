'use client';

import React, {
  CSSProperties,
  ChangeEvent,
  KeyboardEvent,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState
} from 'react';

import { makeCxFunc } from '@/utils/forReactUtils';
import { commaWithValue, commaStrToNumber } from '@/utils/valueParserUtils';

import style from './MultiRangeInput.module.scss';

type MultiRangeInputForwardRef = { focus: (options?: FocusOptions) => void };

type Props = {
  className?: string;
  /** 최소값 */
  min: number;
  /** 최대값 */
  max: number;
  /** 값 변경 크기 */
  step?: number;
  /** thumb 사이즈 */
  thumbSize?: number;
  /** slider 높이 */
  sliderHeight?: number;
  /** thumb 테두리 색상 */
  thumbBorderColor?: CSSProperties['borderColor'];
  /** thumb 색상 */
  thumbColor?: CSSProperties['backgroundColor'];
  /** track 색상 */
  trackColor?: CSSProperties['backgroundColor'];
  /** range 색상 */
  rangeColor?: CSSProperties['backgroundColor'];
  /** 텍스트 입력 영역 표시 여부 */
  showTextInput?: boolean;
  /**
   * handleChange 두번째 인자로 전달될 name 값
   */
  name?: string;
  /**
   * 바인딩할 데이터 값
   */
  value?: number[];
  /**
   * 값이 변경될 때 호출될 함수 (첫번째 인자는 [0, 100]과 같이 배열로 전달)
   */
  handleChange?: (value: JSONObject, name: string) => void;
  /** 값이 변경될 때 호출될 함수 (이벤트를 인자로 하여 호출) */
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

const cx = makeCxFunc(style);

/**
 * `MultiRangeInput`은 최소값과 최대값을 지정할 수 있게 하는 컴포넌트 입니다.
 *
 * @param {string} [props.className] - 추가적인 CSS 클래스 이름
 * @param {number} [props.min] - 슬라이더의 최소값
 * @param {number} [props.max] - 슬라이더의 최대값
 * @param {number} [props.step] - 슬라이더의 값 변경 단위 (기본값: 1)
 * @param {number} [props.thumbSize] - 슬라이더 thumb의 크기 (픽셀 단위)
 * @param {number} [props.sliderHeight] - 슬라이더의 높이 (픽셀 단위)
 * @param {string} [props.thumbBorderColor] - thumb 테두리 색상
 * @param {string} [props.thumbColor] - thumb 색상
 * @param {string} [props.trackColor] - track 색상
 * @param {string} [props.rangeColor] - range 색상
 * @param {boolean} [props.showTextInput] - 텍스트 입력 영역 표시 여부
 * @param {string} [props.name] - handleChange 두 번째 인자로 전달될 name 값
 * @param {number[]} [props.value] - 바인딩할 데이터 값 (배열 형태)
 * @param {function} [props.handleChange] - 값이 변경될 때 호출될 함수
 * @param {function} [props.onChange] - 값이 변경될 때 호출될 함수 (이벤트를 인자로 받음)
 * @param {React.Ref} ref - 컴포넌트에 대한 참조 객체
 */
const MultiRangeInput = forwardRef<MultiRangeInputForwardRef, Props>((props, ref) => {
  const {
    className = '',
    value,
    name,
    min,
    max,
    step = 1,
    thumbSize = 26,
    sliderHeight = 6,
    thumbBorderColor,
    thumbColor,
    trackColor,
    rangeColor,
    showTextInput = true,
    handleChange,
    onChange
  } = props;

  const preValueRef = useRef([min, max]);
  const inputLeftRef = useRef<HTMLInputElement | null>(null);
  const inputRightRef = useRef<HTMLInputElement | null>(null);
  const textInpLeftRef = useRef<HTMLInputElement | null>(null);
  const textInpRightRef = useRef<HTMLInputElement | null>(null);

  const [range, setRange] = useState([min, max]);

  const percent = useMemo(() => {
    return range.map((rangeVal) => ((rangeVal - min) / (max - min)) * 100);
  }, [range, min, max]);

  const syncTextValue = useCallback(() => {
    if (!textInpLeftRef.current || !textInpRightRef.current) return;

    textInpLeftRef.current.value = commaWithValue(range[0]);
    textInpRightRef.current.value = commaWithValue(range[1]);
    textInpLeftRef.current.style.width = `${textInpLeftRef.current.scrollWidth}px`;
    textInpRightRef.current.style.width = `${textInpRightRef.current.scrollWidth}px`;
  }, [range]);

  const onEnterTextInp = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      textInpLeftRef.current.blur();
      textInpRightRef.current.blur();
    }
  }, []);

  const onChangeSlide = useCallback(
    (direction: 'left' | 'right', e: ChangeEvent<HTMLInputElement>, changeEmit = false) => {
      if (!textInpLeftRef.current || !textInpRightRef.current) return;

      const { value: domValue } = e.target;

      if (direction === 'left') {
        let putValue = Math.min(commaStrToNumber(domValue), range[1] - step);
        putValue = putValue > min ? putValue : min;
        setRange([putValue, range[1]]);
        if (changeEmit) handleChange && handleChange([putValue, range[1]], name);
        textInpLeftRef.current.value = commaWithValue(putValue);
      } else {
        let putValue = Math.max(commaStrToNumber(domValue), range[0] + step);
        putValue = putValue <= max ? putValue : max;
        setRange([range[0], putValue]);
        if (changeEmit) handleChange && handleChange([range[0], putValue], name);
        textInpRightRef.current.value = commaWithValue(putValue);
      }

      onChange && onChange(e);
      syncTextValue();
    },
    [onChange, syncTextValue, handleChange, name, range, step, min, max]
  );

  const onMouseUp = useCallback(() => {
    if (range.some((number, index) => number !== preValueRef.current[index])) {
      preValueRef.current = [...range];
      handleChange && handleChange(range, name);
    }
  }, [range, name, handleChange]);

  useEffect(() => {
    syncTextValue();
  }, [syncTextValue]);

  useEffect(() => {
    if (typeof value !== 'undefined') {
      setRange(value);
      preValueRef.current = [...value];
    }
  }, [value]);

  useImperativeHandle(ref, () => ({
    focus: inputLeftRef.current.focus
  }));

  return (
    <div
      className={cx('range-input', className, { disabled: min === max })}
      style={
        {
          '--mri-thumb-size': `${thumbSize}px`,
          '--mri-slider-height': `${sliderHeight}px`,
          '--mri-thumb-border-color': thumbBorderColor,
          '--mri-thumb-color': thumbColor,
          '--mri-track-color': trackColor,
          '--mri-range-color': rangeColor
        } as CustomCSSProperties
      }
    >
      <div className={cx('range-area')}>
        <div>
          <input
            ref={inputLeftRef}
            type="range"
            value={range[0]}
            min={min}
            max={max}
            step={step}
            onChange={(e) => onChangeSlide('left', e)}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            onTouchEnd={onMouseUp}
          />
          <input
            ref={inputRightRef}
            type="range"
            value={range[1]}
            id="input-right"
            min={min}
            max={max}
            step={step}
            onChange={(e) => onChangeSlide('right', e)}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            onTouchEnd={onMouseUp}
          />

          <div className={cx('slider')}>
            <div className={cx('track')}></div>
            <div
              className={cx('range')}
              style={{ left: `${percent[0]}%`, right: `${100 - percent[1]}%` }}
            ></div>
            <div className={cx('thumb', 'left')} style={{ left: `${percent[0]}%` }}></div>
            <div className={cx('thumb', 'right')} style={{ right: `${100 - percent[1]}%` }}></div>
          </div>
        </div>
      </div>
      {showTextInput && (
        <div className={cx('range-input')}>
          <div className={cx('input-box')}>
            <label htmlFor="rangeMinInput">min</label>
            <input
              ref={textInpLeftRef}
              type="text"
              inputMode="numeric"
              defaultValue={range[0]}
              disabled={min === max}
              onBlur={(e) => onChangeSlide('left', e, true)}
              onKeyDown={onEnterTextInp}
            />
          </div>
          <div className={cx('input-box')}>
            <label htmlFor="rangeMaxInput">max</label>
            <input
              ref={textInpRightRef}
              type="text"
              inputMode="numeric"
              defaultValue={range[1]}
              disabled={min === max}
              onBlur={(e) => onChangeSlide('right', e, true)}
              onKeyDown={onEnterTextInp}
            />
          </div>
        </div>
      )}
    </div>
  );
});

MultiRangeInput.displayName = 'MultiRangeInput';

type CustomCSSProperties = CSSProperties & {
  '--mri-thumb-size': string;
  '--mri-slider-height': string;
  '--mri-thumb-border-color': string;
  '--mri-thumb-color': string;
  '--mri-track-color': string;
  '--mri-range-color': string;
};

export type { Props as MultiRangeInputProps };
export default MultiRangeInput;
