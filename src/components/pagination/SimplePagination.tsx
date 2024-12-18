'use client';

import React from 'react';
import { makeCxFunc } from '@/utils/forReactUtils';
import { SvgIcoChevronLeft, SvgIcoChevronRight } from '@/assets/svgs';
import style from './SimplePagination.module.scss';

const cx = makeCxFunc(style);

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
const SimplePagination = ({ currPage, isLastPage = false, handlePageChange }: Props) => {
  return (
    <ul className={cx('inbox-pagination')}>
      <li>
        <button
          className={cx('pagination-prev')}
          type="button"
          disabled={currPage === 1}
          onClick={() => handlePageChange(currPage - 1)}
        >
          <SvgIcoChevronLeft />
        </button>
      </li>
      <li>
        <button className={cx('pagination-page', 'selected')} type="button">
          {currPage}
        </button>
      </li>
      <li>
        <button
          className={cx('pagination-next')}
          type="button"
          disabled={isLastPage}
          onClick={() => handlePageChange(currPage + 1)}
        >
          <SvgIcoChevronRight />
        </button>
      </li>
    </ul>
  );
};

export type { Props as SimplePaginationProps };
export default SimplePagination;
