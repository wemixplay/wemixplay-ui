'use client';

import React, { MouseEvent, useCallback, useEffect, useRef, useState } from 'react';
import style from './FeedImagesView.module.scss';
import Carousel from '../carousel/Carousel';
import { SvgIcoDeleteX, SvgIcoSenstive, SvgNoimagePlaceholder } from '@/assets/svgs';
import { makeCxFunc } from '@/utils/forReactUtils';
import Spinner from '../loadings/Spinner';

type Props = {
  /**
   * 컴포넌트에 추가할 추가적인 CSS 클래스명
   */
  className?: string;
  /**
   * 이미지 정보 배열. 이미지 파일, 로딩 상태, 소스 URL 및 오류 상태를 포함
   */
  images?: {
    /**
     * 업로드한 이미지 파일
     */
    file?: File;
    /**
     * 이미지 로딩 상태 여부
     */
    loading?: boolean;
    /**
     * 이미지 소스 URL
     */
    src: string;
    /**
     * 이미지 로드 중 에러 발생 여부
     */
    isError?: boolean;
    /**
     * 부적절한 콘텐츠 경고 메시지
     */
    inappositeMsg?: string;
  }[];
  /**
   * 이미지 삭제 버튼 클릭 시 호출되는 함수
   * @param {number} [params.deleteIndex] - 삭제할 이미지의 인덱스
   */
  handleDeleteImg?: ({ deleteIndex }: { deleteIndex: number }) => void;
  /**
   * 이미지 클릭 시 호출되는 함수
   * @param {string} [params.src] - 클릭한 이미지의 소스 URL
   * @param {number} [params.index] - 클릭한 이미지의 인덱스
   */
  onImageClick?: ({ src, index }: { src: string; index: number }) => void;
};

const cx = makeCxFunc(style);

/**
 * `FeedImagesView`는 여러 이미지를 슬라이드 방식으로 미리보기 형태로 보여주며, 각 이미지를 삭제하거나 클릭할 수 있는 기능을 제공합니다.
 * 이미지 로딩, 에러 처리, 부적절한 콘텐츠 표시 등의 다양한 기능을 지원합니다.
 *
 * @component
 * @example
 * <FeedImagesView
 *   className="custom-feed-image-view"
 *   images={[{ src: 'image_url', loading: false, isError: false, inappositeMsg: 'Content Warning' }]}
 *   handleDeleteImg={({ deleteIndex }) => console.log('Deleted Image Index:', deleteIndex)}
 *   onImageClick={({ src, index }) => console.log('Clicked Image:', src, index)}
 * />
 *
 * @param {string} [props.className] - 컴포넌트에 추가할 추가적인 CSS 클래스명
 * @param {Object[]} [props.images] - 이미지 정보 배열. 이미지 파일, 로딩 상태, 소스 URL 및 오류 상태를 포함
 * @param {File} [props.images.file] - 업로드한 이미지 파일
 * @param {boolean} [props.images.loading] - 이미지 로딩 상태 여부
 * @param {string} [props.images.src] - 이미지 소스 URL
 * @param {boolean} [props.images.isError] - 이미지 로드 중 에러 발생 여부
 * @param {string} [props.images.inappositeMsg] - 부적절한 콘텐츠 경고 메시지
 * @param {function} [props.handleDeleteImg] - 이미지 삭제 버튼 클릭 시 호출되는 함수
 * @param {function} [props.onImageClick] - 이미지 클릭 시 호출되는 함수
 */
const FeedImagesView = ({ className = '', images = [], handleDeleteImg, onImageClick }: Props) => {
  const curentImagesRef = useRef(images);

  const [errorStatus, setErrorStatus] = useState<Record<string, boolean>>({});

  /**
   * 이미지 클릭 시 호출되는 함수
   * @param {string} [params.src] - 이미지의 소스 URL
   * @param {number} [params.index] - 클릭된 이미지의 인덱스
   * @param {MouseEvent<HTMLDivElement>} [params.e] - 클릭 이벤트
   */
  const handleImageClick = useCallback(
    ({ src, index, e }: { src: string; index: number; e: MouseEvent<HTMLDivElement> }) => {
      e.stopPropagation();

      onImageClick && onImageClick({ src, index });
    },
    [onImageClick]
  );

  /**
   * 이미지 로드 중 에러가 발생했을 때 호출되는 함수
   * @param {React.SyntheticEvent<HTMLImageElement>} e - 이미지 에러 이벤트
   */
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
        navigation={!handleDeleteImg && images.length > 1}
        loop={false}
        slidesPerView={handleDeleteImg ? 'auto' : 1}
        spaceBetween={handleDeleteImg ? 4 : 0}
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
