'use client';

import React, { ReactElement, MouseEvent, useId } from 'react';
import style from './FeedEmojiArea.module.scss';
import WpImage from '../image/WpImage';
import { SvgIcoAddEmoji } from '@/assets/svgs';
import PopoverButton from '../popover/PopoverButton';
import { makeCxFunc } from '@/utils/forReactUtils';

type EmojiInfo = {
  emojiNo: number;
  imageUrl: string;
  clickCount: number;
  isMyClick?: boolean;
};

type Props = {
  className?: string;
  emojiList: EmojiInfo[];
  emojiSelectPopoverElement?: null | ReactElement;
  onEmojiSelectBtnClick?: null | ((e: MouseEvent<HTMLButtonElement>) => void);
};

const cx = makeCxFunc(style);

const FeedEmojiArea = ({
  className = '',
  emojiList,
  emojiSelectPopoverElement,
  onEmojiSelectBtnClick
}: Props) => {
  const uid = useId();

  return (
    <div className={cx(className, 'feed-reactions')}>
      {emojiList.map((emoji) => (
        <button key={emoji.emojiNo} type="button" className={cx({ active: emoji.isMyClick })}>
          <WpImage src={emoji.imageUrl} alt={emoji.imageUrl} width={22} height={22} />
          <span className={cx('count')}>{emoji.clickCount}</span>
        </button>
      ))}

      {/* Emoji list */}
      <div className={cx('btn-add-emoji')}>
        <PopoverButton
          anchorId={onEmojiSelectBtnClick ? '' : `add-emoji-${uid}`}
          id={`add-emoji-${uid}`}
          popoverStyle={{ right: -10, top: 10, zIndex: 9999 }}
          popoverElement={emojiSelectPopoverElement}
          popoverAnimation={{ name: 'modal-pop-fade', duration: 300 }}
          onClick={onEmojiSelectBtnClick}
        >
          <SvgIcoAddEmoji width={24} height={24} />
        </PopoverButton>
      </div>
    </div>
  );
};

export default FeedEmojiArea;
