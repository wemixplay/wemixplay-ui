'use client';

import React, { ReactElement, MouseEvent, useId, useMemo, useCallback } from 'react';
import style from './FeedEmojiArea.module.scss';
import WpImage from '../image/WpImage';
import { SvgIconEmoji } from '@/assets/svgs';
import PopoverButton from '../popover/PopoverButton';
import { makeCxFunc } from '@/utils/forReactUtils';
import { toFormatterByInt } from '@/utils/valueParserUtils';
import { isDesktop, isMobile } from 'react-device-detect';

type EmojiInfo = {
  emojiNo?: number;
  imageNo?: number;
  imageUrl?: string;
  clickCount?: number;
  isMyClick?: boolean;
};

type Props = {
  /**
   * 추가적인 CSS 클래스명
   */
  className?: string;
  /**
   * 이모지 목록 배열
   */
  emojiList: EmojiInfo[];
  /**
   * 이모지 선택 버튼에 표시될 popover 요소
   */
  emojiSelectPopoverElement?: null | ReactElement;
  /**
   * 이모지를 클릭할 때 호출되는 함수
   * @param {EmojiInfo} params - 클릭된 이모지 정보
   */
  onEmojiClick?: (params: EmojiInfo) => void;
  /**
   * 이모지 선택 버튼을 클릭할 때 호출되는 함수
   * @param {MouseEvent<HTMLButtonElement>} e - 버튼 클릭 이벤트
   */
  onEmojiSelectBtnClick?: null | ((e: MouseEvent<HTMLButtonElement>) => void);
};

const cx = makeCxFunc(style);

/**
 * `FeedEmojiArea`는 게시물에 이모지를 표시하고 선택할 수 있는 영역을 제공합니다.
 * 기존의 이모지 목록과 이모지 선택 버튼을 표시하며, 각 이모지는 클릭 이벤트를 처리할 수 있습니다.
 *
 * @component
 * @example
 * <FeedEmojiArea
 *   emojiList={[{ emojiNo: 1, imageUrl: 'emoji.png', clickCount: 10, isMyClick: true }]}
 *   emojiSelectPopoverElement={<MyEmojiPopover />}
 *   onEmojiClick={(emojiInfo) => console.log('Emoji clicked', emojiInfo)}
 *   onEmojiSelectBtnClick={(e) => console.log('Emoji select button clicked')}
 * />
 *
 * @param {string} [props.className] - 추가적인 CSS 클래스명
 * @param {EmojiInfo[]} [props.emojiList] - 이모지 목록 배열
 * @param {ReactElement|null} [props.emojiSelectPopoverElement] - 이모지 선택 버튼에 표시될 popover 요소
 * @param {function} [props.onEmojiClick] - 이모지를 클릭할 때 호출되는 함수
 * @param {function} [props.onEmojiSelectBtnClick] - 이모지 선택 버튼을 클릭할 때 호출되는 함수
 */
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
            <SvgIconEmoji />
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
