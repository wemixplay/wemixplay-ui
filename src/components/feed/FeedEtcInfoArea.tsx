'use client';

import React, { MouseEvent } from 'react';
import classNames from 'classnames/bind';
import style from './FeedEtcInfoArea.module.scss';
import { SvgIcoComment, SvgIcoLike, SvgIcoShare } from '@/assets/svgs';
import { toFormatterByInt } from '@/utils/valueParserUtils';
import { makeCxFunc } from '@/utils/forReactUtils';

type Props = {
  className?: string;
  commentCount: number;
  likeCount: number;
  onShareBtnClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};

const cx = makeCxFunc(style);

const FeedEtcInfoArea = ({ className = '', commentCount, likeCount, onShareBtnClick }: Props) => {
  //logic

  return (
    <div className={cx('feed-comments')}>
      <button type="button" className={cx('btn-comment')}>
        <SvgIcoComment width={18} height={18} />
        <span className={cx('count')}>{toFormatterByInt(commentCount, 1)}</span>
      </button>
      <button type="button" className={cx('btn-like')}>
        <SvgIcoLike />
        <span className={cx('count')}>{toFormatterByInt(likeCount, 1)}</span>
      </button>
      {!!onShareBtnClick && (
        <button type="button" className={cx('btn-share')} onClick={onShareBtnClick}>
          <SvgIcoShare width={22} height={22} />
        </button>
      )}
    </div>
  );
};

export default FeedEtcInfoArea;
