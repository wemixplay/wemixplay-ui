'use client';

import React, { MouseEvent, useCallback } from 'react';
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
  fromChannelName?: string;
  fromChannelImg?: string;
  fromChannelIsOfficial?: boolean;
  categoryName?: string;
  certificated?: boolean;
  createdAt?: number;
  updatedAt?: number;
  locale?: string;
  onProfileClick?: (e: MouseEvent<HTMLElement>) => void;
  onFromChannelClick?: (e: MouseEvent<HTMLElement>) => void;
};

const cx = makeCxFunc(style);

const FeedWriterInfo = ({
  className = '',
  name,
  profileImg,
  profileSize,
  fromChannelName,
  fromChannelImg,
  fromChannelIsOfficial,
  categoryName,
  certificated,
  createdAt,
  updatedAt,
  locale,
  onProfileClick,
  onFromChannelClick
}: Props) => {
  const handleProfileClick = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      e.stopPropagation();

      onProfileClick && onProfileClick(e);
    },
    [onProfileClick]
  );

  const handleFromChannelClick = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      e.stopPropagation();

      onFromChannelClick && onFromChannelClick(e);
    },
    [onFromChannelClick]
  );

  return (
    <div className={cx(className, 'profile', { 'has-click-event': onProfileClick })}>
      <Person src={profileImg} customSize={profileSize} onClick={handleProfileClick} />
      <div className={cx('profile-text')}>
        <strong className={cx('title')} onClick={handleProfileClick}>
          {name || '-'}
          {!!certificated && <SvgIcoCertified width={20} height={20} />}
        </strong>
        <div className={cx('info')}>
          {!!categoryName && <span className={cx('category')}>{categoryName}</span>}
          <span className={cx('date')}>{getTimeString(createdAt, locale)}</span>
          {!!fromChannelName && (
            <div className={cx('from-info', { 'has-click-event': onFromChannelClick })}>
              <Person src={fromChannelImg} customSize={18} onClick={handleFromChannelClick} />
              <div className={cx('channel')}>
                <span className={cx('channel-name')}>{fromChannelName}</span>
                {!!fromChannelIsOfficial && <SvgIcoCertified width={12} height={12} />}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export type { Props as FeedWriterInfoProps };
export default FeedWriterInfo;
