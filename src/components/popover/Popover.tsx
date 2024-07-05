'use client';

import React, { ReactElement } from 'react';
import style from './Popover.module.scss';
import { SvgIcoCloseBlack } from '@/assets/svgs';
import { makeCxFunc } from '@/utils/forReactUtils';

interface PropsType {
  className?: string;
  /**
   * popover 탬플릿 안에 랜더링할 내용
   */
  children: ReactElement | string;
  /**
   * popover 상단 title 영역에 노출될 title 내용
   */
  title?: string;
  /**
   * close 버튼안에 랜더링될 요소
   *
   * 기본값은 <SvgCloseBlack />
   */
  closeElement?: ReactElement;
  /**
   * close 버튼을 숨길지 여부
   */
  hideCloseBtn?: boolean;
  /**
   * popover 상단에 title영역과 close 버튼을 포함하는 영역을 숨길지 여부
   */
  hideHeader?: boolean;
  /**
   * PopoverButton에서 전달받은 close 함수
   *
   * Popover 컴포넌트를 닫을 때 사용
   */
  close?: () => void;
}

const cx = makeCxFunc(style);

/**
 * Popover 컴포넌트는 특정 UI 요소 위에 떠 있는 컨테이너를 랜더링합니다.
 * PopoverButton 컴포넌트의 popoverElement에 전달되는 컴포넌트를 작성할때 해당 컴포넌트를 wrapping하여 작성하면
 * popover 컴포넌트를 닫을때의 시점을 자유롭게 컨트롤 할 수 있습니다.
 * 이 컴포넌트는 다음과 같은 props를 받을 수 있습니다.
 *
 * @component
 * @example
 * <Popover
 *  className="my-custom-popover"
 *  title="TEST"
 * >
 *   <MyCustomComponent />
 * </Popover>
 * @param {string} [props.className=''] - Popover 컴포넌트의 최상위 요소에 추가할 클래스 이름.
 * @param {ReactElement|string} props.children - Popover 탬플릿 안에 랜더링할 내용. React 요소 또는 문자열을 전달
 * @param {string} [props.title] - Popover 상단 title 영역에 노출될 제목 내용. 제공되지 않으면 title 영역은 미노출
 * @param {ReactElement} [props.closeElement=<SvgIcoCloseBlack />] - Close 버튼 안에 랜더링될 요소. 기본값은 `<SvgIcoCloseBlack />` 컴포넌트
 * @param {boolean} [props.hideCloseBtn=false] - Close 버튼을 숨길지 여부를 결정. 기본값은 false이며, true로 설정하면 close 버튼이 미노출
 * @param {boolean} [props.hideHeader=false] - Popover 상단에 title 영역과 close 버튼을 포함하는 영역을 숨길지 여부를 결정. 기본값은 false
 * @param {Function} [props.close] - PopoverButton에서 전달받은 close 함수. Popover 컴포넌트를 닫을 때 사용
 */
const Popover = ({
  className = '',
  children,
  title,
  closeElement = <SvgIcoCloseBlack />,
  hideCloseBtn,
  hideHeader,
  close
}: PropsType) => {
  return (
    <div className={cx('popover', className)}>
      {!hideCloseBtn && (
        <button type="button" onClick={close} className={cx('btn-close')}>
          {closeElement}
        </button>
      )}
      {!hideHeader && (
        <div className={cx('popover-header')}>
          {!!title && <h2 className={cx('popover-header-title')}>{title}</h2>}
        </div>
      )}
      <div className={cx('popover-body')}>{children}</div>
    </div>
  );
};

export type { PropsType as PopoverProps };
export default Popover;
