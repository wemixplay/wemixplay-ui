'use client';

import React from 'react';
import style from './FeedImagesView.module.scss';
import Carousel from '../carousel/Carousel';
import { SvgIcoDeleteX } from '@/assets/svgs';
import { makeCxFunc } from '@/utils/forReactUtils';

type Props = {
  className?: string;
  images?: { file?: File; src: string }[];
  handleDeleteImg?: ({ deleteIndex }: { deleteIndex: number }) => void;
  handleClickImage?: ({ src, index }: { src: string; index: number }) => void;
};

const cx = makeCxFunc(style);

const FeedImagesView = ({
  className = '',
  images = [],
  handleDeleteImg,
  handleClickImage
}: Props) => {
  //logic

  return (
    <div className={cx(className, 'images-upload-preview')}>
      <Carousel
        className={cx('image-preview-slider')}
        freeMode
        loop={false}
        slidesPerView={'auto'}
        spaceBetween={10}
      >
        {images.map((image, index) => (
          <div key={`${image.src}-${index}`}>
            {!!handleDeleteImg && (
              <button
                className={cx('btn-img-delete')}
                onClick={() => handleDeleteImg({ deleteIndex: index })}
              >
                <SvgIcoDeleteX />
              </button>
            )}

            <div
              key={image.src}
              className={cx('preview-image-box', { 'has-click-event': handleClickImage })}
              onClick={() => handleClickImage && handleClickImage({ src: image.src, index })}
            >
              <img src={image.src} alt={image.src} />
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export type { Props as FeedImagesViewProps };
export default FeedImagesView;
