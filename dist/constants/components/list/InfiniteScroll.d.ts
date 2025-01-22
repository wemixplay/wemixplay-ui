import React, { MutableRefObject, ReactElement, ReactNode } from 'react';
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
declare const InfiniteScroll: ({ className, tag, list, scrollTarget, rootMargin, loading, loadingElement, children, handleLoadMore, ...props }: Props) => React.JSX.Element;
export type { Props as InfiniteScrollProps };
export default InfiniteScroll;
