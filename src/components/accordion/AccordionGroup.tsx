'use client';

import React, { ChangeEvent, ReactElement } from 'react';

import { makeCxFunc } from '@/utils/forReactUtils';

import { RippleOption } from '../ripple/Ripple';

import Accordion, { AccordionProps } from './Accordion';
import style from './AccordionGroup.module.scss';

type Props = {
  className?: string;
  /** accordion 리스트 정보를 담은 배열 */
  list: Omit<AccordionProps & { key?: string | number }, 'handleOpenChange'>[];
  icon?: string | ReactElement;
  /** 공통 ripple 효과 옵션 */
  ripple?: RippleOption;
  /**
   * accordion을 눌렀을때 호출되는 함수이며 accordion의 열림 상태, accordion의 key값, ChangeEvent를 인자로 전달한다.
   *
   * @param {boolean} [params.status] -  accordion의 열림 상태
   * @param {string | number} [params.key] -  accordion의 key값
   * @param {ChangeEvent<HTMLInputElement>} [params.e] -  accordion의 ChangeEvent
   */
  handleClickAccordion?: (params: {
    status: boolean;
    key: string | number;
    e: ChangeEvent<HTMLInputElement>;
  }) => void;
  initialOpen?: boolean;
};

const cx = makeCxFunc(style);

/**
 * `AccordionGroup` 컴포넌트는 여러개의 Accordion을 하나로 묶어놓은 형태의 UI를 제공합니다.
 *
 * @component
 * @param {object} props - 컴포넌트의 props 객체
 * @param {string} [props.className] - 추가적인 CSS 클래스 이름
 * @param {Array<object>} props.list - accordion 리스트 정보를 담은 배열
 * @param {object} [props.ripple] - 공통 ripple 효과 옵션
 * @param {function} [props.handleClickAccordion] - accordion을 눌렀을 때 호출되는 함수
 * @param {string | ReactElement} [props.icon=<SvgIcoToastLinkArrow />] - Accordion 우측에 표시될 아이콘. 문자열 또는 React 요소를 받을 수 있으며, 기본값은 SvgIcoToastLinkArrow 컴포넌트
 */
const AccordionGroup = ({
  className,
  list,
  ripple,
  icon,
  initialOpen = false,
  handleClickAccordion
}: Props) => {
  return (
    <div className={cx(className, 'accordion-group')}>
      {(list ?? []).map((item, index) => (
        <Accordion
          key={`${item.title}-${index}`}
          {...item}
          icon={icon}
          className={cx('accordion', item.className)}
          ripple={ripple ?? item.ripple}
          handleOpenChange={(status, e) => handleClickAccordion({ status, key: item.key, e })}
          initialOpen={initialOpen}
        />
      ))}
    </div>
  );
};

export type { Props as AccordionGroupProps };
export default AccordionGroup;
