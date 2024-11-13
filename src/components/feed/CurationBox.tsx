'use client';

import React, { forwardRef, MouseEvent, ReactElement, useRef } from 'react';
import style from './FeedBox.module.scss';
import { FeedImagesViewProps } from './FeedImagesView';
import { EmojiInfo } from './FeedEmojiArea';
import FeedWriterInfo from './FeedWriterInfo';
import FeedTextContent from './FeedTextContent';
import { FeedLinkPreviewProps } from './FeedLinkPreview';
import { makeCxFunc } from '@/utils/forReactUtils';

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

    return (
      <article
        ref={elRef}
        className={cx(className, 'curation-box', { 'has-click-event': onClick })}
        onClick={onClick}
      >
        <div className={cx('curation-box-container')}>
          <div className={cx('curation-body')}>
            <FeedTextContent
              className={cx('text-content')}
              content={textContent}
              ellipsis={textEllipsis}
              onTextClick={onClick}
              onMentionClick={onMentionClick}
              onHashTagClick={onHashTagClick}
            />
          </div>
          <div className={cx('curation-header')}>
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
      </article>
    );
  }
);

CurationBox.displayName = 'CurationBoxBox';

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
  /**
   * 이미지 배열로, 각각의 이미지 경로 또는 추가적인 정보(부적합 메시지 포함)를 포함
   * @example
   * images: [
   *   'image1.jpg',
   *   { src: 'image2.jpg', inappositeMsg: '이미지 부적합 메시지' }
   * ]
   */
  images?: (string | { src: string; inappositeMsg?: string })[];
  /**
   * 포함된 미디어 배열 (유튜브, 트위치 등)
   * @example
   * media: [{ type: 'youtube', src: 'https://youtube.com' }]
   */
  media?: { type?: 'youtube' | 'twitch'; src?: string }[];
  /** 피드 본문 텍스트 */
  textContent?: string;
  /**
   * 링크 미리보기 메타데이터, 링크 미리보기 섹션에 사용
   * @example
   * ogMetaData: { title: 'Title', description: 'Description', image: 'image.jpg', url: 'https://example.com' }
   */
  ogMetaData?: FeedLinkPreviewProps['ogMetaData'] | null;
  /** 관리 팝오버 요소 (삭제, 수정, 신고 등) */
  managePopoverElement?: null | ReactElement;
  /** 이모지 선택 팝오버 요소 */
  emojiSelectPopoverElement?: null | ReactElement;
  /** 카테고리 이름 */
  categoryName?: string;
  /** 작성자가 인증된 사용자 여부 */
  certificated?: boolean;
  /**
   * 이모지 목록. 각각의 이모지에 대한 정보 포함 (클릭 횟수, 이미지 URL 등)
   * @example
   * emojiList: [{ emojiNo: 1, imageNo: 2, imageUrl: 'emoji.jpg', clickCount: 5, isMyClick: true }]
   */
  emojiList?: EmojiInfo[];
  /** 댓글 수 */
  commentCount?: number;
  /** 좋아요 수 */
  likeCount?: number;
  /** 사용자가 좋아요를 눌렀는지 여부 */
  isMyLike?: boolean;
  /** 텍스트에 줄임말(ellipsis) 표시 여부 */
  textEllipsis?: boolean;
  /** 비디오가 IntersectionObserver를 통해 자동 재생 및 정지되는지 여부 */
  intersectionVideo?: boolean;
  /** 작성 시간 */
  createdAt?: number;
  /** 수정 시간 */
  updatedAt?: number;
  /** 시간 및 날짜 포맷에 사용되는 로케일 */
  locale?: string;
  /** Emoji , like , comment Footer 숨김 처리 default false */
  hideFooter?: boolean;
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
   * 관리 버튼 클릭 시 호출되는 함수 (수정, 삭제 등의 관리 작업)
   * @param e MouseEvent<HTMLButtonElement>
   */
  onManageBtnClick?: null | ((e: MouseEvent<HTMLButtonElement>) => void);
  /**
   * 이모지 선택 버튼 클릭 시 호출되는 함수
   * @param e MouseEvent<HTMLButtonElement>
   */
  onEmojiSelectBtnClick?: null | ((e: MouseEvent<HTMLButtonElement>) => void);
  /**
   * 이모지 클릭 시 호출되는 함수
   * @param params 클릭된 이모지 정보 (이모지 번호, 클릭 횟수 등)
   */
  onEmojiClick?: (params: EmojiInfo) => void;
  /**
   * 공유 버튼 클릭 시 호출되는 함수
   * @param e MouseEvent<HTMLButtonElement>
   */
  onShareBtnClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  /**
   * 이미지 클릭 시 호출되는 함수
   * @param params 이미지 소스 및 인덱스 정보
   */
  onImageClick?: FeedImagesViewProps['onImageClick'];
  /**
   * 좋아요 버튼 클릭 시 호출되는 함수
   * @param e MouseEvent<HTMLButtonElement>
   */
  onLikeBtnClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  /**
   * 댓글 버튼 클릭 시 호출되는 함수
   * @param e MouseEvent<HTMLButtonElement>
   */
  onCommentBtnClick?: (e: MouseEvent<HTMLButtonElement>) => void;
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

export type { Props as FeedBoxProps, CurationBoxRef };
export default CurationBox;
