'use client';

import React, { MouseEvent, ReactElement, useId } from 'react';
import classNames from 'classnames/bind';
import style from './FeedBox.module.scss';
import FeedImagesView, { FeedImagesViewProps } from '../editor/FeedImagesView';
import PopoverButton from '../popover/PopoverButton';
import { SvgIcoVDots } from '@/assets/svgs';
import FeedEmojiArea, { EmojiInfo } from './FeedEmojiArea';
import FeedEtcInfoArea from './FeedEtcInfoArea';
import FeedWriterInfo from './FeedWriterInfo';
import FeedTextContent from './FeedTextContent';
import FeedLinkPreview, { FeedLinkPreviewProps } from '../editor/FeedLinkPreview';
import FeedIframesView from '../editor/FeedIframesView';

type Props = {
  className?: string;
  avatarSize?: number;
  writerName?: string;
  writerImg?: string;
  images?: string[];
  media?: { type?: 'youtube' | 'twitch'; src?: string }[];
  textContent?: string;
  ogMetaData?: FeedLinkPreviewProps['ogMetaData'] | null;
  managePopoverElement?: null | ReactElement;
  emojiSelectPopoverElement?: null | ReactElement;
  categoryName?: string;
  certificated?: boolean;
  emojiList?: EmojiInfo[];
  commentCount?: number;
  likeCount?: number;
  isMyLike?: boolean;
  createdAt?: number;
  updatedAt?: number;
  locale?: string;
  onMentionClick?: (params: { name: string; id: string }) => void;
  onHashTagClick?: (params: { name: string; id: string }) => void;
  onManageBtnClick?: null | ((e: MouseEvent<HTMLButtonElement>) => void);
  onEmojiSelectBtnClick?: null | ((e: MouseEvent<HTMLButtonElement>) => void);
  onEmojiClick?: (params: EmojiInfo) => void;
  onShareBtnClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  onImageClick?: FeedImagesViewProps['handleClickImage'];
  onLikeBtnClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};

const cx = classNames.bind(style);

const FeedBox = ({
  className = '',
  writerName,
  writerImg,
  categoryName,
  certificated,
  textContent,
  images = [],
  media = [],
  ogMetaData,
  managePopoverElement = <></>,
  emojiSelectPopoverElement = <></>,
  emojiList = [],
  commentCount = 0,
  likeCount = 0,
  isMyLike,
  avatarSize = 36,
  createdAt,
  updatedAt,
  locale = 'en',
  onMentionClick,
  onHashTagClick,
  onManageBtnClick,
  onEmojiSelectBtnClick,
  onEmojiClick,
  onShareBtnClick,
  onImageClick,
  onLikeBtnClick
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
            createdAt={updatedAt || createdAt}
            locale={locale}
          />

          {/* Feed Management Button (삭제, 수정, 신고...) */}
          {!!managePopoverElement || !!onManageBtnClick ? (
            <div className={cx('btn-manage')}>
              <PopoverButton
                anchorId={onManageBtnClick ? '' : `feed-manage-${uid.replace(/:/gi, '')}`}
                id={`feed-manage-${uid.replace(/:/gi, '')}`}
                popoverStyle={{ right: -10, top: 10, zIndex: 9999 }}
                popoverElement={managePopoverElement}
                popoverAnimation={{ name: 'modal-pop-fade', duration: 300 }}
                onClick={onManageBtnClick}
              >
                <SvgIcoVDots width={22} height={22} />
              </PopoverButton>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className={cx('feed-body')}>
          <FeedTextContent
            className={cx('text-content')}
            content={textContent}
            ellipsis={true}
            onMentionClick={onMentionClick}
            onHashTagClick={onHashTagClick}
          />

          {images.length > 0 && (
            <FeedImagesView
              className={cx('carousel')}
              images={images.map((src) => ({ src: src }))}
              handleClickImage={onImageClick}
            />
          )}
          {media.length > 0 && <FeedIframesView className={cx('carousel')} media={media} />}
          {!!ogMetaData && <FeedLinkPreview ogMetaData={ogMetaData} />}
        </div>

        <div className={cx('feed-footer')}>
          <FeedEmojiArea
            className={cx('feed-reactions')}
            emojiList={emojiList}
            emojiSelectPopoverElement={emojiSelectPopoverElement}
            onEmojiClick={onEmojiClick}
            onEmojiSelectBtnClick={onEmojiSelectBtnClick}
          />
          <FeedEtcInfoArea
            className={cx('feed-comments')}
            commentCount={commentCount}
            likeCount={likeCount}
            isMyClick={isMyLike}
            onLikeBtnClick={onLikeBtnClick}
            onShareBtnClick={onShareBtnClick}
          />
        </div>
      </div>
    </article>
  );
};

export type { Props as FeedBoxProps };
export default FeedBox;
