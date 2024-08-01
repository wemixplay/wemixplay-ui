'use client';

import React, {
  CSSProperties,
  ForwardedRef,
  MouseEvent,
  ReactElement,
  ReactNode,
  cloneElement,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState
} from 'react';
import style from './PopoverButton.module.scss';
import Ripple, { RippleOption } from '../ripple/Ripple';
import useClickOutside from '@/hooks/useClickOutside';
import { makeCxFunc } from '@/utils/forReactUtils';
import Portal from '../portal/Portal';

interface PropsType {
  id?: string;
  className?: string;
  /**
   * 버튼 내에 랜더링될 내용
   */
  children: ReactNode | string;
  /**
   * ripple 효과에 대한 옵션
   */
  ripple?: RippleOption;
  /**
   * 버튼 비활성화 여부
   */
  disabled?: boolean;
  /**
   * 중복 클릭 방지 여부
   */
  detectDoubleClick?: boolean;
  /**
   * popover 요소가 랜더링될 요소의 id값
   *
   * 값이 빈문자열이라면 popover가 작동하지 않음
   */
  anchorId: string;
  /**
   * popover 요소
   */
  popoverElement: ReactElement;
  /**
   * popover의 랜더링될 위치값 스타일
   */
  popoverStyle?: Pick<CSSProperties, 'top' | 'left' | 'bottom' | 'right' | 'zIndex'>;
  /**
   * popover가 나타날때와 사라질때 애니메이션 옵션
   */
  popoverAnimation?: {
    name: string;
    duration: number;
    timingFunc?: string;
  };
  /**
   * click outside가 작동할때 예외처리할 요소의 id값을 담은 배열
   */
  excludeOutSideIds?: string[];
  /**
   * 스크롤할때 popover를 닫히게 할지에 대한 여부
   */
  whenWindowScrollClose?: boolean;
  /**
   * 버튼을 클릭할때 호출될 클릭 함수
   * @param e MouseEvent<HTMLButtonElement>
   */
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

interface RefPopoverButton {
  /** popover를 닫히게 하는 함수 */
  close: () => void | Promise<void>;
  /** popover를 열리게 하는 함수 */
  open: () => void | Promise<void>;
}

const cx = makeCxFunc(style);

const defaultExcludeOutSideIds: string[] = [];

/**
 * `PopoverButton`은 버튼 클릭 시 지정된 위치에 popover를 랜더링하는 컴포넌트입니다.
 * 사용자 정의 버튼 스타일, 클릭 이벤트 핸들러, popover의 애니메이션과 스타일 설정 등 다양한 기능을 지원합니다.
 *
 * @component
 * @example
 * <PopoverButton
 *  className="my-custom-button"
 *  anchorId="unique-anchor-id"
 *  popoverElement={<MyPopoverContent />}
 *  onClick={(e) => console.log('Button clicked', e)}
 * >
 *   Click Me!
 * </PopoverButton>
 *
 * @param {string} [props.id] - 컴포넌트 최상단 요소에 적용될 id
 * @param {string} [props.className=''] - 버튼에 적용할 추가적인 CSS 클래스명
 * @param {string} props.anchorId - popover 요소가 랜더링될 요소의 id값. 빈문자열인 경우 popover는 작동하지 않음.
 * @param {boolean} [props.detectDoubleClick] - 중복 클릭 방지 여부
 * @param {ReactElement} props.popoverElement - popover로 랜더링될 React 요소
 * @param {Object} [props.popoverStyle={ top: 0, left: 0, zIndex: 1 }] - popover 요소의 위치를 정의하는 스타일 객체
 * @param {Object} [props.popoverAnimation={ name: '', duration: 0 }] - popover 애니메이션 이름, 지속 시간 및 타이밍 함수를 정의하는 객체
 * @param {string[]} [props.excludeOutSideIds] - click outside 이벤트 발생 시 예외 처리할 요소의 id 배열
 * @param {boolean} [props.whenWindowScrollClose] - window 스크롤 시 popover를 자동으로 닫을지에 대한 여부
 * @param {RippleOption} [props.ripple] - Ripple 효과 옵션
 * @param {ReactNode|string} props.children - 버튼 내에 랜더링될 내용
 * @param {function} [props.onClick] - 버튼 클릭 시 호출될 함수. MouseEvent 객체를 인자로 받음.
 * @param {ForwardedRef<RefPopoverButton>} [ref] - 컴포넌트 외부에서 popover를 제어할 수 있는 ref 객체. `open`과 `close` 함수를 포함함.
 */
const PopoverButton = forwardRef(
  (
    {
      id,
      className = '',
      anchorId,
      detectDoubleClick,
      popoverElement,
      popoverStyle = { top: 0, left: 0, zIndex: 1 },
      popoverAnimation = { name: '', duration: 0 },
      ripple,
      excludeOutSideIds = defaultExcludeOutSideIds,
      whenWindowScrollClose,
      children,
      onClick
    }: PropsType,
    ref?: ForwardedRef<RefPopoverButton>
  ) => {
    /** popover button 컴포넌트의 최상위 요소를 가르키는 ref값 */
    const popoverRef = useRef<HTMLDivElement>();
    /** 더블 클릭을 방지하는 flag 값 */
    const isClicked = useRef(false);

    // popover의 open 상태
    const [open, setOpen] = useState(false);
    // popover의 애니메이션 효과를 위한 상택값 ('enter', 'leave', '')
    const [status, setStatus] = useState('');

    /**
     * animation 옵션과 status의 값으로 현재 보여줘야할 animation에 대한 값을 반환
     */
    const animation = useMemo(() => {
      if (!open) return {};

      if (status === 'enter' || status === 'leave') {
        return {
          animationName: popoverAnimation.name,
          animationDuration: `${popoverAnimation.duration}ms`,
          animationTimingFunction: popoverAnimation.timingFunc || 'ease',
          animationDirection: status === 'leave' ? 'reverse' : 'normal',
          animationFillMode: status === 'leave' ? 'forwards' : 'normal'
        };
      }

      return {};
    }, [popoverAnimation, open, status]);

    /** 로직이 진행될때 원하는 시간동안 잠시 대기를 할수 있게 하는 함수 */
    const wait = useCallback((ms: number) => new Promise((resolve) => setTimeout(resolve, ms)), []);

    /**
     * popover를 닫게 할때 호출되는 함수
     */
    const handleClose = useCallback(async () => {
      if (!anchorId) {
        return;
      }

      setStatus('');
      await wait(10);
      setStatus('leave');
      await wait(popoverAnimation.duration);
      setOpen(false);
    }, [anchorId, popoverAnimation.duration, wait]);

    /**
     * popover를 열리게 할때 호출되는 함수
     */
    const handleOpen = useCallback(async () => {
      if (!anchorId) {
        return;
      }

      setOpen(true);
      setStatus('enter');
      await wait(popoverAnimation.duration);
      setStatus('');
    }, [anchorId, popoverAnimation.duration, wait]);

    /**
     * popover의 open 상태를 toggle 처리하는 함수
     */
    const handleToggleStatus = useCallback(() => {
      if (open) {
        handleClose();
      } else {
        handleOpen();
      }
    }, [open, handleClose, handleOpen]);

    /**
     * popover 버튼을 클릭했을때 호출되는 함수
     */
    const handleClick = useCallback(
      async (e: MouseEvent<HTMLButtonElement>) => {
        // detectDoubleClick 이 true면 isClicked flag 값으로 더블클릭 방지
        if (isClicked.current && detectDoubleClick) return;

        isClicked.current = true;
        setTimeout(() => {
          isClicked.current = false;
        }, 500);

        handleToggleStatus();
        onClick && onClick(e);
      },
      [detectDoubleClick, handleToggleStatus, onClick]
    );

    /**
     * popoverElement에 props를 주입하고 popover를 감싸는 요소를 추가하여 반환
     */
    const PopoverComponent = useMemo(() => {
      const props = typeof popoverElement?.type === 'string' ? undefined : { close: handleClose };

      return (
        <div className={cx('popover-element-wrap')}>
          {open && (
            <div
              className={cx('popover-element', status)}
              style={{
                ...popoverStyle,
                ...animation
              }}
            >
              {cloneElement(popoverElement ?? <></>, props)}
            </div>
          )}
        </div>
      );
    }, [animation, handleClose, open, popoverElement, popoverStyle, status]);

    // popover button과 popoverElement 영역외에 다른 영역을 클릭했을때 popover가 닫히도록 하는 hook
    useClickOutside(popoverRef, (e: Event) => {
      const els = [...excludeOutSideIds, anchorId]
        .filter((id) => !!id)
        .concat(defaultExcludeOutSideIds)
        .map((id) => document.querySelector(`#${id}`))
        .filter((el) => el);

      const target = e.target as HTMLElement;

      if (!document.body.contains(target)) return;
      if (els.some((el) => el?.contains(target))) return;

      if (open) {
        handleClose();
      }
    });

    // whenWindowScrollClose가 true일때 스크롤시 popover가 닫히는 이벤트를 등록
    useEffect(() => {
      const handleClose = () => {
        setOpen(false);
        setStatus('');
      };

      if (open && whenWindowScrollClose) {
        window.addEventListener('scroll', handleClose);
      }

      return () => {
        window.removeEventListener('scroll', handleClose);
      };
    }, [whenWindowScrollClose, open]);

    // forwardRef로 전달된 ref값에 handleClose와 handleOpen 함수를 사용할 수 있도록 세팅
    useImperativeHandle(ref, () => ({
      close: handleClose,
      open: handleOpen
    }));

    return (
      <div ref={popoverRef} id={id} className={cx('popover-area')}>
        <Ripple {...ripple}>
          <button className={cx('btn-popover', className, open && 'open')} onClick={handleClick}>
            {children}
          </button>
        </Ripple>
        {anchorId ? <Portal id={anchorId}>{PopoverComponent}</Portal> : null}
      </div>
    );
  }
);

PopoverButton.displayName = 'PopoverButton';

export type { PropsType as PopoverButtonProps, RefPopoverButton };
export default PopoverButton;
