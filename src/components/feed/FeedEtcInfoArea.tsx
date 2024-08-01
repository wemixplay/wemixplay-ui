'use client';

import React, { MouseEvent } from 'react';
import style from './FeedEtcInfoArea.module.scss';
import { SvgIcoComment, SvgIcoLike, SvgIcoShare } from '@/assets/svgs';
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
  //logic

  return (
    <div className={cx(className, 'feed-comments')}>
      <button
        type="button"
        className={cx('btn-comment', { 'has-click-event': onCommentBtnClick })}
        onClick={onCommentBtnClick}
      >
        <SvgIcoComment width={18} height={18} />
        <span className={cx('count')}>{toFormatterByInt(commentCount, 1)}</span>
      </button>
      <button
        type="button"
        className={cx('btn-like', { active: isMyClick, 'has-click-event': onLikeBtnClick })}
        onClick={onLikeBtnClick}
      >
        <SvgIcoLike />
        <span className={cx('count')}>{toFormatterByInt(likeCount, 1)}</span>
      </button>
      {!!onShareBtnClick && (
        <button
          type="button"
          className={cx('btn-share', 'has-click-event')}
          onClick={onShareBtnClick}
        >
          <SvgIcoShare width={22} height={22} />
        </button>
      )}
    </div>
  );
};

export type { Props as FeedEtcInfoAreaProps };
export default FeedEtcInfoArea;
