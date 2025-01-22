import React, { ReactNode, MouseEvent } from 'react';
type PropsType = {
    className?: string;
    /**
     * 자식 컴포넌트
     */
    children: ReactNode | string;
    /**
     * 특정 행의 TdExpend 컴포넌트의 expend 상태를 지정하는 값
     */
    expendOpen?: boolean;
    /**
     * 특정 행의 TdExpend 컴포넌트의 expend 상태가 변경될때 호출되는 함수
     * @param status 변경된 expend 상태
     */
    handleExpendChange?: (status: boolean) => void;
    /**
     * 특정 행의 TdExpend 컴포넌트의 expend 상태가 true가 되기 전에 호출되는 함수
     */
    beforeExpendOpen?: () => void | Promise<void>;
    /**
     * tr 태그를 클릭했을때 호출되는 함수
     * @param e `MouseEvent<HTMLTableRowElement>`
     */
    onClick?: (e: MouseEvent<HTMLTableRowElement>) => void;
};
/**
 * `TableRow` 컴포넌트는 테이블의 행을 나타내며, 다양한 props를 통해 커스터마이징이 가능
 *
 * @param {string} [props.className=''] - 컴포넌트에 적용할 CSS 클래스 이름
 * @param {ReactNode|string} props.children - 행 내부에 렌더링할 자식 컴포넌트 혹은 문자열
 * @param {boolean} [props.expendOpen=false] - 특정 행의 TdExpend 컴포넌트가 확장될 상태인지 지정
 * @param {function} [props.handleExpendChange] - 특정 행의 TdExpend 컴포넌트의 expend 상태가 변경될 때 호출될 함수
 * @param {function} [props.beforeExpendOpen] - 특정 행의 TdExpend 컴포넌트의 expend 상태가 true가 되기 전에 호출될 함수
 * @param {function} [props.onClick] - tr 태그를 클릭했을 때 호출될 함수
 */
declare const TableRow: {
    ({ className, children, expendOpen, handleExpendChange, beforeExpendOpen, onClick }: PropsType): React.JSX.Element;
    displayName: string;
};
declare const SkeletonTableRow: () => React.JSX.Element;
export type { PropsType as TableRowProps };
export { SkeletonTableRow };
export default TableRow;
