import React, { MouseEvent, ReactElement, ReactNode } from 'react';
interface PropsType {
    className?: string;
    /**
     * td, td가 갖는 고유 id로써 className에 반영
     */
    fieldId: string;
    /**
     * 랜더될 자식 컴포넌트
     */
    children: ReactNode;
    /**
     * th에 들어갈 내용
     */
    label?: ReactElement | string;
    /**
     * th와 td의 width 값
     */
    size?: number | string;
    /**
     * 소팅에 사용될 값
     */
    sortValue?: string | number;
    /**
     * th와 td에 반영될 rowSpan
     */
    rowSpan?: number;
    /**
     * th와 td에 반영될 colSpan
     */
    colSpan?: number;
    /**
     * th에 반영될 colSpan
     */
    thColSpan?: number;
    /**
     * th에 반영될 rowSpan
     */
    thRowSpan?: number;
    /**
     * TdExpend 컴포넌트의 expend 상태를 바꾸도록 하는 td로 정할지 여부
     */
    expend?: boolean;
    /**
     * 특정 행의 TdExpend 컴포넌트의 expend 상태 값
     */
    expendOpen?: boolean;
    /**
     * 특정 열의 소팅 순서
     */
    order?: 'asc' | 'desc' | '';
    /**
     * th를 눌러 소팅을 했을때 호출되는 함수
     * @param {number} [params.index] table list의 index
     * @param {string} [params.fieldId] th,td의 filedId
     * @param {'desc' | 'asc' | ''} [params.order] 소팅 정렬 순서
     */
    handleClickSort?: (params: {
        index: number;
        fieldId: string;
        order: 'desc' | 'asc' | '';
    }) => Promise<void> | void;
    /**
     * expend 상태를 toggle 하는 함수
     */
    handleExpendToggle?: (status: boolean) => void;
    /**
     * 특정 행의 TdExpend 컴포넌트의 expend 상태가 true가 되기 전에 호출되는 함수
     */
    beforeExpendOpen?: () => void;
    /**
     * td 태그를 클릭했을때 호출되는 함수
     * @param e `MouseEvent<HTMLTableCellElement>`
     */
    onClick?: (e: MouseEvent<HTMLTableCellElement>) => void;
}
/**
 * `TdColumn` 컴포넌트는 테이블의 열을 구성하는데 사용되며, 다양한 설정을 통해 커스터마이징이 가능합니다.
 *
 * @component
 * @param {Object} props 컴포넌트에 전달되는 속성들
 * @param {string} [props.className] - 컴포넌트에 추가할 CSS 클래스 이름
 * @param {string} props.fieldId - td와 th에 고유하게 적용될 id. 또한 className에도 반영됩니다.
 * @param {ReactNode} props.children - 컴포넌트 내부에 렌더될 자식 요소들
 * @param {ReactElement|string} [props.label] - th 태그 내에 표시될 내용
 * @param {number|string} [props.size] - th와 td 태그의 너비 값
 * @param {string|number} [props.sortValue] - 소팅 기능에 사용될 값
 * @param {number} [props.rowSpan] - th와 td 태그에 적용될 rowSpan 값
 * @param {number} [props.colSpan] - th와 td 태그에 적용될 colSpan 값
 * @param {number} [props.thColSpan] - th 태그에만 적용될 colSpan 값
 * @param {number} [props.thRowSpan] - th 태그에만 적용될 rowSpan 값
 * @param {boolean} [props.expend] - TdExpend 컴포넌트의 확장 상태를 변경할 td로 설정할지 여부
 * @param {boolean} [props.expendOpen] - 특정 행의 TdExpend 컴포넌트 확장 상태 값
 * @param {'asc'|'desc'|''} [props.order] - 특정 열의 소팅 순서
 * @param {Function} [props.handleClickSort] - th를 클릭하여 소팅을 실행했을 때 호출되는 함수.
 * @param {Function} [props.handleExpendToggle] - expend 상태를 토글하는 함수
 * @param {Function} [props.onClick] - td 태그를 클릭했을 때 호출되는 함수
 */
declare const TdColumn: {
    ({ className, children, fieldId, size, colSpan, rowSpan, expend, expendOpen, handleExpendToggle, onClick }: PropsType): React.JSX.Element;
    displayName: string;
};
export type { PropsType as TdColumnProps };
export default TdColumn;
