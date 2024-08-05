'use client';

import React, { MouseEvent } from 'react';
import style from './CommentWriterInfo.module.scss';
import Person from '../avatars/Person';
import { toFormatterByInt } from '@/utils/valueParserUtils';
import { getTimeString } from '@/utils/dateUtils';
import { makeCxFunc } from '@/utils/forReactUtils';

type Props = {
  className?: string;
  writerName?: string;
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
  //logic

  return (
    <div className={cx(className, 'author', { 'has-click-event': onProfileClick })}>
      <div className={cx('author-avatar')} onClick={onProfileClick}>
        <Person src={writerImg} />
      </div>
      <div className={cx('author-info')}>
        <strong className={cx('author-name')} onClick={onProfileClick}>
          {writerName || '-'}
        </strong>
        {typeof follwerCount !== 'undefined' && (
          <span className={cx('author-followers')}>
            {toFormatterByInt(follwerCount, 1)} {follwersText}
          </span>
        )}

        {!!createdAt && (
          <span className={cx('author-time')}>{getTimeString(createdAt, locale)}</span>
        )}
      </div>
    </div>
  );
};

export type { Props as CommentWriterInfoProps };
export default CommentWriterInfo;
