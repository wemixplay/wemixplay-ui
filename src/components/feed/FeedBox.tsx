'use client';

import React, { MouseEvent, ReactElement, useId } from 'react';
import classNames from 'classnames/bind';
import style from './FeedBox.module.scss';
import Ellipsis from '../ellipsis/Ellipsis';
import FeedImagesView from '../editor/FeedImagesView';
import PopoverButton from '../popover/PopoverButton';
import Person from '../avatars/Person';
import useCheckDevice from '@/hooks/useCheckDevice';
import {
  SvgIcoAddEmoji,
  SvgIcoCertified,
  SvgIcoComment,
  SvgIcoLike,
  SvgIcoShare,
  SvgIcoVDots
} from '@/assets/svgs';
import { getTimeString } from '@/utils/dateUtils';
import { toFormatterByInt } from '@/utils/valueParserUtils';
import WpImage from '../image/WpImage';
import FeedEmojiArea from './FeedEmojiArea';
import FeedEtcInfoArea from './FeedEtcInfoArea';
import FeedWriterInfo from './FeedWriterInfo';

type EmojiInfo = {
  emojiNo: number;
  imageUrl: string;
  clickCount: number;
  isMyClick?: boolean;
};

type Props = {
  className?: string;
  avatarSize?: number;
  writerName?: string;
  writerImg?: string;
  managePopoverElement?: null | ReactElement;
  emojiSelectPopoverElement?: null | ReactElement;
  categoryName?: string;
  emojiList?: EmojiInfo[];
  commentCount?: number;
  likeCount?: number;
  createdAt?: number;
  updatedAt?: number;
  locale?: string;
  onManageBtnClick?: null | ((e: MouseEvent<HTMLButtonElement>) => void);
  onEmojiSelectBtnClick?: null | ((e: MouseEvent<HTMLButtonElement>) => void);
  onShareBtnClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};

const cx = classNames.bind(style);

const FeedBox = ({
  className = '',
  writerName,
  writerImg,
  categoryName,
  managePopoverElement = <></>,
  emojiSelectPopoverElement = <></>,
  emojiList = [],
  commentCount = 0,
  likeCount = 0,
  avatarSize = 36,
  createdAt,
  updatedAt,
  locale = 'en',
  onManageBtnClick,
  onEmojiSelectBtnClick,
  onShareBtnClick
}: Props) => {
  const uid = useId();
  const { isDesktop, isMobile, isTablet } = useCheckDevice();

  return (
    <article className={cx(className, 'feed-box')}>
      <div className={cx('feed-box-container')}>
        <div className={cx('feed-header')}>
          <FeedWriterInfo
            className={cx('profile')}
            name={writerName}
            profileImg={writerImg}
            profileSize={avatarSize}
            categoryName={categoryName}
            createdAt={createdAt}
            locale={locale}
          />

          {/* Feed Management Button (삭제, 수정, 신고...) */}
          <div className={cx('btn-manage')}>
            <PopoverButton
              anchorId={onManageBtnClick ? '' : `feed-manage-${uid}`}
              id={`feed-manage-${uid}`}
              popoverStyle={{ right: -10, top: 10, zIndex: 9999 }}
              popoverElement={managePopoverElement}
              popoverAnimation={{ name: 'modal-pop-fade', duration: 300 }}
              onClick={onManageBtnClick}
            >
              <SvgIcoVDots width={22} height={22} />
            </PopoverButton>
          </div>
        </div>
        <div className={cx('feed-body')}>
          <Ellipsis
            className={cx('text')}
            content="Former player and boyhood Arsenal fan, Carl Jenkinson was back at the
                            <a href='/'>#EmiratesStadium</a> on Sunday to show his support."
            defaultShortened
            lineClamp={3}
            triggerLess="show less"
            triggerMore="show more"
            observingEnvs={[isMobile, isTablet, isDesktop]}
          />

          <FeedImagesView className={cx('carousel')} images={[]} />
        </div>

        <div className={cx('feed-footer')}>
          <FeedEmojiArea
            className={cx('feed-reactions')}
            emojiList={emojiList}
            emojiSelectPopoverElement={emojiSelectPopoverElement}
            onEmojiSelectBtnClick={onEmojiSelectBtnClick}
          />
          <FeedEtcInfoArea
            className={cx('feed-comments')}
            commentCount={commentCount}
            likeCount={likeCount}
            onShareBtnClick={onShareBtnClick}
          />
        </div>
      </div>
    </article>
  );
};

export default FeedBox;
