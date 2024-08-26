'use client';

import React, { MouseEvent, ReactElement, useCallback, useId } from 'react';
import style from './CommentBox.module.scss';
import { makeCxFunc } from '@/utils/forReactUtils';
import PopoverButton from '../popover/PopoverButton';
import { SvgIcoVDots } from '@/assets/svgs';
import CommentWriterInfo from './CommentWriterInfo';
import FeedTextContent from '../feed/FeedTextContent';
import CommentEtcInfo from './CommentEtcInfo';

type Props = {
  className?: string;
  writerName?: ReactElement | string;
  writerImg?: string;
  follwerCount?: number;
  follwersText?: string;
  comment?: string;
  likeInfo?: {
    likeCount: number;
    isMyClick?: boolean;
  };
  createdAt?: number;
  updatedAt?: number;
  deletedMsg?: string;
  managePopoverElement?: ReactElement;
  locale?: string;
  onManageBtnClick?: null | ((e: MouseEvent<HTMLButtonElement>) => void);
  onProfileClick?: (e: MouseEvent<HTMLElement>) => void;
  onLikeBtnClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  onMentionClick?: (params: { name: string; id: string }) => void;
  onHashTagClick?: (params: { name: string; id: string }) => void;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
};

const cx = makeCxFunc(style);

const CommentBox = ({
  className = '',
  writerName,
  writerImg,
  follwerCount,
  follwersText,
  comment,
  likeInfo,
  createdAt,
  updatedAt,
  managePopoverElement,
  deletedMsg,
  locale,
  onManageBtnClick,
  onProfileClick,
  onLikeBtnClick,
  onMentionClick,
  onHashTagClick,
  onClick
}: Props) => {
  const uid = useId();

  const handleManageBtnClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      onManageBtnClick && onManageBtnClick(e);
    },
    [onManageBtnClick]
  );

  return (
    <article
      className={cx(className, 'comment-box', {
        'deleted-comment': deletedMsg,
        'has-click-event': onClick
      })}
      onClick={onClick}
    >
      {deletedMsg}
      {!deletedMsg && (
        <>
          <div className={cx('author')}>
            <CommentWriterInfo
              writerName={writerName}
              writerImg={writerImg}
              follwerCount={follwerCount}
              follwersText={follwersText}
              locale={locale}
              createdAt={createdAt}
              updatedAt={updatedAt}
              onProfileClick={onProfileClick}
            />
            {/* Feed Management Button (삭제, 수정, 신고...) */}
            <div className={cx('btn-manage')}>
              <PopoverButton
                anchorId={onManageBtnClick ? '' : `comment-manage-${uid.replace(/:/gi, '')}`}
                id={`comment-manage-${uid.replace(/:/gi, '')}`}
                popoverStyle={{ right: -10, top: 10, zIndex: 999 }}
                popoverElement={managePopoverElement}
                popoverAnimation={{ name: 'modal-pop-fade', duration: 300 }}
                onClick={handleManageBtnClick}
              >
                <SvgIcoVDots width={22} height={22} />
              </PopoverButton>
            </div>
          </div>
          <FeedTextContent
            className={cx('comment-content')}
            content={comment}
            ellipsis={true}
            enableShowMore={true}
            onMentionClick={onMentionClick}
            onHashTagClick={onHashTagClick}
            onTextClick={onClick}
          />
          <CommentEtcInfo likeInfo={likeInfo} onLikeBtnClick={onLikeBtnClick} />
        </>
      )}
    </article>
  );
};

export type { Props as CommentBoxProps };
export default CommentBox;
