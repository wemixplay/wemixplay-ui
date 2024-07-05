'use client';

import {
  CSSProperties,
  memo,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} from 'react';

import imageIntersectionObserver from './ImageIntersectionObserver';

import style from './WpImage.module.scss';
import { makeCxFunc } from '@/utils/forReactUtils';

const cx = makeCxFunc(style);

/**
 * 이미지의 로딩 여부에 대한 상태의 유니언 타입
 */
type LoadStatus = 'waiting' | 'loaded' | 'error-loaded' | 'error';

interface BaseProps {
  className?: string;
  src: string;
  /** src의 경로로 이미지를 요청했을 때, 에러가 난다면 에러사진을 요청할 경로 */
  errorSrc?: string;
  alt?: string;
  /** 이미지 지연로딩을 할 것인지 여부 */
  isLazy?: boolean;
  /** 지연로딩 시 이미지를 불러와 보여줄 때, blur 상태를 잠깐 보여줄 것인지에 대한 여부 */
  blur?: boolean;
  /** 이미지 로드 후 이미지가 화면에 보여지는 transition의 지속 시간 */
  transitionDuration?: number;
  /** 이미지 로드 후 이미지가 화면에 보여지는 transition 시작 딜레이 */
  transitionDelay?: number;
  /** src prop으로 호출한 이미지가 불러져 왔을 때 실행할 수 있는 함수  */
  onImageLoad?: () => void;
}

interface WidthAndHeight {
  /**
   * 이미지의 너비 값
   */
  width: CSSProperties['width'];
  /**
   * 이미지의 높이 값
   */
  height: CSSProperties['height'];
}

interface BackgroundTrue extends BaseProps, Required<WidthAndHeight> {
  /** 이미지를 span 요소의 background 속성으로 표현할 것인지 또는 이미지 요소로 표현할 것인지에 대한 여부 */
  isBackground: true;
}
interface BackgroundFalse extends BaseProps, Partial<WidthAndHeight> {
  isBackground?: false;
}

type Props = BackgroundTrue | BackgroundFalse;

/**
 * `WpImage` 넥스트의 Image 컴포넌트 외에 이미지 지연로딩을 수행할 수 있는 이미지 컴포넌트입니다.
 *
 * @param {string} [props.className] - 레이지이미지 컴포넌트의 스타일을 위한 클래스 이름
 * @param {string} [props.src] - 이미지를 요청할 경로
 * @param {string} [props.errorSrc] - 이미지 요청 시 에러가 난다면, 에러 이미지를 요청할 경로
 * @param {string} [props.alt] - 이미지 요소에 대한 alt 값
 * @param {boolean} [props.isBackground] - 이미지를 image 요소가 아니라 div 요소의 background 스타일로 요청할 것인지에 대한 여부
 * @param {boolean} [props.isLazy] - 이미지의 지연로딩을 실행할 것인지에 대한 여부
 * @param {boolean} [props.blur] - 이미지 지연로딩 시 blur 효과로 초기 이미지를 표현할 것인지에 대한 여부
 * @param {string} [props.width] - 이미지의 길이 픽셀값
 * @param {string} [props.height] - 이미지의 높이 픽셀값
 * @param {string} [props.transitionDuration] - 이미지 지연로딩 시 이미지 호출 이후 load 효과가 실행될 시간
 * @param {string} [props.transitionDelay] - 이미지 지연로딩 시 이미지 호출 이후 load 효과가 실행되기 전 기다릴 시간
 * @param {function} [props.onImageLoad] - src prop으로 호출한 이미지가 불러져 왔을 때 실행할 수 있는 함수
 */

const WpImage = ({
  className = '',
  src = '',
  errorSrc = '',
  alt = '',
  isBackground = false,
  isLazy = true,
  blur = false,
  width,
  height,
  transitionDuration,
  transitionDelay,
  onImageLoad
}: Props) => {
  const imgElemRef = useRef<HTMLImageElement>(null);

  const divElemRef = useRef<HTMLDivElement>(null);

  /**
   * 이미지 로딩과정에 대한 상태 (waiting, loaded, error)
   */
  const [loadStatus, setLoadStatus] = useState<LoadStatus>(isLazy ? 'waiting' : 'loaded');

  const updateLoadingStatus = useCallback((status: LoadStatus) => setLoadStatus(status), []);

  const setImageSrc = useCallback(
    (image: HTMLImageElement, src: string) => {
      image.src = src;

      if (isBackground) {
        divElemRef.current.style.backgroundImage = `url(${src})`;
      } else {
        imgElemRef.current.src = src;
      }
    },
    [isBackground]
  );

  const handleImageOnLoad = useCallback(
    (e: Event) => {
      const imgEl = e.target as HTMLImageElement;
      const loadSrc = imgEl.src;

      if (loadSrc.endsWith(src)) {
        updateLoadingStatus('loaded');
        onImageLoad?.();
      } else if (loadSrc.endsWith(errorSrc)) {
        updateLoadingStatus('error-loaded');
      }

      imgEl.remove();
    },
    [errorSrc, src, updateLoadingStatus, onImageLoad]
  );

  const handleImageOnError = useCallback(
    (e: Event | string) => {
      if (typeof e === 'string') {
        return;
      }

      const imgEl = e.target as HTMLImageElement;
      const loadSrc = imgEl.src;

      if (errorSrc && !loadSrc.endsWith(errorSrc)) {
        setImageSrc(imgEl, errorSrc);
      } else {
        setLoadStatus('error');
        imgEl.remove();
      }
    },
    [errorSrc, setImageSrc]
  );

  /**
   * 이미지 객체를 만들고 해당 객체에 src 속성에 경로를 할당한 결과로 로딩 상태를 제어.
   * 로딩 경과에 대한 성공, 실패, 중단의 케이스에 이벤트리스너를 부착하고, 해당 결과에 따라 이벤트리스너 내부에서 로딩 상태를 변경.
   */
  const loadSource = useCallback(() => {
    const image = new Image();

    setImageSrc(image, src);

    image.onload = handleImageOnLoad;
    image.onerror = handleImageOnError;
    image.onabort = handleImageOnError;
  }, [setImageSrc, src, handleImageOnLoad, handleImageOnError]);

  const imageStyles = useMemo<CSSProperties>(
    () => ({
      transitionDuration: `${transitionDuration}ms`,
      transitionDelay: `${transitionDelay}ms`
    }),
    [transitionDuration, transitionDelay]
  );

  /**
   * 아래의 effect는 컴포넌트가 화면에 처음 그려지거나 재렌더링의 결과가 화면에 그려지기 전에 실행됨.
   * 즉시 로딩의 경우 loadSource함수를 바로 실행하여 이미지를 불러오고,
   * 지연 로딩의 경우 externalImageIntersectionObserver에 요소를 관찰하도록 하여 해당 요소가 뷰포트에 포착되었을 경우 loadSource를 실행하도록 함.
   */
  useLayoutEffect(() => {
    const targetElement = isBackground ? divElemRef.current : imgElemRef.current;

    if (!isLazy) {
      loadSource();
    } else {
      imageIntersectionObserver.startObserving(targetElement, loadSource);
    }

    /**
     * props가 바뀌어 불러오는 이미지 등의 정보가 변경될 때는, 아래의 클리어함수가 실행되고 다시 이벤트가 부착되어
     * 불필요한 이벤트함수 저장을 방지하도록 함.
     */
    return () => {
      imageIntersectionObserver.quitOberving(targetElement);
    };
  }, [src, errorSrc, isLazy, isBackground, updateLoadingStatus, loadSource]);

  return (
    <span
      className={cx(className, 'lazy-img-wrapper', loadStatus, {
        blur
      })}
      style={{ width, height }}
    >
      {isBackground ? (
        <span ref={divElemRef} className={cx('target-background')} style={imageStyles} />
      ) : (
        <img ref={imgElemRef} className={cx('target-image')} alt={alt} style={imageStyles} />
      )}
    </span>
  );
};

export default memo(WpImage);
export type { Props as WpImageProps };
