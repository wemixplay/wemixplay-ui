'use client';

import React, { InputHTMLAttributes, useCallback, useMemo } from 'react';

import { makeCxFunc } from '@/utils/forReactUtils';

import style from './Switch.module.scss';

const cx = makeCxFunc(style);

type InputElement = InputHTMLAttributes<HTMLInputElement>;

interface BaseProps {
  className?: string;
  /**
   * 스위치 input 요소의 name
   */
  name?: InputElement['name'];
  /**
   * 상위 컴포넌트에서 주입할 수 있는 이 스위치 컴포넌트 input 요소의 checked 여부
   */
  value?: string | number | boolean;
  /**
   * 스위치 사이즈
   */
  size?: 'medium' | 'small';
  /**
   * 스위치의 상태가 읽기전용인지에 대한 여부
   */
  readOnly?: InputElement['disabled'];
  /**
   * 스위치 비활성화 여부
   */
  disabled?: InputElement['disabled'];

  /**
   * 활성화된 스위치를 클릭했을 때 실행되는 함수
   * @param e 스위치 input 요소의 checked 값 변경에 대한 네이티브 이벤트 객체
   */
  onChange?: InputElement['onChange'];
  /**
   * 스위치를 클릭해 checked가 변경되었을 때 value, falseValue로 바인딩된 값 또는 checked의 값과 스위치 input 요소의 name을 전달하는 함수
   * @param value 이 스위치가 작동한 후, 변경될 checked 값에 따른 value, falseValue props 혹은 checked 값
   * @param name 스위치 input 요소의 name
   */
  handleChange?: (value: string | number | boolean, name: string) => void;
}

interface AllValueProps extends BaseProps {
  /**
   * 스위치 요소가 checked일 때, checked 여부의 true 값 이외에 커스텀으로 바인딩할 값
   */
  trueValue: string | number | boolean;
  /**
   * 스위치 요소가 checked가 아닐일 때, checked 여부의 false 값 이외에 커스텀으로 바인딩할 값
   */
  falseValue: string | number | boolean;
}

interface NeitherValueProps extends BaseProps {
  trueValue?: never;
  falseValue?: never;
}

/**
 * value prop이 무조건 falseValue prop과 함께 들어오거나 둘 다 들어오지 않아야 함을 표현하는 유니언 타입
 */
type Props = AllValueProps | NeitherValueProps;

/**
 * `Switch` input 요소를 사용하여 특정 값에 대한 on, off 처리와 그 값에 대한 데이터 바인딩을 돕는 컴포넌트입니다.
 *
 * @param {string} [props.className] - 스위치 컴포넌트의 스타일을 위한 클래스 이름
 * @param {string} [props.name] - 스위치 input 요소의 name
 * @param {boolean} [props.data] - 상위 컴포넌트에서 주입할 수 있는 이 스위치 컴포넌트 input 요소의 checked 여부
 * @param {string|number|boolean} [props.value] - 스위치 요소가 checked일 때, checked 여부의 true 값 이외에 커스텀으로 바인딩할 값
 * @param {string|number|boolean} [props.falseValue] - 스위치 요소가 checked가 아닐일 때, checked 여부의 false 값 이외에 커스텀으로 바인딩할 값
 * @param {boolean} [props.readOnly] - 스위치의 상태가 읽기전용인지에 대한 여부
 * @param {boolean} [props.disabled] - 스위치 비활성화 여부
 * @param {function} [props.onChange] -  활성화된 스위치를 클릭했을 때 실행되는 함수
 * @param {function} [props.handleChange] - 스위치를 클릭해 checked가 변경되었을 때 value, falseValue로 바인딩된 값 또는 checked의 값과 스위치 input 요소의 name을 전달하는 함수
 */
const Switch = ({
  className,
  name,
  value,
  trueValue = true,
  falseValue = false,
  size = 'medium',
  readOnly = false,
  disabled = false,

  onChange,
  handleChange
}: Props) => {
  /**
   * data가 들어오지 않았다면, input 태그의 기본 checked를 따릅니다.
   * data가 있다면 해당 값으로 checked를 표현합니다.
   */
  const checked = useMemo(() => {
    if (typeof value === 'undefined') return undefined;
    return value === trueValue;
  }, [value, trueValue]);

  /**
   * 스위치의 onChange가 작동할 때 실행할 함수.
   */
  const handleOnCheckedChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (handleChange) {
        const {
          target: { name, checked }
        } = e;

        /**
         * 스위치 인풋 요소의 checked 값을 커스텀으로 지정해 주고 싶을 때, value와 falseValue props를 주입하고
         * 이 두 props가 주입되었을 때 isCustomValue는 true가 됩니다.
         */
        const isCustomValue = typeof trueValue !== 'undefined' && typeof falseValue !== 'undefined';

        // isCustomValue이 true이면 checked 여부에 따라 value 또는 falseValue를 반환하고
        // isCustomValue이 false이면 바뀔 checked 값을 반환합니다.
        handleChange(isCustomValue ? (checked ? trueValue : falseValue) : checked, name);
      }

      onChange?.(e);
    },
    [trueValue, falseValue, onChange, handleChange]
  );

  return (
    <label className={cx('switch', { disabled, 'read-only': readOnly }, size, className)}>
      <div className={cx('switch-inner')}>
        <input
          type="checkbox"
          name={name}
          checked={checked}
          disabled={disabled || readOnly}
          readOnly={readOnly}
          onChange={handleOnCheckedChange}
        />
      </div>
    </label>
  );
};

export default Switch;
export type { Props as SwitchProps };
