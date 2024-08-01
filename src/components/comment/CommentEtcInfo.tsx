'use client';

import React, { MouseEvent } from 'react';
import style from './CommentEtcInfo.module.scss';
import { SvgIcoLike } from '@/assets/svgs';
import { makeCxFunc } from '@/utils/forReactUtils';
import { toFormatterByInt } from '@/utils/valueParserUtils';

type Props = {
  className?: string;
  likeCount?: number;
  onLikeBtnClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};

const cx = makeCxFunc(style);

const CommentEtcInfo = ({ className = '', likeCount, onLikeBtnClick }: Props) => {
  //logic

  return (
    <div className={cx(className, 'comment-etc-info')}>
      <button type="button" className={cx('btn-like')} onClick={onLikeBtnClick}>
        <i className={cx('btn-like-ico')}>
          <SvgIcoLike />
        </i>
        <span className={cx('count')}>{toFormatterByInt(likeCount, 1)}</span>
      </button>
    </div>
  );
};

export default CommentEtcInfo;
