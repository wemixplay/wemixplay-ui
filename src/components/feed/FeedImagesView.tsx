'use client';

import React, { MouseEvent, useCallback, useEffect, useRef } from 'react';
import style from './FeedImagesView.module.scss';
import Carousel from '../carousel/Carousel';
import { SvgIcoDeleteX } from '@/assets/svgs';
import { makeCxFunc } from '@/utils/forReactUtils';
import Spinner from '../loadings/Spinner';

type Props = {
  className?: string;
  images?: { file?: File; loading?: boolean; src: string }[];
  handleDeleteImg?: ({ deleteIndex }: { deleteIndex: number }) => void;
  onImageClick?: ({ src, index }: { src: string; index: number }) => void;
};

const cx = makeCxFunc(style);

const FeedImagesView = ({ className = '', images = [], handleDeleteImg, onImageClick }: Props) => {
  const curentImagesRef = useRef(images);

  const handleImageClick = useCallback(
    ({ src, index, e }: { src: string; index: number; e: MouseEvent<HTMLDivElement> }) => {
      e.stopPropagation();

      onImageClick && onImageClick({ src, index });
    },
    [onImageClick]
  );

  return (
    <div className={cx(className, 'images-upload-preview')}>
      <Carousel
        className={cx('image-preview-slider')}
        freeMode
        loop={false}
        slidesPerView={'auto'}
        spaceBetween={10}
        onSlidesLengthChange={(swiper) => {
          if (curentImagesRef.current.length < images.length) {
            setTimeout(() => {
              swiper.slideTo(images.length - 1, 200);
            }, 200);
          }

          curentImagesRef.current = images;
        }}
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
              className={cx('preview-image-box', { 'has-click-event': onImageClick })}
              onClick={(e) => handleImageClick({ src: image.src, index, e })}
            >
              {!!image.loading && (
                <div className={cx('loading')}>
                  <Spinner />
                </div>
              )}
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
