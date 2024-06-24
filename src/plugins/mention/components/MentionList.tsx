'use client';

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState
} from 'react';
import { isDesktop } from 'react-device-detect';

type MentionListRef = HTMLDivElement & {
  handleArrowUp: () => void;
  handleArrowDown: () => void;
  handleSubmit: () => { profileImg?: string; name: string };
};

type Props = {
  id?: string;
  className?: string;
  list?: (Record<string, string> & { name: string })[];
  listElement?: (item: JSONObject) => React.JSX.Element;
  selectMentionItem: () => void;
  closeMentionList: () => void;
};

const MentionList = forwardRef<MentionListRef, Props>(
  ({ id, className = '', list, listElement, selectMentionItem, closeMentionList }, ref) => {
    const elRef = useRef<MentionListRef>();

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

    useImperativeHandle(ref, () => {
      elRef.current.handleArrowUp = handleArrowUp;
      elRef.current.handleArrowDown = handleArrowDown;
      elRef.current.handleSubmit = handleSubmit;

      return elRef.current;
    });

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
        id={id}
        className="mention-list"
        contentEditable={false}
        style={{ display: (list ?? []).length > 0 ? 'block' : 'none' }}
      >
        <ul className="mention-list-area">
          {(list ?? []).map((item, index) => (
            <li
              ref={(el) => {
                if (!el) {
                  return;
                }

                Object.entries(item).map(([key, value]) => {
                  el.dataset[key] = value;
                });
              }}
              className={`mention-item ${focusIndex === index ? 'active' : ''}`}
              key={`${item.name}-${index}`}
              onMouseOver={() => handleHover(index)}
              onClick={() => handleSelectMention(index)}
            >
              {listElement ? listElement(item) : item.name}
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
