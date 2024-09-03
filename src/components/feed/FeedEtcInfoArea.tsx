'use client';

import React, { MouseEvent, useCallback } from 'react';
import style from './FeedEtcInfoArea.module.scss';
import { SvgIcoComment, SvgIcoLike, SvgIcoLikePressed, SvgIcoShare } from '@/assets/svgs';
import { toFormatterByInt } from '@/utils/valueParserUtils';
import { makeCxFunc } from '@/utils/forReactUtils';

type Props = {
  className?: string;
  commentCount: number;
  likeCount: number;
  isMyClick?: boolean;
  onShareBtnClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  onLikeBtnClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  onCommentBtnClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};

const cx = makeCxFunc(style);

const FeedEtcInfoArea = ({
  className = '',
  commentCount,
  likeCount,
  isMyClick,
  onShareBtnClick,
  onLikeBtnClick,
  onCommentBtnClick
}: Props) => {
  const handleShareBtnClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      onShareBtnClick && onShareBtnClick(e);
    },
    [onShareBtnClick]
  );

  const handleCommentClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      onCommentBtnClick && onCommentBtnClick(e);
    },
    [onCommentBtnClick]
  );

  const handleLikeBtnClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      onLikeBtnClick && onLikeBtnClick(e);
    },
    [onLikeBtnClick]
  );

  return (
    <div className={cx(className, 'feed-comments')}>
      <button
        type="button"
        className={cx('btn-comment', { 'has-click-event': onCommentBtnClick })}
        onClick={handleCommentClick}
      >
        <SvgIcoComment width={32} height={32} />
        <span className={cx('count')}>{toFormatterByInt(commentCount, 1)}</span>
      </button>
      <button
        type="button"
        className={cx('btn-like', { active: isMyClick, 'has-click-event': onLikeBtnClick })}
        onClick={handleLikeBtnClick}
      >
        <span className={cx('icon')}>
          <SvgIcoLike />
        </span>
        <span className={cx('icon-pressed')}>
          <SvgIcoLikePressed />
        </span>
        <span className={cx('count')}>{toFormatterByInt(likeCount, 1)}</span>
      </button>
      {!!onShareBtnClick && (
        <button
          type="button"
          className={cx('btn-share', 'has-click-event')}
          onClick={handleShareBtnClick}
        >
          <SvgIcoShare />
        </button>
      )}
    </div>
  );
};

export type { Props as FeedEtcInfoAreaProps };
export default FeedEtcInfoArea;
