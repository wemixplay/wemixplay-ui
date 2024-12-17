'use client';

import React, {
  CSSProperties,
  ReactNode,
  TouchEvent as ReactTouchEvent,
  useCallback,
  useEffect,
  useRef
} from 'react';

import { makeCxFunc } from '@/utils/forReactUtils';

import style from './Drawer.module.scss';

interface PropsType {
  className?: string;
  children: ReactNode;
  disabled?: boolean;
  direction: 'top' | 'left' | 'right';
  enableOverDrawer?: boolean;
  breakRatioPoint?: CSSProperties['height'][];
  onClose?: () => void;
  onTouchMove?: (
    { target, startPoint }: { target: HTMLElement; startPoint: { x: number; y: number } },
    e: ReactTouchEvent<HTMLDivElement> | TouchEvent
  ) => void;
}

const cx = makeCxFunc(style);

const Drawer = ({
  className = '',
  direction,
  disabled,
  children,
  breakRatioPoint,
  enableOverDrawer,
  onTouchMove,
  onClose
}: PropsType) => {
  const childScrollEl = useRef<Element | null>(null);
  const touchStartPoint = useRef({ x: 0, y: 0, originTargetHeight: 0, targetHeight: 0 });
  const templateRef = useRef<HTMLDivElement>(null);
  const touchActive = useRef(false);

  const findFirstScrollableElement = useCallback((element: Element): Element | null => {
    let backupChid = null;
    // 자식 요소들을 순회합니다.
    for (const child of element.children) {
      // getComputedStyle를 이용해 요소의 스타일을 가져옵니다.
      const style = window.getComputedStyle(child);
      // overflow 속성을 확인합니다.
      if (
        style.overflow === 'auto' ||
        style.overflow === 'scroll' ||
        style.overflowX === 'auto' ||
        style.overflowX === 'scroll' ||
        style.overflowY === 'auto' ||
        style.overflowY === 'scroll'
      ) {
        // 조건에 부합하는 요소를 찾으면 반환합니다.
        if (child.scrollTop > 0 || child.scrollLeft > 0) {
          return child;
        } else {
          backupChid = child;
        }

        // return child;
      }

      // 재귀적으로 자식 요소들을 탐색합니다.
      const scrollableChild = findFirstScrollableElement(child);

      if (scrollableChild) {
        return scrollableChild;
      }
    }
    // 조건에 부합하는 자식 요소가 없으면 null을 반환합니다.
    return null;
  }, []);

  const childTouchMoveEvent = useCallback((event) => {
    // 현재 스크롤 위치
    const currentScroll = childScrollEl.current.scrollTop;
    const maxScroll = childScrollEl.current.scrollHeight - childScrollEl.current.clientHeight;

    // 맨 위나 맨 아래가 아닌 경우에만 이벤트 전파를 막음
    if (currentScroll > 0 && currentScroll < maxScroll) {
      event.stopPropagation();
    }
  }, []);

  const handleClose = useCallback(() => {
    const target = templateRef.current;

    target.style.transition = `transform cubic-bezier(0.25, 0.1, 0.25, 1.0) 0.2s, height cubic-bezier(0.25, 0.1, 0.25, 1.0) 0.2s`;

    if (direction === 'top') {
      target.style.transform = `translateY(100%)`;
    } else if (direction === 'left') {
      target.style.transform = `translateX(-100%)`;
    } else if (direction === 'right') {
      target.style.transform = `translateX(100%)`;
    }

    setTimeout(() => {
      target.style.visibility = 'hidden';
      onClose && onClose();
    }, 200);
  }, [direction, onClose]);

  const touchStart = useCallback(
    (e: ReactTouchEvent<HTMLDivElement> | TouchEvent) => {
      const target = templateRef.current;
      childScrollEl.current = findFirstScrollableElement(target);

      if (!target || disabled) return;

      target.style.transition = `transform linear 0.2s, height linear 0.2s`;

      if (direction === 'top') {
        touchActive.current = e.changedTouches[0].clientY - templateRef.current.offsetTop < 20;
      } else if (direction === 'left') {
        touchActive.current = window.innerWidth - e.changedTouches[0].clientX < 20;
      } else if (direction === 'right') {
        touchActive.current = e.changedTouches[0].clientX < 20;
      }

      if (
        !childScrollEl.current ||
        (childScrollEl.current.scrollTop <= 0 && childScrollEl.current.scrollLeft <= 0) ||
        touchActive.current
      ) {
        touchStartPoint.current = {
          x: e.changedTouches[0].clientX,
          y: e.changedTouches[0].clientY,
          originTargetHeight: target.dataset.full
            ? touchStartPoint.current.originTargetHeight
            : target.offsetHeight,
          targetHeight: target.offsetHeight
        };
      }
    },
    [direction, disabled, findFirstScrollableElement]
  );

  const touchMove = useCallback(
    (e: ReactTouchEvent<HTMLDivElement> | TouchEvent) => {
      // if ((e.target as HTMLElement).tagName === 'BUTTON') {
      //   return;
      // }

      const target = templateRef.current;
      const childScrollHeight = childScrollEl.current?.scrollHeight ?? 0;
      const childClientHeight = childScrollEl.current?.clientHeight ?? 0;
      const childScrollTop = childScrollEl.current?.scrollTop ?? 0;

      if (direction === 'top') {
        if (enableOverDrawer && !target.dataset.full) {
          touchActive.current =
            touchStartPoint.current.y > e.changedTouches[0].clientY
              ? childScrollHeight <= childScrollTop + childClientHeight
              : childScrollTop <= 0;
          childScrollHeight <= childScrollTop + childClientHeight || childScrollTop <= 0;
        } else if (enableOverDrawer && target.dataset.full) {
          touchActive.current =
            touchStartPoint.current.y < e.changedTouches[0].clientY && childScrollTop <= 0;

          if (
            touchStartPoint.current.y > e.changedTouches[0].clientY &&
            childScrollHeight <= childScrollTop + childClientHeight
          ) {
            return e.preventDefault();
          }
        } else if (!enableOverDrawer && touchStartPoint.current.y < e.changedTouches[0].clientY) {
          touchActive.current = childScrollTop <= 0;
        } else if (!enableOverDrawer && touchStartPoint.current.y > e.changedTouches[0].clientY) {
          touchActive.current = false;
        }
      }

      if (!target || !touchActive.current || childScrollEl.current || disabled) return;

      onTouchMove && onTouchMove({ target, startPoint: touchStartPoint.current }, e);

      if (direction === 'top') {
        const moveToY =
          e.changedTouches[0].clientY < touchStartPoint.current.y && !enableOverDrawer
            ? 0
            : e.changedTouches[0].clientY - touchStartPoint.current.y;

        if (e.changedTouches[0].clientY < touchStartPoint.current.y && enableOverDrawer) {
          target.style.height = `${moveToY * -1 + touchStartPoint.current.targetHeight}px`;
        } else if (target.dataset.full && enableOverDrawer) {
          target.style.height = `${moveToY * -1 + touchStartPoint.current.targetHeight}px`;
        } else {
          target.style.transform = `translateY(${moveToY}px)`;
        }
      } else if (direction === 'left') {
        const moveToX =
          touchStartPoint.current.x - e.changedTouches[0].clientX < 0
            ? 0
            : e.changedTouches[0].clientX - touchStartPoint.current.x;

        target.style.transform = `translateX(${moveToX}px)`;
      } else if (direction === 'right') {
        const moveToX =
          window.innerWidth - e.changedTouches[0].clientX < 0
            ? 0
            : e.changedTouches[0].clientX - touchStartPoint.current.x;

        target.style.transform = `translateX(${moveToX}px)`;
      }

      if (touchActive.current) e.preventDefault();
    },
    [direction, disabled, enableOverDrawer, onTouchMove]
  );

  const touchEnd = useCallback(
    (e: ReactTouchEvent<HTMLDivElement> | TouchEvent) => {
      if ((e.target as HTMLElement).tagName === 'BUTTON') {
        return;
      }

      const target = templateRef.current;
      const innerHeight = window.visualViewport ? window.visualViewport.height : window.innerHeight;

      if (!target || !touchActive.current || childScrollEl.current || disabled) return;

      if (direction === 'top') {
        if (enableOverDrawer) {
          if (target.dataset.full) {
            target.style.transition = ' height 0.3s';
            target.style.height =
              e.changedTouches[0].clientY - touchStartPoint.current.y > innerHeight / 6
                ? `${touchStartPoint.current.originTargetHeight}px`
                : '100vh';
            target.style.transform = '';
            target.dataset.full =
              e.changedTouches[0].clientY - touchStartPoint.current.y > innerHeight / 6 ? '' : '1';
          } else if (
            !target.dataset.full &&
            touchStartPoint.current.y - e.changedTouches[0].clientY > innerHeight / 6
          ) {
            target.style.transition = ' height 0.3s';
            target.style.height = '100vh';
            target.style.transform = '';
            target.dataset.full =
              touchStartPoint.current.y - e.changedTouches[0].clientY > innerHeight / 6 ? '1' : '';
          } else if (
            e.changedTouches[0].clientY - touchStartPoint.current.y > innerHeight / 6 &&
            !target.dataset.full
          ) {
            handleClose();
          } else {
            target.style.transition = 'transform 0.3s';
            target.style.transform = 'translateY(0px)';
            target.style.height = '';
            target.dataset.full = '';
          }
        } else {
          if (e.changedTouches[0].clientY - touchStartPoint.current.y > innerHeight / 6) {
            handleClose();
          } else {
            target.style.transition = 'transform 0.3s';
            target.style.transform = 'translateY(0px)';
            target.style.height = '';
            target.dataset.full = '';
          }
        }
      } else if (direction === 'left') {
        if (touchStartPoint.current.x - e.changedTouches[0].clientX > 100) {
          handleClose();
        } else {
          target.style.transition = 'transform 0.3s';
          target.style.transform = 'translateX(0px)';
        }
      } else if (direction === 'right') {
        if (touchStartPoint.current.x - e.changedTouches[0].clientX > 100) {
          handleClose();
        } else {
          target.style.transition = 'transform 0.3s';
          target.style.transform = 'translateX(100%)';
        }
      }

      if (touchActive.current) e.preventDefault();
    },
    [direction, disabled, enableOverDrawer, handleClose]
  );

  useEffect(() => {
    let touchStartX = 0;

    const startTouch = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
    };

    const detectTouchMove = (e: TouchEvent) => {
      const isDetect = touchStartX < 10 || window.innerWidth - 10 < touchStartX;

      if (isDetect) e.preventDefault();
    };

    if (!disabled) {
      window.addEventListener('touchstart', startTouch, { passive: false });
      window.addEventListener('touchmove', detectTouchMove, { passive: false });
    }

    return () => {
      window.removeEventListener('touchstart', startTouch);
      window.removeEventListener('touchmove', detectTouchMove);
    };
  }, [disabled]);

  useEffect(() => {
    if (templateRef.current && templateRef.current.children.length > 1) {
      throw Error("A Drawer component's children always receive a single element!");
    } else {
      const target = templateRef.current;
      childScrollEl.current = findFirstScrollableElement(target);

      if (!disabled) {
        target.addEventListener('touchstart', touchStart);
        target.addEventListener('touchmove', touchMove);
        target.addEventListener('touchend', touchEnd);
      }

      return () => {
        target.removeEventListener('touchstart', touchStart);
        target.removeEventListener('touchmove', touchMove);
        target.removeEventListener('touchend', touchEnd);
      };
    }
  }, [disabled, touchEnd, touchMove, touchStart, findFirstScrollableElement]);

  return (
    <div ref={templateRef} className={cx(`drawer`, `${className}`, `${direction}`, { disabled })}>
      {children}
    </div>
  );
};

export default Drawer;
