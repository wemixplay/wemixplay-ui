'use client';

import React, { MouseEvent } from 'react';
import style from './CommentEtcInfo.module.scss';
import { SvgIcoLike, SvgIcoLikePressed } from '@/assets/svgs';
import { makeCxFunc } from '@/utils/forReactUtils';
import { toFormatterByInt } from '@/utils/valueParserUtils';

type Props = {
  className?: string;
  likeInfo?: {
    likeCount: number;
    isMyClick?: boolean;
  };
  onLikeBtnClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};

const cx = makeCxFunc(style);

const CommentEtcInfo = ({ className = '', likeInfo, onLikeBtnClick }: Props) => {
  const handleLikeBtnClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onLikeBtnClick && onLikeBtnClick(e);
  };

  return (
    <div className={cx(className, 'comment-etc-info')}>
      <button
        type="button"
        className={cx('btn-like', { active: likeInfo?.isMyClick })}
        onClick={handleLikeBtnClick}
      >
        <i className={cx('btn-like-ico')}>
          <span className={cx('icon')}>
            <SvgIcoLike />
          </span>
          <span className={cx('icon-pressed')}>
            <SvgIcoLikePressed />
          </span>
        </i>

        <span className={cx('count')}>{toFormatterByInt(likeInfo?.likeCount ?? 0, 1)}</span>
      </button>
    </div>
  );
};

export type { Props as CommentEtcInfoProps };
export default CommentEtcInfo;
