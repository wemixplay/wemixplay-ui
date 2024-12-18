import { ReactElement } from 'react';

export type TableThRowDataType = {
  className?: string;
  /**
   * th에 들어갈 내용
   */
  label?: ReactElement | string;
  /**
   * td, td가 갖는 고유 id로써 className에 반영
   */
  fieldId: string | null;
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
   * th와 td의 width 값
   */
  size?: number | string;
  /**
   * 소팅이 가능한 열인지 여부
   */
  enableSorting?: boolean;
  /**
   * 특정 열의 소팅 순서
   */
  order: 'desc' | 'asc' | '';
  /**
   * 소팅에 사용될 값
   */
  sortValue?: string | number;
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
};

export type TableData = Record<string, JSONObject>;

export type ChildrenFuncParamsType<T> = {
  index: number;
  item: T extends (infer R)[] ? R : never;
};
