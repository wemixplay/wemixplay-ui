'use client';

import React, { MouseEvent, ReactElement } from 'react';
import style from './CommentBox.module.scss';
import { makeCxFunc } from '@/utils/forReactUtils';
import Person from '../avatars/Person';
import PopoverButton from '../popover/PopoverButton';
import { SvgIcoLike, SvgIcoVDots } from '@/assets/svgs';
import CommentWriterInfo from './CommentWriterInfo';
import FeedTextContent from '../feed/FeedTextContent';
import CommentEtcInfo from './CommentEtcInfo';

type Props = {
  className?: string;
  writerName?: string;
  writerImg?: string;
  follwerCount?: number;
  comment?: string;
  likeCount?: number;
  createdAt?: number;
  updatedAt?: number;
  deletedMsg?: string;
  managePopoverElement?: ReactElement;
  onManageBtnClick?: null | ((e: MouseEvent<HTMLButtonElement>) => void);
  onLikeBtnClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};

const cx = makeCxFunc(style);

const CommentBox = ({
  className = '',
  writerName,
  writerImg,
  follwerCount,
  comment,
  likeCount,
  createdAt,
  updatedAt,
  managePopoverElement,
  deletedMsg,
  onManageBtnClick,
  onLikeBtnClick
}: Props) => {
  //logic

  return (
    <article className={cx(className, 'comment-box', { 'deleted-comment': deletedMsg })}>
      {deletedMsg}
      {!deletedMsg && (
        <>
          <div className={cx('author')}>
            <CommentWriterInfo
              writerName={writerName}
              writerImg={writerImg}
              follwerCount={follwerCount}
              createdAt={createdAt}
              updatedAt={updatedAt}
            />
            {/* Feed Management Button (삭제, 수정, 신고...) */}
            <div className={cx('btn-manage')}>
              <PopoverButton
                anchorId={onManageBtnClick ? '' : 'feed-manage'}
                id="feed-manage"
                popoverStyle={{ right: -10, top: 10, zIndex: 999 }}
                popoverElement={managePopoverElement}
                popoverAnimation={{ name: 'modal-pop-fade', duration: 300 }}
                onClick={onManageBtnClick}
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
          />
          <CommentEtcInfo likeCount={likeCount} onLikeBtnClick={onLikeBtnClick} />
        </>
      )}
    </article>
  );
};

export type { Props as CommentBoxProps };
export default CommentBox;
