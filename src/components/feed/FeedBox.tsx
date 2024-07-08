'use client';

import React, { MouseEvent, ReactElement, useId } from 'react';
import classNames from 'classnames/bind';
import style from './FeedBox.module.scss';
import FeedImagesView from '../editor/FeedImagesView';
import PopoverButton from '../popover/PopoverButton';
import { SvgIcoVDots } from '@/assets/svgs';
import FeedEmojiArea from './FeedEmojiArea';
import FeedEtcInfoArea from './FeedEtcInfoArea';
import FeedWriterInfo from './FeedWriterInfo';
import FeedTextContent from './FeedTextContent';

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
  certificated?: boolean;
  emojiList?: EmojiInfo[];
  commentCount?: number;
  likeCount?: number;
  createdAt?: number;
  updatedAt?: number;
  locale?: string;
  onMentionClick?: (params: { name: string; id: string }) => void;
  onHashTagClick?: (params: { name: string; id: string }) => void;
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
  certificated,
  managePopoverElement = <></>,
  emojiSelectPopoverElement = <></>,
  emojiList = [],
  commentCount = 0,
  likeCount = 0,
  avatarSize = 36,
  createdAt,
  updatedAt,
  locale = 'en',
  onMentionClick,
  onHashTagClick,
  onManageBtnClick,
  onEmojiSelectBtnClick,
  onShareBtnClick
}: Props) => {
  const uid = useId();

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
            certificated={certificated}
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
          <FeedTextContent
            className={cx('text-content')}
            content="Former player and boyhood Arsenal fan, Carl Jenkinson was back at the <a href='/'>#EmiratesStadium</a> on Sunday to show his support.<span class='mention complete-mention' data-id='3'>@Derek</span>"
            ellipsis={true}
            onMentionClick={onMentionClick}
            onHashTagClick={onHashTagClick}
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
