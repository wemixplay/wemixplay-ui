'use client';

import React, {
  CSSProperties,
  MutableRefObject,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState
} from 'react';
import { isDesktop } from 'react-device-detect';
import style from './MentionList.module.scss';
import { makeCxFunc } from '@/utils/forReactUtils';
import Person from '@/components/avatars/Person';
import WpImage from '@/components/image/WpImage';
import { SvgIcoCertified } from '@/assets/svgs';
import { MentionInfo } from '../Mention';
import useCheckDevice from '@/hooks/useCheckDevice';

type MentionListRef = HTMLDivElement & {
  handleArrowUp: () => void;
  handleArrowDown: () => void;
  handleSubmit: (index?: number) => MentionInfo;
};

type Props = {
  className?: string;
  list?: MentionInfo[];
  targetMentionId?: string;
  contentEditableEl: MutableRefObject<HTMLDivElement>;
  listElement?: (item: JSONObject) => React.JSX.Element;
  selectMentionItem: (index?: number) => void;
  closeMentionList: () => void;
};

const cx = makeCxFunc(style);

const MentionList = forwardRef<MentionListRef, Props>(
  (
    {
      targetMentionId,
      className = '',
      list,
      contentEditableEl,
      listElement,
      selectMentionItem,
      closeMentionList
    },
    ref
  ) => {
    const elRef = useRef<MentionListRef>();
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

    const handleSelectMention = useCallback(
      (index: number) => {
        setFoucsIndex(index);
        selectMentionItem(index);
      },
      [selectMentionItem]
    );

    /**
     * MentionList의 위치값과 높이값 등을 계산하여 DropBox가 노출될 위치 좌표 값을 계산하는 함수
     *
     * @param el MentionList의 element (HTMLDivElement)
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

        if (dropboxElHeight > top - viewPortTop) {
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
      if (contentEditableEl.current && targetMentionId) {
        const mentionTag = contentEditableEl.current.querySelector(
          `#${targetMentionId}`
        ) as HTMLDivElement;

        const position = calculatePosition(mentionTag);
        setPosition(position);
      } else {
        setPosition({});
      }
    }, [targetMentionId, list.length, calculatePosition]);

    useEffect(() => {
      setFoucsIndex(0);
    }, [list]);

    useEffect(() => {
      const handleClickOutside = (e: Event) => {
        if (elRef.current && !elRef.current.contains(e.target as HTMLElement)) {
          closeMentionList();
        }
      };

      document.addEventListener('click', handleClickOutside);
      window.addEventListener('resize', closeMentionList);

      return () => {
        document.removeEventListener('click', handleClickOutside);
        window.removeEventListener('resize', closeMentionList);
      };
    }, [closeMentionList]);

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
        className={cx('mention-list')}
        contentEditable={false}
        style={{ ...position, display: (list ?? []).length > 0 ? 'block' : 'none' }}
      >
        <ul ref={scrollAreaRef} className={cx('mention-list-area')}>
          {(list ?? []).map((item, index) => (
            <li
              className={cx('mention-item', { active: focusIndex === index })}
              key={`${item.name}-${index}`}
              data-id={item.id}
              onMouseOver={() => handleHover(index)}
              onClick={() => handleSelectMention(index)}
            >
              {listElement ? (
                listElement(item)
              ) : (
                <>
                  <Person src={item.profileImg} size={'custom'} className={cx('thumb')} />
                  <p className={cx('item-info')}>
                    <strong className={cx('item-title')}>{item.name}</strong>
                    {!!item.isOfficial && <SvgIcoCertified width={12} height={12} />}
                  </p>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }
);

MentionList.displayName = 'MentionList';

export type { Props as MentionListProps, MentionListRef };
export default MentionList;
