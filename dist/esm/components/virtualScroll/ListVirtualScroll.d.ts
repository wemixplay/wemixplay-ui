import React, { MutableRefObject, ReactElement } from 'react';
import { GetArrayItemType, UnknownArrayType } from "../../types/utility";
export type VirtualElementFunc<LIST extends UnknownArrayType> = ({ item, imageCacher, index }?: {
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
    element: ({ item, imageCacher, index }: {
        item: GetArrayItemType<LIST>;
        imageCacher: (imgSrcList: string | string[]) => void;
        index: number;
    }) => ReactElement;
}
export type { Props as ListVirtualScrollProps };
declare const _default: <LIST extends UnknownArrayType>({ className, scrollTarget, list, preloadCnt, itemHeight, gapY, loading, loadingElement, skeletonElement, skeletonCnt, noDataMsg, element }: Props<LIST>) => React.JSX.Element;
export default _default;
