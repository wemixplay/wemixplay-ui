'use client';

import React, {
  ChangeEvent,
  ForwardedRef,
  InputHTMLAttributes,
  ReactNode,
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useMemo,
  useRef
} from 'react';
import style from './CheckBox.module.scss';
import { SvgIcoCheck, SvgIcoIndeterminate } from '@/assets/svgs';
import { makeCxFunc } from '@/utils/forReactUtils';
import { uniq } from 'lodash';

interface Props
  extends Pick<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'onBlur' | 'onFocus'> {
  className?: string;
  name?: string;
  /** 체크박스 UI의 크기  */
  size?: 'normal' | 'small';
  /** 체크박스 UI 옆에 나올 텍스트 및 React 엘리먼트 */
  children?: ReactNode | string;
  /** input 태그가 갖는 value 값 */
  checkValue?: string | number | boolean | (string | number)[];
  /** 체크박스가 해제될 때 전달될 값
   *
   * (없다면 undefined로 전달이며 value 값이 배열이라면 무시)
   */
  unCheckValue?: string | number | boolean;
  /** 바인딩할 데이터 값
   *
   * (동일한 name값을 갖는 CheckBox가 여러개 있다면 무조건 `(string | number)[]`로 받아야함)
   */
  value?: string | number | boolean | (string | number)[];
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
 * `CheckBox` 컴포넌트는 사용자로부터 체크박스 형태의 입력을 받기 위한 UI 컴포넌트입니다.
 * 이 컴포넌트는 다양한 props를 통해 커스터마이징할 수 있으며, 단일 체크박스 또는 체크박스 그룹으로 사용될 수 있습니다. <br/>
 * 파란색 점선 영역은 Interaction 범위입니다.
 *
 * @param {Object} [props.ref] - input 태그의 Element를 가리킬 ref 값
 * @param {string} [props.className] - 체크박스 컴포넌트의 스타일을 위한 클래스 이름
 * @param {string} [props.name] - input 태그의 name 속성
 * @param {ReactNode|string} [props.children] - 체크박스 UI 옆에 표시될 텍스트 또는 React 엘리먼트
 * @param {string|number|boolean} [props.checkValue] - input 태그가 갖는 value 값
 * @param {string|number|boolean} [props.unCheckValue] - 체크박스가 해제될 때 전달될 값 (없다면 undefined로 전달이며 value 값이 배열이라면 무시)
 * @param {string|number|boolean|(string|number)[]} [props.value] - 체크박스와 바인딩할 데이터 값 (동일한 name 값을 갖는 CheckBox가 여러 개일 경우 배열로 받아야 함)
 * @param {boolean} [props.disabled] - 체크박스가 비활성화 상태인지 여부
 * @param {boolean} [props.readOnly] - 체크박스가 읽기 전용 상태인지 여부
 * @param {Function} [props.handleChange] - 값이 변경될 때 호출될 함수 (체크 상태에 따라 다른 값을 전달)
 * @param {Function} [props.onChange] - input 태그의 기본 onChange 이벤트 핸들러
 * @param {Function} [props.onBlur] - input 태그의 onBlur 이벤트 핸들러
 * @param {Function} [props.onFocus] - input 태그의 onFocus 이벤트 핸들러
 */
const CheckBox = forwardRef<HTMLInputElement, Props>(
  (props: Props, ref: ForwardedRef<HTMLInputElement>) => {
    const {
      className = '',
      name,
      size = 'normal',
      checkValue = true,
      unCheckValue = false,
      value,
      children,
      disabled,
      readOnly,
      onChange,
      onBlur,
      onFocus,
      handleChange
    } = props;

    const inpRef = useRef<HTMLInputElement>(null);

    const uid = useId();

    /**
     * input 태그에 전달할 checked 상태 값
     */
    const checked = useMemo(() => {
      // 전달된 value 가 없으면 input 태그의 checked 상태를 따르기 위해 undefined 반환
      if (typeof value === 'undefined') {
        return false;
      }

      if (Array.isArray(checkValue) && Array.isArray(value)) {
        return (
          value.length === checkValue.length &&
          value.every((v) => checkValue.includes(v as string | number))
        );
      } else if (Array.isArray(value)) {
        return value.includes(checkValue as string | number);
      } else {
        return value === checkValue;
      }
    }, [value, checkValue]);

    /**
     * input 태그에 전달할 indeterminate 상태 값
     */
    const partial = useMemo(() => {
      // checked가 true면 false로 반환
      if (checked) {
        return false;
      }

      if (Array.isArray(checkValue) && Array.isArray(value)) {
        return (
          value.length !== checkValue.length &&
          value.some((v) => checkValue.includes(v as string | number))
        );
      } else {
        return false;
      }
    }, [checked, checkValue, value]);

    /**
     * input 태그에 onChange가 트리거 될때 실행되는 함수
     */
    const handleValueChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        const query = `input[name="${name}"]`;

        // 동일한 name을 가진 checkbox를 모두 가져옴
        const checkBoxEls = document.querySelectorAll(query) as unknown as HTMLInputElement[];

        if (Array.isArray(checkValue) && Array.isArray(value)) {
          handleChange && handleChange(value.length > 0 ? [] : checkValue, name);

          return;
        }

        // 동일한 name을 가진 checkbox가 2개 이상이라면 배열 타입을 반환하기 위해 분기
        // data가 배열로 전달 되었으면 multiple checkbox로 작동
        if (checkBoxEls.length > 1 || Array.isArray(value)) {
          // checked 된 모든 input 태그를 select
          const selectedEls = document.querySelectorAll(
            `${query}:checked`
          ) as unknown as HTMLInputElement[];

          // 결과적으로 반환될 배열 값
          let changeValue: (string | number)[] = [];

          // 동일한 name을 가진 checkbox가 2개 이상이라면 `string | number`값만 value로 가질 수 있음
          const currentValue = checkValue as string | number;
          // data가 없다면 undefined로 data가 있다면 `(string | number)[]` 형태로 타입을 새로 지정하기 위해 변수 재설정
          const currentData = value ? [...(value as (string | number)[])] : undefined;

          for (let i = 0; i < selectedEls.length; i += 1) {
            // check가 된 input들의 value를 컴포넌트에 전달된 value의 타입에 맞게 형변환 (input의 value는 string으로만 인식하기 때문)
            const tempVal =
              typeof checkValue === 'number' ? Number(selectedEls[i].value) : selectedEls[i].value;

            // 이미 changeValue에 존재하는 값이라면 changeValue가 tempVal값을 넣어주지 않고 존재하지 않다면 changeValue 배열에 추가
            const indexOf = changeValue.findIndex((val: unknown) => val === tempVal);
            if (indexOf === -1) changeValue.push(tempVal);
          }

          // currentData와 currentValue의 값이 undefined가 아니라면 currentData에 currentValue 추가
          if (currentData && typeof currentValue !== 'undefined') {
            currentData.push(currentValue);
          }

          // currentData가 존재한다면 changeValue의 배열에 존재하는 data값과 currentData의 값들의 유효성을 검증하여 필터링 진행
          // currentData가 없다면 changeValue값에서 중복되는 값이 없도록 필터링 진행
          changeValue = currentData
            ? currentData.filter((d: string | number) => changeValue.includes(d))
            : uniq(changeValue);

          // changeValue값 handleChange함수를 이용하여 상위 컴포넌트에 전달
          handleChange && handleChange(changeValue, name);
        } else {
          // 동일한 name을 가진 checkbox가 1개 이하(name이 없을수도 있음)로 존재한다면 checked 여부에 따라 value이나 falseValue를 상위 컴포넌트에 전달
          handleChange && handleChange(checked ? checkValue : unCheckValue, name);
        }

        onChange && onChange(e);
      },
      [value, unCheckValue, handleChange, onChange, checkValue]
    );

    // props 유효성 검증
    useEffect(() => {
      const query = `input[name="${name || uid}"]`;
      const checkBoxEls = document.querySelectorAll(query) as unknown as HTMLInputElement[];

      if (checkBoxEls.length > 1 || Array.isArray(value)) {
        if (typeof checkValue === 'boolean') {
          throw new Error(
            '여러개의 동일한 name 값을 갖거나 data가 배열로 전달된 CheckBox는 boolean타입의 value를 받을 수 없습니다.'
          );
        }
      } else {
        if (Array.isArray(value)) {
          throw new Error('단일의 name 값을 갖는 CheckBox는 배열 타입의 data를 가질 수 없습니다.');
        }
      }
    }, [value, name, uid, checkValue]);

    useEffect(() => {
      if (inpRef.current) {
        inpRef.current.indeterminate = partial;
      }
    }, [partial]);

    // 해당 컴포넌트에 ref값이 전달된 경우 ref값에 inpRef.current (HTMLInputElement)가 세팅 될 수 있도록 설정
    useImperativeHandle<HTMLInputElement | null, HTMLInputElement | null>(
      ref,
      () => inpRef.current
    );

    return (
      <div
        className={cx(className, 'checkbox', size, {
          readonly: readOnly,
          disabled,
          'not-allow': readOnly || disabled
        })}
      >
        <label>
          <input
            ref={inpRef}
            type="checkbox"
            name={Array.isArray(checkValue) ? uid : name || uid}
            value={String(checkValue)}
            checked={checked}
            readOnly={readOnly}
            disabled={disabled}
            onBlur={onBlur}
            onFocus={onFocus}
            onChange={handleValueChange}
          />
          <span className={cx('ico-check')}>
            <i className={cx('icon')}>
              {partial ? (
                <SvgIcoIndeterminate className={cx('partial')} />
              ) : (
                <SvgIcoCheck className={cx('check')} />
              )}
            </i>
          </span>
          <span className={cx('text')}>{children}</span>
        </label>
      </div>
    );
  }
);

CheckBox.displayName = 'CheckBox';

export type { Props as CheckBoxProps };
export default CheckBox;
