'use client';

import React from 'react';
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
  updatedAt
}: Props) => {
  //logic

  return (
    <div className={cx(className, 'author')}>
      <div className={cx('author-avatar')}>
        <Person src={writerImg} />
      </div>
      <div className={cx('author-info')}>
        <strong className={cx('author-name')}>{writerName || '-'}</strong>
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
