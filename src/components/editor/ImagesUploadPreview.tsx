'use client';

import React from 'react';
import classNames from 'classnames/bind';
import style from './ImagesUploadPreview.module.scss';
import Carousel from '../carousel/Carousel';

type Props = {
  images?: { file?: File; src: string }[];
  handleDeleteImg?: ({ deleteIndex }: { deleteIndex: number }) => void;
};

const cx = classNames.bind(style);

const ImagesUploadPreview = ({ images = [], handleDeleteImg }: Props) => {
  //logic

  return (
    <div className={cx('images-upload-preview')}>
      <Carousel
        className={cx('image-preview-slider')}
        freeMode
        loop={false}
        slidesPerView={'auto'}
        spaceBetween={10}
      >
        {images.map((image, index) => (
          <>
            <button
              className={cx('btn-img-delete')}
              onClick={() => handleDeleteImg({ deleteIndex: index })}
            >
              delete
            </button>
            <div key={image.src} className={cx('preview-image-box')}>
              <img src={image.src} alt={image.src} />
            </div>
          </>
        ))}
      </Carousel>
    </div>
  );
};

export default ImagesUploadPreview;
