'use client';

import React, {
  ReactNode,
  MouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';

import { makeCxFunc } from '@/utils/forReactUtils';
import { wait } from '@/utils/etcUtils';

import style from './Table.module.scss';

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

const cx = makeCxFunc(style);

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
const TableRow = ({
  className = '',
  children,
  expendOpen = false,
  handleExpendChange,
  beforeExpendOpen,
  onClick
}: PropsType) => {
  /** accordion UI가 작동할 td 요소 */
  const expendTdEl = useRef<HTMLTableCellElement | null>(null);

  // expend(확장) 상태 여부
  const [expend, setExpend] = useState(expendOpen);

  /**
   * accordion UI가 작동할 요소가 갖는 max-height를 계산하는 함수
   *
   * @param {boolean | undefined} newStatus 바뀐 expend 상태
   */
  const expendMaxHeightSet = useCallback(
    (newStatus?: boolean) => {
      if (expendTdEl.current) {
        // newStatus 파라미터가 전달 되었을때는 newStatus 상태를 반영하고
        // 전달되지 않았을때는 기존 expend 상태에 반대 상태로 toggle
        const status = typeof newStatus === 'boolean' ? newStatus : !expend;

        // accordion UI가 작동할 td 요소의 첫번째 자식 요소
        const expendDivEl = expendTdEl.current.firstChild as HTMLDivElement;

        if (expendDivEl) {
          // status 상태에 따라 maxHeight 결정
          expendDivEl.style.maxHeight = status ? `${expendDivEl.scrollHeight}px` : '0px';
        }
      }
    },
    [expendTdEl, expend]
  );

  /**
   * expend 상태를 toggle 하는 함수
   */
  const handleExpendToggle = useCallback(async () => {
    try {
      /**
       * expend 되지 않고 beforeExpendOpen 함수가 전달되었다면
       * expend 상태를 true로 바꾸기 전에 beforeExpendOpen 함수 호출
       */
      if (beforeExpendOpen && !expend) {
        await beforeExpendOpen();

        // beforeExpendOpen이 실행된 후 10ms 정도의 딜레이를 줘서 안정성 확보
        await wait(10);
      }
    } catch (e) {
      console.error(e);
    } finally {
      // expend toggle 진행
      setExpend(!expend);

      // 상위 컴포넌트에 바뀐 expend 상태 전달
      handleExpendChange && handleExpendChange(!expend);
    }
  }, [expend, handleExpendChange, beforeExpendOpen]);

  /**
   * 자식 컴포넌트들 중 TdColumn 컴포넌트만으로 이루어진 ReactElement 배열
   */
  const columnList = useMemo(() => {
    /**
     * 재귀로 TdColumn 컴포넌트만을 찾아 배열로 반환하는 함수
     */
    const getChildren = (childArray: JSONObject[]): ReactNode[] => {
      return childArray.flatMap((child) => {
        if (!child?.props) return [];

        if (child.type?.displayName === 'TdColumn') {
          return {
            ...child,
            props: { ...child.props, handleExpendToggle, expendOpen }
          };
        }

        if (Array.isArray(child.props.children)) {
          return getChildren(child.props.children);
        }

        return [];
      });
    };

    const childList = Array.isArray(children) ? children : [children];
    return getChildren(childList);
  }, [children, expendOpen, handleExpendToggle]);

  /**
   * 자식 컴포넌트들 중 TdExpend 컴포넌트만으로 이루어진 ReactElement 배열
   */
  const expendChild = useMemo(() => {
    /**
     * 재귀로 TdExpend 컴포넌트만을 찾아 배열로 반환하는 함수
     */
    const getChildren = (childArray: JSONObject[]): ReactNode[] => {
      return childArray.flatMap((child) => {
        if (!child?.props) return;

        if (child.type?.displayName === 'TdExpend') {
          return child;
        }

        if (Array.isArray(child.props.children)) {
          return getChildren(child.props.children);
        }

        return;
      });
    };

    const childList = Array.isArray(children) ? children : [children];
    return getChildren(childList).filter((child) => child)[0];
  }, [children]);

  /**
   * expend 상태가 바뀔때마다 accordion UI가 작동할 요소가 갖는 max-height를 계산
   */
  useEffect(() => {
    expendMaxHeightSet(expend);
  }, [expend, expendMaxHeightSet]);

  /**
   * 전달받은 expendOpen과 내부 state인 expend 동기화
   */
  useEffect(() => {
    if (typeof expendOpen !== 'undefined') {
      setExpend(expendOpen);
    }
  }, [expendOpen]);

  return (
    <>
      <tr className={cx(className, 'table-row')} onClick={onClick}>
        {columnList}
      </tr>
      {!!expendChild && (
        <tr className={cx('expend-tr')}>
          <td
            ref={expendTdEl}
            className={cx('expend-table-cell', { open: expend })}
            colSpan={columnList.length}
          >
            {expendChild}
          </td>
        </tr>
      )}
    </>
  );
};

TableRow.displayName = 'TableRow';

const SkeletonTableRow = () => {
  return <div className={cx('skeleton')} />;
};

export type { PropsType as TableRowProps };
export { SkeletonTableRow };
export default TableRow;
