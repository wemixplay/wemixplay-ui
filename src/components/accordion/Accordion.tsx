'use client';

import React, {
  MouseEvent,
  ChangeEvent,
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  useMemo,
  CSSProperties
} from 'react';

import { makeCxFunc } from '@/utils/forReactUtils';

import { SvgIcoAccordion } from '@/assets/svgs';

import Ripple, { RippleOption } from '../ripple/Ripple';

import style from './Accordion.module.scss';

interface PropsType {
  className?: string;
  /**
   * 다른 accordion이 열릴때 이외의 accordion이 닫히게 하고 싶을 경우 사용 가능
   * 같은 값의 name을 제공하여 같은 종류의 아코디언임을 나타내어 toggle ui를 제공
   */
  name?: string;
  /**
   * accordion의 title
   */
  title: string | ReactElement;
  /**
   * accordion의 우측에 나오는 arrow icon
   *
   * ex) icon={<SvgIcoToastLinkArrow />}
   */
  icon?: string | ReactElement;
  /**
   * accordion의 border 색상
   */
  borderColor?: CSSProperties['borderColor'];
  /**
   * Accordion 내부 컨텐츠 영역에 랜더링될 내용
   */
  children: ReactNode;
  /**
   * ripple 옵션
   *
   * `{ color?: string; duration?: number; maxSize?: number; disabled?: boolean; }`
   *
   * `default: { disabled: true }`
   */
  ripple?: RippleOption;
  /**
   * accordion ui의 열리거나 닫힌 상태에 대한 상태값
   *
   * true: 열림, false: 닫힘
   */
  open?: boolean;
  /**
   * accordion의 ui가 처음 열림/닫힘에 대한 상태값
   * 처음 상태만 지정하고 그 다음은 open 값으로 컨트롤이 가능하다
   */
  initialOpen?: boolean;
  /** accordion이 비활성화 상태인지 여부 */
  disabled?: boolean;
  /** accordion의 열림/닫힘 상태 값이 변경될 때 호출될 함수
   *
   * @param {boolean} status 변경된 열림/닫힘 상태
   * @param {ChangeEvent<HTMLInputElement>} e accordion 상태가 변경될때 발생하는 ChangeEvent
   */
  handleOpenChange?: (status: boolean, e: ChangeEvent<HTMLInputElement>) => void;
}

const cx = makeCxFunc(style);

/**
 * Accordion 컴포넌트는 접고 펼칠 수 있는 UI를 제공합니다.
 *
 * @component
 * @param {string} [props.name] 다른 accordion이 열릴때 이외의 accordion이 닫히게 하고 싶을 경우 사용 가능. 같은 값의 name을 제공하여 같은 종류의 아코디언임을 나타내어 toggle ui를 제공
 * @param {string | ReactElement} [props.title] - Accordion의 제목. 문자열 또는 React 요소를 받을 수 있음
 * @param {string | ReactElement} [props.icon=<SvgIcoToastLinkArrow />] - Accordion 우측에 표시될 아이콘. 문자열 또는 React 요소를 받을 수 있으며, 기본값은 SvgIcoToastLinkArrow 컴포넌트
 * @param {ReactNode} [props.children] - Accordion 내부에 랜더링될 컨텐츠.
 * @param {string} [props.className=''] - Accordion 컴포넌트에 추가할 클래스명. 기본값은 빈 문자열.
 * @param {Object} [props.ripple={ disabled: true }] - Ripple 효과에 관한 옵션. `color`, `duration`, `maxSize`, `disabled` 속성을 설정할 수 있으며, 기본값은 `disabled: true`
 * @param {boolean} [props.open] - Accordion의 열림/닫힘 상태. `true`일 경우 열린 상태, `false`일 경우 닫힌 상태
 * @param {boolean} [props.initialOpen=false] - Accordion의 초기 열림/닫힘 상태. 이후 상태는 `open` prop으로 컨트롤 가능.
 * @param {boolean} [props.disabled] - Accordion이 비활성화 상태인지 여부. `true`일 경우 비활성화.
 * @param {function} [props.handleOpenChange] - Accordion의 열림/닫힘 상태가 변경될 때 호출될 함수. 변경된 상태값을 boolean 형태로 받음.
 */
const Accordion = ({
  className = '',
  name,
  title,
  ripple = { disabled: true },
  icon = <SvgIcoAccordion />,
  borderColor,
  open,
  initialOpen,
  children,
  disabled,
  handleOpenChange
}: PropsType) => {
  // 아코디언이 열고 닫히는 컨텐츠가 들어가는 영역에 대한 element
  const contextEl = useRef<HTMLDivElement>(null);
  // 아코디언이 열고 닫힘 상태를 markdown요소로만 알 수 있게 하는 input element
  const inpEl = useRef<HTMLInputElement>(null);

  // 해당 컴포넌트의 고유 id
  const uid = useId();

  const observer = useMemo(() => {
    if (typeof window === 'undefined') {
      return;
    }

    let maxHeight = 0;

    return new ResizeObserver((entries) => {
      for (const entry of entries) {
        const target = entry.target as HTMLDivElement;
        if (target.scrollHeight !== maxHeight && contextEl.current) {
          maxHeight = Number(contextEl.current.style.maxHeight.replace('px', ''));
          contextEl.current.style.maxHeight = `${target.scrollHeight}px`;
        }
      }
    });
  }, []);

  /**
   * accordion의 열림/닫힘 상태를 toggle하고
   * 열림/닫힘 상태에 따라 contextEl에 maxHeight를 계산하는 함수
   */
  const handleExpendToggle = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const el = e.target;
      if (!el || !contextEl.current) return;

      // toggle accordion 일때 해당 컴포넌트 말고 같은 name을 가진 Accordion들 모두 닫도록 처리
      if (name) {
        const accordions = document.querySelectorAll(`input[name="${name}"]`);
        const othersAccordions = Array.from(accordions).filter(
          (accord) => accord.id !== el.id
        ) as HTMLInputElement[];

        othersAccordions.forEach((accord) => {
          accord.checked = false;
        });
      }

      handleOpenChange && handleOpenChange(el.checked, e);
    },
    [handleOpenChange, name]
  );

  /**
   * contextEl에 maxHeight를 설정해주고 컨텐츠가 바뀌었을때 컨텐츠의 높이를 감지하여 maxHeight를 설정해주는 부분
   */
  useEffect(() => {
    const el = contextEl.current;

    if (el) {
      el.style.maxHeight = `${el.scrollHeight}px`;
      observer && observer.observe(el);

      return () => {
        observer && observer.unobserve(el);
      };
    }
  }, [observer, children]);

  return (
    <div
      className={cx('accordion', className, {
        open: typeof open === 'boolean' ? open : initialOpen,
        disabled
      })}
      style={{ '--accor-border-color': borderColor } as CSSProperties}
    >
      <input
        ref={inpEl}
        tabIndex={-1}
        type={'checkbox'}
        name={name}
        id={uid}
        value={uid}
        disabled={disabled}
        defaultChecked={initialOpen}
        checked={open}
        onChange={handleExpendToggle}
      />
      <label htmlFor={uid}>
        <Ripple {...ripple}>
          <div className={cx('accor-hd')}>
            <span className={cx('subject')}>{title}</span>
            <i className={cx('ico-subject')}>{icon}</i>
          </div>
        </Ripple>
      </label>
      <div ref={contextEl} className={cx('accor-bd')}>
        <div className={cx('accor-bd-inner')}>{children}</div>
      </div>
    </div>
  );
};

export type { PropsType as AccordionProps };
export default Accordion;
