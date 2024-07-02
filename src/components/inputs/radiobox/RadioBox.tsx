'use client';

import React, {
  ChangeEvent,
  InputHTMLAttributes,
  ReactNode,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef
} from 'react';
import style from './RadioBox.module.scss';
import { makeCxFunc } from '@/utils/forReactUtils';

interface PropsType
  extends Pick<InputHTMLAttributes<HTMLInputElement>, 'name' | 'onChange' | 'onBlur' | 'onFocus'> {
  className?: string;
  /** 라디오박스 UI 옆에 나올 텍스트 및 React 엘리먼트 */
  children?: ReactNode | string;
  /** input 태그가 갖는 checkValue 값 */
  checkValue?: string | number;
  /** 바인딩할 데이터 값
   *
   * (`string | number`로 받아야함)
   */
  value?: string | number;
  size?: 'normal' | 'small';
  /** 체크박스가 비활성화 상태인지 여부 */
  disabled?: boolean;
  /** 체크박스가 읽기 전용 상태인지 여부 */
  readOnly?: boolean;
  /** 값이 변경될 때 호출될 함수
   *
   * (체크 상태에 따라 다른 값을 전달) */
  handleChange?: (value: JSONObject, name: string) => void;
}

const cx = makeCxFunc(style);

/**
 * RadioBox 컴포넌트는 라디오 버튼을 구현합니다. HTML `<input type="radio">` 요소의 특성을 확장하여
 * React에서 사용하기 쉽도록 만든 컴포넌트입니다.
 *
 * @param {Object} [props.ref] - input 태그의 Element를 가리킬 ref 값
 * @param {string} props.name - input 태그의 name 속성. 폼 제출 시 어떤 라디오 버튼이 선택되었는지 식별하는 데 사용됩니다.
 * @param {function} props.onChange - 값이 변경될 때 호출될 이벤트 핸들러. 사용자가 다른 라디오 버튼을 선택할 때 발생합니다.
 * @param {function} props.onBlur - 요소가 포커스를 잃었을 때 호출될 이벤트 핸들러.
 * @param {function} props.onFocus - 요소에 포커스가 맞춰졌을 때 호출될 이벤트 핸들러.
 * @param {string} [props.className] - 컴포넌트에 적용할 CSS 클래스 이름.
 * @param {ReactNode|string} [props.children] - 라디오박스 UI 옆에 나타낼 텍스트 또는 React 엘리먼트.
 * @param {string|number} [props.checkValue] - input 태그가 갖는 value 값. 라디오 버튼이 선택될 때 이 값이 폼 데이터로 사용됩니다.
 * @param {string|number} [props.value] - 바인딩할 데이터 값. 주로 내부 로직에서 참조하기 위해 사용됩니다.
 * @param {boolean} [props.disabled=false] - 체크박스가 비활성화 상태인지 여부. true로 설정하면 사용자가 클릭할 수 없습니다.
 * @param {boolean} [props.readOnly=false] - 체크박스가 읽기 전용 상태인지 여부. true로 설정하면 사용자의 입력을 받지 않습니다.
 * @param {function} [props.handleChange] - 값이 변경될 때 호출될 함수. 체크 상태에 따라 다른 값을 전달합니다.
 */
const RadioBox = forwardRef<HTMLInputElement, PropsType>(
  (
    { className = '', children, size = 'normal', checkValue, value, handleChange, ...inputProps },
    ref
  ) => {
    const inpRef = useRef<HTMLInputElement>(null);

    /**
     * input 태그에 전달할 checked 상태 값
     */
    const checked = useMemo(() => {
      // 전달된 value 가 없으면 input 태그의 checked 상태를 따르기 위해 undefined 반환
      if (!value) {
        return;
      }

      return value === checkValue;
    }, [value, checkValue]);

    /**
     * input 태그에 onChange가 트리거 될때 실행되는 함수
     */
    const handleValueChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value: targetValue } = e.target;

        // 전달된 checkValue 값과 targetValue가 같을때
        if (
          typeof checkValue === 'number'
            ? Number(targetValue) === checkValue
            : targetValue === checkValue
        ) {
          handleChange && handleChange(checkValue, name);
        }

        inputProps.onChange && inputProps.onChange(e);
      },
      [handleChange, inputProps, checkValue]
    );

    // 해당 컴포넌트에 ref값이 전달된 경우 ref값에 inpRef.current (HTMLInputElement)가 세팅 될 수 있도록 설정
    useImperativeHandle<HTMLInputElement | null, HTMLInputElement | null>(
      ref,
      () => inpRef.current
    );

    return (
      <div
        className={cx('radio-box', className, size, {
          readonly: inputProps?.readOnly,
          disabled: inputProps?.disabled,
          'not-allow': inputProps?.readOnly || inputProps?.disabled,
          checked
        })}
      >
        <label>
          <input
            ref={inpRef}
            {...inputProps}
            type="radio"
            value={checkValue}
            checked={checked}
            onChange={handleValueChange}
          />
          <span className={cx('ico-check')}>
            <i className={cx('icon')} />
          </span>
          <span className={cx('text')}>{children}</span>
        </label>
      </div>
    );
  }
);

RadioBox.displayName = 'RadioBox';

export type { PropsType as RadioBoxProps };
export default RadioBox;
