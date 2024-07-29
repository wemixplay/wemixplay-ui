'use client';

import React, {
  MouseEvent,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import style from './Person.module.scss';
import { SvgIcoKingMark } from '../../assets/svgs';
import { makeCxFunc } from '@/utils/forReactUtils';
import { commaWithValue } from '@/utils/valueParserUtils';

type Props = {
  className?: string;
  /** 사용자의 레벨 */
  level?: number;
  /** 사용자의 프로필 이미지 URL */
  src: string;
  /** 사용자의 고유 ID */
  uid?: string | number;
  /** 사용자의 이름 또는 닉네임 */
  name?: string;
  /** 아바타 UI의 크기 (기본값: 'medium') */
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'custom';
  customSize?: number;
  /** 아바타 UI 우측 상단에 표시될 커스텀 bedge UI 요소 */
  bedgeElement?: ReactElement;
  /** 아바타 UI를 클릭했을때 호출되는 함수 */
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
};

const cx = makeCxFunc(style);

const DEFAULT_IMAGE = '/assets/imgs/svgs/default-profile.svg';

/**
 * Person 컴포넌트
 * 사용자의 프로필 이미지와 관련 정보를 표시하는 아바타 UI 컴포넌트입니다.
 *
 * @param {string} [props.className=''] - 추가적인 CSS 클래스 이름
 * @param {number} [props.level] - 사용자의 레벨
 * @param {string} props.src - 사용자의 프로필 이미지 URL
 * @param {string|number} [props.uid] - 사용자의 고유 ID
 * @param {string} [props.name] - 사용자의 이름 또는 닉네임
 * @param {number} [props.size=DEFAULT_AVATAR_SIZE] - 아바타 UI의 크기 (기본값: 50)
 * @param {ReactElement} [props.bedgeElement] - 아바타 UI 우측 상단에 표시될 커스텀 배지 UI 요소
 * @param {(e: MouseEvent<HTMLDivElement>) => void} [props.onClick] - 아바타 UI를 클릭했을때 호출되는 함수
 */
const Person = ({
  className = '',
  level,
  src,
  uid,
  name,
  size = 'medium',
  customSize,
  bedgeElement,
  onClick
}: Props) => {
  const imgRef = useRef<HTMLImageElement>();

  const [loadStatus, setLoadStatus] = useState('');
  const [imgSrc, setImgSrc] = useState(src || DEFAULT_IMAGE);

  /** 유저 레벨에 대한 bedge를 보여줄지 여부 */
  const showLevelBedge = useMemo(() => {
    // props.bedgeElement의 값이 있다면 유저 레벨 bedge 미노출
    if (bedgeElement) {
      return false;
    }

    return typeof level !== 'undefined';
  }, [bedgeElement, level]);

  const handleImgLoaded = useCallback(() => {
    setLoadStatus('loaded');
  }, []);

  const handleImgLoadError = useCallback(() => {
    setImgSrc(DEFAULT_IMAGE);
    setLoadStatus('error');
  }, []);

  useEffect(() => {
    setLoadStatus(imgRef.current?.complete ? 'loaded' : 'loading');
    setImgSrc(src || DEFAULT_IMAGE);
  }, [src]);

  return (
    <div
      className={cx(className, 'avatar', size, {
        'no-image': imgSrc === DEFAULT_IMAGE
      })}
      style={{ width: customSize, height: customSize }}
      onClick={onClick}
    >
      <div className={cx('avtr-img-area')}>
        <div className={cx('avtr-bedge-area')}>
          {showLevelBedge ? (
            <span className={cx('avtr-bedge')}>
              {level > 7 && <SvgIcoKingMark className={cx('king-mark')} />}
              {commaWithValue(level)}
            </span>
          ) : (
            bedgeElement
          )}
        </div>
        <div className={cx('avtr-img', loadStatus)}>
          <img
            ref={imgRef}
            src={imgSrc}
            alt={name || 'user-avatar'}
            onLoad={handleImgLoaded}
            onError={handleImgLoadError}
          />
        </div>
      </div>
    </div>
  );
};

export type { Props as PersonProps };
export default Person;
