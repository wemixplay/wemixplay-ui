'use client';

import React, {
  MutableRefObject,
  ReactElement,
  ReactNode,
  createElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';

import { makeCxFunc } from '@/utils/forReactUtils';

import Spinner from '@/components/loadings/Spinner';

import style from './InfiniteScroll.module.scss';

type DefaultProps = {
  className?: string;
  /** 실제 리스트를 랜더하는 자식 요소 */
  children: ReactNode;
  /** children의 부모 element 요소의 태그 ( ex. 'div', 'ul' 등) */
  tag?: string;
  /** 랜더링 되고 있는 리스트 배열 */
  list: JSONObject[] | null;
  /** scroll을 하는 영역 요소 */
  scrollTarget?: HTMLElement | Document | MutableRefObject<HTMLElement | Document>;
  /** IntersectionObserver에 반영될 rootMargin  */
  rootMargin?: number;
  /** 로딩중 상태 여부 */
  loading?: boolean;
  /** 총 랜더가 되어야 하는 리스트 총 갯수 */
  totalCount?: number;
  /** 랜더가 되어야 하는 리스트가 더 있는지 확인하는 flag */
  hasMore?: boolean;
  /** 로딩중일때 보여줄 요소 */
  loadingElement?: ReactElement;
  /** 리스트를 더 불러와야 하는 시점에 호출되는 함수 */
  handleLoadMore: () => void;
};

type TotalCountProps = DefaultProps & {
  /** 총 랜더가 되어야 하는 리스트 총 갯수 */
  totalCount: number;
  /** 랜더가 되어야 하는 리스트가 더 있는지 확인하는 flag */
  hasMore?: never;
};

type HasMoreProps = DefaultProps & {
  /** 랜더가 되어야 하는 리스트가 더 있는지 확인하는 flag */
  hasMore: boolean;
  /** 총 랜더가 되어야 하는 리스트 총 갯수 */
  totalCount?: never;
};

type Props = TotalCountProps | HasMoreProps;

const cx = makeCxFunc(style);

/**
 * 무한 스크롤 기능을 제공하는 컴포넌트.
 * 스크롤이 특정 지점에 도달하면 추가 컨텐츠를 로드합니다.
 *
 * @component
 * @param {string} [props.className=''] - 컴포넌트의 최상위 요소에 적용될 클래스 이름.
 * @param {ReactNode} props.children - 실제 리스트를 랜더링하는 자식 요소.
 * @param {string} [props.tag='div'] - children의 부모 element 요소의 태그 (예: 'div', 'ul' 등).
 * @param {JSONObject[]} [props.list=null] - 랜더링되고 있는 리스트 배열.
 * @param {number} props.totalCount - 랜더링 되어야 하는 리스트의 총 갯수.
 * @param {number} props.hasMore - 랜더가 되어야 하는 리스트가 더 있는지 확인하는 flag.
 * @param {HTMLElement | Document | MutableRefObject<HTMLElement | Document>} [props.scrollTarget=null] - scroll을 하는 영역 요소.
 * @param {number} [props.rootMargin=100] - IntersectionObserver에 반영될 rootMargin 값.
 * @param {boolean} [props.loading=false] - 현재 로딩 중 상태인지 여부.
 * @param {ReactElement} [props.loadingElement=<Spinner />] - 로딩 중일 때 보여줄 요소.
 * @param {Function} props.handleLoadMore - 리스트를 더 불러와야 하는 시점에 호출되는 함수.
 */
const InfiniteScroll = ({
  className = '',
  tag = 'div',
  list,
  scrollTarget = null,
  rootMargin = 100,
  loading,
  loadingElement = <Spinner />,
  children,
  handleLoadMore,
  ...props
}: Props) => {
  /** IntersectionObserver가 observe할 div 요소를 담는 참조 변수 */
  const target = useRef<HTMLDivElement | null>(null);
  /** props에 list와 동일한 배열 값을 담는 참조 변수 */
  const listRef = useRef(list);
  /** props에 totalCount와 동일한 값을 담는 참조 변수 */
  const totalCountRef = useRef('totalCount' in props ? props.totalCount : undefined);
  /** props에 hasMore와 동일한 값을 담는 참조 변수 */
  const hasMoreRef = useRef('hasMore' in props ? props.hasMore : undefined);
  /** props에 loading과 동일한 값을 담는 참조 변수 */
  const loadingRef = useRef(loading);
  /** 이전 count state를 기록하는 참조 변수 */
  const prevCount = useRef(-1);

  // 스크롤이 특정 지점에 도달하면 1씩 값을 증가시켜 결과적으로 handleLoadMore 함수를 호출하게 하는 역할을 하는 state
  const [count, setCount] = useState<number>(0);

  /**
   * IntersectionObserver API를 활용하여 만든 객체
   *
   * observe 하고 있는 요소가 뷰포트에 보이면 count state를 1씩 증가 시킴
   */
  const io = useMemo(() => {
    if (typeof window === 'undefined') return null;

    return new IntersectionObserver(
      (entries, observer) => {
        if (target?.current === null) return;
        if (entries[0].intersectionRatio > 0.2) {
          // 로딩 중일때는 count를 증가시키지 않음
          if (!loadingRef.current) {
            setCount((v) => v + 1);
            // setCount가 무한으로 올라가는 것을 방지하기 위한 연결 끊음
            observer.disconnect();
          }
        }
      },
      {
        root: !scrollTarget
          ? null
          : 'current' in scrollTarget
            ? scrollTarget.current
            : scrollTarget,
        rootMargin: `${rootMargin}px 0px`,
        threshold: [0.1, 0.2, 0.5, 0.8, 0.9, 1.0]
      }
    );
  }, [target, rootMargin, scrollTarget]);

  /**
   * 더 불러와야할 리스트가 있는지 확인하는 함수
   */
  const hasNext = useCallback(() => {
    // list가 null이거나 로딩 중일때는 더 불러오지 않아햐하기 때문에 false 반환
    if (!listRef.current || loadingRef.current) {
      return false;
    }

    // 현재 핸더된 리스트 수가 0보다 크면 더 불러와야할 리스트가 있다고 판단
    let isNext = listRef.current.length > 0;

    // 리스트 총 개수가 현재 랜더된 리스트 수보다 크면 더 불러와야할 리스트가 있다고 판단
    if (typeof totalCountRef.current !== 'undefined') {
      isNext = totalCountRef.current > listRef.current.length;
      // hasMore가 true면 더 불러와야할 리스트가 있다고 판단
    } else {
      isNext = !!hasMoreRef.current;
    }

    return isNext;
  }, []);

  /**
   * count값이 증가하면 handleLoadMore 함수를 호출
   */
  useEffect(() => {
    // count가 0보다 크고 (첫 useEffect 실행시 handleLoadMore 함수 호출 방지)
    // prevCount.current가 count보다 작아야 하고 (handleLoadMore 함수가 재정의 될때 handleLoadMore 함수를 또 호출하는 것을 방지)
    // hasNext 함수 반환 값이 true 일때
    if (count > 0 && prevCount.current < count && (listRef.current ?? []).length && hasNext()) {
      prevCount.current = count;
      handleLoadMore && handleLoadMore();
    }
  }, [count, hasNext, handleLoadMore]);

  /**
   * 컴포넌트가 mount될때 io객체가 target.current를 observe하고
   * unmount 될때 unobserve
   */
  useEffect(() => {
    const observeEl = target?.current;
    observeEl && io?.observe(observeEl);

    return () => {
      if (observeEl && io) {
        io.unobserve(observeEl);
      }
    };
  }, [target, list, io]);

  /**
   * listRef, totalCountRef, hasMoreRef 참조 변수에
   * props로 전달된 list, totalCount or hasMore 값을 동기화
   */
  useEffect(() => {
    if ('totalCount' in props) {
      if (
        prevCount.current !== -1 &&
        listRef.current &&
        list &&
        listRef.current.length === list.length &&
        props.totalCount > list.length
      ) {
        // nft Card InfiniteScroll 이슈로 주석처리
        // totalCountRef.current = list.length;
        // console.error(
        //   '업데이트된 list가 이전 list의 길이와 동일합니다. totalCount가 전체 리스트 갯수보다 크게 부여된 것으로 보입니다.'
        // );
      } else {
        totalCountRef.current = props.totalCount;
      }
    } else {
      hasMoreRef.current = props.hasMore;
    }

    listRef.current = [...(list || [])];
  }, [list, props]);

  /**
   * loadingRef 참조 변수에
   * props로 전달된 loading 값을 동기화
   */
  useEffect(() => {
    loadingRef.current = loading;
  }, [loading]);

  return (
    <div className={cx(className, 'infinite-scroll')}>
      {createElement(tag || 'div', { children })}
      <div ref={target} className={cx('io-target')}>
        <div className={cx('infinite-scroll-loading', { active: loading && (list ?? []).length })}>
          {loading && (list ?? []).length > 0 && loadingElement}
        </div>
      </div>
    </div>
  );
};

export type { Props as InfiniteScrollProps };
export default InfiniteScroll;
