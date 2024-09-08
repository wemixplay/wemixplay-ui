'use client';

import React, { MouseEvent, ReactElement, useCallback } from 'react';
import style from './CommentWriterInfo.module.scss';
import Person from '../avatars/Person';
import { toFormatterByInt } from '@/utils/valueParserUtils';
import { getModifyTimeString } from '@/utils/dateUtils';
import { makeCxFunc } from '@/utils/forReactUtils';

type Props = {
  className?: string;
  writerName?: ReactElement | string;
  writerImg?: string;
  follwerCount?: number;
  follwersText?: string;
  locale?: string;
  createdAt?: number;
  updatedAt?: number;
  onProfileClick?: (e: MouseEvent<HTMLElement>) => void;
};

const cx = makeCxFunc(style);

const CommentWriterInfo = ({
  className = '',
  writerName,
  writerImg,
  follwerCount,
  follwersText = 'Followers',
  locale,
  createdAt,
  updatedAt,
  onProfileClick
}: Props) => {
  const handleProfileClick = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    onProfileClick && onProfileClick(e);
  };

  return (
    <div className={cx(className, 'author', { 'has-click-event': onProfileClick })}>
      <div className={cx('author-avatar')} onClick={handleProfileClick}>
        <Person src={writerImg} />
      </div>
      <div className={cx('author-info')}>
        <strong className={cx('author-name')} onClick={handleProfileClick}>
          {writerName || '-'}
        </strong>
        {typeof follwerCount !== 'undefined' && (
          <span className={cx('author-followers')}>
            {toFormatterByInt(follwerCount, 1)} {follwersText}
          </span>
        )}

        {!!createdAt && (
          <span className={cx('author-time')}>
            {getModifyTimeString({ createdAt, updatedAt, locale })}
          </span>
        )}
      </div>
    </div>
  );
};

export type { Props as CommentWriterInfoProps };
export default CommentWriterInfo;
