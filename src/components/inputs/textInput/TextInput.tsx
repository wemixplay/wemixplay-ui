'use client';

import React, {
  type InputHTMLAttributes,
  type ReactElement,
  type FocusEvent,
  type KeyboardEvent,
  type ChangeEvent,
  useRef,
  useMemo,
  useState,
  useCallback,
  useEffect,
  forwardRef,
  useImperativeHandle
} from 'react';

import { makeCxFunc } from '@/utils/forReactUtils';

import { SvgIcoInputReset, SvgIcoSearchDefault } from '@/assets/svgs';

import style from './TextInput.module.scss';

interface PropsType extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  /** input의 type 속성 */
  type?: 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'url';
  /** input 태그가 갖는 value 값 */
  value?: string | number;
  /** 입력 필드에 에러 상태 표시 여부 */
  error?: boolean;
  /** 입력 칠드에 가이드 안내 상태 표시 여부 */
  info?: boolean;
  /**
   * 검색 아이콘으로 사용될 ReactElement (default: `<SvgIcoSearchDefault />`)
   *
   * `ex) searchIcon={<SvgIcoSearch2 />}`
   */
  searchIcon?: ReactElement;
  /**
   * input 박스 내부 value 앞에 노출할 ReactElement
   * type이 search일때는 나타나지 않음
   *
   * `ex) prefixIcon={<SvgIcoSearch2 />}`
   */
  prefixIcon?: ReactElement;
  /**
   * 리셋 아이콘으로 사용될 ReactElement  (default: `<SvgIcoClose />`)
   *
   * `ex) resetIcon={<SvgIcoClose2 />}`
   */
  resetIcon?: ReactElement;
  /** 입력 값 검증을 위한 정규 표현식 또는 함수 */
  validate?: RegExp | ((value: string) => string) | ((value: number) => number);
  /** 리셋 버튼 숨김 처리 여부 */
  hideBtnReset?: boolean;
  /** 값이 변경될 때 호출될 함수 */
  handleChange?: (value: JSONObject, name?: string) => void;
  /** 엔터 키가 눌렸을 때 호출될 함수 */
  handleEnter?: (value: JSONObject, name?: string) => void;
  /** 리셋 버튼이 클릭됐을 때 호출될 함수 */
  handleReset?: (value: JSONObject, name?: string, clickResetBtn?: boolean) => void;
}

const cx = makeCxFunc(style);

/**
 * `TextInput` 컴포넌트는 다양한 유형의 입력 필드를 생성하기 위한 컴포넌트입니다.
 * 이 컴포넌트는 사용자 입력을 받고, 이를 검증하며, 입력 값이 변경될 때마다 지정된 함수를 호출할 수 있습니다.
 *
 * @param {Object} [props.ref] - input 태그의 Element를 가리킬 ref 값
 * @param {string} [props.className] - 입력 필드에 적용될 추가적인 CSS 클래스 이름
 * @param {'email'|'number'|'password'|'search'|'tel'|'text'|'url'} props.type - 입력 필드의 타입
 * @param {string|number} [props.value] - 입력 필드의 현재 값
 * @param {boolean} [props.error] - 입력 필드에 에러 상태 표시 여부
 * @param {boolean} [props.info] - 입력 칠드에 가이드 안내 상태 표시 여부
 * @param {boolean} [props.hideBtnReset] - 리셋 버튼 숨김 처리 여부
 * @param {ReactElement} [props.searchIcon=<SvgIcoSearchDefault />] - 검색 아이콘으로 사용될 ReactElement. 기본값은 `<SvgIcoSearchDefault />`
 * @param {ReactElement} [props.resetIcon=<SvgIcoInputReset/>] - 리셋 아이콘으로 사용될 ReactElement. 기본값은 `<SvgIcoInputReset/>`
 * @param {RegExp | ((value: string) => string) | ((value: number) => number)} [props.validate] - 입력 값 검증을 위한 정규 표현식 또는 함수
 * @param {(value: JSONObject, name?: string) => void} [props.handleChange] - 값이 변경될 때 호출될 함수
 * @param {(value: JSONObject, name?: string) => void} [props.handleEnter] - 엔터 키가 눌렸을 때 호출될 함수
 * @param {(value: JSONObject, name?: string, clickResetBtn?: boolean) => void} [props.handleReset] - 리셋 버튼이 클릭됐을 때 호출될 함수
 */
const TextInput = forwardRef<HTMLInputElement, PropsType>((props, ref) => {
  const {
    className = '',
    error,
    info,
    hideBtnReset,
    prefixIcon,
    searchIcon = <SvgIcoSearchDefault />,
    resetIcon = <SvgIcoInputReset />,
    handleChange,
    handleReset,
    handleEnter,
    validate,
    ...inputProps
  } = props;

  const { value, ...inputTagProps } = inputProps;

  const inpRef = useRef<HTMLInputElement>(null);

  // input 태그 focus 여부
  const [focus, setFocus] = useState(false);
  // 해당 컴포넌트가 갖고 있는 내부 input value state값
  const [text, setText] = useState<string | number>('');

  /** reset, search 아이콘 노출 여부에 대한 정보를 담은 객체 */
  const iconStatus = useMemo(() => {
    const { type, readOnly } = inputProps;

    return {
      reset: focus && !hideBtnReset && !!text && !readOnly,
      search: type === 'search'
    };
  }, [inputProps, text, focus, hideBtnReset]);

  /**
   * 값의 유효성 검사를 담당하는 함수
   * @param value input 태그가 갖는 value값
   * @returns 유효성 겁사 후 검증된 값을 반환
   */
  const checkValidate = useCallback(
    (value: string | number) => {
      if (!value || !validate) return value;

      // validate가 함수일때
      if (typeof validate === 'function') {
        return validate(value as never);
      } else if (typeof value === 'string') {
        // validate가 정규식일때
        return validate.test(value) ? value : text;
      }

      // value 타입이 number거나 string[] 이며 vlidate가 정규식일때는 검증 X
      return value;
    },
    [text, validate]
  );

  /**
   * ico-reset 버튼을 눌렀을때 처리하는 함수
   */
  const onReset = useCallback(() => {
    const name = inputProps.name;

    setText('');

    handleChange && handleChange('', name);
    handleReset && handleReset('', name, true);
  }, [inputProps.name, handleChange, handleReset]);

  /**
   * input 태그의 onChange에 적용될 함수
   * @param e `ChangeEvent<HTMLInputElement>`
   */
  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name } = e.target;
      let value: string | number = e.target.value;

      // 기존 값과 동일하면 그대로 종료
      if (value === text) {
        return;
      }

      if (typeof inputProps.value === 'number') {
        value = Number(value);
      }

      // 유효성 검증 진행
      const putVal = checkValidate(value);

      // 상위 컴포넌트로 변경될 값 전달
      handleChange && handleChange(putVal, name);
      inputProps.onChange && inputProps.onChange(e);

      // 해당 컴포넌트가 갖는 state mutate
      setText(putVal);

      // 강제로 putVal input 요소에 값 바인딩
      inpRef.current.value = String(putVal);

      // 변경될 값이 빈문자라면 handleReset 함수 호출
      if (putVal === '') handleReset && handleReset('', name);
    },
    [text, checkValidate, handleChange, inputProps, handleReset]
  );

  /**
   * input 태그의 onFocus와 onBlur에 적용될 함수
   * @param e `FocusEvent<HTMLInputElement>`
   * @param {boolean} status status가 `true`면 onFocus를 `false`면 onBlur를 호출
   */
  const onFocus = useCallback(
    (e: FocusEvent<HTMLInputElement>, status: boolean) => {
      // focus 상태 업데이트
      setFocus(status);

      if (status) inputProps.onFocus && inputProps.onFocus(e);
      else inputProps.onBlur && inputProps.onBlur(e);
    },
    [inputProps]
  );

  /**
   * input 태그에서 enter를 했을때 트리거되는 함수
   */
  const onEnter = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      const { value = '', name } = e.target as HTMLInputElement;

      // props로 전달된 handleEnter에 input 태그의 value 값과 name값 담아 호출
      handleEnter && handleEnter(value, name);
      // input 태그 blur 처리 진행
      inpRef.current?.blur();
    },
    [handleEnter]
  );

  /**
   * input 태그의 onKeyDown에 적용될 함수 (현재는 `Enter` 이벤트 로직만 작성)
   * @param e `KeyboardEvent<HTMLInputElement>`
   */
  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      // 이벤트가 `Enter`
      // 한글의 경우 enter를 눌렀을때 자음/모음/받침으로 인해 2번 호출이 되기 때문에 compose가 되었는지 확인하는 조건 추가 확인
      if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
        onEnter(e);
      }

      // props로 전달된 onKeyDown 함수 호출
      inputProps.onKeyDown && inputProps.onKeyDown(e);
    },
    [inputProps, onEnter]
  );

  // props로 전달된 value 값이 존재하고 변경되었을때 text값도 동기화
  useEffect(() => {
    if (typeof inputProps.value !== 'undefined') {
      setText(inputProps.value);
      inpRef.current.value = String(inputProps.value);
    }
  }, [inputProps.value]);

  // iconStatus.reset 값이 변경되면 input의 가장 오른쪽 끝으로 포커스를 이동
  useEffect(() => {
    if (inpRef.current && typeof inpRef.current.scrollTo === 'function') {
      inpRef.current.scrollTo(window.innerWidth, 0);
    }
  }, [iconStatus.reset]);

  // 해당 컴포넌트에 ref값이 전달된 경우 ref값에 inpRef.current (HTMLInputElement)가 세팅 될 수 있도록 설정
  useImperativeHandle<HTMLInputElement | null, HTMLInputElement | null>(ref, () => inpRef.current);

  return (
    <div
      className={cx('text-input', className, inputProps.type, {
        focus,
        filled: !!text,
        readonly: inputProps.readOnly,
        disabled: inputProps.disabled,
        required: inputProps.required,
        error,
        info
      })}
    >
      <div className={cx('input-area')}>
        {iconStatus.search && <span className={cx('ico-prefix')}>{searchIcon}</span>}
        {!iconStatus.search && !!prefixIcon && (
          <span className={cx('ico-prefix')}>{prefixIcon}</span>
        )}
        {iconStatus.reset && (
          <button className={cx('ico-reset')} onMouseDown={onReset} onTouchStart={onReset}>
            {resetIcon}
          </button>
        )}
        <input
          ref={inpRef}
          {...inputTagProps}
          defaultValue={text}
          onChange={onChange}
          onFocus={(e) => onFocus(e, true)}
          onBlur={(e) => onFocus(e, false)}
          onKeyDown={onKeyDown}
        />
      </div>
    </div>
  );
});

TextInput.displayName = 'TextInput';

export type { PropsType as TextInputProps };
export default TextInput;
