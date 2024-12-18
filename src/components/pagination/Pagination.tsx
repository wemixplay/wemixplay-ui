'use client';

import Decimal from 'decimal.js';
import React, { useCallback, useMemo } from 'react';

import { makeCxFunc } from '@/utils/forReactUtils';

import { SvgIcoChevronLeft, SvgIcoChevronRight, SvgIcoPaginationEllipsis } from '@/assets/svgs';

import style from './Pagination.module.scss';

const cx = makeCxFunc(style);

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

const Pagination = ({ currPage = 1, pageSize = 20, totalCount = 0, handlePageChange }: Props) => {
  const totalPage = useMemo(() => {
    const pageCount = new Decimal(totalCount).div(new Decimal(pageSize));
    return pageCount.isInt() ? pageCount.toNumber() : pageCount.add(1).floor().toNumber();
  }, [pageSize, totalCount]);

  const PageNumberComponent = useCallback(() => {
    if (totalPage < 8) {
      return Array.from({ length: totalPage }, (_, i) => i + 1).map((idx) => (
        <li key={idx}>
          <button
            className={cx('pagination-page', currPage === idx && 'selected')}
            type="button"
            onClick={() => handlePageChange(idx)}
          >
            {idx}
          </button>
        </li>
      ));
    } else {
      if (currPage < 5) {
        return (
          <>
            {Array.from({ length: 5 }, (_, i) => i + 1).map((idx) => (
              <li key={idx}>
                <button
                  className={cx('pagination-page', currPage === idx && 'selected')}
                  type="button"
                  onClick={() => handlePageChange(idx)}
                >
                  {idx}
                </button>
              </li>
            ))}
            <li>
              <div className="ellipsis">
                <SvgIcoPaginationEllipsis />
              </div>
            </li>
            <li>
              <button
                className={cx('pagination-page')}
                type="button"
                onClick={() => handlePageChange(totalPage)}
              >
                {totalPage}
              </button>
            </li>
          </>
        );
      } else if (currPage > totalPage - 4) {
        return (
          <>
            <li>
              <button
                className={cx('pagination-page')}
                type="button"
                onClick={() => handlePageChange(1)}
              >
                1
              </button>
            </li>
            <li>
              <div className="ellipsis">
                <SvgIcoPaginationEllipsis />
              </div>
            </li>
            {Array.from({ length: 5 }, (_, i) => totalPage - 4 + i).map((idx) => (
              <li key={idx}>
                <button
                  className={cx('pagination-page', currPage === idx && 'selected')}
                  type="button"
                  onClick={() => handlePageChange(idx)}
                >
                  {idx}
                </button>
              </li>
            ))}
          </>
        );
      } else {
        return (
          <>
            <li>
              <button
                className={cx('pagination-page')}
                type="button"
                onClick={() => handlePageChange(1)}
              >
                1
              </button>
            </li>
            <li>
              <div className="ellipsis">
                <SvgIcoPaginationEllipsis />
              </div>
            </li>
            {Array.from({ length: 3 }, (_, i) => currPage - 1 + i).map((idx) => (
              <li key={idx}>
                <button
                  className={cx('pagination-page', currPage === idx && 'selected')}
                  type="button"
                  onClick={() => handlePageChange(idx)}
                >
                  {idx}
                </button>
              </li>
            ))}
            <li>
              <div className="ellipsis">
                <SvgIcoPaginationEllipsis />
              </div>
            </li>
            <li>
              <button
                className={cx('pagination-page')}
                type="button"
                onClick={() => handlePageChange(totalPage)}
              >
                {totalPage}
              </button>
            </li>
          </>
        );
      }
    }
  }, [currPage, handlePageChange, totalPage]);
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
      <PageNumberComponent />
      <li>
        <button
          className={cx('pagination-next')}
          type="button"
          disabled={!(currPage < totalPage)}
          onClick={() => handlePageChange(currPage + 1)}
        >
          <SvgIcoChevronRight />
        </button>
      </li>
    </ul>
  );
};

export type { Props as PaginationProps };
export default Pagination;
