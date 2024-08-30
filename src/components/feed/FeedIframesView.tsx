'use client';

import React, {
  useCallback,
  useRef,
  MouseEvent,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  MutableRefObject,
  useMemo,
  HTMLAttributes
} from 'react';
import style from './FeedIframesView.module.scss';
import Carousel from '../carousel/Carousel';
import { SvgIcoDeleteX } from '@/assets/svgs';
import { makeCxFunc } from '@/utils/forReactUtils';
import YouTube, { YouTubeEvent, YouTubePlayer, YouTubeProps } from 'react-youtube';

type Props = {
  className?: string;
  media?: { type?: 'youtube' | 'twitch'; src?: string }[];
  intersectionVideo?: boolean;
  handleDeleteIframe?: ({ deleteIndex }: { deleteIndex: number }) => void;
};

export type IframePlayState =
  | 'NOT_YET'
  | 'ENDED'
  | 'PLAYING'
  | 'AUTO_PAUSED'
  | 'PAUSED'
  | 'BUFFERING'
  | 'CUED';

export type FeedIframesViewRef = HTMLDivElement & {
  playState: IframePlayState;
  playVideo: () => void;
  pauseVideo: () => void;
};

const WP_YOTUBE_IS_MUTE_KEY = 'wp_ui_youtube_is_mute';

const cx = makeCxFunc(style);

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
      if (!youtubeRef.current) {
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

    const io = useMemo(() => {
      if (typeof window === 'undefined' || !intersectionVideo) {
        return;
      }

      if (window.IntersectionObserver) {
        return new IntersectionObserver(
          (entries) => {
            window.clearTimeout(timeoutId.current.playTimeoutId);

            if (youtubeRef.current?.playerInfo) {
              if (entries[0]?.intersectionRatio > 0) {
                youtubeRef.current.addEventListener('onVolumeChange', handleYoutubeVolumeChange);
              } else {
                youtubeRef.current.removeEventListener('onVolumeChange', handleYoutubeVolumeChange);
              }

              if (entries[0]?.intersectionRatio > 0.8 && playStateRef.current !== 'PAUSED') {
                timeoutId.current.playTimeoutId = window.setTimeout(() => {
                  youtubeRef.current.playVideo();
                }, 500);
              } else if (entries[0]?.intersectionRatio <= 0.8) {
                youtubeRef.current.pauseVideo();

                timeoutId.current.pauseTimeoutId = window.setTimeout(() => {
                  playStateRef.current = 'AUTO_PAUSED';
                }, 200);
              }
            }
          },
          {
            threshold: [0, 0.25, 0.5, 0.75, 1.0]
          }
        );
      }
    }, [intersectionVideo, handleYoutubeVolumeChange]);

    useEffect(() => {
      const el = iframePreviewBoxRef.current;

      if (io && ready) {
        io.observe(el);

        return () => {
          io.disconnect();
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
            <div key={`${iframe.src}-${index}`}>
              {!!handleDeleteIframe && (
                <button
                  className={cx('btn-img-delete')}
                  onClick={() => handleDeleteIframe({ deleteIndex: index })}
                >
                  <SvgIcoDeleteX />
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
                        playerVars: {
                          autoplay: 0,
                          rel: 0,
                          controls: 1,
                          modestbranding: 1,
                          loop: 1,
                          enablejsapi: 1,
                          origin: 'https://www.youtube.com'
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
