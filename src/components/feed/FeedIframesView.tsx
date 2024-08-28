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

export type IframePlayState = 'NOT_YET' | 'ENDED' | 'PLAYING' | 'PAUSED' | 'BUFFERING' | 'CUED';

export type FeedIframesViewRef = HTMLDivElement & {
  playState: IframePlayState;
  playVideo: () => void;
  pauseVideo: () => void;
};

const cx = makeCxFunc(style);

const FeedIframesView = forwardRef<FeedIframesViewRef, Props>(
  ({ className = '', media = [], intersectionVideo, handleDeleteIframe }, ref) => {
    const youtubeRef = useRef<YouTubePlayer>();
    const iframePreviewBoxRef = useRef<FeedIframesViewRef>();

    const [playState, setPlayState] = useState<IframePlayState>('NOT_YET');
    const [ready, setReady] = useState(false);

    const io = useMemo(() => {
      if (typeof window === 'undefined' || !intersectionVideo) {
        return;
      }

      if (window.IntersectionObserver) {
        return new IntersectionObserver(
          (entries) => {
            if (entries[0]?.intersectionRatio > 0.8) {
              youtubeRef.current.playVideo();
            } else {
              youtubeRef.current.pauseVideo();
            }
          },
          {
            threshold: [0, 0.25, 0.5, 0.75, 1.0]
          }
        );
      }
    }, [intersectionVideo]);

    const getYoutubeVideoId = useCallback((src: string) => {
      const [url] = src.split('?');

      return url.split('/').pop();
    }, []);

    const handleYoutubePlayStateChange = useCallback((event: YouTubeEvent<number>) => {
      if (event.data === -1) {
        setPlayState('NOT_YET');
      } else if (event.data === 0) {
        setPlayState('ENDED');
      } else if (event.data === 1) {
        setPlayState('PLAYING');
      } else if (event.data === 2) {
        setPlayState('PAUSED');
      } else if (event.data === 3) {
        setPlayState('BUFFERING');
      } else if (event.data === 5) {
        setPlayState('CUED');
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
      iframePreviewBoxRef.current.playState = playState;
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
                className={cx('preview-iframe-box', playState)}
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
                    onStateChange={handleYoutubePlayStateChange}
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
