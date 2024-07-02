'use client';

import React, { ButtonHTMLAttributes, MouseEvent, ReactNode, useCallback, useRef } from 'react';
import style from './Button.module.scss';
import Ripple, { RippleOption } from '../ripple/Ripple';
import Spinner from '../loadings/Spinner';
import { makeCxFunc } from '@/utils/forReactUtils';

interface PropsType extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  /** button 태그의 type */
  type?: 'button' | 'submit';
  /** button 요소 안에 랜더링될 내용 */
  children: ReactNode | string;
  /** button 사이즈 */
  size?: 'large' | 'medium' | 'small';
  /** 버튼의 UI타입별로 컬러가 추가될 시 사용할 예정 */
  color?: 'primary' | 'secondary';
  /**
   * ripple 효과 option
   *
   * { color?: string; duration?: number; maxSize?: number; disabled?: boolean }
   */
  ripple?: RippleOption;
  /** 비활성화 여부 */
  disabled?: boolean;
  /** 더블 클릭 방지 여부 */
  detectDoubleClick?: boolean;
  /**
   * button을 loading 처리할지 여부
   *
   * `true`면 `Spinner` 컴포넌트 노출
   */
  loading?: boolean;
  /** button 태그를 클릭했을때 호출되는 함수 */
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

const cx = makeCxFunc(style);

/**
 * Button 컴포넌트는 다양한 버튼 관련 기능을 제공합니다. <br/>
 * Solid, Capsule, Line, Icon Button
 *
 * @component
 * @param {string} [props.className=''] - 추가할 CSS 클래스 이름
 * @param {'button' | 'submit'} [props.type='button'] - button 태그의 type 속성값
 * @param {ReactNode | string} props.children - button 요소 안에 랜더링될 내용
 * @param {string} props.size - button 사이즈
 * @param {string} props.color - button 색상
 * @param {Object} [props.ripple] - Ripple 효과 옵션
 * @param {string} [props.ripple.color] - Ripple 효과의 색상
 * @param {number} [props.ripple.duration] - Ripple 효과의 지속 시간
 * @param {number} [props.ripple.maxSize] - Ripple 효과의 최대 크기
 * @param {boolean} [props.ripple.disabled] - Ripple 효과 비활성화 여부
 * @param {boolean} [props.disabled] - 버튼 비활성화 여부
 * @param {boolean} [props.detectDoubleClick] - 더블 클릭 방지 여부
 * @param {boolean} [props.loading=false] - button을 loading 처리할지 여부. `true`면 `Spinner` 컴포넌트 노출
 * @param {Function} [props.onClick] - button 태그를 클릭했을 때 호출되는 함수. MouseEvent<HTMLButtonElement>를 인자로 받음
 */
const Button = ({
  className = '',
  type = 'button',
  children,
  size,
  color = 'primary',
  ripple,
  detectDoubleClick,
  disabled,
  loading = false,
  onClick,
  ...buttonProps
}: PropsType) => {
  const clickTimeoutId = useRef<number>();

  const handleDetectDoubleClick = useCallback(() => {
    if (detectDoubleClick) {
      window.clearTimeout(clickTimeoutId.current);

      clickTimeoutId.current = window.setTimeout(() => {
        clickTimeoutId.current = null;
      }, 500);
    }
  }, [detectDoubleClick]);

  const handleClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      if (clickTimeoutId.current) {
        return;
      }

      onClick && onClick(e);

      handleDetectDoubleClick();
    },
    [handleDetectDoubleClick, onClick]
  );

  return (
    <Ripple {...ripple}>
      <button
        type={type}
        className={cx(className, size, color, 'btn')}
        disabled={disabled}
        onClick={handleClick}
        {...buttonProps}
      >
        {loading ? <Spinner size={20} /> : children}
      </button>
    </Ripple>
  );
};

export type { PropsType as ButtonProps };
export default Button;
