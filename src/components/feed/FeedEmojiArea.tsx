'use client';

import React, { ReactElement, MouseEvent, useId, useMemo, useCallback } from 'react';
import style from './FeedEmojiArea.module.scss';
import WpImage from '../image/WpImage';
import { SvgIcoAddEmoji } from '@/assets/svgs';
import PopoverButton from '../popover/PopoverButton';
import { makeCxFunc } from '@/utils/forReactUtils';
import { toFormatterByInt } from '@/utils/valueParserUtils';

type EmojiInfo = {
  emojiNo?: number;
  imageNo?: number;
  imageUrl?: string;
  clickCount?: number;
  isMyClick?: boolean;
};

type Props = {
  className?: string;
  emojiList: EmojiInfo[];
  emojiSelectPopoverElement?: null | ReactElement;
  onEmojiClick?: (params: EmojiInfo) => void;
  onEmojiSelectBtnClick?: null | ((e: MouseEvent<HTMLButtonElement>) => void);
};

const cx = makeCxFunc(style);

const FeedEmojiArea = ({
  className = '',
  emojiList = [],
  emojiSelectPopoverElement,
  onEmojiClick,
  onEmojiSelectBtnClick
}: Props) => {
  const uid = useId();

  const popoverStyle = useMemo(() => {
    let left = 0;

    if (emojiList.length === 0) {
      left = 0;
    } else {
      left = emojiList.length * -30;
    }

    return { left: left < -80 ? -80 : left, top: 10, zIndex: 999 };
  }, [emojiList.length]);

  const handleEmojiClick = useCallback(
    ({ emojiInfo, e }: { emojiInfo: EmojiInfo; e: MouseEvent<HTMLButtonElement> }) => {
      e.stopPropagation();

      onEmojiClick && onEmojiClick(emojiInfo);
    },
    [onEmojiClick]
  );

  const handleEmojiSelectBtnClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      onEmojiSelectBtnClick && onEmojiSelectBtnClick(e);
    },
    [onEmojiSelectBtnClick]
  );

  return (
    <div className={cx(className, 'feed-reactions')}>
      {emojiList.map((emoji) => (
        <button
          key={emoji.emojiNo}
          type="button"
          className={cx({ active: emoji.isMyClick, 'no-exist-event': !onEmojiClick })}
          onClick={(e) => handleEmojiClick({ emojiInfo: emoji, e })}
        >
          <WpImage
            className={cx('emoji-img')}
            src={emoji.imageUrl}
            alt={emoji.imageUrl}
            width={22}
            height={22}
          />
          <span className={cx('count')}>{toFormatterByInt(emoji.clickCount, 1)}</span>
        </button>
      ))}

      {/* Emoji list */}
      {!!emojiSelectPopoverElement || !!onEmojiSelectBtnClick ? (
        <div className={cx('btn-add-emoji')}>
          <PopoverButton
            anchorId={onEmojiSelectBtnClick ? '' : `add-emoji-${uid.replace(/:/gi, '')}`}
            id={`add-emoji-${uid.replace(/:/gi, '')}`}
            popoverStyle={popoverStyle}
            popoverElement={emojiSelectPopoverElement}
            popoverAnimation={{ name: 'modal-pop-fade', duration: 300 }}
            whenWindowScrollClose={true}
            onClick={handleEmojiSelectBtnClick}
          >
            <SvgIcoAddEmoji width={24} height={24} />
          </PopoverButton>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export type { Props as FeedEmojiAreaProps, EmojiInfo };
export default FeedEmojiArea;
