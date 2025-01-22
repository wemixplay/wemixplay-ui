import React, { ReactElement, ReactNode } from 'react';
import { TableData, ChildrenFuncParamsType } from './table.d';
interface PropsType<T extends TableData[]> {
    className?: string;
    /**
     * table에 랜더링될 list
     *
     * null일 경우 로딩중으로 간주
     */
    list: T | null;
    /**
     * list가 빈배열일때 노출될 no data 메세지
     */
    noDataMsg?: ReactElement | string;
    /**
     * 에러 발생시 랜더링할 요소 (ReactNode | ReactElement | string)
     */
    errorFallback?: ReactElement | ReactNode | string;
    /**
     * 리스트가 `null`일 때 로딩 중임을 표시할 요소
     *
     * 문자열 또는 React 컴포넌트 형태로 제공할 수 있으며, 데이터를 로딩 중임을 사용자에게 알리는 데 사용
     */
    loadingElement?: ReactElement;
    /**
     * thead를 숨김 처리할 것인지의 여부
     */
    hideThead?: boolean;
    /**
     * 오름차순 소팅(asc)일 시 th안에 보여줄 아이콘 요소
     */
    sortUpElement?: ReactElement | string;
    /**
     * 내림차순 소팅(desc)일 시 th안에 보여줄 아이콘 요소
     */
    sortDownElement?: ReactElement | string;
    /**
     * 소팅 정보가 없을 때 th안에 보여줄 아이콘 요소
     */
    sortNormalElement?: ReactElement | string;
    /**
     * 로딩 상태를 강제로 지정하고 싶을 때 사용되는 프로퍼티
     *
     * `true`로 설정될 경우, `list`의 값과 관계없이 로딩 상태로 간주되며, `loadingElement`가 화면에 표시
     */
    loading?: boolean;
    /**
     * 자식 컴포넌트를 랜더링하는 함수
     * 이 함수는 리스트의 각 항목을 받아 React 노드로 변환하는 데 사용
     * 함수는 리스트의 각 항목(`item`)과 해당 항목의 인덱스(`index`)를 매개변수로 받음
     */
    children: (obj: ChildrenFuncParamsType<T>) => ReactNode;
}
/**
 * 범용 테이블 컴포넌트.
 *
 * @component
 *
 * @template T - TableData를 확장한 배열 타입.
 * @param {string} [props.className=''] - 컴포넌트에 적용될 CSS 클래스 이름.
 * @param {T | null} props.list - 테이블에 렌더링될 데이터 목록. `null`일 경우 로딩 중으로 간주.
 * @param {ReactElement | string} [props.noDataMsg] - 데이터 목록이 빈 배열일 때 표시될 메시지. 문자열 또는 React 요소 형태.
 * @param {ReactElement | ReactNode | string} [props.errorFallback] - 에러 발생시 랜더링할 요소 (ReactNode | ReactElement | string)
 * @param {ReactElement} [props.loadingElement=<Spinner />] - 데이터 로딩 중일 때 표시될 요소. 문자열 또는 React 요소 형태.
 * @param {boolean} [props.hideThead=false] - `true`일 경우 테이블의 헤더(thead)를 숨김 처리.
 * @param {ReactElement | string} [props.sortUpElement=<SvgIcoSortUpElement />] - 오름차순 정렬 시 헤더에 표시될 요소. 문자열 또는 React 요소 형태.
 * @param {ReactElement | string} [props.sortDownElement=<SvgIcoSortDownElement />] - 내림차순 정렬 시 헤더에 표시될 요소. 문자열 또는 React 요소 형태.
 * @param {ReactElement | string} [props.sortNormalElement=<SvgIcoSortNormalElement />] - 소팅 정보가 없을 때 헤더에 표시될 요소. 문자열 또는 React 요소 형태.
 * @param {Function} props.children - 자식 컴포넌트를 렌더링하는 함수. 리스트의 각 항목(`item`)과 해당 항목의 인덱스(`index`)를 매개변수로 받아 React 노드로 변환하는 데 사용.
 */
declare const Table: <T extends TableData[]>({ className, list, children, loadingElement, errorFallback, noDataMsg, hideThead, sortUpElement, sortDownElement, sortNormalElement, loading }: PropsType<T>) => React.JSX.Element;
export type { PropsType as TableProps };
export default Table;
