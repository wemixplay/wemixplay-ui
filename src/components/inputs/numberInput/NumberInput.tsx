'use client';

import Decimal from 'decimal.js';
import { last, replace } from 'lodash';
import React, {
  forwardRef,
  useRef,
  useEffect,
  useState,
  useCallback,
  ChangeEvent,
  ReactElement,
  useMemo,
  useImperativeHandle,
  HTMLInputAutoCompleteAttribute
} from 'react';

import { makeCxFunc } from '@/utils/forReactUtils';
import { commaStrToNumber, makeParts } from '@/utils/valueParserUtils';

import { SvgKeyboardArrowDown2, SvgKeyboardArrowUp2 } from '@/assets/svgs';

import Ripple, { RippleOption } from '../../ripple/Ripple';

import style from './NumberInput.module.scss';

interface Props
  extends Pick<
    React.InputHTMLAttributes<HTMLInputElement>,
    | 'className'
    | 'name'
    | 'autoComplete'
    | 'placeholder'
    | 'disabled'
    | 'readOnly'
    | 'onChange'
    | 'onBlur'
    | 'onFocus'
    | 'onKeyDown'
  > {
  className?: string;
  /** 입력 필드(input) name 값 */
  name?: string;
  /** up, down 버튼을 눌렀을때 증가/감소되는 값 */
  step?: number;
  /** up 버튼을 눌렀을때 증가되는 값 */
  increaseStep?: number;
  /** down 버튼을 눌렀을때 감소되는 값 */
  decreaseStep?: number;
  /** 입력 필드의 현재 값 */
  value?: string;
  /** error 유무 */
  error?: boolean;
  /** 최소값 */
  min?: string | number;
  /** 최대값 */
  max?: string | number;
  /** 정수의 최대 길이 */
  maxLength?: number | string;
  /** 최대 소수점 자리 */
  digit?: number;
  /** 직접 입력 허용 여부 */
  isDirect?: boolean;
  /** 비활성화 여부 */
  disabled?: boolean;
  /** 읽기 전용 활성화 여부 */
  readOnly?: boolean;
  /** placeholder */
  placeholder?: string;
  /** 자동완성 기능 활성화 여부 */
  autoComplete?: HTMLInputAutoCompleteAttribute;
  /** 증가/감소 버튼 UI 숨김 여부 */
  hideButton?: boolean;
  /** up 버튼안에 노출할 icon 컴포넌트 */
  arrowUpElement?: ReactElement;
  /** down 버튼안에 노출할 icon 컴포넌트 */
  arrowDownElement?: ReactElement;
  /** ripple 옵션 */
  rippleOption?: RippleOption;
  /**
   * 값이 변경될 때 호출될 함수
   *
   * @param {string} value - 변경된 값
   * @param {string} name - 입력 필드(input) name 값
   * @param {{ type: 'up' | 'down' }} option - up/down 버튼을 눌렀을 경우 전달
   */
  handleChange?: (value: string, name?: string, option?: { type: 'up' | 'down' }) => void;
  /**
   * 엔터 키가 눌렸을 때 호출될 함수
   *
   * @param {string} value - 변경된 값
   * @param {string} name - 입력 필드(input) name 값
   */
  handleEnter?: (value: string, name?: string) => void;
}

const cx = makeCxFunc(style);

const inputModeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const inputValue = e?.target?.value;
  // 01 -> 1 00 -> 0  '0' 이 연속으로 들어가지 않도록 치환
  const zeroReplaceValue = replace(inputValue, /^0+[\d,]/gm, (match: string) => {
    return last(match);
  });
  // 0-9 or '.' 빼고 문자열 들어가지 않도록 치환 & separator 제거
  const currentValue = zeroReplaceValue.replace(/[^\d.-]/g, '');

  return currentValue;
};

/**
 * `NumberInput` 컴포넌트는 숫자 값을 입력하기 위한 사용자 정의 가능한 입력 컴포넌트입니다. 증가 및 감소 버튼, 이러한 버튼에 대한 사용자 정의 단계 값, 오류 처리 등을 지원합니다. 기본 HTML 입력 요소의 여러 속성을 확장하여 원활한 통합을 제공합니다.
 *
 *
 * @param {string} [props.className] - 컴포넌트에 적용할 추가 CSS 클래스 이름
 * @param {string} [props.name] - 입력 필드의 name 속성
 * @param {string} [props.autoComplete] - 입력의 자동 완성 기능을 활성화 또는 비활성화
 * @param {string} [props.placeholder] - 입력 필드의 placeholder 텍스트
 * @param {boolean} [props.disabled=false] - true인 경우 입력 필드를 비활성화
 * @param {boolean} [props.readOnly=false] - true인 경우 입력 필드를 읽기 전용으로 만듭니다
 * @param {function} [props.onChange] - 입력 값이 변경될 때 호출되는 콜백 함수
 * @param {function} [props.onBlur] - 입력 필드가 포커스를 잃을 때 호출되는 콜백 함수
 * @param {function} [props.onFocus] - 입력 필드가 포커스를 얻을 때 호출되는 콜백 함수
 * @param {function} [props.onKeyDown] - 입력 필드에서 키가 눌렸을 때 호출되는 콜백 함수
 * @param {number} [props.step=1] - 입력 값이 증가 또는 감소해야 하는 양
 * @param {number} [props.increaseStep] - 증가 버튼을 누를 때 입력 값이 증가해야 하는 양
 * @param {number} [props.decreaseStep] - 감소 버튼을 누를 때 입력 값이 감소해야 하는 양
 * @param {string|number} [props.value] - 입력 필드의 현재 값
 * @param {boolean} [props.error=false] - 입력 필드가 오류 상태인지 나타냅니다
 * @param {string|number} [props.min] - 허용되는 최소 값
 * @param {string|number} [props.max] - 허용되는 최대 값
 * @param {number|string} [props.maxLength] - 정수 부분의 최대 길이
 * @param {number} [props.digit] - 허용되는 최대 소수점 자릿수
 * @param {boolean} [props.isDirect=true] - true인 경우 직접 입력을 허용합니다
 * @param {boolean} [props.hideButton] - 증가/감소 버튼 UI 숨김 여부
 * @param {ReactElement} [props.arrowUpElement=<SvgKeyboardArrowUp2 />] - 증가 버튼 내부에 표시할 사용자 정의 컴포넌트
 * @param {ReactElement} [props.arrowDownElement=<SvgKeyboardArrowDown2 />] - 감소 버튼 내부에 표시할 사용자 정의 컴포넌트
 * @param {Object} [props.rippleOption] - 버튼 클릭 시 리플 효과에 대한 옵션
 * @param {function} [props.handleChange] - 입력 값이 변경될 때 호출되는 콜백 함수, 증가/감소에 대한 추가 옵션 매개변수 포함
 * @param {function} [props.handleEnter] - Enter 키가 눌렸을 때 호출되는 콜백 함수
 *
 * @returns {JSX.Element} NumberInput 컴포넌트
 */
const NumberInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      className = '',
      step = 1,
      error,
      isDirect = true,
      increaseStep,
      decreaseStep,
      maxLength,
      arrowUpElement = <SvgKeyboardArrowUp2 />,
      arrowDownElement = <SvgKeyboardArrowDown2 />,
      rippleOption,
      hideButton,
      handleChange,
      handleEnter,
      ...inputProps
    },
    ref
  ) => {
    const {
      value,
      readOnly,
      disabled,
      min,
      max = '9999999999999',
      digit = 18,
      onFocus,
      onBlur
    } = inputProps;

    const inp = useRef<HTMLInputElement>();
    const longPress = useRef(false);
    const valueRef = useRef<string>();
    const stepIncreaseDecreaseRef = useRef<{ increase: number; decrease: number }>();
    const stepRef = useRef<number>();
    const longPressTimeId = useRef(0);
    const pressingTimeId = useRef(0);
    const delayTime = useRef(1000);

    const [number, setNumber] = useState<string>(value ?? '');
    const [focus, setFocus] = useState(false);

    const checkDisabled = useMemo(() => {
      return disabled || new Decimal(min ?? 0).cmp(new Decimal(max)) > 0;
    }, [disabled, max, min]);

    const calcNumber = useCallback(
      (number: string, step: number, type: 'up' | 'down') => {
        if (type === 'up') {
          return new Decimal(number || 0)
            .add(new Decimal(stepIncreaseDecreaseRef.current?.increase ?? step ?? 1))
            .toDP(digit, Decimal.ROUND_DOWN)
            .toString();
        } else {
          return new Decimal(number || 0)
            .sub(new Decimal(stepIncreaseDecreaseRef.current?.decrease ?? step ?? 1))
            .toDP(digit, Decimal.ROUND_DOWN)
            .toString();
        }
      },
      [digit]
    );

    const checkMinMaxValidate = useCallback(
      (value: string) => {
        if (typeof value === 'undefined' || !value || checkDisabled) return '';
        if (value.endsWith('.')) return value;

        if (typeof min !== 'undefined' && new Decimal(Number(value)).lt(new Decimal(min))) {
          return String(min);
        }

        if (
          typeof max !== 'undefined' &&
          new Decimal(commaStrToNumber(value || '')).gt(new Decimal(max))
        ) {
          return String(max);
        }

        return value;
      },
      [min, max, checkDisabled]
    );

    const checkAllValidate = useCallback(
      (value: string) => {
        if (checkDisabled) return '';

        return value.endsWith('.') ? value : checkMinMaxValidate(value);
      },
      [checkDisabled, checkMinMaxValidate]
    );

    const onChange = useCallback(
      ({ type, e }: { type?: 'up' | 'down'; e?: ChangeEvent<HTMLInputElement> }) => {
        if (!inp.current || checkDisabled) return;
        const { value, name } = inp.current;

        const putValue = inputModeChange({
          target: { value: value }
        } as React.ChangeEvent<HTMLInputElement>);
        /** digit가 0일때, . 입력 제한 */
        const reg = !digit ? /^\d{0,18}$/ : new RegExp(`^[0-9]*[.]{0,1}[0-9]{0,${digit}}$`, 'gm');
        if (!putValue.match(reg)) return;

        if (
          typeof maxLength !== 'undefined' &&
          (putValue || '').split('.')[0].replace(/[^0-9]/g, '').length > Number(maxLength)
        ) {
          return;
        }

        inp.current.value = makeParts(putValue ?? '').join('.');

        if (valueRef.current !== putValue) {
          handleChange && handleChange(putValue, name, { type });
          if (e) {
            inputProps.onChange && inputProps.onChange(e);
          }

          valueRef.current = putValue;
        }

        setNumber(putValue);
      },
      [checkDisabled, digit, maxLength, handleChange, inputProps]
    );

    const handleFocus = useCallback(
      (e: React.FocusEvent<HTMLInputElement>, status: boolean) => {
        if (!inp.current) return;
        const { value, name } = inp.current;

        setFocus(status);

        if (status) onFocus && onFocus(e);
        else {
          inp.current.value = checkAllValidate(inp.current.value);

          onChange({});

          onBlur && onBlur(e);
        }
      },
      [onFocus, checkAllValidate, onChange, onBlur]
    );

    const handleClickCountBtn = useCallback(
      (type: 'up' | 'down') => {
        if (checkDisabled || readOnly) {
          longPress.current = false;
          window.clearTimeout(longPressTimeId.current);
          return;
        }

        valueRef.current = calcNumber(valueRef.current ?? '0', stepRef.current, type);
        valueRef.current = checkMinMaxValidate(valueRef.current ?? '0');

        setNumber(String(valueRef.current));

        handleChange && handleChange(valueRef.current, inputProps.name, { type });

        if (longPress.current) {
          window.clearTimeout(pressingTimeId.current);
          pressingTimeId.current = window.setTimeout(() => {
            handleClickCountBtn(type);
            if (delayTime.current > 100) delayTime.current -= delayTime.current / 5;
          }, delayTime.current);
        }
      },
      [calcNumber, checkMinMaxValidate, checkDisabled, handleChange, inputProps.name, readOnly]
    );

    const onMouseDown = useCallback(
      (type: 'up' | 'down') => {
        if (checkDisabled || readOnly) {
          longPress.current = false;
          window.clearTimeout(longPressTimeId.current);
          return;
        }

        longPressTimeId.current = window.setTimeout(() => {
          longPress.current = true;
          handleClickCountBtn(type);
        }, 500);
      },
      [checkDisabled, handleClickCountBtn, readOnly]
    );

    const onMouseUp = useCallback(
      (type?: 'up' | 'down') => {
        if (checkDisabled || readOnly) {
          longPress.current = false;
          window.clearTimeout(longPressTimeId.current);
          return;
        }

        longPress.current = false;
        delayTime.current = 500;
        window.clearTimeout(longPressTimeId.current);
        if (type) onChange({ type });
      },
      [checkDisabled, onChange, readOnly]
    );

    useEffect(() => {
      if (typeof value !== 'undefined') {
        setNumber(value);
      }
    }, [value]);

    useEffect(() => {
      stepRef.current = step;
    }, [step]);

    useEffect(() => {
      stepIncreaseDecreaseRef.current = {
        increase: increaseStep,
        decrease: decreaseStep
      };
    }, [increaseStep, decreaseStep]);

    useImperativeHandle(ref, () => inp.current);

    return (
      <div
        className={cx('number-input', className, { focus, readonly: readOnly, disabled, error })}
      >
        <div className={cx('number-inp-cont')}>
          <input
            {...inputProps}
            ref={ref || inp}
            type={'text'}
            inputMode={'decimal'}
            value={makeParts(number ?? '').join('.') ?? ''}
            readOnly={!isDirect}
            onChange={(e) => onChange({ e })}
            onFocus={(e) => handleFocus(e, true)}
            onBlur={(e) => handleFocus(e, false)}
          />
          {!hideButton && (
            <div className={cx('number-btn-area')}>
              <Ripple {...rippleOption} disabled={checkDisabled || rippleOption?.disabled}>
                <button
                  data-type="up"
                  className={cx('number-btn', 'up')}
                  disabled={checkDisabled || max === number}
                  onMouseDown={() => onMouseDown('up')}
                  onMouseUp={() => onMouseUp('up')}
                  onMouseOut={() => onMouseUp()}
                  onClick={() => handleClickCountBtn('up')}
                >
                  {arrowUpElement}
                </button>
              </Ripple>
              <Ripple {...rippleOption} disabled={checkDisabled || rippleOption?.disabled}>
                <button
                  data-type="down"
                  className={cx('number-btn', 'down')}
                  disabled={checkDisabled || min === number}
                  onMouseDown={() => onMouseDown('down')}
                  onMouseUp={() => onMouseUp('down')}
                  onMouseOut={() => onMouseUp()}
                  onClick={() => handleClickCountBtn('down')}
                >
                  {arrowDownElement}
                </button>
              </Ripple>
            </div>
          )}
        </div>
      </div>
    );
  }
);

NumberInput.displayName = 'NumberInput';

export type { Props as NumberInputProps };
export default NumberInput;
