'use client';

import React, { MouseEvent, useCallback, useEffect, useRef, useState } from 'react';
import style from './FeedImagesView.module.scss';
import Carousel from '../carousel/Carousel';
import { SvgIcoDeleteX, SvgIcoSenstive, SvgNoimagePlaceholder } from '@/assets/svgs';
import { makeCxFunc } from '@/utils/forReactUtils';
import Spinner from '../loadings/Spinner';
import Swiper from 'swiper';

type Props = {
  className?: string;
  images?: {
    file?: File;
    loading?: boolean;
    src: string;
    isError?: boolean;
    inappositeMsg?: string;
  }[];
  handleDeleteImg?: ({ deleteIndex }: { deleteIndex: number }) => void;
  onImageClick?: ({ src, index }: { src: string; index: number }) => void;
};

const cx = makeCxFunc(style);

const FeedImagesView = ({ className = '', images = [], handleDeleteImg, onImageClick }: Props) => {
  const curentImagesRef = useRef(images);

  const [errorStatus, setErrorStatus] = useState<Record<string, boolean>>({});

  const handleImageClick = useCallback(
    ({ src, index, e }: { src: string; index: number; e: MouseEvent<HTMLDivElement> }) => {
      e.stopPropagation();

      onImageClick && onImageClick({ src, index });
    },
    [onImageClick]
  );

  const handleOnImageError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const imgEl = e.target as HTMLImageElement;
    const { src } = imgEl;

    setErrorStatus((errorStatus) => ({ ...errorStatus, [src]: true }));
  }, []);

  useEffect(() => {
    setErrorStatus((errorStatus) => {
      return images.reduce((acc, cur) => {
        acc[cur.src] = errorStatus[cur.src];
        return acc;
      }, {});
    });
  }, [images]);

  return (
    <div
      className={cx(className, 'images-upload-preview', { 'is-preview': !!handleDeleteImg })}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Carousel
        className={cx('image-preview-slider')}
        freeMode={handleDeleteImg ? true : false}
        pagination={!handleDeleteImg && images.length > 1}
        loop={false}
        slidesPerView={handleDeleteImg ? 'auto' : 1}
        spaceBetween={handleDeleteImg ? 10 : 0}
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
              className={cx('preview-image-box', {
                'has-click-event': onImageClick,
                error: errorStatus[image.src]
              })}
              onClick={(e) => handleImageClick({ src: image.src, index, e })}
            >
              {!!image.loading && (
                <div className={cx('loading')}>
                  <Spinner />
                </div>
              )}

              {!!image.inappositeMsg && (
                <div className={cx('senstive-content-layer')}>
                  <div className={cx('senstive-content')}>
                    <SvgIcoSenstive />
                    <p>{image.inappositeMsg}</p>
                  </div>
                </div>
              )}

              <img src={image.src} alt={image.src} onError={handleOnImageError} />

              {!!errorStatus[image.src] && (
                <div className={cx('no-image')}>
                  <SvgNoimagePlaceholder />
                  <span>No Image</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export type { Props as FeedImagesViewProps };
export default FeedImagesView;
