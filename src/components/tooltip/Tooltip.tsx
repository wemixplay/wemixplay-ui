'use client';

import { debounce, throttle } from 'lodash-es';
import React, {
  CSSProperties,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { isMobile } from 'react-device-detect';

import useClickOutside from '@/hooks/useClickOutside';

import { makeCxFunc } from '@/utils/forReactUtils';

import Portal from '../portal/Portal';

import style from './Tooltip.module.scss';
import { SvgIcoTooltipArrow } from '@/assets/svgs';
import { CustomCSSProperties } from '@/types/style';

export type PlaceType = 'top' | 'right' | 'bottom' | 'left';

type DomSizeInfoType = {
  /** 툴팁의 anchorId 값을 갖고 있는 요소의 y값 위치 */
  targetTop: number;
  /** 툴팁의 anchorId 값을 갖고 있는 요소의 x값 위치 */
  targetLeft: number;
  /** 툴팁의 anchorId 값을 갖고 있는 요소의 넓이 */
  targetWidth: number;
  /** 툴팁의 anchorId 값을 갖고 있는 요소의 높이 */
  targetHeight: number;
  /** 툴팁 arrow 요소의 넓이 */
  arrowWidth: number;
  /** 툴팁 arrow 요소의 높이 */
  arrowHeight: number;
  /** 툴팁 메세지 요소의 넓이 */
  tooltipWidth: number;
  /** 툴팁 메세지 요소의 높이 */
  tooltipHeight: number;
  /** window.scrollX */
  scrollX: number;
  /** window.scrollY */
  scrollY: number;
  /** window.innerWidth */
  innerWidth: number;
  /** window.innerHeight */
  innerHeight: number;
};

interface PropsType {
  className?: string;
  /**
   * 툴팁 UI를 사용할 요소의 id값
   */
  anchorId: string;
  /**
   * 툴팁의 넓이
   *
   * `default: 200`
   */
  width?: number;
  /**
   * 툴팁 UI가 나올 위치
   */
  place?: PlaceType;
  /**
   * 툴팁 UI를 작동시킬 이벤트 종류
   */
  events?: ('hover' | 'click')[];
  /**
   * 툴팁의 arrow 요소의 x 또는 y축 이동값
   *
   * `place`가 `top` | `bottom` 일 경우 x축, `left` | `right` 일 경우 y축
   */
  arrowPosition?: number;
  /**
   * 툴팁의 위치 조정 값
   */
  tooltipPosition?: { top?: number; left?: number };
  /**
   * 툴팁의 배경 색상
   */
  tooltipColor?: CSSProperties['color'];
  /**
   * 툴팁의 텍스트 색상
   */
  tooltipTextColor?: CSSProperties['color'];
  /**
   * 툴팁의 박스 스타일 (ex: '0 0 6px #ddd')
   */
  tooltipBoxShadow?: CSSProperties['boxShadow'];
  /**
   * 툴팁의 박스 border-radius
   */
  tooltipBorderRadius?: CSSProperties['borderRadius'];
  /**
   * arrow UI 숨김 처리 여부
   */
  hideArrow?: boolean;
  /**
   * 툴팁 UI를 사용할 요소와의 간격
   */
  space?: number;
  /**
   * 툴팁 UI를 노출 상태를 강제로 정하고 고정할 수 있는 값
   */
  open?: boolean;
  /**
   * 스크롤시 툴팁이 닫히게 할지 여부
   */
  whenWindowScrollClose?: boolean;
  /**
   * 툴팁 UI안에 랜더링 할 내용
   */
  children: ReactNode | string;
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const cx = makeCxFunc(style);

/**
 * `Tooltip` 컴포넌트는 사용자 인터페이스에 추가 정보를 제공하는 데 사용됩니다.
 * 해당 요소에 마우스를 올리거나 클릭할 때 툴팁 UI가 나타납니다.
 *
 * @component
 * @param {string} [props.className] - 툴팁 컴포넌트에 추가할 CSS 클래스 이름
 * @param {string} props.anchorId - 툴팁 UI를 사용할 요소의 id값. 툴팁이 위치할 요소를 식별
 * @param {number} [props.width=200] - 툴팁의 넓이. 기본값은 200
 * @param {('top'|'left'|'bottom'|'right')} [props.place='bottom'] - 툴팁 UI가 나올 위치. 'top', 'left', 'bottom', 'right' 중 하나 지정 가능
 * @param {Array<'hover'|'click'>} [props.events=['hover']] - 툴팁 UI를 작동시킬 이벤트 종류. 'hover', 'click' 중 하나 또는 둘 다를 배열 형태로 지정할 수 있습니다.
 * @param {{ top?: number; left?: number }} [props.tooltipPosition] - 툴팁의 위치 조정 값입니다.
 * @param {CSSProperties['color']} [props.tooltipColor] - 툴팁의 배경 색상
 * @param {CSSProperties['color']} [props.tooltipTextColor] - 툴팁의 텍스트 색상
 * @param {CSSProperties['boxShadow']} [props.tooltipBoxShadow] - 툴팁의 박스 스타일 (ex: '0 0 6px #ddd')
 * @param {CSSProperties['borderRadius']} [props.tooltipBorderRadius] - 툴팁의 박스 border-radius
 * @param {boolean} [props.hideArrow] - arrow UI 숨김 처리 여부 입니다.
 * @param {number} [props.space=4] - 툴팁 UI를 사용할 요소와의 간격. 단위는 픽셀(px)입니다.
 * @param {boolean} [props.open] - 툴팁 UI의 노출 상태를 강제로 정하고 고정할 수 있는 값. true로 설정하면 툴팁이 항상 보이게 됩니다.
 * @param {boolean} [props.whenWindowScrollClose] - 스크롤 시 툴팁이 닫히게 할지 여부. true로 설정하면 사용자가 스크롤할 때 툴팁이 자동으로 닫힙니다.
 * @param {ReactNode|string} [props.children] - 툴팁 UI 안에 랜더링할 내용. React 컴포넌트 또는 문자열을 전달할 수 있습니다.
 */
const Tooltip = ({
  className = '',
  anchorId,
  width = 200,
  space = 4,
  place = 'bottom',
  events = ['hover'],
  arrowPosition = 0,
  hideArrow,
  tooltipPosition,
  tooltipColor,
  tooltipTextColor,
  tooltipBoxShadow,
  tooltipBorderRadius,
  open,
  whenWindowScrollClose,
  children
}: PropsType) => {
  const tooltipRef = useRef<HTMLDivElement>();
  const targetRef = useRef<Element>();
  const arrowRef = useRef<HTMLDivElement>();
  const shadowRef = useRef<HTMLDivElement>();
  const calculateCnt = useRef(0);
  const isClickOpenRef = useRef(false);

  const [mounted, setMounted] = useState(false);
  const [currentPlace, setCurrentPlace] = useState(place);
  const [tooltipOpen, setTooltipOpen] = useState(!!open);

  const realEvents = useMemo(() => {
    const newEvents = [...events] as string[];
    const hoverIndex = newEvents.findIndex((ev) => ev === 'hover');

    if (hoverIndex !== -1 && !isMobile) {
      newEvents.splice(hoverIndex, 0, 'mouseover', 'mouseout');
    }

    return newEvents;
  }, [events]);

  const getTargetElement = useCallback(() => {
    if (targetRef.current) return targetRef.current;

    const targetEl = document.querySelector(`#${anchorId}`);

    if (targetEl) {
      targetRef.current = targetEl;
    }
  }, [anchorId]);

  const checkViewportYPosition = useCallback((top: number, height: number) => {
    const { scrollY, innerHeight } = window;

    const viewportTop = scrollY;
    const viewportBottom = scrollY + innerHeight;
    const { top: targetTop } = targetRef.current?.getBoundingClientRect();

    if (viewportTop > top && targetTop > 0) {
      return top + targetTop;
    } else if (viewportBottom < top + height) {
      return viewportBottom - height - 10;
    }

    return top;
  }, []);

  const checkViewportXPosition = useCallback(
    (left: number, width: number) => {
      const { scrollX, innerWidth } = window;

      const viewportLeft = scrollX;
      const viewportRight = scrollX + innerWidth;

      if (viewportLeft > left) {
        return viewportLeft + space;
      } else if (viewportRight < left + width) {
        return viewportRight - width - space;
      }

      return left;
    },
    [space]
  );

  const checkValidPosition = useCallback(
    (sizeInfo: DomSizeInfoType) => {
      const {
        targetTop,
        targetLeft,
        targetWidth,
        targetHeight,
        tooltipHeight,
        arrowWidth,
        arrowHeight
      } = sizeInfo;

      if (scrollY + targetTop - tooltipHeight - arrowHeight - space < scrollY && place === 'top') {
        return 'bottom';
      }

      if (
        scrollY + targetTop + targetHeight + arrowHeight + space > scrollY + innerHeight &&
        place === 'bottom'
      ) {
        return 'top';
      }

      if (targetLeft - arrowWidth - space < 100 && place === 'left') {
        return 'right';
      }

      if (
        innerWidth - (scrollX + targetLeft + targetWidth + arrowWidth + space + 10) < 100 &&
        place === 'right'
      ) {
        return 'left';
      }

      if (targetLeft + scrollX < scrollX) {
        return 'right';
      }

      return place;
    },
    [place, space]
  );

  const getDomsSizeInfo: () => DomSizeInfoType = useCallback(() => {
    if (!tooltipRef.current || !targetRef.current) {
      return {
        targetTop: 0,
        targetLeft: 0,
        targetWidth: 0,
        targetHeight: 0,
        arrowWidth: 0,
        arrowHeight: 0,
        tooltipWidth: 0,
        tooltipHeight: 0,
        scrollX: 0,
        scrollY: 0,
        innerWidth: 0,
        innerHeight: 0
      };
    }

    const {
      top: targetTop,
      left: targetLeft,
      height: targetHeight,
      width: targetWidth
    } = targetRef.current.getBoundingClientRect();

    const { offsetHeight: tooltipHeight, offsetWidth: tooltipWidth } = tooltipRef.current;

    const { clientWidth: arrowWidth = 0, clientHeight: arrowHeight = 0 } = arrowRef.current ?? {};

    const { scrollX, scrollY, innerWidth, innerHeight } = window;

    const { position, top, left } = document.body.style;

    const bodyStyleTop = position === 'fixed' ? Number(top.replace('px', '')) * -1 : 0;
    const bodyStyleLeft = position === 'fixed' ? Number(left.replace('px', '')) * -1 : 0;

    return {
      targetTop,
      targetLeft,
      targetWidth,
      targetHeight,
      arrowWidth,
      arrowHeight,
      tooltipWidth,
      tooltipHeight,
      scrollX: bodyStyleLeft ? bodyStyleLeft : scrollX,
      scrollY: bodyStyleTop ? bodyStyleTop : scrollY,
      innerWidth,
      innerHeight
    };
  }, []);

  const calculateTooltipStyle = useCallback(async () => {
    if (!targetRef.current || !tooltipRef.current) {
      return;
    }

    const {
      targetTop,
      targetLeft,
      targetWidth,
      targetHeight,
      arrowWidth,
      arrowHeight,
      tooltipWidth,
      tooltipHeight,
      scrollX,
      scrollY,
      innerWidth,
      innerHeight
    } = getDomsSizeInfo();

    const { top: tooltipCustomTop = 0, left: tooltipCustomLeft = 0 } = tooltipPosition ?? {};
    const arrowCustomPosition = arrowPosition || 0;

    const currentPlace = checkValidPosition({
      targetTop,
      targetLeft,
      targetWidth,
      targetHeight,
      arrowWidth,
      arrowHeight,
      tooltipWidth,
      tooltipHeight,
      scrollX,
      scrollY,
      innerWidth,
      innerHeight
    });

    setCurrentPlace(currentPlace);

    let tooltipStyle = '';
    let arrowStyle = '';
    let shadowStyle = '';

    switch (currentPlace) {
      case 'top':
        tooltipStyle += `
          top: ${tooltipCustomTop + scrollY + targetTop - tooltipHeight - arrowHeight - space}px;
          left: ${checkViewportXPosition(
            tooltipCustomLeft + scrollX + targetLeft + targetWidth / 2 - tooltipWidth / 2,
            tooltipWidth
          )}px;
        `;
        arrowStyle += `
          top: ${tooltipCustomTop + scrollY + targetTop - arrowHeight - space}px;
          left: ${arrowCustomPosition + scrollX + targetLeft + targetWidth / 2 - arrowWidth / 2}px;
        `;
        break;
      case 'left':
        tooltipStyle += `
          top: ${checkViewportYPosition(
            tooltipCustomTop + scrollY + targetTop - (tooltipHeight - targetHeight) / 2,
            tooltipHeight
          )}px;
          left: ${checkViewportXPosition(
            tooltipCustomLeft + scrollX + targetLeft - tooltipWidth - arrowHeight - space,
            tooltipWidth
          )}px;
          max-width: ${targetLeft - arrowWidth - space}px;
        `;
        arrowStyle += `
          top: ${arrowCustomPosition + scrollY + targetTop + targetHeight / 2 - arrowWidth / 2}px;
          left: ${tooltipCustomLeft + scrollX + targetLeft - arrowWidth - space}px;
        `;
        break;
      case 'right':
        tooltipStyle += `
          top: ${checkViewportYPosition(
            tooltipCustomTop + scrollY + targetTop - (tooltipHeight - targetHeight) / 2,
            tooltipHeight
          )}px;
          left: ${tooltipCustomLeft + scrollX + targetLeft + targetWidth + arrowWidth + space}px;
          max-width: ${
            innerWidth - (scrollX + targetLeft + targetWidth + arrowWidth + space + 10)
          }px;
        `;
        arrowStyle += `
          top: ${arrowCustomPosition + scrollY + targetTop + targetHeight / 2 - arrowHeight / 2}px;
          left: ${tooltipCustomLeft + scrollX + targetLeft + targetWidth + space}px;
        `;
        break;
      case 'bottom':
      default:
        tooltipStyle += `
        top: ${tooltipCustomTop + scrollY + targetTop + targetHeight + arrowHeight + space}px;
        left: ${checkViewportXPosition(
          tooltipCustomLeft + scrollX + targetLeft + targetWidth / 2 - tooltipWidth / 2,
          tooltipWidth
        )}px;
      `;
        arrowStyle += `
        transform: rotate(0deg);
        top: ${tooltipCustomTop + scrollY + targetTop + targetHeight + space}px;
        left: ${arrowCustomPosition + scrollX + targetLeft + targetWidth / 2 - arrowWidth / 2}px;
      `;
        break;
    }

    shadowStyle += `
      ${tooltipStyle}
      width: ${tooltipWidth}px;
      height: ${tooltipHeight}px;
    `;

    tooltipRef.current.setAttribute('style', tooltipStyle);
    shadowRef.current.setAttribute('style', shadowStyle);

    if (arrowRef.current) {
      arrowRef.current.setAttribute('style', arrowStyle);
    }

    if (calculateCnt.current === 2) {
      calculateCnt.current = 0;
      return setTooltipOpen(true);
    } else {
      await wait(20);
      calculateCnt.current += 1;
      calculateTooltipStyle();
    }
  }, [
    arrowPosition,
    space,
    tooltipPosition,
    checkValidPosition,
    checkViewportXPosition,
    checkViewportYPosition,
    getDomsSizeInfo
  ]);

  const handleTooltipEvent = useMemo(() => {
    return debounce((e: Event) => {
      if (e.type !== 'click' && isClickOpenRef.current) {
        return;
      } else if (e.type === 'click') {
        e.preventDefault();
        isClickOpenRef.current = true;
      }

      if (e.type === 'mouseout') {
        setTooltipOpen(false);
      } else if (calculateCnt.current === 0) {
        calculateTooltipStyle();
      }

      e.preventDefault();
    }, 100);
  }, [calculateTooltipStyle]);

  const handleAddAllEventListener = useCallback(() => {
    if (!targetRef.current || typeof open === 'boolean') return;

    realEvents.forEach((ev) => {
      targetRef.current.addEventListener(ev, handleTooltipEvent);
    });
  }, [open, realEvents, handleTooltipEvent]);

  const handleRemoveAllEventListener = useCallback(() => {
    if (!targetRef.current) return;

    realEvents.forEach((ev) => {
      targetRef.current.removeEventListener(ev, handleTooltipEvent);
    });
  }, [realEvents, handleTooltipEvent]);

  useClickOutside(tooltipRef, (e) => {
    if (typeof open === 'boolean') {
      return;
    }

    const target = targetRef.current;
    if (target && !target.contains(e.target as Element)) {
      isClickOpenRef.current = false;
      setTooltipOpen(false);
    }
  });

  useEffect(() => {
    getTargetElement();
    handleAddAllEventListener();

    return () => {
      handleRemoveAllEventListener();
    };
  }, [
    calculateTooltipStyle,
    getTargetElement,
    handleAddAllEventListener,
    handleRemoveAllEventListener
  ]);

  useEffect(() => {
    const hideTooltipEventHandler = throttle(() => {
      setTooltipOpen(false);
    }, 30);

    window.removeEventListener('resize', hideTooltipEventHandler);
    window.addEventListener('resize', hideTooltipEventHandler);

    if (whenWindowScrollClose) {
      window.removeEventListener('scroll', hideTooltipEventHandler);
      window.addEventListener('scroll', hideTooltipEventHandler);
    }

    return () => {
      window.removeEventListener('resize', hideTooltipEventHandler);
      window.removeEventListener('scroll', hideTooltipEventHandler);
    };
  }, [whenWindowScrollClose, calculateTooltipStyle]);

  useEffect(() => {
    if (open && mounted) {
      calculateTooltipStyle();
    }

    setTooltipOpen(open);
  }, [mounted, open, calculateTooltipStyle]);

  return (
    <Portal id="tooltip">
      <div
        ref={() => {
          if (!mounted) {
            setMounted(true);
          }
        }}
        className={cx('tooltip', className, currentPlace, { open: tooltipOpen })}
        style={
          {
            visibility: tooltipOpen ? 'visible' : 'hidden',
            '--tooltip-color': tooltipColor,
            '--tooltip-text-color': tooltipTextColor,
            '--tooltip-box-shadow': tooltipBoxShadow,
            '--tooltip-border-radius': tooltipBorderRadius
          } as CustomCSSProperties
        }
      >
        <div ref={shadowRef} className={cx('tooltip-shadow')}></div>
        {!hideArrow && (
          <div ref={arrowRef} className={cx('tooltip-arrow')}>
            <span>
              <SvgIcoTooltipArrow className={cx('tooltip-arrow-icon')} />
            </span>
          </div>
        )}
        <div ref={tooltipRef} className={cx('tooltip-text')}>
          <div className={cx('speech-bubble-wrap')}>
            <div className={cx('speech-bubble')} style={{ width }}>
              <div>{children}</div>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export type { PropsType as TooltipProps };
export default Tooltip;
