'use client';

import React, {
  CSSProperties,
  MutableRefObject,
  ReactElement,
  cloneElement,
  createElement,
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} from 'react';

import { GetArrayItemType, UnknownArrayType } from '@/types/utility';
import { makeCxFunc } from '@/utils/forReactUtils';

import Spinner from '../loadings/Spinner';
import NoDataText from '../noData/NoDataText';

import imageCacher from './imageCacher';
import style from './VirtualScroll.module.scss';

if (typeof window === 'undefined') React.useLayoutEffect = React.useEffect;

export type VirtualElementFunc<LIST extends UnknownArrayType> = ({
  item,
  imageCacher,
  index
}?: {
  item: GetArrayItemType<LIST>;
  imageCacher: (imgSrcList: string | string[]) => void;
  index: number;
}) => ReactElement;

interface Props<LIST extends UnknownArrayType> {
  className?: string;
  /** scroll의 주체가 되는 element를 ref로 전달하거나 HTMLElement로 전달 (default: window) */
  scrollTarget?: MutableRefObject<HTMLElement | null> | HTMLElement;
  /** 랜더링 할 list 배열 */
  list: LIST | null;
  /** viewport에 노출되는 리스트 말고 container 위 아래에 미리 랜더링을 해놓을 열의 갯수 (default: 5) */
  preloadCnt?: number;
  /** list의 요소 하나에 대한 height (함수로 전달하여 동적으로 계산 가능) */
  itemHeight: number | ((containerWidth: number) => number);
  /** y좌표를 기준으로 list의 각 요소 간의 간격 (함수로 전달하여 동적으로 계산 가능) */
  gapY?: number | ((containerWidth: number) => number);
  /** list가 빈배열일때 데이터가 없는 것으로 간주하고 노출할 데이터가 없음을 나타내는 내용 */
  noDataMsg?: string | ReactElement;
  /** loading 상태 여부 */
  loading?: boolean;
  /** list가 null이거나 loading이 true면 list 데이터를 fetch 하고 있는 것으로 간주하고 노출할 로딩 요소/컴포넌트 */
  loadingElement?: string | ReactElement;
  /** 로딩시 스켈레톤 처리를 하고 싶을때 보여줄 스켈레톤 요소/컴포넌트 */
  skeletonElement?: ReactElement;
  /** 로딩시 스켈레톤 처리 할때 보여줄 스켈레톤 요소 갯수 */
  skeletonCnt?: number;
  /**
   * list의 각 요소의 element를 그릴때 사용할 함수 (랜더링 하고자 하는 컴포넌트 및 jsx 형태를 반환하면 됨)
   *
   * 인자로 { item, imageCacher, index } 객체가 전달되는데
   * item - list의 요소
   * index - list index
   * imageCacher - 랜더할 컴포넌트가 갖고 있는 이미지 src를 인자로 전달하면 해당 이미지를 캐시 처리하는 함수
   *  */
  element: ({
    item,
    imageCacher,
    index
  }: {
    item: GetArrayItemType<LIST>;
    imageCacher: (imgSrcList: string | string[]) => void;
    index: number;
  }) => ReactElement;
}

const cx = makeCxFunc(style);

const VirtualItem = memo(
  ({
    gapY,
    index,
    resizeObserver,
    children,
    heightList,
    updateHeight
  }: {
    gapY?: number;
    index?: number;
    resizeObserver?: ResizeObserver;
    children?: ReactElement;
    heightList: number[];
    updateHeight: (height: number, index: number) => void;
  }) => {
    /** 가상 스크롤안에 리스트로 존재할 아이템 element를 ref로 저장 */
    const itemRef = useRef<HTMLDivElement>();

    /** 가상 스크롤안에 리스트로 존재할 아이템 컴포넌트의 스타일 state */
    const [style, setStyle] = useState<CSSProperties>({
      position: 'absolute',
      width: '100%',
      top: (itemRef.current?.offsetHeight ?? 0 + gapY) * index,
      left: 0,
      zIndex: 1,
      visibility: heightList[index] ? 'visible' : 'hidden'
    });

    /** 가상 아이템 컴포넌트의 height 값을 부모 컴포넌트인 ListVirtualScroll 컴포넌트에 전달하는 함수 */
    const setHeight = useCallback(() => {
      if (itemRef.current) {
        const height = itemRef.current.offsetHeight;

        updateHeight(height, index);
      }
    }, [index, updateHeight]);

    /** 가상 아이템 컴포넌트의 스타일을 계산하여 setState 해주는 함수 */
    const setElementStyle = useCallback(() => {
      if (heightList[index]) {
        const top = heightList.slice(0, index).reduce((arr, cur) => arr + cur, 0); // position top값을 계산

        setStyle((style) => ({
          ...style,
          left: 0,
          top: top + gapY,
          visibility: 'visible'
        }));
      } else {
        setHeight();
      }
    }, [gapY, heightList, index, setHeight]);

    useEffect(() => {
      setElementStyle();
    }, [setElementStyle]);

    useEffect(() => {
      const target = itemRef.current;

      resizeObserver.observe(target);

      return () => {
        resizeObserver.unobserve(target);
      };
    }, [resizeObserver]);

    return (
      <div ref={itemRef} data-index={index} className={cx('virtual-item')} style={style}>
        {children}
      </div>
    );
  }
);

VirtualItem.displayName = 'VirtualItem';

/**
 * 가상 스크롤을 통해 대용량 리스트를 효율적으로 렌더링하는 컴포넌트.
 * 리스트의 아이템들을 화면에 보이는 부분만 렌더링하여 성능을 최적화합니다.
 *
 * @param {string} [props.className=''] - 컴포넌트의 최상위 엘리먼트에 적용될 클래스 이름.
 * @param {MutableRefObject<HTMLElement | null> | HTMLElement} [props.scrollTarget] - 스크롤 이벤트의 대상이 될 엘리먼트. 기본값은 window.
 * @param {LIST | null} props.list - 렌더링할 데이터 리스트. null이면 로딩 중이거나 데이터 없음 상태로 간주.
 * @param {number} [props.preloadCnt=10] - 뷰포트에 보이지 않는 영역 위아래로 미리 렌더링할 아이템의 개수.
 * @param {number | ((containerWidth: number) => number)} props.itemHeight - 리스트 아이템의 높이. 고정값 또는 컨테이너 너비에 따라 동적으로 계산 가능.
 * @param {number | ((containerWidth: number) => number)} props.gapY - 리스트 아이템간의 수직 간격. 고정값 또는 컨테이너 너비에 따라 동적으로 계산 가능.
 * @param {string | ReactElement} [props.noDataMsg] - 리스트가 비어있을 때 표시할 메시지 또는 요소.
 * @param {boolean} [props.loading] - 리스트 데이터 로딩 상태 여부.
 * @param {string | ReactElement} [props.loadingElement=<Spinner />] - 로딩 중일 때 표시할 요소 또는 컴포넌트.
 * @param {ReactElement} [props.skeletonElement] - 로딩 시 스켈레톤 처리를 위해 표시할 요소 또는 컴포넌트.
 * @param {number} [props.skeletonCnt=3] - 로딩 시 표시할 스켈레톤 요소의 개수.
 * @param {function} props.element - 리스트의 각 아이템을 렌더링할 때 사용할 함수. 아이템 데이터, 이미지 캐셔 함수, 인덱스를 인자로 받음.
 */
const ListVirtualScroll = <LIST extends UnknownArrayType>({
  className = '',
  scrollTarget,
  list,
  preloadCnt = 5,
  itemHeight,
  gapY = 0,
  loading,
  loadingElement = <Spinner />,
  skeletonElement,
  skeletonCnt = 3,
  noDataMsg,
  element
}: Props<LIST>) => {
  /** 가상 스크롤의 루트가 되는 div element를 ref로 저장 */
  const vsRef = useRef<HTMLDivElement>();
  /** requestAnimationFrame의 id 값을 ref로 저장 */
  const animationFrameId = useRef<number | null>(null);
  /** 효율적인 CPU 사용률 관리를 위해 rerender를 했던 이전 timestamp를 기록하는 ref */
  const prevRenderTime = useRef(0);
  /** 효율적인 CPU 사용률 관리를 위해 rerender를 했던 이전 scroll 포지션을 기록하는 ref */
  const prevScrollPos = useRef(0);
  /** 효율적인 CPU 사용률 관리를 위해 rerender를 했던 이전 indexInfo를 기록하는 ref */
  const indexInfoRef = useRef({
    startIndex: 0,
    endIndex: 50
  });

  /** list가 처음부터 초기화 되었다면 이전 상태를 기억한다고 판단하는 state */
  const [isKeepStatus] = useState(!!list);
  /** 스크롤 영역에 그려질 아이템들의 height를 기록하고 저장하는 state */
  const [heightList, setHeightList] = useState<number[]>([]);
  /** viewport 영역에 그려질 아이템들의 index 정보를 기록하고 저장하는 state */
  const [indexInfo, setIndexInfo] = useState({
    startIndex: 0,
    endIndex: 50
  });
  /** 가상 스크롤에서 필요한 사이즈 정보를 저장하는 state */
  const [sizeInfo, setSizeInfo] = useState({
    containerWidth: vsRef.current?.clientWidth ?? 0,
    gapY: typeof gapY === 'number' ? gapY : gapY(vsRef.current?.clientWidth ?? 0)
  });

  /**
   * 가상 스크롤에 그려질 아이템들의 element 구조를 그리는 함수를 props로 전달받고 createElement 진행
   * 메모리얼라이징을 활용하여 element 함수가 변경되지 않는 한 그리고 반환 결과가 달라지지 않는 한 다시 리랜더를 하지 않도록 useMemo 활용
   */
  const Component = useMemo(() => createElement(element), [element]);

  /** ResizeObserver를 활용하여 reflow와 repaint를 최소화하고 가상 스크롤이 가져야할 사이즈 정보를 재계산하여 setState 하도록 설정 */
  const resizeObserver = useMemo(() => {
    return new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { clientWidth, offsetHeight, dataset } = entry.target as HTMLElement;

        const index = Number(dataset.index ?? -1);

        if (index === -1) {
          setSizeInfo({
            containerWidth: clientWidth ?? 0,
            gapY: typeof gapY === 'number' ? gapY : gapY(clientWidth ?? 0)
          });
        } else {
          setHeightList((heightList) =>
            heightList.map((height, idx) => {
              return idx === index ? offsetHeight : height;
            })
          );
        }
      }
    });
  }, [gapY]);

  const isLoading = useMemo(() => {
    return loading || !list;
  }, [loading, list]);

  /** 가상 스크롤 viewport 영역에 그려질 list를 계산   */
  const renderList = useMemo(() => {
    if (!list && !skeletonElement) return [];

    return !isLoading
      ? list.slice(indexInfo.startIndex, indexInfo.endIndex)
      : Array.from({ length: skeletonCnt }).map(() => undefined);
  }, [list, skeletonElement, indexInfo, skeletonCnt, isLoading]);

  /**
   * 전체 list에서 가장 높은 height를 가진 item을 찾아 최대 높이값을 알 수 있도록 구현
   * 추상적인 containerHeight를 구하는데에 활용됨
   */
  const maxHeight = useMemo(() => {
    const idealHeight =
      typeof itemHeight === 'number' ? itemHeight : itemHeight(sizeInfo.containerWidth);
    const validHeightList = heightList.filter((h) => !!h);

    return validHeightList.length ? Math.max(...heightList.filter((h) => !!h)) : idealHeight;
  }, [heightList, itemHeight, sizeInfo.containerWidth]);

  /**
   * list를 감싸고 있는 element의 height를 계산
   * 전체 모두 한번씩 랜더링 되었다면 heightList의 총 합을 반환
   * 전체 모두 한번씩 랜더링이 되지 않았다면 height를 모르는 아이템들도 있기 때문에 maxHeight로 추상적인 containerHeight를 계산하여 반환
   */
  const containerHeight = useMemo(() => {
    const length = list ? list.length : skeletonCnt;

    if (length > 0 && heightList.length === length) {
      return heightList.reduce((acc, cur) => acc + cur + sizeInfo.gapY, 0);
    }

    return maxHeight > 0 ? maxHeight * length : 0;
  }, [list, skeletonCnt, heightList, maxHeight, sizeInfo.gapY]);

  /** 총 list들 중 화면에 render되어야 할 list를 추출하기 위해 필요한 값인 startIndex와 endIndex를 계산하는 함수 */
  const caculateIndexInfo = useCallback(() => {
    const scrollEl = scrollTarget
      ? 'current' in scrollTarget
        ? scrollTarget.current
        : scrollTarget
      : null;

    const scrollY = scrollEl ? scrollEl.scrollTop : window.scrollY; // 스크롤 주체가 되는 타겟의 스크롤 top
    const wrapHeight = scrollEl ? scrollEl.offsetHeight : window.innerHeight; // 스크롤 주체가 되는 타겟의 width

    /** 가상 스크롤 내에 모든 item의 position top 값을 담은 배열 */
    const topList = heightList.reduce((acc, cur) => {
      const top = (acc[acc.length - 1] ?? 0) + cur;

      acc.push(top);

      return acc;
    }, []);

    let newStartIndex = topList.findIndex((top) => top >= scrollY); // viewport 상단과 가까운 item의 index를 탐색
    let newEndIndex = topList.findIndex((top) => top >= scrollY + wrapHeight); // viewport 하단과 가까운 item의 index를 탐색

    if (newStartIndex === -1) {
      // startIndex를 찾지 못했다면 이전 startIndex로 대체
      newStartIndex = indexInfoRef.current.startIndex;
    } else {
      newStartIndex = newStartIndex - 10 - preloadCnt;

      newStartIndex = !!maxHeight && newStartIndex > 0 ? newStartIndex : 0;
    }

    if (newEndIndex === -1) {
      // endIndex를 찾지 못했다면 이전 endIndex로 대체
      newEndIndex = indexInfoRef.current.endIndex;
    } else {
      newEndIndex = newEndIndex + 10 + preloadCnt;

      newEndIndex = !!maxHeight && newEndIndex > 0 ? newEndIndex : 50;
    }

    return {
      startIndex: newStartIndex,
      endIndex: newEndIndex
    };
  }, [scrollTarget, heightList, maxHeight, preloadCnt]);

  /** VirtualItem 컴포넌트가 랜더링 되고 난 후 자신의 height를 계산하여 전달하고 해당 height를 heightList에 setState하는 함수 */
  const handleUpdateHeight = useCallback(
    (height: number, index: number) => {
      if (!list && !skeletonElement) return;

      setHeightList((heightList) => {
        heightList[index] = height;

        return heightList.slice(0, list ? list.length : skeletonCnt); // list 값이 달라질 수도 있기 때문에 list 길이 만큼 다시 slice를 해줌
      });
    },
    [list, skeletonElement, skeletonCnt]
  );

  /** 스크롤 이벤트리스너가 트리거할 함수이며 viewport에 그려질 리스트의 index정보를 계산하여 setState 처리 */
  const handleScroll = useCallback(() => {
    const scrollEl = scrollTarget
      ? 'current' in scrollTarget
        ? scrollTarget.current
        : scrollTarget
      : null;

    const scrollY = scrollEl ? scrollEl.scrollTop : window.scrollY; // 스크롤 주체가 되는 타겟의 스크롤 top
    const currentTime = Date.now();
    const minimumIndexGap = preloadCnt >= 20 ? Math.ceil(preloadCnt / 2) : 10; // 최소 차이가 나는 index의 차이를 설정
    const scrollDiff = scrollY - prevScrollPos.current; // 이전 리랜더했을 시의 scroll값과 현재의 스크롤 값의 차이를 계산
    const isScrollDown = scrollDiff > 0; // 스크롤을 아래로 내리고 있는지 확인
    const scrollDiffAbs = Math.abs(scrollDiff); // 이전 리랜더했을 시의 scroll값과 현재의 스크롤 값의 차이의 절대값

    /**
     * requestAnimationFrame의 id 값이 아직 있다면 이전 requestAnimationFrame이 작동중이라고 판단하여
     * 이전 requestAnimationFrame을 취소 (cpu 사용률을 효율적으로 관리하기 위함)
     * */
    if (animationFrameId.current !== null) cancelAnimationFrame(animationFrameId.current);

    /**
     * requestAnimationFrame을 요청하고 id 값을 저장
     */
    animationFrameId.current = requestAnimationFrame(() => {
      const indexInfo = caculateIndexInfo(); // index 정보 계산

      if (
        scrollDiffAbs > 0 &&
        scrollY > 0 &&
        ((isScrollDown && indexInfo.endIndex < indexInfoRef.current.endIndex) ||
          (!isScrollDown && indexInfo.startIndex > indexInfoRef.current.startIndex))
      ) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;

        return;
      }

      if (isScrollDown && scrollDiffAbs > maxHeight) {
        indexInfo.endIndex += Math.floor(scrollDiffAbs / maxHeight);
      } else if (!isScrollDown && scrollDiffAbs > maxHeight) {
        indexInfo.startIndex -= Math.floor(scrollDiffAbs / maxHeight);

        if (indexInfo.startIndex <= 0) {
          indexInfo.startIndex = 0;
        }
      }

      /** 이전 리랜더한 시간과 200ms 이상 차이가 나면 계산한 index 정보를 setState 하여 리랜더링 */
      if (currentTime - prevRenderTime.current >= 200 || scrollY <= 0 || scrollDiffAbs === 0) {
        setIndexInfo(indexInfo);

        prevScrollPos.current = scrollY;
        indexInfoRef.current = { ...indexInfo };
        prevRenderTime.current = currentTime;

        animationFrameId.current = null;

        return;
      } else if (scrollDiffAbs >= maxHeight * (preloadCnt / 2)) {
        setIndexInfo(indexInfo);

        prevScrollPos.current = scrollY;
        indexInfoRef.current = { ...indexInfo };
        prevRenderTime.current = currentTime;

        animationFrameId.current = null;
      } else if (
        indexInfoRef.current.endIndex - indexInfo.endIndex > preloadCnt ||
        indexInfo.startIndex - indexInfoRef.current.startIndex > preloadCnt
      ) {
        setIndexInfo(indexInfo);

        prevScrollPos.current = scrollY;
        prevRenderTime.current = currentTime;
        indexInfoRef.current = { ...indexInfo };
      }
    });
  }, [caculateIndexInfo, maxHeight, preloadCnt, scrollTarget]);

  useEffect(() => {
    resizeObserver.observe(vsRef.current);
  }, [vsRef, resizeObserver]);

  useEffect(() => {
    if (typeof window !== 'undefined' && vsRef.current) {
      const eventTarget = scrollTarget
        ? 'current' in scrollTarget
          ? scrollTarget.current
          : scrollTarget
        : window;

      handleScroll();

      eventTarget.removeEventListener('scroll', handleScroll);
      eventTarget.addEventListener('scroll', handleScroll);

      return () => {
        if (animationFrameId.current !== null) {
          cancelAnimationFrame(animationFrameId.current);
        }
        eventTarget.removeEventListener('scroll', handleScroll);
      };
    }
  }, [scrollTarget, animationFrameId, handleScroll]);

  return (
    <div
      ref={vsRef}
      className={cx(className, 'virtual-scroll', { 'no-data': list && !list.length })}
      style={{ height: containerHeight, minHeight: isKeepStatus && !list ? '100000px' : 0 }}
    >
      {isLoading && !skeletonElement && <div className={cx('loading')}>{loadingElement}</div>}
      {!isLoading &&
        list.length === 0 &&
        (typeof noDataMsg === 'object' ? (
          noDataMsg
        ) : (
          <NoDataText className={cx('no-msg-comp')} nullText={noDataMsg} />
        ))}
      {renderList.map((item, index) => {
        const realIndex = indexInfo.startIndex + index;

        return (
          <VirtualItem
            key={`${realIndex}-${sizeInfo.containerWidth}-${!list ? 'skeleton' : ''}`}
            {...sizeInfo}
            index={realIndex}
            resizeObserver={resizeObserver}
            heightList={heightList}
            updateHeight={handleUpdateHeight}
          >
            <div>
              {cloneElement(!list ? skeletonElement : Component, {
                item: item as GetArrayItemType<LIST>,
                imageCacher: imageCacher,
                index: realIndex
              })}
            </div>
          </VirtualItem>
        );
      })}
    </div>
  );
};

export type { Props as ListVirtualScrollProps };
export default memo(ListVirtualScroll) as typeof ListVirtualScroll;
