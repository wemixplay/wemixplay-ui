'use client';

import React, { MouseEvent } from 'react';
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
  certificated?: boolean;
  createdAt?: number;
  locale?: string;
  onProfileClick?: (e: MouseEvent<HTMLElement>) => void;
};

const cx = makeCxFunc(style);

const FeedWriterInfo = ({
  className = '',
  name,
  profileImg,
  profileSize,
  categoryName,
  certificated,
  createdAt,
  locale,
  onProfileClick
}: Props) => {
  //logic

  return (
    <div className={cx(className, 'profile', { 'has-click-event': onProfileClick })}>
      <Person src={profileImg} customSize={profileSize} onClick={onProfileClick} />
      <div className={cx('profile-text')}>
        <strong className={cx('title')} onClick={onProfileClick}>
          {name || '-'}
          {!!certificated && <SvgIcoCertified width={20} height={20} />}
        </strong>
        <div className={cx('info')}>
          {!!categoryName && <span className={cx('category')}>{categoryName}</span>}
          <span className={cx('date')}>{getTimeString(createdAt, locale)}</span>
        </div>
      </div>
    </div>
  );
};

export type { Props as FeedWriterInfoProps };
export default FeedWriterInfo;
