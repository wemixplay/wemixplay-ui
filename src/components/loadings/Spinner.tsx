import React from 'react';
import style from './Spinner.module.scss';
import { makeCxFunc } from '@/utils/forReactUtils';

type Props = {
  className?: string;
  /** Spinner 컴포넌트의 width, height 크기 */
  size?: number;
};

const cx = makeCxFunc(style);

/**
 * `Spinner` 컴포넌트는 로딩 상태를 나타내는 indicator UI를 제공하는 컴포넌트 입니다.
 *
 * @param {string} [props.className] 컴포넌트에 추가될 CSS 클래스명
 * @param {number} [props.size] Spinner 컴포넌트의 width, height 크기
 * @returns
 */
const Spinner = ({ className = '', size }: Props) => {
  return (
    <svg
      className={cx('spinner', className)}
      viewBox={`0 0 50 50`}
      style={{ width: size, height: size }}
    >
      <circle className={cx('border')} cx="25" cy="25" r="20" fill="none"></circle>
      <circle className={cx('path')} cx="25" cy="25" r="20" fill="none"></circle>
    </svg>
  );
};

export type { Props as SpinnerProps };
export default Spinner;
