'use client';

import { lowerCase } from 'lodash-es';
import React, { MouseEvent, ReactElement, useCallback, useMemo } from 'react';

import { makeCxFunc } from '@/utils/forReactUtils';

import style from './Option.module.scss';
import { SelectData } from './SelectBox';

interface PropsType {
  className?: string;
  /** searchText와 비교하여 검색에 활용할 값 */
  text?: string;
  /** option이 갖는 value 값 */
  value?: string | number | null;
  /**
   * option이 선택되었을때 SelectBox에 보여줄 내용 (없다면 children)
   */
  label?: string | ReactElement;
  children: React.ReactNode | string;
  /** SelectBox에서 이미 선택된 option의 값 */
  selectedValue?: string;
  /** SelectBox에서 이미 선택된 option의 text */
  searchText?: string;
  /** 비활성화 상태인지 여부 */
  disabled?: boolean;
  /** 값이 변경될 때 호출될 함수 */
  handleChange?: (selectData: SelectData) => void;
}

const cx = makeCxFunc(style);

/**
 * `SelectBox` 내에서 사용될 `Option` 컴포넌트입니다.
 * 사용자가 `SelectBox`에서 선택할 수 있는 각각의 옵션을 표현합니다.
 *
 * @param {string} [props.className=''] - 컴포넌트의 CSS 클래스 이름
 * @param {string} [props.text] - `searchText`와 비교하여 검색에 활용될 값
 * @param {string|number|null} [props.value] - `Option`이 갖는 value 값
 * @param {string|React.ReactElement} [props.label] - `Option`이 선택되었을 때 `SelectBox`에 보여줄 내용 (없다면 children)
 * @param {React.ReactNode|string} props.children - `Option` 내부에 표시될 자식 요소
 * @param {string} [props.selectedValue=''] - `SelectBox`에서 이미 선택된 `Option`의 값
 * @param {string} [props.searchText=''] - `SelectBox`에서 이미 선택된 `Option`의 text 값
 * @param {boolean} [props.disabled] - 비활성화 상태 여부
 * @param {Function} [props.handleChange] - 값이 변경될 때 호출될 함수
 */
const Option = ({
  className = '',
  text,
  value,
  label,
  children,
  selectedValue = '',
  searchText = '',
  disabled,
  handleChange
}: PropsType) => {
  /**
   * text에 searchText를 포함하는지에 대한 boolean 상태값
   */
  const isMatch = useMemo(() => {
    if (!searchText) {
      return false;
    }

    // 소문자로 변환 후 탐색
    return lowerCase(text).includes(lowerCase(searchText));
  }, [text, searchText]);

  const handleSelectValue = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      // 마우스 우클릭이거나 disabled가 true일때 무시
      if (e.button === 2 || disabled) {
        return;
      }

      handleChange && handleChange({ label: label ?? children, value });
    },
    [children, disabled, handleChange, value, label]
  );

  return (
    <div
      className={cx(className, 'option', {
        active: selectedValue === value,
        match: isMatch,
        disabled
      })}
      role="button"
      tabIndex={-1}
      onMouseDown={handleSelectValue}
    >
      {children}
    </div>
  );
};

Option.displayName = 'Option';

export type { PropsType as OptionProps };
export default Option;
