'use client';

import React, { MouseEvent, useCallback, useEffect, useMemo, useState } from 'react';
import useCheckDevice from '@/hooks/useCheckDevice';
import WpEditorContents from '../editor/WpEditorContents';
import Ellipsis from '../ellipsis/Ellipsis';
import { convertMarkdownToHtmlStr } from '@/utils/valueParserUtils';
import { makeCxFunc } from '@/utils/forReactUtils';
import style from './FeedTextContent.module.scss';

type Props = {
  className?: string;
  content: string;
  ellipsis?: boolean;
  onTextClick?: (e: MouseEvent<HTMLSpanElement>) => void;
  onMentionClick?: (params: { name: string; id: string }) => void;
  onHashTagClick?: (params: { name: string; id: string }) => void;
};

const cx = makeCxFunc(style)

const FeedTextContent = ({
  className,
  content,
  ellipsis,
  onTextClick,
  onHashTagClick,
  onMentionClick
}: Props) => {
  const { isDesktop, isMobile, isTablet } = useCheckDevice();

  const htmlContent = useMemo(() => {
    return convertMarkdownToHtmlStr(content ?? '');
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
      }else if(target.tagName !== 'A'){
        onTextClick && onTextClick(e);
      }
    },
    [onMentionClick, onHashTagClick]
  );

  return (
    <WpEditorContents className={cx(className, 'feed-text-content', { 'has-click-event': onTextClick })} onClick={handleClick}>
      {ellipsis ? (
        <Ellipsis
          className="text"
          content={htmlContent}
          defaultShortened
          lineClamp={3}
          triggerLess="show less"
          triggerMore="show more"
          observingEnvs={[isMobile, isTablet, isDesktop]}
          onShowMoreLessClick={() => {}}
        />
      ) : (
        <div
          className="text"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        ></div>
      )}
    </WpEditorContents>
  );
};

export type { Props as FeedTextContentProps }
export default FeedTextContent;
