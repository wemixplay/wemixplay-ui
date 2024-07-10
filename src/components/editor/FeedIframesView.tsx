'use client';

import React from 'react';
import style from './FeedIframesView.module.scss';
import Carousel from '../carousel/Carousel';
import { SvgIcoDeleteX } from '@/assets/svgs';
import { makeCxFunc } from '@/utils/forReactUtils';

type Props = {
  className?: string;
  iframes?: { type?: 'youtube' | 'twitch'; src: string }[];
  handleDeleteIframe?: ({ deleteIndex }: { deleteIndex: number }) => void;
};

const cx = makeCxFunc(style);

const FeedIframesView = ({ className = '', iframes = [], handleDeleteIframe }: Props) => {
  //logic

  return (
    <div className={cx(className, 'feed-iframe-views')}>
      <Carousel
        className={cx('iframe-preview-slider')}
        freeMode
        loop={false}
        slidesPerView={'auto'}
        spaceBetween={10}
      >
        {iframes.map((iframe, index) => (
          <div key={`${iframe.src}-${index}`}>
            {!!handleDeleteIframe && (
              <button
                className={cx('btn-img-delete')}
                onClick={() => handleDeleteIframe({ deleteIndex: index })}
              >
                <SvgIcoDeleteX />
              </button>
            )}
            <div key={iframe.src} className={cx('preview-iframe-box')}>
              <iframe src={iframe.src} />
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default FeedIframesView;
