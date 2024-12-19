import React, { HTMLAttributes, createElement, CSSProperties, ReactNode } from 'react';
import { makeCxFunc } from '@/utils/forReactUtils';
import style from './Stack.module.scss';

interface PropsType extends HTMLAttributes<HTMLElement> {
  id?: string;
  /**
   * 컴포넌트 클래스명
   */
  className?: string;
  /**
   * 컴포넌트 태그
   */
  tag?: 'div' | 'section' | 'article' | 'header' | 'footer' | 'main' | 'aside' | 'nav';
  /**
   * flex의 justify-content
   */
  justifyContent?: CSSProperties['justifyContent'];
  /**
   * flex의 justify-items
   */
  justifyItems?: CSSProperties['justifyItems'];
  /**
   * flex의 justify-self
   */
  justifySelf?: CSSProperties['justifySelf'];
  /**
   * flex의 align-items
   */
  alignItems?: CSSProperties['alignItems'];
  /**
   * flex의 align-self
   */
  alignSelf?: CSSProperties['alignSelf'];
  /**
   * flex의 align-content
   */
  alignContent?: CSSProperties['alignContent'];
  /**
   * inline-flex 레이아웃 여부
   */
  inline?: boolean;
  /**
   * 컴포넌트 스타일
   */
  style?: Omit<CSSProperties, 'columnGap' | 'rowGap'>;
  /**
   * flex의 column-gap
   */
  columnGap?: CSSProperties['columnGap'];
  /**
   * flex의 row-gap
   */
  rowGap?: CSSProperties['rowGap'];
  /**
   * flex의 gap
   */
  gap?: CSSProperties['gap'];
  /**
   * 컴포넌트 자식 노드
   */
  children: ReactNode;
}

const cx = makeCxFunc(style);

/**
 * `HStack`은 display: flex; 형태의 수평 스택 컴포넌트 입니다.
 *
 * @param {string} [props.className] - 컴포넌트 클래스명
 * @param {string} [props.tag='div' | 'section' | 'article' | 'header' | 'footer' | 'main' | 'aside' | 'nav'] - 컴포넌트 태그
 * @param {CSSProperties['justifyContent']} [props.justifyContent] - flex의 justify-content
 * @param {CSSProperties['justifyItems']} [props.justifyItems] - flex의 justify-items
 * @param {CSSProperties['justifySelf']} [props.justifySelf] - flex의 justify-self
 * @param {CSSProperties['alignItems']} [props.alignItems] - flex의 align-items
 * @param {CSSProperties['alignSelf']} [props.alignSelf] - flex의 align-self
 * @param {CSSProperties['alignContent']} [props.alignContent] - flex의 align-content
 * @param {boolean} [props.inline] - inline-flex 레이아웃 여부
 * @param {CSSProperties} [props.style] - 컴포넌트 스타일
 * @param {CSSProperties['columnGap']} [props.columnGap] - flex의 column-gap
 * @param {CSSProperties['rowGap']} [props.rowGap] - flex의 row-gap
 * @param {CSSProperties['gap']} [props.gap] - flex의 gap
 * @param {ReactNode} [props.children] - 컴포넌트 자식 노드
 * @returns 수평 스택 컴포넌트
 */
const HStack = ({
  id,
  className,
  inline,
  justifyContent,
  justifyItems,
  justifySelf,
  alignItems,
  alignSelf,
  alignContent,
  columnGap,
  rowGap,
  gap,
  style = {},
  children,
  tag = 'div',
  ...rest
}: PropsType) => {
  const checkGapClassName = (
    directionGap: CSSProperties['columnGap'] | CSSProperties['rowGap'],
    gap?: CSSProperties['gap']
  ) => {
    if (directionGap) {
      return typeof directionGap === 'number' && directionGap > 0 && directionGap <= 500;
    }

    return typeof gap === 'number' && gap > 0 && gap <= 500;
  };

  return createElement(
    tag,
    {
      ...rest,
      id,
      className: cx('hstack', className, {
        'inline-flex': inline,
        flex: !inline,
        [`justify-content-${justifyContent}`]: justifyContent,
        [`justify-items-${justifyItems}`]: justifyItems,
        [`justify-self-${justifySelf}`]: justifySelf,
        [`align-items-${alignItems}`]: alignItems,
        [`align-self-${alignSelf}`]: alignSelf,
        [`align-content-${alignContent}`]: alignContent,
        [`column-gap-${columnGap ?? gap}`]: checkGapClassName(columnGap, gap),
        [`row-gap-${rowGap ?? gap}`]: checkGapClassName(rowGap, gap)
      }),
      style: {
        ...style,
        gap: !checkGapClassName(gap) && gap,
        columnGap: !checkGapClassName(columnGap) && columnGap,
        rowGap: !checkGapClassName(rowGap) && rowGap
      }
    },
    children
  );
};

export type { PropsType as HStackProps };
export default HStack;
