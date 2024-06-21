'use client';

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react';
import { isDesktop } from 'react-device-detect';

type HashListRef = HTMLDivElement & {
  handleArrowUp: () => void;
  handleArrowDown: () => void;
  handleSubmit: () => { profileImg?: string; name: string };
};

type Props = {
  id?: string;
  className?: string;
  list?: (Record<string, string> & { name: string })[];
  listElement?: (item: any) => React.JSX.Element;
  selectHashItem: () => void;
  closeHashList: () => void;
};

const HashList = forwardRef<HashListRef, Props>(
  ({ id, className = '', list, listElement, selectHashItem, closeHashList }, ref) => {
    const elRef = useRef<HashListRef>();

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

    const handleSelectHash = useCallback(
      (index: number) => {
        setFoucsIndex(index);
        selectHashItem();
      },
      [selectHashItem]
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
          closeHashList();
        }
      };
      document.addEventListener('click', handleClickOutside);

      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }, [closeHashList]);

    return (
      <div
        ref={elRef}
        id={id}
        className="hash-list"
        contentEditable={false}
        style={{ display: (list ?? []).length > 0 ? 'block' : 'none' }}
      >
        <ul className="hash-list-area">
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
              className={`hash-item ${focusIndex === index ? 'active' : ''}`}
              key={`${item.name}-${index}`}
              onMouseOver={() => handleHover(index)}
              onClick={() => handleSelectHash(index)}
            >
              {listElement ? listElement(item) : item.name}
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
