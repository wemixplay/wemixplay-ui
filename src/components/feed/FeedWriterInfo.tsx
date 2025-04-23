'use client';

import React, { MouseEvent, useCallback, useEffect, useState } from 'react';
import style from './FeedWriterInfo.module.scss';
import { SvgIconCertified } from '@/assets/svgs';
import { getModifyTimeString, getTimeString } from '@/utils/dateUtils';
import Person from '../avatars/Person';
import { makeCxFunc } from '@/utils/forReactUtils';
import ClientOnly from '../clientOnly/ClientOnly';

type Props = {
  /**
   * 추가로 적용할 CSS 클래스명
   */
  className?: string;
  /**
   * 작성자의 이름
   */
  name?: string;
  /**
   * 작성자의 프로필 이미지 URL
   */
  profileImg?: string;
  /**
   * 작성자 프로필 이미지의 크기 (픽셀 단위)
   */
  profileSize?: number;
  /**
   * 채널 이름
   */
  channelName?: string;
  /**
   * 채널 이미지 URL
   */
  channelImg?: string;
  /**
   * 채널이 공식 인증된 채널인지 여부
   */
  channelIsOfficial?: boolean;
  /**
   * 카테고리 이름
   */
  categoryName?: string;
  /**
   * 작성자가 인증된 작성자인지 여부
   */
  certificated?: boolean;
  /**
   * 작성일 타임스탬프 (밀리초 단위)
   */
  createdAt?: number;
  /**
   * 수정일 타임스탬프 (밀리초 단위)
   */
  updatedAt?: number;
  /**
   * 날짜 및 시간의 로케일 설정 (기본값: "ko")
   */
  locale?: string;
  /**
   * 작성자 프로필을 클릭했을 때 호출되는 함수
   * @param {MouseEvent<HTMLElement>} e - 클릭 이벤트 객체
   */
  onWriterProfileClick?: (e: MouseEvent<HTMLElement>) => void;
  /**
   * 채널 정보를 클릭했을 때 호출되는 함수
   * @param {MouseEvent<HTMLElement>} e - 클릭 이벤트 객체
   */
  onChannelClick?: (e: MouseEvent<HTMLElement>) => void;
};

const cx = makeCxFunc(style);

/**
 * `FeedWriterInfo`는 게시물 작성자의 정보와 관련된 프로필 이미지, 이름, 채널 정보, 작성일 및 수정일 등을 표시하는 컴포넌트입니다.
 * 이 컴포넌트는 작성자 및 채널의 프로필 클릭 이벤트를 제공하며, 인증 마크 및 카테고리 표시 등의 기능을 지원합니다.
 *
 * @component
 * @example
 * <FeedWriterInfo
 *   name="John Doe"
 *   profileImg="https://example.com/profile.jpg"
 *   profileSize={50}
 *   channelName="Tech Channel"
 *   channelImg="https://example.com/channel.jpg"
 *   channelIsOfficial={true}
 *   categoryName="Technology"
 *   certificated={true}
 *   createdAt={1609459200000}
 *   updatedAt={1609459300000}
 *   locale="en"
 *   onWriterProfileClick={(e) => console.log('Writer profile clicked', e)}
 *   onChannelClick={(e) => console.log('Channel clicked', e)}
 * />
 *
 * @param {string} [props.className] - 추가로 적용할 CSS 클래스명
 * @param {string} [props.name] - 작성자의 이름
 * @param {string} [props.profileImg] - 작성자의 프로필 이미지 URL
 * @param {number} [props.profileSize=40] - 작성자 프로필 이미지의 크기 (픽셀 단위)
 * @param {string} [props.channelName] - 채널 이름
 * @param {string} [props.channelImg] - 채널 이미지 URL
 * @param {boolean} [props.channelIsOfficial=false] - 채널이 공식 인증된 채널인지 여부
 * @param {string} [props.categoryName] - 카테고리 이름
 * @param {boolean} [props.certificated=false] - 작성자가 인증된 작성자인지 여부
 * @param {number} [props.createdAt] - 작성일 타임스탬프 (밀리초 단위)
 * @param {number} [props.updatedAt] - 수정일 타임스탬프 (밀리초 단위)
 * @param {string} [props.locale="ko"] - 날짜 및 시간의 로케일 설정
 * @param {function} [props.onWriterProfileClick] - 작성자 프로필을 클릭했을 때 호출되는 함수
 * @param {function} [props.onChannelClick] - 채널 정보를 클릭했을 때 호출되는 함수
 */
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
  const [mounted, setMounted] = useState(false);

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

  useEffect(() => {
    setMounted(true);
  }, []);

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
          {!!certificated && <SvgIconCertified width={20} height={20} />}
        </strong>
        <div className={cx('info')}>
          {!!categoryName && <span className={cx('category')}>{categoryName}</span>}
        </div>
        <span className={cx('date')}>
          <ClientOnly fallback={'-'}>
            {getModifyTimeString({ createdAt, updatedAt, locale })}
          </ClientOnly>
        </span>
      </div>
      {!!channelName && (
        <div className={cx('from-info', { 'has-click-event': onChannelClick })}>
          <Person src={channelImg} customSize={24} onClick={handleChannelClick} />
          <div className={cx('channel')} onClick={handleChannelClick}>
            <span className={cx('channel-name')}>{channelName}</span>
            {!!channelIsOfficial && <SvgIconCertified width={12} height={12} />}
          </div>
        </div>
      )}
    </div>
  );
};

export type { Props as FeedWriterInfoProps };
export default FeedWriterInfo;
