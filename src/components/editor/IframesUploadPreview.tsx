'use client';

import React from 'react';
import classNames from 'classnames/bind';
import style from './IframesUploadPreview.module.scss';
import Carousel from '../carousel/Carousel';
import { SvgIcoDeleteX } from '@/assets/svgs';

type Props = {
  iframes?: { type?: 'youtube' | 'twitch'; src: string }[];
  handleDeleteIframe?: ({ deleteIndex }: { deleteIndex: number }) => void;
};

const cx = classNames.bind(style);

const IframesUploadPreview = ({ iframes = [], handleDeleteIframe }: Props) => {
  //logic

  return (
    <div className={cx('iframe-upload-preview')}>
      <Carousel
        className={cx('iframe-preview-slider')}
        freeMode
        loop={false}
        slidesPerView={'auto'}
        spaceBetween={10}
      >
        {iframes.map((iframe, index) => (
          <>
            <button
              className={cx('btn-img-delete')}
              onClick={() => handleDeleteIframe({ deleteIndex: index })}
            >
              <SvgIcoDeleteX />
            </button>
            <div key={iframe.src} className={cx('preview-iframe-box')}>
              <iframe src={iframe.src} />
            </div>
          </>
        ))}
      </Carousel>
    </div>
  );
};

export default IframesUploadPreview;
