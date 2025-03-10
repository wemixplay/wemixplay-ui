'use client';

import React, { MouseEvent, useCallback, useMemo } from 'react';
import useCheckDevice from '@/hooks/useCheckDevice';
import WpEditorContents from '../editor/WpEditorContents';
import Ellipsis from '../ellipsis/Ellipsis';
import { convertMarkdownToHtmlStr } from '@/utils/valueParserUtils';
import { makeCxFunc } from '@/utils/forReactUtils';
import style from './FeedTextContent.module.scss';
import dompurify from 'isomorphic-dompurify';

const { sanitize } = dompurify;

type Props = {
  /**
   * 추가로 적용할 CSS 클래스명
   */
  className?: string;
  /**
   * 렌더링할 텍스트 콘텐츠
   */
  content: string;
  /**
   * 긴 텍스트에 대한 줄임 처리 여부
   */
  ellipsis?: boolean;
  /**
   * "더 보기/접기" 버튼의 활성화 여부
   */
  enableShowMore?: boolean;
  /**
   * 텍스트 클릭 시 호출될 함수
   * @param {MouseEvent<HTMLSpanElement>} e - 클릭 이벤트 객체
   */
  onTextClick?: (e: MouseEvent<HTMLSpanElement>) => void;
  /**
   * 멘션 클릭 시 호출될 함수
   * @param {string} [params.name] - 멘션된 사용자 이름
   * @param {string} [params.id] - 멘션된 사용자 ID
   */
  onMentionClick?: (params: { name: string; id: string }) => void;
  /**
   * 해시태그 클릭 시 호출될 함수
   * @param {string} [params.name] - 해시태그 이름
   * @param {string} [params.id] - 해시태그 ID
   */
  onHashTagClick?: (params: { name: string; id: string }) => void;
};

const cx = makeCxFunc(style);

/**
 * `FeedTextContent`는 피드에 표시될 텍스트 콘텐츠를 렌더링하는 컴포넌트입니다.
 * 주어진 콘텐츠를 Markdown 형식에서 HTML로 변환한 후 DOMPurify를 사용하여 정제합니다.
 * 해시태그 및 멘션 클릭 이벤트를 지원하며, 텍스트 클릭 시 사용자 정의 이벤트를 발생시킬 수 있습니다.
 * 긴 텍스트의 경우, 줄임 처리를 할 수 있으며 "더 보기/접기" 옵션도 제공합니다.
 *
 * @component
 * @example
 * <FeedTextContent
 *   className="feed-content"
 *   content="Here is the **content**"
 *   ellipsis={true}
 *   enableShowMore={true}
 *   onTextClick={(e) => console.log('Text clicked')}
 *   onMentionClick={({ name, id }) => console.log(`Mention clicked: ${name}, ${id}`)}
 *   onHashTagClick={({ name, id }) => console.log(`HashTag clicked: ${name}, ${id}`)}
 * />
 *
 * @param {string} [props.className] - 컴포넌트에 추가로 적용할 CSS 클래스명
 * @param {string} [props.content] - 렌더링할 텍스트 콘텐츠
 * @param {boolean} [props.ellipsis] - 긴 텍스트에 대한 줄임 처리 여부
 * @param {boolean} [props.enableShowMore] - "더 보기/접기" 버튼의 활성화 여부
 * @param {function} [props.onTextClick] - 텍스트 클릭 시 호출될 함수
 * @param {function} [props.onMentionClick] - 멘션 클릭 시 호출될 함수. { name: string; id: string } 객체를 받음
 * @param {function} [props.onHashTagClick] - 해시태그 클릭 시 호출될 함수. { name: string; id: string } 객체를 받음
 */
const FeedTextContent = ({
  className,
  content,
  ellipsis,
  enableShowMore,
  onTextClick,
  onHashTagClick,
  onMentionClick
}: Props) => {
  const { isDesktop, isMobile, isTablet } = useCheckDevice();

  const htmlContent = useMemo(() => {
    return sanitize(convertMarkdownToHtmlStr(content ?? ''), { ADD_ATTR: ['target'] });
  }, [content]);

  const handleClick = useCallback(
    (e: MouseEvent<HTMLSpanElement>) => {
      const target = e.target as HTMLElement;

      const id = target.dataset?.id ?? '';
      const name = target.textContent;

      if (target.classList.contains('mention') && target.classList.contains('complete-mention')) {
        onMentionClick && onMentionClick({ id, name: name.replace('@', '') });
      } else if (target.classList.contains('hash') && target.classList.contains('complete-hash')) {
        onHashTagClick && onHashTagClick({ id, name: name.replace('#', '') });
      } else if (target.tagName !== 'A') {
        onTextClick && onTextClick(e);
      }

      e.stopPropagation();
    },
    [onMentionClick, onHashTagClick]
  );

  return (
    <WpEditorContents
      className={cx(className, 'feed-text-content', { 'has-click-event': onTextClick })}
      onClick={handleClick}
    >
      {ellipsis ? (
        <Ellipsis
          className={cx('text')}
          content={htmlContent}
          defaultShortened
          lineClamp={5}
          triggerLess="show less"
          triggerMore="show more"
          observingEnvs={[isMobile, isTablet, isDesktop]}
          onShowMoreLessClick={enableShowMore ? undefined : () => {}}
        />
      ) : (
        <div
          className={cx('text', 'full-text')}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        ></div>
      )}
    </WpEditorContents>
  );
};

export type { Props as FeedTextContentProps };
export default FeedTextContent;
