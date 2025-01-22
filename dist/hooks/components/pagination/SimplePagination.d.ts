import React from 'react';
type Props = {
    /**
     * 현재 페이지
     */
    currPage: number;
    /**
     * 마지막 페이지 여부
     */
    isLastPage?: boolean;
    /**
     * 페이지 변경 함수
     */
    handlePageChange: (page: number) => void;
};
/**
 * 단순 이전/다음 페이지네이션 컴포넌트입니다.
 * 마지막 페이지 여부를 전달하지 않으면 다음 버튼은 계속 활성화 되어있습니다.
 */
declare const SimplePagination: ({ currPage, isLastPage, handlePageChange }: Props) => React.JSX.Element;
export type { Props as SimplePaginationProps };
export default SimplePagination;
