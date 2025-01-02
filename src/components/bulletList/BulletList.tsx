import React, { CSSProperties, ReactElement, ReactNode } from 'react';

import { makeCxFunc } from '@/utils/forReactUtils';

import style from './BulletList.module.scss';

const cx = makeCxFunc(style);

interface Props {
  className?: string;
  /**
   * 리스트 항목들. React 요소 또는 문자열 배열.
   */
  list: (ReactElement | string)[] | ReactNode[];
  /**
   * 불릿 아이콘. React 요소 또는 문자열.
   */
  bulletIcon?: ReactElement | string;
  /**
   * 불릿과 텍스트 사이의 간격.
   */
  bulletGap?: CSSProperties['paddingLeft'];
  /**
   * 불릿 아이콘의 top 및 left 위치 값.
   */
  bulletIconPosition?: {
    top?: CSSProperties['top'];
    left?: CSSProperties['left'];
  };
}

/**
 * BulletList 컴포넌트는 불릿 아이콘과 함께 리스트 항목을 렌더링합니다.
 *
 * @component
 * @param {string} [props.className=''] - 추가적인 CSS 클래스 이름. 기본값은 빈 문자열.
 * @param {(ReactElement | string)[] | ReactNode[]} props.list - 리스트 항목들. React 요소 또는 문자열 배열.
 * @param {ReactElement | string} [props.bulletIcon] - 커스텀 불릿 아이콘. React 요소 또는 문자열.
 * @param {CSSProperties['paddingLeft']} [props.bulletGap] - 불릿과 텍스트 사이의 간격.
 * @param {{ top?: CSSProperties['top']; left?: CSSProperties['left']; }} [props.bulletIconPosition] - 불릿 아이콘의 top 및 left 위치 값.
 */
const BulletList = ({
  className = '',
  list,
  bulletIcon,
  bulletGap,
  bulletIconPosition = {}
}: Props) => {
  //logic

  return (
    <ul className={cx('bullet-list', className, { 'default-circle': !bulletIcon })}>
      {list?.map((item, index) => (
        <li key={index} style={{ paddingLeft: bulletGap }}>
          {bulletIcon && (
            <i className={cx('bullet-icon')} style={bulletIconPosition}>
              {bulletIcon}
            </i>
          )}
          {item}
        </li>
      ))}
    </ul>
  );
};

export type { Props as BulletListProps };
export default BulletList;
