'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { makeCxFunc } from '@/utils/forReactUtils';

import style from './AvatarGroup.module.scss';
import Person, { PersonProps } from './Person';

type AvatarItem = Pick<PersonProps, 'src' | 'uid' | 'onClick'> & {
  index: number;
};

type Props = {
  className?: string;
  /**
   * 아바타로 표현할 정보를 담은 배열
   *
   * Pick<PersonProps, 'src' | 'uid' | 'onClick'> :
   * { src: string; uid?: string | number; onClick?: (e: MouseEvent<HTMLDivElement>) => void; }
   */
  list: (string | Pick<PersonProps, 'src' | 'uid' | 'onClick'>)[];
  /**
   * 아바타의 크기 (기본값: 'small')
   */
  avatarSize?: PersonProps['size'];
  /** 아바타의 맞춤형 크기 (픽셀 단위) */
  avatarCustomSize?: PersonProps['customSize'];
  /**
   * 보여줄 아바타 갯수
   *
   * rotateDuration이 0보다 크다면 list 길이가 showCnt 보다 커야 합니다.
   * */
  showCnt?: number;
  /** 아바타 간의 겹침 간격 비율 */
  avatarHideRatio?: number;
  /** 아바타 리스트의 순환 간격 시간 (ms)
   *
   * 0이나 false일 경우 순환하지 않음
   */
  rotateDuration?: number | false;
};

const SIZE_MAP = {
  xsmall: 12, // border의 사이즈까지 포함된 width/height px 값 입니다.
  small: 24,
  medium: 40,
  large: 56,
  xlarge: 72
};

const cx = makeCxFunc(style);

/**
 * 여러 아바타를 겹쳐서 표시하는 컴포넌트. 아바타는 사용자의 프로필 사진이나 기타 이미지일 수 있으며,
 * 목록에서 여러 아바타를 순차적으로 보여주거나 겹쳐서 표시할 수 있습니다.
 *
 * @param {string} [props.className=''] - 컴포넌트에 추가할 CSS 클래스 이름
 * @param {(string | Pick<PersonProps, 'src' | 'uid' | 'onClick'>)[]} props.list
 *        아바타로 표현할 정보를 담은 배열. 문자열인 경우 이미지 경로로 간주하고,
 *        객체인 경우는 아바타 속성으로 사용됩니다.
 *        - src: 아바타 이미지 URL
 *        - uid: 아바타를 식별할 수 있는 고유 ID (선택 사항)
 *        - onClick: 아바타 클릭 시 실행할 콜백 함수 (선택 사항)
 * @param {number} [props.avatarSize='small'] - 아바타의 맞춤형 크기 (픽셀 단위)
 * @param {number} [props.avatarCustomSize=30] - 아바타의 맞춤형 크기 (픽셀 단위)
 * @param {number} [props.showCnt=4] - 한 번에 보여줄 최대 아바타 수
 * @param {number} [props.avatarHideRatio=0.5] - 아바타 간의 겹침 비율. 0에서 1 사이의 값으로, 높을수록 겹침이 적음
 * @param {(number | false)} [props.rotateDuration=5000] - 아바타 리스트를 순환하는 간격 시간 (밀리초).
 *        false일 경우 순환하지 않음
 */
const AvatarGroup = ({
  className = '',
  list,
  avatarSize = 'small',
  avatarCustomSize = 30,
  showCnt = 4,
  avatarHideRatio = 0.6,
  rotateDuration = 5000
}: Props) => {
  /** props.list를 AvatarGroup 컴포넌트 내부에 랜더링할 list로 파싱한 배열  */
  const [renderList, setRenderList] = useState<AvatarItem[]>([]);

  const size = avatarSize === 'custom' ? avatarCustomSize : SIZE_MAP[avatarSize];

  const enableRotateAnimation = useMemo(() => {
    return (list ?? []).length >= 3 && !!rotateDuration;
  }, [list, rotateDuration]);

  /** 실제로 컴포넌트에 보여질 list 개수 */
  const realShowCount = useMemo(() => {
    if (!list) {
      return 0;

      // list 갯수가 showCnt보다 크거나 rotateDuration이 falsy한 값을 갖는다면 showCnt 그대로 반환
    } else if (list.length > showCnt || !enableRotateAnimation) {
      return showCnt;
    } else {
      return list.length - 1;
    }
  }, [list, showCnt, enableRotateAnimation]);

  /**
   * avatar UI의 겹침 정도에 따라 실제 보여줄 사이즈와 AvatarGroup 컴포넌트 최상위 요소의 넓이와 높이 정보
   */
  const sizeInfo = useMemo(() => {
    const avatarShowSize = size * avatarHideRatio;

    return {
      avatarShowSize,
      // 만약 4개가 보인다면 3개의 avatarShowSize와 원래 size 하나를 더해야 정확한 값이 나옴
      containerWidth: avatarShowSize * (realShowCount - 1) + size,
      containerHeight: SIZE_MAP[avatarSize]
    };
  }, [avatarHideRatio, realShowCount, size]);

  /**
   * AvatarGroup 컴포넌트에 전달된 props들이 유효한 값인지 검증하는 함수
   */
  const checkValidateProps = useCallback(() => {
    if (avatarHideRatio <= 0 || avatarHideRatio >= 1) {
      throw new Error('[AvatarGroup] avatarHideRatio는 0보다 크고 1보다 작아야 합니다.');
    } else if (showCnt < 2) {
      throw new Error('[AvatarGroup] showCnt는 2 이상 이어야 합니다.');
    }
  }, [avatarHideRatio, showCnt]);

  /**
   * 각 avatar UI의 transform 스타일을 계산해주는 함수
   */
  const caculateItemTransformStyle = useCallback(
    (index: number) => {
      if (!enableRotateAnimation) {
        return `translateX(${sizeInfo.avatarShowSize * index}px) scale(1)`;
      } else {
        if (index === 0) {
          return `translateX(${sizeInfo.avatarShowSize * realShowCount}px) scale(0)`;
        }

        return `translateX(${sizeInfo.avatarShowSize * (index - 1)}px) scale(${realShowCount + 1 === index ? 0 : 1})`;
      }
    },
    [realShowCount, enableRotateAnimation, sizeInfo.avatarShowSize]
  );

  // avatar UI가 일정 시간마다 롤링되게끔 하는 로직
  useEffect(() => {
    if (enableRotateAnimation) {
      const intervalId = setInterval(() => {
        setRenderList((renderList) => {
          return renderList.map((item) => ({
            ...item,
            index: item.index === 0 ? renderList.length - 1 : item.index - 1
          }));
        });
      }, rotateDuration as number);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [enableRotateAnimation, rotateDuration]);

  // list가 업데이트 되었을때 renderList에 index를 반영하여 setState
  useEffect(() => {
    if (list && list.length) {
      setRenderList(
        list.map((item, index) => {
          if (typeof item === 'string') {
            return {
              src: item,
              size,
              index
            };
          }

          return {
            ...item,
            size,
            index
          };
        })
      );
    }
  }, [list, size, showCnt]);

  // AvatarGroup 컴포넌트에 전달된 props들이 유효한 값인지 검증
  useEffect(() => {
    checkValidateProps();
  }, [checkValidateProps]);

  return (
    <div className={cx(className, 'multiple-avatars')}>
      <div
        className={cx('avatars-area')}
        style={{ width: sizeInfo.containerWidth, height: sizeInfo.containerHeight }}
      >
        {renderList.map((item, index) => {
          return item.index <= showCnt + 1 ? (
            <div
              key={`${item}-${index}`}
              className={cx('avatar-item')}
              style={{
                transform: caculateItemTransformStyle(item.index),
                zIndex: item.index
              }}
            >
              <Person {...item} customSize={size} />
            </div>
          ) : (
            <></>
          );
        })}
      </div>
    </div>
  );
};

export type { Props as MultipleAvatarProps };
export default AvatarGroup;
