import React from 'react';
type Props = {
    /**
     * 현재 페이지
     */
    currPage: number;
    /**
     * 페이지 당 항목 수
     */
    pageSize: number;
    /**
     * 총 항목 수
     */
    totalCount: number;
    /**
     * 페이지 변경 함수
     */
    handlePageChange: (page: number) => void;
};
declare const Pagination: ({ currPage, pageSize, totalCount, handlePageChange }: Props) => React.JSX.Element;
export type { Props as PaginationProps };
export default Pagination;
