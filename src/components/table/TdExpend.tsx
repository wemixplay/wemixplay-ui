'use client';

import React, { CSSProperties, ReactElement } from 'react';

import { makeCxFunc } from '@/utils/forReactUtils';

import style from './Table.module.scss';

interface PropsType {
  /**
   * 클래스 이름
   */
  className?: string;
  /**
   * 자식 요소
   */
  children: ReactElement | string;
  /**
   * 스타일
   */
  style?: CSSProperties;
}

const cx = makeCxFunc(style);

/**
 * `Table` 컴포넌트에서 아코디언 UI를 지원하는 컴포넌트
 * @component
 * @param {string} [props.className] - 클래스 이름
 * @param {ReactElement | string} props.children - 자식 요소
 */
const TdExpend = ({ className = '', children, style }: PropsType) => {
  //logic

  return (
    <div className={cx('td-expend')}>
      <div className={cx('td-expend-inner', className)} style={style}>
        {children}
      </div>
    </div>
  );
};

TdExpend.displayName = 'TdExpend';

export type { PropsType as TdExpendProps };
export default TdExpend;
