'use client';

import React, { forwardRef, MouseEvent, ReactElement, useRef } from 'react';
import style from './CurationBox.module.scss';
import FeedImagesView, { FeedImagesViewProps } from './FeedImagesView';
import { EmojiInfo } from './FeedEmojiArea';
import FeedWriterInfo from './FeedWriterInfo';
import FeedTextContent from './FeedTextContent';
import { FeedLinkPreviewProps } from './FeedLinkPreview';
import { makeCxFunc } from '@/utils/forReactUtils';
import Carousel from '../carousel/Carousel';
import WpImage from '../image/WpImage';
import { isDesktop, isMobile } from 'react-device-detect';

type CurationBoxRef = HTMLElement;
const cx = makeCxFunc(style);
const CurationBox = forwardRef<CurationBoxRef, Props>(
  (
    {
      className = '',
      writerName,
      writerImg,
      channelName,
      channelImg,
      channelIsOfficial,
      categoryName,
      certificated,
      textContent,
      avatarSize = 32,
      createdAt,
      updatedAt,
      locale = 'en',
      textEllipsis = true,
      onClick,
      onMentionClick,
      onHashTagClick,
      onWriterProfileClick,
      onChannelClick
    },
    ref
  ) => {
    const elRef = useRef<CurationBoxRef>();
    const curationListDummy = ['111', '222', '333', '444', '555'];
    return (
      <article
        ref={elRef}
        className={cx(className, 'curation-box', { 'has-click-event': onClick })}
        onClick={onClick}
      >
        <div className={cx('curation-box-container')}>
          {/* 큐레이션 타이틀영역 (today's hot pick feeds) */}
          <div className={cx('curation-header')}>
            <h4 className={cx('title')}>Today’s Hot Pick Feeds</h4>
            {/* 
              NOTICE : badge-notice
              EVENT : badge-event
            */}
            <span className={cx('badge', 'badge-event')}>NOTICE</span>
          </div>
          <div className={cx('curation-body')}>
            <Carousel
              // slider 아이템이 1개인 경우 single 클래스 추가
              className={cx('curation-box-slider', curationListDummy.length === 1 && 'single')}
              navigation
              loop={false}
              // slider 아이템이 1개인 경우 1, 이상인 경우 'auto'
              slidesPerView={curationListDummy.length === 1 ? 1 : 'auto'}
              spaceBetween={isMobile ? 4 : 8}
            >
              {curationListDummy.map((item, index) => (
                <div className={cx('curation-box-item')} key={index}>
                  <div className={cx('curation-box-item-content')}>
                    <FeedTextContent
                      className={cx('text-content')}
                      content={
                        'WEMIX PLAY Onboarding Game Service Announcement \n\nThe services for Crypto Ball Z, GATOR_Zeroverse and ANIPANG MATCH/COINS/BLAST on WEMIX PLAY are scheduled to conclude due to the development team’s circumstances. \nPlease refer to the information below for more details. '
                      }
                      ellipsis={false}
                      onTextClick={onClick}
                      onMentionClick={onMentionClick}
                      onHashTagClick={onHashTagClick}
                    />
                  </div>
                  <div className={cx('curation-writer-info')}>
                    <FeedWriterInfo
                      className={cx('profile')}
                      name={writerName}
                      profileImg={writerImg}
                      profileSize={avatarSize}
                      channelName={channelName}
                      channelImg={channelImg}
                      channelIsOfficial={channelIsOfficial}
                      categoryName={categoryName}
                      certificated={certificated}
                      createdAt={createdAt}
                      updatedAt={updatedAt}
                      locale={locale}
                      onWriterProfileClick={onWriterProfileClick}
                      onChannelClick={onChannelClick}
                    />
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </article>
    );
  }
);

CurationBox.displayName = 'CurationBox';

type Props = {
  /** 추가적인 CSS 클래스명 */
  className?: string;
  /** 프로필 이미지의 크기 */
  avatarSize?: number;
  /** 작성자의 이름 */
  writerName?: string;
  /** 작성자의 프로필 이미지 URL */
  writerImg?: string;
  /** 채널 이름 */
  channelName?: string;
  /** 채널 이미지 URL */
  channelImg?: string;
  /** 채널이 공식인지 여부 */
  channelIsOfficial?: boolean;
  /** 피드 본문 텍스트 */
  textContent?: string;
  /** 카테고리 이름 */
  categoryName?: string;
  /** 작성자가 인증된 사용자 여부 */
  certificated?: boolean;
  /** 텍스트에 줄임말(ellipsis) 표시 여부 */
  textEllipsis?: boolean;
  /** 작성 시간 */
  createdAt?: number;
  /** 수정 시간 */
  updatedAt?: number;
  /** 시간 및 날짜 포맷에 사용되는 로케일 */
  locale?: string;
  /**
   * 피드 클릭 시 호출되는 함수
   * @param e MouseEvent<HTMLSpanElement>
   */
  onClick?: (e: MouseEvent<HTMLSpanElement>) => void;
  /**
   * 멘션 클릭 시 호출되는 함수
   * @param params 멘션 정보 (이름, ID 포함)
   */
  onMentionClick?: (params: { name: string; id: string }) => void;
  /**
   * 해시태그 클릭 시 호출되는 함수
   * @param params 해시태그 정보 (이름, ID 포함)
   */
  onHashTagClick?: (params: { name: string; id: string }) => void;
  /**
   * 작성자 프로필 클릭 시 호출되는 함수
   * @param e MouseEvent<HTMLElement>
   */
  onWriterProfileClick?: (e: MouseEvent<HTMLElement>) => void;
  /**
   * 채널 클릭 시 호출되는 함수
   * @param e MouseEvent<HTMLElement>
   */
  onChannelClick?: (e: MouseEvent<HTMLElement>) => void;
};

export type { Props as CurationBoxProps, CurationBoxRef };
export default CurationBox;
