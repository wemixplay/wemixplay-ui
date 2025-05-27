'use client';

import React, {
  CSSProperties,
  MutableRefObject,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react';
import { isDesktop } from 'react-device-detect';
import style from './HashList.module.scss';
import { makeCxFunc } from '@/utils/forReactUtils';
import { HashTagInfo } from '../HashTag';
import useCheckDevice from '@/hooks/useCheckDevice';

type HashListRef = HTMLDivElement & {
  /** 위쪽 방향으로 선택 항목을 이동시키는 함수 */
  handleArrowUp: () => void;
  /** 아래쪽 방향으로 선택 항목을 이동시키는 함수 */
  handleArrowDown: () => void;
  /**
   * 현재 선택된 해시태그를 제출하는 함수
   * @param {number} [index] - 선택된 해시태그의 인덱스, 선택되지 않으면 현재 focus된 항목을 제출
   * @returns {HashTagInfo} 선택된 해시태그 정보
   */
  handleSubmit: (index?: number) => HashTagInfo;
};

type Props = {
  /** 컴포넌트의 고유 ID */
  id?: string;
  /** 추가적인 CSS 클래스명 */
  className?: string;
  /** 해시태그 목록 */
  list?: HashTagInfo[];
  /** 선택할 해시태그의 ID */
  targetHashId?: string;
  /** 해시태그가 적용될 콘텐츠 편집 영역의 참조 객체 */
  contentEditableEl: MutableRefObject<HTMLDivElement>;
  /**
   * 해시태그 목록 아이템을 커스텀 렌더링하는 함수
   * @param {HashTagInfo} item - 해시태그 정보 객체
   * @returns {React.JSX.Element} 렌더링할 해시태그 리스트 아이템
   */
  listElement?: (item: HashTagInfo) => React.JSX.Element;
  /**
   * 해시태그 아이템을 선택했을 때 호출되는 콜백 함수
   * @param {number} index - 선택된 해시태그 아이템의 인덱스
   */
  selectHashItem: (index: number) => void;
  /**
   * 해시태그 목록이 닫힐때 호출되는 함수
   */
  closeHashList: () => void;
};

const cx = makeCxFunc(style);

/**
 * `HashList` 컴포넌트는 해시태그 목록을 표시하고 사용자가 선택할 수 있도록 돕는 UI 컴포넌트입니다.
 * 해시태그 목록은 사용자가 해시태그를 입력할 때 자동 완성 제안으로 사용됩니다.
 * 목록에서 선택한 해시태그는 외부에서 지정된 콜백 함수로 처리됩니다.
 *
 * @component
 * @example
 * <HashList
 *   list={hashTags}
 *   targetHashId="target-hash-id"
 *   contentEditableEl={contentEditableRef}
 *   selectHashItem={handleSelectHashItem}
 *   closeHashList={handleCloseHashList}
 * />
 */
const HashList = forwardRef<HashListRef, Props>(
  (
    {
      className = '',
      contentEditableEl,
      targetHashId,
      list,
      listElement,
      selectHashItem,
      closeHashList
    },
    ref
  ) => {
    const elRef = useRef<HashListRef>();
    const scrollAreaRef = useRef<HTMLUListElement>();
    const touchStartPoint = useRef({
      x: 0,
      y: 0
    });

    const [position, setPosition] = useState<CSSProperties>({});
    const [focusIndex, setFoucsIndex] = useState(0);

    const { isMobile } = useCheckDevice();

    const handleArrowUp = useCallback(() => {
      if (!(list ?? []).length) {
        return;
      }

      const nextFocusIndex = focusIndex === 0 ? list.length - 1 : focusIndex - 1;

      setFoucsIndex(nextFocusIndex);

      const activeItem = scrollAreaRef.current.querySelector(
        `li:nth-child(${nextFocusIndex + 1})`
      ) as HTMLLIElement;

      scrollAreaRef.current.scrollTop = activeItem.offsetTop - 20;
    }, [focusIndex, list]);

    const handleArrowDown = useCallback(() => {
      if (!(list ?? []).length) {
        return;
      }

      const nextFocusIndex = focusIndex === list.length - 1 ? 0 : focusIndex + 1;

      setFoucsIndex(nextFocusIndex);

      const activeItem = scrollAreaRef.current.querySelector(
        `li:nth-child(${nextFocusIndex + 1})`
      ) as HTMLLIElement;

      scrollAreaRef.current.scrollTop = activeItem.offsetTop - 20;
    }, [list, focusIndex]);

    const handleSubmit = useCallback(
      (index?: number) => {
        if (!(list ?? []).length) {
          return;
        }

        return list[index ?? focusIndex];
      },
      [focusIndex, list]
    );

    const handleHover = useCallback((index: number) => {
      if (!isDesktop) {
        return;
      }

      setFoucsIndex(index);
    }, []);

    const handleSelectHash = useCallback(
      (index: number) => {
        setFoucsIndex(index);
        selectHashItem(index);
      },
      [selectHashItem]
    );

    /**
     * HashList의 위치값과 높이값 등을 계산하여 DropBox가 노출될 위치 좌표 값을 계산하는 함수
     *
     * @param el HashList의 element (HTMLDivElement)
     */
    const calculatePosition = useCallback(
      (el: HTMLDivElement) => {
        if (!el) {
          return;
        }
        const { offsetHeight } = el;
        const rect = el.getBoundingClientRect();
        const isBodyMinusPosition =
          document.body.style.position === 'fixed' &&
          !!document.body.style.top &&
          Number(document.body.style.top.replace('px', '')) < 0;
        const scrollY = isBodyMinusPosition
          ? Number(document.body.style.top.replace('px', '')) * -1
          : window.scrollY;

        const overWidth = rect.left + elRef.current.offsetWidth - window.innerWidth;

        const top = rect.top + scrollY;
        const bottom = rect.bottom + scrollY;
        const left = overWidth > 0 ? rect.left - overWidth - 10 : rect.left;

        const viewPortTop = scrollY;
        const viewPortBottom = scrollY + window.innerHeight;

        let boxDirection = 'bottom';

        let dropboxElHeight = elRef.current.clientHeight ?? 0;

        if (dropboxElHeight > viewPortBottom - bottom) {
          boxDirection = top - viewPortTop > viewPortBottom - bottom ? 'top' : 'bottom';
        }

        if (dropboxElHeight > top - viewPortTop && dropboxElHeight > viewPortBottom - bottom) {
          scrollAreaRef.current.style.height = `${boxDirection === 'top' ? top - viewPortTop - 32 : viewPortBottom - bottom - 32}px`;
        }

        dropboxElHeight = elRef.current.clientHeight ?? 0;

        const positionStyle: CSSProperties = {
          position: 'absolute',
          zIndex: '9999999',
          visibility: 'visible'
        };

        if (isMobile) {
          console.log('isMobile');
          positionStyle.maxWidth = '95%';
        }

        switch (boxDirection) {
          case 'top':
            positionStyle.top = top - dropboxElHeight;
            positionStyle.left = isMobile ? '50%' : left;

            break;
          case 'bottom':
            positionStyle.top = top + offsetHeight;
            positionStyle.left = isMobile ? '50%' : left;
            break;
          default:
            break;
        }

        if (isMobile) {
          positionStyle.transform = 'translateX(-50%)';
        }

        return positionStyle;
      },
      [isMobile]
    );

    const handleTouchStart = useCallback((e: TouchEvent) => {
      touchStartPoint.current = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
      };
    }, []);

    const handleTouchMove = useCallback((e: TouchEvent) => {
      const scrollTop = scrollAreaRef.current.scrollTop;
      const scrollHeight = scrollAreaRef.current.scrollHeight;

      if (
        e.cancelable &&
        scrollTop <= 0 &&
        e.changedTouches[0].clientY - touchStartPoint.current.y > 0
      ) {
        e.preventDefault();
      } else if (
        e.cancelable &&
        scrollTop >= scrollHeight - scrollAreaRef.current.clientHeight &&
        touchStartPoint.current.y - e.changedTouches[0].clientY > 0
      ) {
        e.preventDefault();
      }
    }, []);

    useImperativeHandle(ref, () => {
      elRef.current.handleArrowUp = handleArrowUp;
      elRef.current.handleArrowDown = handleArrowDown;
      elRef.current.handleSubmit = handleSubmit;

      return elRef.current;
    });

    useEffect(() => {
      if (contentEditableEl.current && targetHashId) {
        const mentionTag = contentEditableEl.current.querySelector(
          `#${targetHashId}`
        ) as HTMLDivElement;

        const position = calculatePosition(mentionTag);
        setPosition(position);
      } else {
        setPosition({});
      }
    }, [targetHashId, list.length, calculatePosition]);

    useEffect(() => {
      setFoucsIndex(0);
    }, [list]);

    useEffect(() => {
      const handleClickOutside = (e: Event) => {
        const target = e.target as HTMLElement;

        if (
          elRef.current &&
          !elRef.current.contains(target) &&
          !target.classList.contains('hash')
        ) {
          closeHashList();
        }
      };

      document.addEventListener('click', handleClickOutside);
      window.addEventListener('resize', closeHashList);

      return () => {
        document.removeEventListener('click', handleClickOutside);
        window.removeEventListener('resize', closeHashList);
      };
    }, [closeHashList]);

    useEffect(() => {
      const scrollEl = scrollAreaRef.current;

      scrollEl.addEventListener('touchstart', handleTouchStart);
      scrollEl.addEventListener('touchmove', handleTouchMove);

      return () => {
        scrollEl.removeEventListener('touchstart', handleTouchStart);
        scrollEl.removeEventListener('touchmove', handleTouchMove);
      };
    }, [handleTouchStart, handleTouchMove]);

    return (
      <div
        ref={elRef}
        className={cx(className, 'hash-list')}
        contentEditable={false}
        style={{ ...position, display: (list ?? []).length > 0 ? 'block' : 'none' }}
      >
        <ul ref={scrollAreaRef} className={cx('hash-list-area')}>
          {(list ?? []).map((item, index) => (
            <li
              ref={(el) => {
                if (!el) {
                  return;
                }

                Object.entries(item).map(([key, value]) => {
                  el.dataset[key] = String(value);
                });
              }}
              className={cx('hash-item', { active: focusIndex === index })}
              key={`${item.name}-${index}`}
              onMouseOver={() => handleHover(index)}
              onClick={() => handleSelectHash(index)}
            >
              {listElement ? (
                listElement(item)
              ) : (
                <>
                  <div className={cx('info-area')}>
                    <strong className={cx('title')}>
                      <span>#</span>
                      {item.name}
                    </strong>

                    {/* {!!item.postCnt && (
                      <span className={cx('count')}>{toFormatterByInt(item.postCnt, 1)} Posts</span>
                    )} */}
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }
);

HashList.displayName = 'HashList';

export type { Props as HashListProps, HashListRef };
export default HashList;
