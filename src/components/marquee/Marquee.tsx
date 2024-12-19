'use client';

import React, {
  CSSProperties,
  Children,
  ReactNode,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} from 'react';

import { makeCxFunc } from '@/utils/forReactUtils';

import style from './Marquee.module.scss';

if (typeof window === 'undefined') React.useLayoutEffect = React.useEffect;

const cx = makeCxFunc(style);

interface BaseProps {
  className?: string;
  /**
   * 마키 방향
   */
  direction?: 'left' | 'right' | 'up' | 'down';
  /**
   * 마키 애니메이션 실행 여부
   */
  off?: boolean;
  /**
   * 커서를 마키 컴포넌트 위에 올릴 시 애니메이션의 중단 여부
   */
  pauseOnMouseEnter?: boolean;
  /**
   * 애니메이션의 반복 횟수이며 입력하지 않으면 infinite가 기본으로 지정됨.
   */
  animationIterationCount?: CSSProperties['animationIterationCount'];
  /**
   * 애니메이션이 한 회 실행되는데 걸리는 시간
   */
  animationDuration?: CSSProperties['animationDuration'];
  /**
   * 애니메이션이 시작하기 전에 걸 수 있는 시간의 딜레이값
   */
  animationDelay?: CSSProperties['animationDelay'];
  /**
   * 마키 요소 사이의 간격(사용하는 곳의 스타일 지정보다 우선 적용됨.)
   */
  spaceBetween?: number;
  /**
   * 애니메이션이 시작할 때, 실행할 수 있는 함수
   */
  onStart?: () => void;
  /**
   * 애니메이션이 한 회 수행되었을 때, 실행할 수 있는 함수
   */
  onIteration?: () => void;
  /**
   * 애니메이션이 종료되었을 때, 실행할 수 있는 함수
   */
  onFinish?: () => void;
}

interface ChildrenProps extends BaseProps {
  /**
   * props 형태로 전달할 수 있는 애니메이션이 적용될 UI요소. children을 자식으로 전달한다면 사용할 수 없음.
   */
  list?: never;
  /**
   * Marquee 컴포넌트의 자식으로 전달할 수 있는 애니메이션이 적용될 UI요소. list를 prop으로 전달한다면 사용할 수 없음.
   */
  children: ReactNode | ReactNode[];
}

interface ListProps extends BaseProps {
  list: ReactNode[];
  children?: never;
}

type ElementProps = ChildrenProps | ListProps;

interface MinimalCountProps extends BaseProps {
  /**
   * 마키 컨테이너 너비와 요소 너비 * 요소 갯수를 보고 얼만큼의 곱으로
   * 총 길이를 정할 것인지에 대한 여부
   */
  minimalAuto?: true;
  /**
   * 요소가 보여질 최소 갯수
   */
  minimalCount?: never;
}

interface MinimalAutoProps extends BaseProps {
  minimalAuto?: false;
  minimalCount?: number;
}

type MinimalProps = MinimalCountProps | MinimalAutoProps;

type Props = ElementProps & MinimalProps;

/**
 * `Marquee` 표현할 UI를 무한으로 좌우, 상하 방향으로 롤링할 수 있는 컴포넌트입니다.
 *
 * @param {string} [props.className] - 마키 컴포넌트의 스타일을 위한 클래스 이름
 * @param {string} [props.direction] - 마키 컴포넌트의 children의 움직임이 흐를 방향
 * @param {React.ReactNode|React.ReactNode[]} [props.children] - 합성 컴포넌트 패턴으로 마키 요소를 주입하고 싶을 때 받을 수 있는 prop
 * @param {React.ReactNode[]} [props.list] - prop 주입으로 마키 요소를 전달하고 싶을 때 사용하는 prop
 * @param {boolean} [props.off] - 마키 애니메이션 작동에 대한 on, off의 boolean 값
 * @param {boolean} [props.pauseOnMouseEnter] - 마키 컴포넌트 영역 위에 커서를 올리면 애니메이션 멈춤을 적용할 것인지에 대한 여부
 * @param {boolean} [props.minimalAuto] - 마키의 자식 요소의 갯수와 그 길이, 마키 컴포넌트의 영역을 고려하여 화면의 크기에 맞출 수 있도록 자동으로 UI를 복사할 것인지에 대한 여부
 * @param {number} [props.minimalCount] - minimalAuto가 falsy라면 마키 자식 요소의 UI를 복제할 수동으로 입력할 수 있는 갯수
 * @param {number} [props.animationIterationCount] - 마키 컴포넌트가 화면에 그려진 이후 마키의 애니메이션이 동작할 횟수
 * @param {number} [props.animationDuration] - 마키 애니메이션이 한 회 순회하는데 걸리는 시간
 * @param {number} [props.animationDelay] - 마키 컴포넌트가 화면에 그려진 이후 애니메이션이 시작하는데 기다릴 시간
 * @param {number} [props.spaceBetween] - 마키 요소 사이의 간격 픽셀값
 * @param {function} [props.onStart] - 마키 애니메이션이 실행될 때 호출할 함수
 * @param {function} [props.onIteration] - 마키 애니메이션이 한 회 순회했을 때 호출할 함수
 * @param {function} [props.onFinish] - 마키 애니메이션이 종료되었을 때 호출할 함수
 */
const Marquee = ({
  className,
  direction = 'left',
  children,
  list,
  off = false,
  pauseOnMouseEnter = false,
  minimalAuto = false,
  minimalCount = 0,
  animationIterationCount = 'infinite',
  animationDuration,
  animationDelay,
  spaceBetween,
  onStart,
  onIteration,
  onFinish
}: Props) => {
  /**
   * 컴포넌트의 최종 부모인 컨테이너를 참조하는 ref변수
   */
  const containerRef = useRef<HTMLDivElement>(null);

  /**
   * 처음에 들어온 요소가 반복될 횟수를 상태로 지정
   */
  const [duplicateCount, setDuplicateCount] = useState(minimalCount);

  /**
   * UI 작업을 위해 marquee-item 클래스를 가진 span요소로 배열 요소를 하나씩 래핑
   */
  const elements = useMemo(() => {
    return (
      Children.map(children, (child, index) => (
        <span key={index} className={cx('marquee-item')}>
          {child}
        </span>
      )) ||
      list.map((el, index) => (
        <span key={index} className={cx('marquee-item')}>
          {el}
        </span>
      ))
    );
  }, [children, list]);

  /**
   * 배열 요소가 반복될 횟수대로 배열을 복사해 최종적으로 DOM에 그립니다.
   */
  const marqueeItems = useMemo(() => {
    let items = [...elements];

    while (duplicateCount > items.length) {
      items = [...items, ...elements];
    }

    return [...items, ...items].map(
      (el, index) => ({ ...el, key: index }) as unknown as JSX.Element
    );
  }, [elements, duplicateCount]);

  React.useLayoutEffect(() => {
    /**
     * minimalAuto가 true이면 아래의 코드를 통해 자동으로 배열을 복사할 횟수를 구하게 됩니다.
     */
    if (minimalAuto && containerRef.current) {
      const { current: container } = containerRef;

      const marqueeItemList = Array.from(container.getElementsByClassName('marquee-item')).slice(
        0,
        elements.length
      );

      const marqueeItemLength = marqueeItemList?.length;

      if (marqueeItemLength) {
        const isHorizontal = direction === 'left' || direction === 'right';

        /**
         * 마키 배열을 순회하면서 각 요소의 너비 or 높이, 마진 좌우 or 상하의 총 더한 값을 구합니다.
         */
        const { sizeSum, marginSum } = marqueeItemList.reduce<{
          sizeSum: number;
          marginSum: number;
        }>(
          ({ sizeSum, marginSum }, item) => {
            const { marqueeItemSize, marqueeItemMargin } = getMarqueeItemStyle(
              isHorizontal,
              item as HTMLSpanElement
            );

            return { sizeSum: sizeSum + marqueeItemSize, marginSum: marginSum + marqueeItemMargin };
          },
          { sizeSum: 0, marginSum: 0 }
        );

        /**
         * 위에서 구한 마키 배열의 총 크기와 컨테이너 크기, 그리고 요소의 길이를 가지고
         * 화면에 요소의 배열이 얼마나 곱해져야 최소의 길이로 끊기지 않을 애니메이션을 구현할 수 있을지 계산합니다.
         * spaceBetween이 prop으로 들어온 경우 spaceBetween을 배열의 길이에 곱한 값으로 totalSize를 구하고
         * 반대의 경우 위에서 구한 marginSum을 가지고 totalSize를 계산합니다.
         */
        const countToBeDuplicated = calcDuplicateCount({
          totalSize:
            typeof spaceBetween === 'number'
              ? sizeSum + spaceBetween * marqueeItemLength
              : sizeSum + marginSum,
          containerSize: container[isHorizontal ? 'offsetWidth' : 'offsetHeight'],
          elementLength: marqueeItemLength
        });

        /**
         * 최종적으로 곱해져야할 수를 구한 후 setState를 통해 화면을 업데이트합니다.
         */
        setDuplicateCount(countToBeDuplicated);
      }
    }
  }, [minimalAuto, direction, spaceBetween, elements]);

  return (
    <div
      ref={containerRef}
      className={cx('marquee-wrapper', { paused: pauseOnMouseEnter }, className)}
    >
      <div
        className={cx('marquee-content', direction, {
          off,
          'space-between': typeof spaceBetween === 'number'
        })}
        style={
          {
            animationDuration,
            animationDelay,
            animationIterationCount,
            '--space-between': `${spaceBetween}px`
          } as CSSProperties
        }
        onAnimationStart={onStart}
        onAnimationIteration={onIteration}
        onAnimationEnd={onFinish}
      >
        {marqueeItems}
      </div>
    </div>
  );
};

/**
 *
 * @param marqueeItem 마키의 배열 중 하나의 DOM 요소
 * @returns marqueeItemMarginBlock 마키의 상하 마진값
 * @returns marqueeItemMarginInline 마키의 좌우 마진값
 *
 * 실제로 화면에 그려지고 있는 marqueeItem 요소의 마진값을 구합니다.
 * getComputedStyle를 사용하면 화면에 그려지고 있는 DOM요소의 스타일 값을 그대로 가져옵니다.
 */
const calcMarqueeItemMargin = (marqueeItem: HTMLSpanElement) => {
  const [marqueeItemMarginBlock, marqueeItemMarginInline] = getComputedStyle(marqueeItem)
    .margin.replaceAll('px', '')
    .split(' ')
    .map(Number)
    .reduce((a, b, index) => (index % 2 === 0 ? [a[0] + b, a[1]] : [a[0], a[1] + b]), [0, 0]);
  return { marqueeItemMarginBlock, marqueeItemMarginInline };
};

/**
 *
 * @param isHorizontal 현재 마키 애니메이션의 진행 방향이 상하인지 좌우인지 여부
 * @param marqueeItem 마키의 배열 중 하나의 DOM 요소
 * @returns marqueeItemSize 진행방향이 상하인 경우 마키 요소의 높이, 좌우인 경우 너비
 * @returns marqueeItemMargin 진행방향이 상하인 경우 top, bottom 마진의 합, 좌우인 경우 left, right 마진의 합
 *
 */
const getMarqueeItemStyle = (isHorizontal: boolean, marqueeItem: HTMLSpanElement) => {
  const { marqueeItemMarginBlock, marqueeItemMarginInline } = calcMarqueeItemMargin(marqueeItem);

  const { offsetWidth: marqueeItemWidth, offsetHeight: marqueeItemHeight } = marqueeItem;

  return {
    marqueeItemSize: isHorizontal ? marqueeItemWidth : marqueeItemHeight,
    marqueeItemMargin: isHorizontal ? marqueeItemMarginInline : marqueeItemMarginBlock
  };
};

/**
 * 현재 마키 컨테이너의 크기에 마키 배열의 크기를 나누어 컨테이너에 총 몇개의 마키의 복사본이 보여질 수 있을지 계산해 toBeMultiPlied에 할당
 * 구한 toBeMultiPlied 값에 다시 배열의 길이를 곱하여 총 몇개의 마키 요소가 생성되어야 애니메이션 움직임의 50%에 보여질 수 있는지 하는지 구하고 반환.
 */
const calcDuplicateCount = ({
  totalSize,
  containerSize,
  elementLength
}: {
  totalSize: number;
  containerSize: number;
  elementLength: number;
}) => {
  const toBeMultiPlied = Math.ceil(containerSize / totalSize);
  return toBeMultiPlied * elementLength;
};

export default Marquee;
export type { Props as MarqueeProps };
