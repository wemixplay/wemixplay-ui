'use client';

import React, { MouseEvent } from 'react';
import style from './CommentEtcInfo.module.scss';
import { SvgIcoLike } from '@/assets/svgs';
import { makeCxFunc } from '@/utils/forReactUtils';
import { toFormatterByInt } from '@/utils/valueParserUtils';

type Props = {
  /** 추가적인 CSS 클래스명을 정의하는 필드 */
  className?: string;
  /** 좋아요 정보와 상태를 담은 객체 */
  likeInfo?: {
    /** 댓글의 좋아요 개수 */
    likeCount: number;
    /** 사용자가 좋아요를 눌렀는지 여부 */
    isMyClick?: boolean;
  };
  /**
   * 좋아요 버튼 클릭 시 호출되는 콜백 함수
   * @param {MouseEvent<HTMLButtonElement>} e - 좋아요 버튼 클릭 이벤트 객체
   */
  onLikeBtnClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};

const cx = makeCxFunc(style);

/**
 * `CommentEtcInfo`는 댓글의 좋아요 버튼과 좋아요 수를 보여주는 컴포넌트입니다.
 * 사용자가 좋아요를 클릭할 수 있으며, 클릭한 상태에 따라 버튼 스타일이 변경됩니다.
 *
 * @component
 * @example
 * <CommentEtcInfo
 *   likeInfo={{ likeCount: 100, isMyClick: true }}
 *   onLikeBtnClick={(e) => console.log('Like button clicked', e)}
 * />
 */
const CommentEtcInfo = ({ className = '', likeInfo, onLikeBtnClick }: Props) => {
  const handleLikeBtnClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onLikeBtnClick && onLikeBtnClick(e);
  };

  return (
    <div className={cx(className, 'comment-etc-info')}>
      <button
        type="button"
        className={cx('btn-like', { active: likeInfo?.isMyClick })}
        onClick={handleLikeBtnClick}
      >
        <i className={cx('btn-like-ico')}>
          <span className={cx('icon')}>
            <SvgIcoLike />
          </span>
        </i>

        <span className={cx('count')}>{toFormatterByInt(likeInfo?.likeCount ?? 0, 1)}</span>
      </button>
    </div>
  );
};

export type { Props as CommentEtcInfoProps };
export default CommentEtcInfo;
