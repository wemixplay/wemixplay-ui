'use client';

import React, {
  ReactNode,
  useRef,
  MouseEvent,
  useCallback,
  useState,
  useEffect,
  memo
} from 'react';
import style from './Ripple.module.scss';
import { makeCxFunc } from '@/utils/forReactUtils';

export interface RippleOption {
  /**
   * ripple 색상
   *
   * color로 전달된 색상값은 opacity가 0.3이 자동 적용됨
   */
  color?: string;
  /**
   * ripple이 작동하는 시간 (ms)
   */
  duration?: number;
  /**
   * ripple이 확장하는 max-width
   */
  maxSize?: number;
  /**
   * ripple 비활성화 여부
   */
  disabled?: boolean;
}

export const DEFAULT_RIPPLE_OPTION = {
  color: '#ddd',
  duration: 500,
  maxSize: 400,
  disabled: false
};

interface PropsType extends RippleOption {
  children: ReactNode;
}

const cx = makeCxFunc(style);

/**
 * `Ripple` 컴포넌트는 사용자 인터랙션에 따른 시각적 피드백을 제공하기 위해 ripple 효과를 구현합니다.
 *
 * @component
 * @param {string} [props.color='#ddd'] - ripple 효과의 색상입니다. 지정하지 않을 경우 기본값은 `#ddd`. 색상값에는 opacity가 0.3이 자동으로 적용.
 * @param {number} [props.duration=500] - ripple 효과가 지속되는 시간(ms). 지정하지 않을 경우 기본값은 500ms
 * @param {number} [props.maxSize=400] - ripple 효과의 최대 너비입니다. 지정하지 않을 경우 기본값은 400px
 * @param {boolean} [props.disabled=false] - ripple 효과의 활성화/비활성화 여부를 결정. `true`일 경우 ripple 효과가 비활성화. 지정하지 않을 경우 기본값은 `false`(활성화)
 * @param {ReactNode} props.children - `Ripple` 컴포넌트 안에 렌더링될 자식 요소
 *
 * @example
 * <Ripple color="blue" duration={1000} maxSize={500} disabled={false}>
 *   <button>Click Me</button>
 * </Ripple>
 */
const Ripple = ({
  color = DEFAULT_RIPPLE_OPTION.color,
  duration = DEFAULT_RIPPLE_OPTION.duration,
  maxSize = DEFAULT_RIPPLE_OPTION.maxSize,
  disabled = DEFAULT_RIPPLE_OPTION.disabled,
  children
}: PropsType) => {
  // ripple을 작동하게 할 요소를 갖고 있는 상위 root Element
  const rippleElRef = useRef<HTMLDivElement | null>(null);

  // rippleElRef의 바로 하위 자식 요소 state
  const [rippleTargetEl, setRippleTargetEl] = useState<HTMLElement | null>(null);

  /**
   * ripple이 작동할 Element를 지정해주는 함수
   */
  const makeRippleTargetEl = () => {
    if (!rippleElRef.current) {
      return;
    }

    // rippleElRef의 자식 요소가 1개 보다 클 경우 에러 throw
    if (rippleElRef.current.childElementCount > 1) {
      throw new Error(
        '[Ripple]: Ripple 컴포넌트 사용할 시 Ripple 컴포넌트의 하위 자식 엘리먼트 갯수는 하나여야만 합니다. 그렇지 않을 시 Ripple은 작동하지 않습니다.'
      );
    }

    // rippleElRef의 자식 요소가 없을 경우 에러 throw
    if (rippleElRef.current.childElementCount === 0) {
      throw new Error(
        '[Ripple]: Ripple 컴포넌트의 하위 자식 엘리먼트가 존재하지 않습니다. 하위 자식 엘리먼트가 없을 경우 Ripple은 작동하지 않습니다.'
      );
    }

    setRippleTargetEl(rippleElRef.current.children[0] as HTMLElement);
  };

  /**
   * ripple Element를 생성하고 스타일을 컨트롤하는 함수
   */
  const handleRipple = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      // ripple을 작동하게할 element가 없거나 비활성화 상태인 경우 return
      if (!rippleTargetEl || disabled) {
        return;
      }

      rippleTargetEl.style.position = 'relative';
      rippleTargetEl.style.overflow = 'hidden';

      const { clientX, clientY } = event;
      const { left, top, width, height } = rippleTargetEl.getBoundingClientRect();

      const ripple = document.createElement('jwripple');
      const rippleWidth = width + height / 2;

      ripple.classList.add('animate');
      ripple.setAttribute(
        'style',
        `
          position: absolute;
          top: ${clientY - top}px;
          left: ${clientX - left}px;
          z-index: 1;
          min-width: 30px;
          min-height: 30px;
          max-width: ${maxSize}px;
          max-height: ${maxSize}px;
          width: ${rippleWidth}px;
          height: ${rippleWidth}px;
          background-color: ${color};
          animation-duration: ${Math.abs(duration as number)}ms;
          border-radius: 50%;
          opacity: 0;
          cursor: pointer;
          pointer-events: none;
          transform-origin: center;
          will-change: transform, opacity;
  `
      );

      rippleTargetEl.prepend(ripple);

      event.stopPropagation();

      // ripple 효과가 종료되고 나서 200ms 이후에 ripple Element를 remove
      setTimeout(
        () => {
          ripple.remove();
        },
        Math.abs(duration as number) + 200
      );
    },
    [rippleTargetEl, color, duration, disabled, maxSize]
  );

  useEffect(() => {
    makeRippleTargetEl();
  }, [rippleElRef]);

  return (
    <div ref={rippleElRef} className={cx('ripple')} onMouseDown={handleRipple}>
      {children}
    </div>
  );
};

export const RippleForStorybook = Ripple;

export type { PropsType as RippleProps };
export default memo(Ripple);
