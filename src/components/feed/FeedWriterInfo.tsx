'use client';

import React from 'react';
import classNames from 'classnames/bind';
import style from './FeedWriterInfo.module.scss';
import { SvgIcoCertified } from '@/assets/svgs';
import { getTimeString } from '@/utils/dateUtils';
import Person from '../avatars/Person';
import { makeCxFunc } from '@/utils/forReactUtils';

type Props = {
  className?: string;
  name?: string;
  profileImg?: string;
  profileSize?: number;
  categoryName?: string;
  createdAt?: number;
  locale?: string;
};

const cx = makeCxFunc(style);

const FeedWriterInfo = ({
  className = '',
  name,
  profileImg,
  profileSize,
  categoryName,
  createdAt,
  locale
}: Props) => {
  //logic

  return (
    <div className={cx(className, 'profile')}>
      <Person src={profileImg} customSize={profileSize} />
      <div className={cx('profile-text')}>
        <strong className={cx('title')}>
          {name || '-'} <SvgIcoCertified width={12} height={12} />
        </strong>
        <div className={cx('info')}>
          {!!categoryName && <span className={cx('category')}>{categoryName}</span>}
          <span className={cx('date')}>{getTimeString(createdAt, locale)}</span>
        </div>
      </div>
    </div>
  );
};

export default FeedWriterInfo;
