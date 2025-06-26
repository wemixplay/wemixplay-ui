'use client';

import React, { MouseEvent, useCallback } from 'react';
import style from './FeedEtcInfoArea.module.scss';
import {
  SvgIconComment,
  SvgIconCopy,
  SvgIconThumbupFill,
  SvgIconThumbupOutline
} from '@/assets/svgs';
import { toFormatterByInt } from '@/utils/valueParserUtils';
import { makeCxFunc } from '@/utils/forReactUtils';

type Props = {
  /**
   * 컴포넌트에 적용할 추가적인 CSS 클래스명
   */
  className?: string;
  /**
   * 댓글 수
   */
  commentCount: number;
  /**
   * 좋아요 수
   */
  likeCount: number;
  /**
   * 사용자가 좋아요를 클릭했는지 여부
   */
  isMyClick?: boolean;
  /**
   * 공유 버튼 클릭 시 호출되는 함수
   * @param {MouseEvent<HTMLButtonElement>} e - 공유 버튼 클릭 이벤트
   */
  onShareBtnClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  /**
   * 좋아요 버튼 클릭 시 호출되는 함수
   * @param {MouseEvent<HTMLButtonElement>} e - 좋아요 버튼 클릭 이벤트
   */
  onLikeBtnClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  /**
   * 댓글 버튼 클릭 시 호출되는 함수
   * @param {MouseEvent<HTMLButtonElement>} e - 댓글 버튼 클릭 이벤트
   */
  onCommentBtnClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};

const cx = makeCxFunc(style);

/**
 * `FeedEtcInfoArea`는 게시물에 대한 좋아요, 댓글, 공유 버튼을 포함한 UI를 제공합니다.
 * 각 버튼을 클릭하면 해당하는 콜백 함수가 실행되며, 좋아요 여부에 따라 UI가 동적으로 변합니다.
 *
 * @component
 * @example
 * <FeedEtcInfoArea
 *   className="custom-feed-info"
 *   commentCount={5}
 *   likeCount={10}
 *   isMyClick={true}
 *   onShareBtnClick={(e) => console.log('Shared')}
 *   onLikeBtnClick={(e) => console.log('Liked')}
 *   onCommentBtnClick={(e) => console.log('Commented')}
 * />
 *
 * @param {string} [props.className] - 컴포넌트에 적용할 추가적인 CSS 클래스명
 * @param {number} [props.commentCount] - 댓글 수
 * @param {number} [props.likeCount] - 좋아요 수
 * @param {boolean} [props.isMyClick] - 사용자가 좋아요를 클릭했는지 여부
 * @param {function} [props.onShareBtnClick] - 공유 버튼 클릭 시 호출되는 함수
 * @param {function} [props.onLikeBtnClick] - 좋아요 버튼 클릭 시 호출되는 함수
 * @param {function} [props.onCommentBtnClick] - 댓글 버튼 클릭 시 호출되는 함수
 */
const FeedEtcInfoArea = ({
  className = '',
  commentCount,
  likeCount,
  isMyClick,
  onShareBtnClick,
  onLikeBtnClick,
  onCommentBtnClick
}: Props) => {
  const handleShareBtnClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      onShareBtnClick && onShareBtnClick(e);
    },
    [onShareBtnClick]
  );

  const handleCommentClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      onCommentBtnClick && onCommentBtnClick(e);
    },
    [onCommentBtnClick]
  );

  const handleLikeBtnClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      onLikeBtnClick && onLikeBtnClick(e);
    },
    [onLikeBtnClick]
  );

  return (
    <div className={cx(className, 'feed-comments')}>
      <button
        type="button"
        className={cx('btn-comment', { 'has-click-event': onCommentBtnClick })}
        onClick={handleCommentClick}
      >
        <i className={cx('icon')}>
          <SvgIconComment />
        </i>
        <span className={cx('count')}>{toFormatterByInt(commentCount, 1)}</span>
      </button>
      <button
        type="button"
        className={cx('btn-like', {
          active: isMyClick,
          'has-click-event': onLikeBtnClick
        })}
        onClick={handleLikeBtnClick}
      >
        <span className={cx('icon')}>
          {isMyClick ? <SvgIconThumbupFill /> : <SvgIconThumbupOutline />}
        </span>
        <span className={cx('count')}>{toFormatterByInt(likeCount, 1)}</span>
      </button>
      {!!onShareBtnClick && (
        <button
          type="button"
          className={cx('btn-share', 'has-click-event')}
          onClick={handleShareBtnClick}
        >
          <SvgIconCopy />
        </button>
      )}
    </div>
  );
};

export type { Props as FeedEtcInfoAreaProps };
export default FeedEtcInfoArea;
