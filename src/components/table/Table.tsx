'use client';

import React, {
  Children,
  Fragment,
  ReactElement,
  ReactNode,
  isValidElement,
  useMemo,
  useState
} from 'react';
import { orderBy } from 'lodash';
import { makeCxFunc } from '@/utils/forReactUtils';
import Spinner from '@/components/loadings/Spinner';
import { SvgIcoSortUpElement, SvgIcoSortDownElement, SvgIcoSortNormalElement } from '@/assets/svgs';
import NoDataIconText from '@/components/noData/NoDataIconText';
import { TableData, ChildrenFuncParamsType, TableThRowDataType } from './table.d';
import style from './Table.module.scss';
import TdColumn from './TdColumn';
import ErrorBoundary from '../error/ErrorBoundary';

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

const cx = makeCxFunc(style);

/**
 * 재귀로 Fragment나 TdColumn 컴포넌트만을 찾아 ReactNode[]로 반환하는 함수
 *
 * @param children Table 컴포넌트 안에 랜더링 될 자식 컴포넌트
 * @returns 재귀로 Fragment나 TdColumn 컴포넌트만을 찾아 ReactNode[]로 반환
 */
const findTdColumns = (children: ReactNode): ReactNode[] => {
  let result: ReactNode[] = [];

  Children.forEach(children, (child) => {
    if (isValidElement(child)) {
      if (child.type === Fragment) {
        result = [...result, ...findTdColumns(child.props.children)];
      } else if (child.type === TdColumn) {
        result.push(child);
      } else {
        result = [...result, ...findTdColumns(child.props.children)];
      }
    }
  });

  return result;
};

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
const Table = <T extends TableData[]>({
  className = '',
  list,
  children,
  loadingElement = <Spinner />,
  errorFallback,
  noDataMsg,
  hideThead,
  sortUpElement = <SvgIcoSortUpElement />,
  sortDownElement = <SvgIcoSortDownElement />,
  sortNormalElement = <SvgIcoSortNormalElement />,
  loading
}: PropsType<T>) => {
  // 소팅의 진행 상태를 나타내는 state
  const [isSorting, setIsSorting] = useState(false);
  // 소팅 정보를 담고 있는 state
  const [orderData, setOrderData] = useState<{
    index: number;
    fieldId: string;
    order: 'desc' | 'asc' | '';
  } | null>(null);

  /**
   * Table 컴포넌트 내에 랜더링 될 TdColumn 컴포넌트들을 찾아 배열로 만들어 반환
   */
  const tdColumns = useMemo(() => {
    const item = (list || []).length > 0 ? list?.[0] : {};
    return findTdColumns(children({ item: item as JSONObject, index: 0 }));
  }, [children, list]);

  /**
   * th로 랜더링될 정보를 filter하여 TdColumn 컴포넌트가 받은 props를 전달하고 배열로 반환
   *
   * 소팅에 대한 정보도 주입
   */
  const thRowData = useMemo(() => {
    const thRows = tdColumns?.map((column) => {
      const component = column as { props: TableThRowDataType };

      return {
        className: component.props?.className ?? '',
        label: component.props?.label ?? '',
        fieldId: component.props?.fieldId,
        // sortValue가 정의되었거나 handleClickSort 함수를 전달 받은 경우는 소팅이 가능하다고 판단
        enableSorting:
          typeof component.props?.sortValue !== 'undefined' || !!component.props?.handleClickSort,
        handleClickSort: component.props?.handleClickSort,
        thColSpan: component.props?.thColSpan,
        thRowSpan: component.props?.thRowSpan,
        rowSpan: component.props?.rowSpan,
        colSpan: component.props?.colSpan,
        size: component.props?.size,
        order: component.props?.order ?? ''
      };
    });

    if (!!thRows) {
      return (
        thRows
          // th안에 랜더링될 label이 정의된 행만 필터
          .filter((newTh) => typeof newTh.label !== 'undefined')
          .map((newTh) => {
            // filedId가 없으면 소팅 불가
            if (!orderData?.fieldId) {
              return newTh;
            }

            // 매칭이 되는 fieldId를 가진 th에 현재 소팅 정보 전달
            return {
              ...newTh,
              order: orderData?.fieldId === newTh.fieldId ? orderData?.order : ''
            };
          })
      );
    }

    return [];
  }, [tdColumns, orderData]);

  /**
   * tbody에 랜더링될 table list를 필터하고 소팅 정보를 적용하여 순서를 정렬한뒤 반환
   */
  const tableRows = useMemo(() => {
    // 소팅 정보에서 소팅 순서와 소팅을 하는 열의 정보인 filedId를 가져옴
    const { fieldId: orderTargetFieldId, order } = orderData ?? {};

    // 소팅 순서가 'asc' | 'desc'가 아닌경우는 원래 순서대로 노출
    if (!order) return list;

    // TdColumn 컴포넌트인 children만 필터링
    const componentList = list.map((item, index) =>
      Children.map(
        children({
          item: item as T extends (infer R)[] ? R : never,
          index
        }),
        (child) => {
          if (isValidElement(child)) {
            if (child.type === TdColumn) {
              return child;
            } else {
              return Children.toArray(child.props.children);
            }
          }
          return [];
        }
      )
    );

    // TdColumn 컴포넌트들의 filedId와 sort 정보의 filedId와 맞는 컴포넌트의 sortValue를 배열로 반환
    const sortValueList = componentList.reduce((acc, cur: JSONObject) => {
      const targetColumn = cur.find(
        (column: JSONObject) => column.props.fieldId === orderTargetFieldId
      );
      acc.push(targetColumn.props?.sortValue ?? 0);
      return acc;
    }, []);

    return orderBy(
      list.map((item, index) => ({ ...item, sortValue: sortValueList[index] })),
      ['sortValue'],
      [order]
    );
  }, [list, orderData, children]);

  /**
   * th를 클릭했을때 호출되는 소팅 함수
   *
   * @param thData th 태그에 들어가는 데이터
   */
  const handleThSorting = async (thData: TableThRowDataType & { index: number }) => {
    let newOrder: 'desc' | 'asc' | '' = 'desc';

    // th에서 소팅과 관련된 데이터들을 비구조화 할당
    const { order, index, fieldId, enableSorting, handleClickSort } = thData;

    // 소팅이 가능하지 않거나 현재 소팅이 진행중이라면 return;
    if (!enableSorting || isSorting) {
      return;
    }

    // 현재 th가 갖고 있는 order와 반대 순서로 정렬되도록 순서 지정
    if (order === 'desc') {
      newOrder = 'asc';
    } else if (order === 'asc') {
      newOrder = '';
    }

    // 새로운 소팅 정보 저장
    const orderData = {
      index,
      order: newOrder,
      fieldId
    };

    setOrderData(orderData);

    // handleClickSort가 비동기 함수일 수 있기 때문에 await로 진행하고 함수가 종료되기 전까지는 isSorting을 true로 setState
    if (handleClickSort) {
      try {
        setIsSorting(true);
        await handleClickSort(orderData);
      } finally {
        // 비동기 함수 handleClickSort가 종료되면 isSorting을 false로
        setIsSorting(false);
      }
    }
  };

  return (
    <ErrorBoundary fallback={errorFallback}>
      <div
        className={cx('table', className, {
          'no-data': !!list && list.length === 0,
          loading: !list || isSorting || loading
        })}
      >
        <table>
          {!hideThead && (
            <thead>
              <tr>
                {thRowData.map((thData, index) => (
                  <th
                    key={`th-${thData.fieldId ?? index}`}
                    className={cx(thData.fieldId, thData.className, {
                      'enable-sorting': thData.enableSorting
                    })}
                    rowSpan={thData.thRowSpan ?? thData.rowSpan}
                    colSpan={thData.thColSpan ?? thData.colSpan}
                    style={{ width: thData.size }}
                    onClick={() => handleThSorting({ ...thData, index })}
                  >
                    <div className={cx('th-block')}>
                      {thData.label}
                      {!!thData.enableSorting && (
                        <span className={cx('ico-sorting')}>
                          {/* TODO 소팅 가능한 셀의 경우 디폴트 아이콘이 노출됨 Jack  */}
                          {thData.order !== 'desc' && thData.order !== 'asc' && sortNormalElement}
                          {thData.order === 'desc' && sortDownElement}
                          {thData.order === 'asc' && sortUpElement}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
          )}

          <tbody>
            {(!list || isSorting || loading) && (
              <tr className={cx('loading-tr')}>
                <td colSpan={thRowData.length}>
                  <div className={cx('table-loading')}>{loadingElement}</div>
                </td>
              </tr>
            )}
            {!!list &&
              !loading &&
              !isSorting &&
              (list.length > 0 ? (
                tableRows.map((item, index) =>
                  children({ item: item as T extends (infer R)[] ? R : never, index })
                )
              ) : (
                <tr className={cx('no-data-tr')}>
                  <td colSpan={thRowData.length}>
                    {typeof noDataMsg === 'object' ? (
                      noDataMsg
                    ) : (
                      <NoDataIconText className={cx('table-no-data')} nullText={noDataMsg} />
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </ErrorBoundary>
  );
};

export type { PropsType as TableProps };
export default Table;
