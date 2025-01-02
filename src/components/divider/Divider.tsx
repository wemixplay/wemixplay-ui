import React, { CSSProperties, ReactNode } from 'react';
import style from './Divider.module.scss';
import { makeCxFunc } from '@/utils/forReactUtils';
import { CustomCSSProperties } from '@/types/style';

type BaseProps = {
  /** 컴포넌트 클래스명 */
  className?: string;
  /** 타입 */
  type?: 'horizontal' | 'vertical';
  /** 버턴 종류 */
  variant?: 'dashed' | 'dotted' | 'solid';
  /** 색상 */
  color?: CSSProperties['backgroundColor'];
  /** 구분선 두께 */
  size?: number;
  /** 구분선 간격 */
  spaceSize?: number;
  /** 구분선 간격 방향 */
  spaceDirection?: 'top' | 'bottom' | 'left' | 'right' | 'both';
  /** 컨텐츠 양 옆 간격 (`horizontal` 타입에만 적용) */
  contentSpace?: number;
  /** 컨텐츠 정렬 (`horizontal` 타입에만 적용) */
  contentAlign?: 'left' | 'right' | 'center';
  /** 컨텐츠 정렬 위치에서 어느 정도 띄울것인지 간격 사이즈 (`horizontal` 타입에만 적용) */
  contentPosition?: number;
  /** 컴포넌트 스타일 */
  style?: CSSProperties;
  children?: ReactNode;
};

type HorizontalProps = BaseProps & {
  /** 타입 */
  type?: 'horizontal';
  /** 컨텐츠 */
  children?: ReactNode;
  /** 컨텐츠 양 옆 간격 (`horizontal` 타입에만 적용) */
  contentSpace?: number;
  /** 컨텐츠 정렬 (`horizontal` 타입에만 적용) */
  contentAlign?: 'left' | 'right' | 'center';
};

type VerticalProps = BaseProps & {
  /** 타입 */
  type: 'vertical';
  /** 컨텐츠 */
  children?: never;
  /** 컨텐츠 양 옆 간격 (`horizontal` 타입에만 적용) */
  contentSpace?: never;
  /** 컨텐츠 정렬 (`horizontal` 타입에만 적용) */
  contentAlign?: never;
  /** 컨텐츠 정렬 위치에서 어느 정도 띄울것인지 간격 사이즈 (`horizontal` 타입에만 적용) */
  contentPosition?: never;
};

type Props = HorizontalProps | VerticalProps;

const cx = makeCxFunc(style);

/**
 * `Divider`컴포넌트는 구분선을 표시하는 컴포넌트입니다.
 *
 * @param {string} [props.className] - 컴포넌트 클래스명
 * @param {string} [props.type] - 구분선 타입
 * @param {string} [props.variant] - 구분선 버턴 종류
 * @param {string} [props.color] - 구분선 색상
 * @param {number} [props.size] - 구분선 두께
 * @param {number} [props.spaceSize] - 구분선 간격
 * @param {string} [props.spaceDirection] - 구분선 간격 방향
 * @param {string} [props.contentAlign] - 컨텐츠 정렬
 * @param {number} [props.contentSpace] - 컨텐츠 양 옆 간격
 * @param {number} [props.contentPosition] - 컨텐츠 정렬 위치에서 어느 정도 띄울것인지 간격 사이즈
 * @param {ReactNode} [props.children] - 컴포넌트 자식 노드
 * @param {CSSProperties} [props.style] - 컴포넌트 스타일
 * @returns 구분선 컴포넌트
 */
const Divider = ({
  className,
  type = 'horizontal',
  variant = 'solid',
  color,
  size = 1,
  spaceSize,
  spaceDirection = 'both',
  contentAlign = 'center',
  contentSpace = 12,
  contentPosition,
  children,
  style
}: Props) => {
  //logic

  return (
    <div
      className={cx('divider', className, type, variant, spaceDirection, {
        [`size-${size}`]: size,
        [`space-size-${spaceSize}`]: spaceSize,
        [`content-align-${contentAlign}`]: type === 'horizontal' && contentAlign,
        [`content-position-${contentPosition}`]:
          type === 'horizontal' && typeof contentPosition === 'number'
      })}
      style={{ ...style, '--divider-color': color } as CustomCSSProperties}
    >
      {!!children && type === 'horizontal' && (
        <div
          className={cx('divider-content', {
            [`content-space-${contentSpace}`]: contentSpace
          })}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export type { Props as DividerProps };
export default Divider;
