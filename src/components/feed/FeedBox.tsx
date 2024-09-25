'use client';

import React, {
  forwardRef,
  MouseEvent,
  ReactElement,
  useCallback,
  useId,
  useImperativeHandle,
  useRef
} from 'react';
import style from './FeedBox.module.scss';
import FeedImagesView, { FeedImagesViewProps } from './FeedImagesView';
import PopoverButton from '../popover/PopoverButton';
import { SvgIcoHDots } from '@/assets/svgs';
import FeedEmojiArea, { EmojiInfo } from './FeedEmojiArea';
import FeedEtcInfoArea from './FeedEtcInfoArea';
import FeedWriterInfo from './FeedWriterInfo';
import FeedTextContent from './FeedTextContent';
import FeedLinkPreview, { FeedLinkPreviewProps } from './FeedLinkPreview';
import FeedIframesView, { FeedIframesViewRef } from './FeedIframesView';
import { makeCxFunc } from '@/utils/forReactUtils';

type FeedBoxRef = HTMLElement & {
  iframeRef: FeedIframesViewRef;
};

const cx = makeCxFunc(style);
/**
 * FeedBox 컴포넌트는 피드 콘텐츠(작성자 정보, 텍스트, 이미지, 비디오, 링크 미리보기, 이모지, 좋아요 및 댓글 등)를 렌더링합니다.
 * 관리 메뉴, 이모지 선택, 댓글, 좋아요와 같은 다양한 상호작용 기능도 제공됩니다.
 *
 * @component
 * @example
 * <FeedBox
 *   writerName="John Doe"
 *   writerImg="/path/to/profile.jpg"
 *   textContent="This is a sample feed"
 *   images={['/path/to/image1.jpg', '/path/to/image2.jpg']}
 *   commentCount={10}
 *   likeCount={100}
 *   onLikeBtnClick={(e) => console.log('Liked!')}
 * />
 * @param {Props} props - FeedBox 컴포넌트에 전달되는 props
 * @param {FeedBoxRef} ref - 컴포넌트 외부에서 iframeRef를 제어할 수 있도록 제공되는 ref 객체
 */
const FeedBox = forwardRef<FeedBoxRef, Props>(
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
      images = [],
      media = [],
      ogMetaData,
      managePopoverElement = <></>,
      emojiSelectPopoverElement = <></>,
      emojiList = [],
      commentCount = 0,
      likeCount = 0,
      isMyLike,
      avatarSize = 32,
      intersectionVideo,
      createdAt,
      updatedAt,
      locale = 'en',
      textEllipsis = true,
      onClick,
      onMentionClick,
      onHashTagClick,
      onManageBtnClick,
      onEmojiSelectBtnClick,
      onEmojiClick,
      onShareBtnClick,
      onImageClick,
      onLikeBtnClick,
      onCommentBtnClick,
      onWriterProfileClick,
      onChannelClick
    },
    ref
  ) => {
    const uid = useId();

    const elRef = useRef<FeedBoxRef>();
    const iframeRef = useRef<FeedIframesViewRef>();

    const handleManageBtnClick = useCallback(
      (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();

        onManageBtnClick && onManageBtnClick(e);
      },
      [onManageBtnClick]
    );

    useImperativeHandle(ref, () => {
      elRef.current.iframeRef = iframeRef.current;

      return elRef.current;
    });

    return (
      <article
        ref={elRef}
        className={cx(className, 'feed-box', { 'has-click-event': onClick })}
        onClick={onClick}
      >
        <div className={cx('feed-box-container')}>
          <div className={cx('feed-header')}>
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

            {/* Feed Management Button (삭제, 수정, 신고...) */}
            {!!managePopoverElement || !!onManageBtnClick ? (
              <div className={cx('btn-manage')}>
                <PopoverButton
                  anchorId={onManageBtnClick ? '' : `feed-manage-${uid.replace(/:/gi, '')}`}
                  id={`feed-manage-${uid.replace(/:/gi, '')}`}
                  popoverStyle={{ right: -10, top: 10, zIndex: 999 }}
                  popoverElement={managePopoverElement}
                  popoverAnimation={{ name: 'modal-pop-fade', duration: 300 }}
                  whenWindowScrollClose={true}
                  onClick={handleManageBtnClick}
                >
                  <SvgIcoHDots width={32} height={32} />
                </PopoverButton>
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className={cx('feed-body')}>
            <FeedTextContent
              className={cx('text-content')}
              content={textContent}
              ellipsis={textEllipsis}
              onTextClick={onClick}
              onMentionClick={onMentionClick}
              onHashTagClick={onHashTagClick}
            />

            {images.length > 0 && (
              <FeedImagesView
                className={cx('carousel')}
                images={images.map((img) =>
                  typeof img === 'string'
                    ? { src: img }
                    : { src: img.src, inappositeMsg: img.inappositeMsg }
                )}
                onImageClick={onImageClick}
              />
            )}
            {media.length > 0 && (
              <FeedIframesView
                ref={iframeRef}
                className={cx('carousel')}
                media={media}
                intersectionVideo={intersectionVideo}
              />
            )}
            {!!ogMetaData && <FeedLinkPreview ogMetaData={ogMetaData} />}
          </div>

          <div className={cx('feed-footer')}>
            <div className={cx('feed-footer-container')}>
              <FeedEmojiArea
                className={cx('feed-reactions')}
                emojiList={emojiList}
                emojiSelectPopoverElement={emojiSelectPopoverElement}
                onEmojiClick={onEmojiClick}
                onEmojiSelectBtnClick={onEmojiSelectBtnClick}
              />
              <FeedEtcInfoArea
                className={cx('feed-comments')}
                commentCount={commentCount}
                likeCount={likeCount}
                isMyClick={isMyLike}
                onLikeBtnClick={onLikeBtnClick}
                onShareBtnClick={onShareBtnClick}
                onCommentBtnClick={onCommentBtnClick}
              />
            </div>
          </div>
        </div>
      </article>
    );
  }
);

FeedBox.displayName = 'FeedBox';

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

export type { Props as FeedBoxProps, FeedBoxRef };
export default FeedBox;
