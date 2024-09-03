'use client';

import React, {
  forwardRef,
  MouseEvent,
  MutableRefObject,
  ReactElement,
  useCallback,
  useId,
  useImperativeHandle,
  useRef
} from 'react';
import style from './FeedBox.module.scss';
import FeedImagesView, { FeedImagesViewProps } from './FeedImagesView';
import PopoverButton from '../popover/PopoverButton';
import { SvgIcoHDots, SvgIcoVDots } from '@/assets/svgs';
import FeedEmojiArea, { EmojiInfo } from './FeedEmojiArea';
import FeedEtcInfoArea from './FeedEtcInfoArea';
import FeedWriterInfo from './FeedWriterInfo';
import FeedTextContent from './FeedTextContent';
import FeedLinkPreview, { FeedLinkPreviewProps } from './FeedLinkPreview';
import FeedIframesView, { FeedIframesViewRef } from './FeedIframesView';
import { makeCxFunc } from '@/utils/forReactUtils';

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
  textEllipsis?: boolean;
  intersectionVideo?: boolean;
  createdAt?: number;
  updatedAt?: number;
  locale?: string;
  onClick?: (e: MouseEvent<HTMLSpanElement>) => void;
  onMentionClick?: (params: { name: string; id: string }) => void;
  onHashTagClick?: (params: { name: string; id: string }) => void;
  onManageBtnClick?: null | ((e: MouseEvent<HTMLButtonElement>) => void);
  onEmojiSelectBtnClick?: null | ((e: MouseEvent<HTMLButtonElement>) => void);
  onEmojiClick?: (params: EmojiInfo) => void;
  onShareBtnClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  onImageClick?: FeedImagesViewProps['onImageClick'];
  onLikeBtnClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  onCommentBtnClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  onProfileClick?: (e: MouseEvent<HTMLElement>) => void;
};

type FeedBoxRef = HTMLElement & {
  iframeRef: FeedIframesViewRef;
};

const cx = makeCxFunc(style);

const FeedBox = forwardRef<FeedBoxRef, Props>(
  (
    {
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
      avatarSize = 32,
      intersectionVideo,
      createdAt,
      updatedAt,
      locale = 'en',
      textEllipsis = true,
      onClick,
      onMentionClick,
      onHashTagClick,
      onManageBtnClick,
      onEmojiSelectBtnClick,
      onEmojiClick,
      onShareBtnClick,
      onImageClick,
      onLikeBtnClick,
      onCommentBtnClick,
      onProfileClick
    },
    ref
  ) => {
    const uid = useId();

    const elRef = useRef<FeedBoxRef>();
    const iframeRef = useRef<FeedIframesViewRef>();

    const handleProfileClick = useCallback(
      (e: MouseEvent<HTMLElement>) => {
        e.stopPropagation();

        onProfileClick && onProfileClick(e);
      },
      [onProfileClick]
    );

    const handleManageBtnClick = useCallback(
      (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();

        onManageBtnClick && onManageBtnClick(e);
      },
      [onManageBtnClick]
    );

    useImperativeHandle(ref, () => {
      elRef.current.iframeRef = iframeRef.current;

      return elRef.current;
    });

    return (
      <article
        ref={elRef}
        className={cx(className, 'feed-box', { 'has-click-event': onClick })}
        onClick={onClick}
      >
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
              updatedAt={updatedAt}
              locale={locale}
              onProfileClick={handleProfileClick}
            />

            {/* Feed Management Button (삭제, 수정, 신고...) */}
            {!!managePopoverElement || !!onManageBtnClick ? (
              <div className={cx('btn-manage')}>
                <PopoverButton
                  anchorId={onManageBtnClick ? '' : `feed-manage-${uid.replace(/:/gi, '')}`}
                  id={`feed-manage-${uid.replace(/:/gi, '')}`}
                  popoverStyle={{ right: -10, top: 10, zIndex: 999 }}
                  popoverElement={managePopoverElement}
                  popoverAnimation={{ name: 'modal-pop-fade', duration: 300 }}
                  whenWindowScrollClose={true}
                  onClick={handleManageBtnClick}
                >
                  <SvgIcoHDots width={32} height={32} />
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
              ellipsis={textEllipsis}
              onTextClick={onClick}
              onMentionClick={onMentionClick}
              onHashTagClick={onHashTagClick}
            />

            {images.length > 0 && (
              <FeedImagesView
                className={cx('carousel')}
                images={images.map((src) => ({ src: src }))}
                onImageClick={onImageClick}
              />
            )}
            {media.length > 0 && (
              <FeedIframesView
                ref={iframeRef}
                className={cx('carousel')}
                media={media}
                intersectionVideo={intersectionVideo}
              />
            )}
            {!!ogMetaData && <FeedLinkPreview ogMetaData={ogMetaData} />}
          </div>

          <div className={cx('feed-footer')}>
            <div className={cx('feed-footer-container')}>
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
                onCommentBtnClick={onCommentBtnClick}
              />
            </div>
          </div>
        </div>
      </article>
    );
  }
);

FeedBox.displayName = 'FeedBox';

export type { Props as FeedBoxProps, FeedBoxRef };
export default FeedBox;
