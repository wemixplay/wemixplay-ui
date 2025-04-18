'use client';

import React, {
  useCallback,
  useRef,
  MouseEvent,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useMemo
} from 'react';
import style from './FeedIframesView.module.scss';
import Carousel from '../carousel/Carousel';
import { SvgIconCancelMono } from '@/assets/svgs';
import { makeCxFunc } from '@/utils/forReactUtils';
import YouTube, { YouTubeEvent, YouTubePlayer, YouTubeProps } from 'react-youtube';

type Props = {
  /**
   * 컴포넌트에 추가할 추가적인 CSS 클래스명
   */
  className?: string;
  /**
   * 미디어 정보 배열. 미디어 유형과 소스 URL을 포함
   */
  media?: { type?: 'youtube' | 'twitch'; src?: string }[];
  /**
   * 미디어가 뷰포트 안에 있을 때 자동 재생/일시정지할지 여부
   */
  intersectionVideo?: boolean;
  /**
   * 미디어 삭제 버튼 클릭 시 호출되는 함수
   * @param {number} [params.deleteIndex] - 삭제할 미디어의 인덱스
   */
  handleDeleteIframe?: ({ deleteIndex }: { deleteIndex: number }) => void;
};

/**
 * Iframe 미디어의 재생 상태를 나타내는 타입 정의
 * - 'NOT_YET': 아직 재생되지 않음
 * - 'ENDED': 재생이 종료됨
 * - 'PLAYING': 재생 중
 * - 'AUTO_PAUSED': 자동 일시정지됨
 * - 'PAUSED': 일시정지됨
 * - 'BUFFERING': 버퍼링 중
 * - 'CUED': 대기 상태
 */
export type IframePlayState =
  | 'NOT_YET'
  | 'ENDED'
  | 'PLAYING'
  | 'AUTO_PAUSED'
  | 'PAUSED'
  | 'BUFFERING'
  | 'CUED';

/**
 * FeedIframesView 컴포넌트에 대한 ref 정의
 * - `playState`: 현재 미디어의 재생 상태
 * - `playVideo`: 비디오를 재생하는 함수
 * - `pauseVideo`: 비디오를 일시정지하는 함수
 */
export type FeedIframesViewRef = HTMLDivElement & {
  playState: IframePlayState;
  playVideo: () => void;
  pauseVideo: () => void;
};

const WP_YOTUBE_IS_MUTE_KEY = 'wp_ui_youtube_is_mute';

const cx = makeCxFunc(style);

/**
 * `FeedIframesView`는 YouTube 또는 Twitch와 같은 미디어를 미리보기 형태로 보여주며, 각 미디어를 삭제하거나 클릭할 수 있는 기능을 제공합니다.
 * 자동 재생, 일시 정지 및 삭제 버튼과 같은 다양한 기능을 지원합니다.
 *
 * @component
 * @example
 * <FeedIframesView
 *   className="custom-iframe-view"
 *   media={[{ type: 'youtube', src: 'https://www.youtube.com/watch?v=example' }]}
 *   handleDeleteIframe={({ deleteIndex }) => console.log('Deleted Iframe Index:', deleteIndex)}
 * />
 *
 * @param {string} [props.className] - 컴포넌트에 추가할 추가적인 CSS 클래스명
 * @param {Object[]} [props.media] - 미디어 정보 배열. 미디어 유형과 소스 URL을 포함
 * @param {'youtube'|'twitch'} [props.media[].type] - 미디어 유형 ('youtube' 또는 'twitch')
 * @param {string} [props.media[].src] - 미디어 소스 URL
 * @param {boolean} [props.intersectionVideo] - 미디어가 뷰포트 안에 있을 때 자동 재생/일시정지할지 여부
 * @param {function} [props.handleDeleteIframe] - 미디어 삭제 버튼 클릭 시 호출되는 함수
 * @param {Object} [props.handleDeleteIframe.params] - 삭제할 미디어 정보
 * @param {number} [props.handleDeleteIframe.params.deleteIndex] - 삭제할 미디어의 인덱스
 */
const FeedIframesView = forwardRef<FeedIframesViewRef, Props>(
  ({ className = '', media = [], intersectionVideo, handleDeleteIframe }, ref) => {
    const youtubeRef = useRef<YouTubePlayer>();
    const iframePreviewBoxRef = useRef<FeedIframesViewRef>();
    const playStateRef = useRef<IframePlayState>('NOT_YET');
    const timeoutId = useRef({
      playTimeoutId: 0,
      pauseTimeoutId: 0
    });

    const [ready, setReady] = useState(false);

    const getYoutubeVideoId = useCallback((src: string) => {
      const [url] = src.split('?');

      return url.split('/').pop();
    }, []);

    const handleYoutubeStateChange = useCallback((event: YouTubeEvent<number>) => {
      if (!youtubeRef.current) {
        return;
      }

      const isMuted = Number(localStorage.getItem(WP_YOTUBE_IS_MUTE_KEY) || 0);

      if (isMuted) {
        youtubeRef.current.mute();
      } else {
        youtubeRef.current.unMute();
      }

      if (event.data === -1) {
        playStateRef.current = 'NOT_YET';
      } else if (event.data === 0) {
        playStateRef.current = 'ENDED';
      } else if (event.data === 1) {
        playStateRef.current = 'PLAYING';
      } else if (event.data === 2) {
        playStateRef.current = 'PAUSED';
      } else if (event.data === 3) {
        playStateRef.current = 'BUFFERING';
      } else if (event.data === 5) {
        playStateRef.current = 'CUED';
      }
    }, []);

    const playVideo = useCallback(() => {
      if (youtubeRef.current) {
        youtubeRef.current.playVideo();
      }
    }, []);

    const pauseVideo = useCallback(() => {
      if (youtubeRef.current) {
        youtubeRef.current.pauseVideo();
      }
    }, []);

    const handleYoutubeVolumeChange = useCallback(() => {
      if (!youtubeRef.current || !youtubeRef.current?.playerInfo) {
        return;
      }

      if (!localStorage.getItem(WP_YOTUBE_IS_MUTE_KEY)) {
        youtubeRef.current.mute();
        localStorage.setItem(WP_YOTUBE_IS_MUTE_KEY, '1');
      } else if (youtubeRef.current.isMuted()) {
        localStorage.setItem(WP_YOTUBE_IS_MUTE_KEY, '1');
      } else {
        localStorage.setItem(WP_YOTUBE_IS_MUTE_KEY, '0');
      }
    }, []);

    /**
     * IntersectionObserver를 생성하여 YouTube 비디오의 자동 재생 및 일시정지를 제어
     * - 뷰포트에서 일정 비율 이상 화면에 나타나면 비디오를 재생하고, 뷰포트를 벗어나면 일시정지
     * - 사용자가 직접 동영상을 일시정지한 경우(`PAUSED` 상태)는 자동으로 다시 재생하지 않음
     */
    const io = useMemo(() => {
      if (typeof window === 'undefined' || !ready || !intersectionVideo) {
        return;
      }

      if (window.IntersectionObserver) {
        return new IntersectionObserver(
          (entries) => {
            window.clearTimeout(timeoutId.current.playTimeoutId);

            // YouTube 플레이어가 준비된 상태에서만 IntersectionObserver 동작
            if (youtubeRef.current && youtubeRef.current?.playerInfo) {
              // 동영상이 뷰포트에 나타나기 시작할 때
              if (entries[0]?.intersectionRatio > 0) {
                // 볼륨 조절 이벤트를 추가 (소리가 꺼진 상태에서 음소거를 유지)
                youtubeRef.current.addEventListener('onVolumeChange', handleYoutubeVolumeChange);
              }

              // 동영상이 80% 이상 화면에 보일 때 자동 재생
              if (entries[0]?.intersectionRatio > 0.8 && playStateRef.current !== 'PAUSED') {
                timeoutId.current.playTimeoutId = window.setTimeout(() => {
                  youtubeRef.current.playVideo();
                }, 500); // 0.5초 후 재생

                // 동영상이 80% 이하로 화면에서 사라질 때 자동 일시정지
              } else if (entries[0]?.intersectionRatio <= 0.8) {
                youtubeRef.current.pauseVideo();

                timeoutId.current.pauseTimeoutId = window.setTimeout(() => {
                  playStateRef.current = 'AUTO_PAUSED'; // 자동 일시정지 상태로 설정
                }, 200);
              }
            }
          },
          {
            threshold: [0, 0.25, 0.5, 0.75, 1.0] // 0%, 25%, 50%, 75%, 100% 비율에 따른 동작 설정
          }
        );
      }
    }, [intersectionVideo, ready, handleYoutubeVolumeChange]);

    useEffect(() => {
      const el = iframePreviewBoxRef.current;

      if (io && ready) {
        io.observe(el);

        return () => {
          io.unobserve(el);
        };
      }
    }, [ready]);

    useImperativeHandle(ref, () => {
      if (!iframePreviewBoxRef.current) {
        return iframePreviewBoxRef.current;
      }

      iframePreviewBoxRef.current.playState = playStateRef.current;
      iframePreviewBoxRef.current.playVideo = playVideo;
      iframePreviewBoxRef.current.pauseVideo = pauseVideo;

      return iframePreviewBoxRef.current;
    });

    return (
      <div className={cx(className, 'feed-iframe-views')}>
        <Carousel
          className={cx('iframe-preview-slider')}
          freeMode
          loop={false}
          slidesPerView={'auto'}
          spaceBetween={10}
        >
          {media.map((iframe, index) => (
            <div key={`${iframe.src}-${index}`} className={cx('preview-iframe-area')}>
              {!!handleDeleteIframe && (
                <button
                  className={cx('btn-img-delete')}
                  onClick={() => handleDeleteIframe({ deleteIndex: index })}
                >
                  <SvgIconCancelMono />
                </button>
              )}
              <div
                ref={iframePreviewBoxRef}
                key={iframe.src}
                data-src={iframe.src}
                className={cx('preview-iframe-box')}
              >
                {/* <span className={cx('swipe-helper', 'before')}></span>
                <span className={cx('swipe-helper', 'after')}></span> */}

                {iframe.type === 'youtube' && (
                  <YouTube
                    videoId={getYoutubeVideoId(iframe.src)}
                    opts={
                      {
                        host: 'https://www.youtube-nocookie.com',
                        playerVars: {
                          autoplay: 0,
                          rel: 0,
                          controls: 1,
                          modestbranding: 1,
                          loop: 1,
                          enablejsapi: 1,
                          origin: 'http://www.youtube-nocookie.com'
                        }
                      } as YouTubeProps['opts']
                    }
                    onReady={(e) => {
                      youtubeRef.current = e.target;
                      setReady(true);
                    }}
                    onStateChange={handleYoutubeStateChange}
                  />
                )}
                {iframe.type === 'twitch' && <iframe src={iframe.src} />}
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    );
  }
);

FeedIframesView.displayName = 'FeedIframesView';

export default FeedIframesView;
