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

type MentionListRef = HTMLDivElement & {
  handleArrowUp: () => void;
  handleArrowDown: () => void;
  handleSubmit: () => { profileImg?: string; name: string };
};

type Props = {
  className?: string;
  list?: (Record<string, string> & { name: string })[];
  targetMentionId?: string;
  contentEditableEl: MutableRefObject<HTMLDivElement>;
  listElement?: (item: JSONObject) => React.JSX.Element;
  selectMentionItem: () => void;
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

    const [boxDirection, setBoxDirection] = useState('bottom');
    const [position, setPosition] = useState<CSSProperties>({});
    const [focusIndex, setFoucsIndex] = useState(0);

    const handleArrowUp = useCallback(() => {
      if (!(list ?? []).length) {
        return;
      }

      if (focusIndex === 0) {
        setFoucsIndex(list.length - 1);
      } else {
        setFoucsIndex((focusIndex) => focusIndex - 1);
      }
    }, [focusIndex, list]);

    const handleArrowDown = useCallback(() => {
      if (!(list ?? []).length) {
        return;
      }

      if (focusIndex === list.length - 1) {
        setFoucsIndex(0);
      } else {
        setFoucsIndex((focusIndex) => focusIndex + 1);
      }
    }, [list, focusIndex]);

    const handleSubmit = useCallback(() => {
      if (!(list ?? []).length) {
        return;
      }

      return list[focusIndex];
    }, [focusIndex, list]);

    const handleHover = useCallback((index: number) => {
      if (!isDesktop) {
        return;
      }

      setFoucsIndex(index);
    }, []);

    const handleSelectMention = useCallback(
      (index: number) => {
        setFoucsIndex(index);
        selectMentionItem();
      },
      [selectMentionItem]
    );

    /**
     * MentionList가 노출될 여유 공간을 체크하고 위로 노출할지 아래로 노출할지 결정하는 함수
     *
     * @param top SelectBox의 y 위치값
     * @param clientHeight SelectBox의 높이값
     */
    const checkTopBottomSpace = useCallback((top: number, clientHeight: number) => {
      const windowTop = window.scrollY;
      const windowBottom = window.scrollY + window.innerHeight;

      // 공간이 없다면 반대 방향(위 -> 아래, 아래 -> 위)으로 방향 전환
      if (top + clientHeight > windowBottom) {
        setBoxDirection('top');
      }
    }, []);

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
        const { offsetWidth, offsetHeight } = el;
        const rect = el.getBoundingClientRect();
        const isBodyMinusPosition =
          document.body.style.position === 'fixed' &&
          !!document.body.style.top &&
          Number(document.body.style.top.replace('px', '')) < 0;
        const scrollY = isBodyMinusPosition
          ? Number(document.body.style.top.replace('px', '')) * -1
          : window.scrollY;
        const top = rect.top + scrollY;
        const { left } = rect;

        const positionStyle: CSSProperties = {
          position: 'absolute',
          zIndex: '9999999'
        };

        const dropboxElHeight = elRef.current.clientHeight ?? 0;

        checkTopBottomSpace(top, dropboxElHeight);

        switch (boxDirection) {
          case 'top':
            positionStyle.top = top - dropboxElHeight;
            positionStyle.left = left;
            break;
          case 'bottom':
            positionStyle.top = top + offsetHeight;
            positionStyle.left = left;
            break;
          default:
            break;
        }

        return positionStyle;
      },
      [checkTopBottomSpace, boxDirection]
    );

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
    }, [targetMentionId, calculatePosition]);

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

      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }, [closeMentionList]);

    return (
      <div
        ref={elRef}
        className={cx('mention-list')}
        contentEditable={false}
        style={{ ...position, display: (list ?? []).length > 0 ? 'block' : 'none' }}
      >
        <ul className={cx('mention-list-area')}>
          {(list ?? []).map((item, index) => (
            <li
              className={cx('mention-item', { active: focusIndex === index })}
              key={`${item.name}-${index}`}
              data-id={item.id}
              onMouseOver={() => handleHover(index)}
              onClick={() => handleSelectMention(index)}
            >
              {/* {listElement ? listElement(item) : item.name} */}
              <Person src={''} size={'custom'} className={cx('thumb')} />
              <p className={cx('item-info')}>
                <strong className={cx('item-title')}>
                  Taming Master Taming MasterTaming MasterTaming MasterTaming Master
                </strong>
                <SvgIcoCertified width={12} height={12} />
              </p>
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
