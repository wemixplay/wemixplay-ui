'use client';

import React, { MouseEvent, useCallback } from 'react';
import style from './FeedWriterInfo.module.scss';
import { SvgIcoCertified, SvgIcoFromArrow } from '@/assets/svgs';
import { getModifyTimeString, getTimeString } from '@/utils/dateUtils';
import Person from '../avatars/Person';
import { makeCxFunc } from '@/utils/forReactUtils';

type Props = {
  className?: string;
  name?: string;
  profileImg?: string;
  profileSize?: number;
  channelName?: string;
  channelImg?: string;
  channelIsOfficial?: boolean;
  categoryName?: string;
  certificated?: boolean;
  createdAt?: number;
  updatedAt?: number;
  locale?: string;
  onWriterProfileClick?: (e: MouseEvent<HTMLElement>) => void;
  onChannelClick?: (e: MouseEvent<HTMLElement>) => void;
};

const cx = makeCxFunc(style);

const FeedWriterInfo = ({
  className = '',
  name,
  profileImg,
  profileSize,
  channelName,
  channelImg,
  channelIsOfficial,
  categoryName,
  certificated,
  createdAt,
  updatedAt,
  locale,
  onWriterProfileClick,
  onChannelClick
}: Props) => {
  const handleWriterProfileClick = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      e.stopPropagation();

      onWriterProfileClick && onWriterProfileClick(e);
    },
    [onWriterProfileClick]
  );

  const handleChannelClick = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      e.stopPropagation();

      onChannelClick && onChannelClick(e);
    },
    [onChannelClick]
  );

  return (
    <div className={cx(className, 'profile', { 'has-click-event': onWriterProfileClick })}>
      <Person
        src={profileImg}
        customSize={profileSize}
        onClick={handleWriterProfileClick}
        className={cx('writer-avatar')}
      />
      <div className={cx('profile-text')}>
        <strong className={cx('title')} onClick={handleWriterProfileClick}>
          {name || '-'}
          {!!certificated && <SvgIcoCertified width={20} height={20} />}
        </strong>
        <div className={cx('info')}>
          {!!categoryName && <span className={cx('category')}>{categoryName}</span>}

          {!!channelName && (
            <div
              className={cx('from-info', { 'has-click-event': onChannelClick })}
              onClick={handleChannelClick}
            >
              <SvgIcoFromArrow />
              <Person src={channelImg} customSize={18} />
              <div className={cx('channel')}>
                <span className={cx('channel-name')}>{channelName}</span>
                {!!channelIsOfficial && <SvgIcoCertified width={12} height={12} />}
              </div>
            </div>
          )}
        </div>
        <span className={cx('date')}>{getModifyTimeString({ createdAt, updatedAt, locale })}</span>
      </div>
    </div>
  );
};

export type { Props as FeedWriterInfoProps };
export default FeedWriterInfo;
