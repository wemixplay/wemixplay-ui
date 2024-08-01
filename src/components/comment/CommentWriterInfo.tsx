'use client';

import React from 'react';
import classNames from 'classnames/bind';
import style from './CommentWriterInfo.module.scss';
import Person from '../avatars/Person';
import { toFormatterByInt } from '@/utils/valueParserUtils';
import { getTimeString } from '@/utils/dateUtils';

type Props = {
  className?: string;
  writerName?: string;
  writerImg?: string;
  follwerCount?: number;
  createdAt?: number;
  updatedAt?: number;
};

const cx = classNames.bind(style);

const CommentWriterInfo = ({
  className = '',
  writerName,
  writerImg,
  follwerCount,
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
            {toFormatterByInt(follwerCount, 1)} Followers
          </span>
        )}

        {!!createdAt && <span className={cx('author-time')}>{getTimeString(createdAt)}</span>}
      </div>
    </div>
  );
};

export type { Props as CommentWriterInfoProps };
export default CommentWriterInfo;
