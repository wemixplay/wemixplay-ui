'use client';

import React, { MouseEvent, useCallback, useEffect, useState } from 'react';
import useCheckDevice from '@/hooks/useCheckDevice';
import Ellipsis from '../ellipsis/Ellipsis';
import { sanitize } from 'isomorphic-dompurify';
import { convertMarkdownToHtmlStr } from '@/utils/valueParserUtils';

type Props = {
  className?: string;
  content: string;
  ellipsis?: boolean;
  onMentionClick?: (params: { name: string; id: string }) => void;
  onHashTagClick?: (params: { name: string; id: string }) => void;
};

const FeedTextContent = ({
  className,
  content,
  ellipsis,
  onHashTagClick,
  onMentionClick
}: Props) => {
  const { isDesktop, isMobile, isTablet } = useCheckDevice();

  const [htmlContent, setHtmlContent] = useState('');

  const handleClick = useCallback(
    (e: MouseEvent<HTMLSpanElement>) => {
      const target = e.target as HTMLElement;

      const id = target.dataset?.id ?? '';
      const name = target.textContent;

      if (target.classList.contains('mention') && target.classList.contains('complete-mention')) {
        onMentionClick && onMentionClick({ id, name: name.replace('@', '') });
      } else if (target.classList.contains('hash') && target.classList.contains('complete-hash')) {
        onHashTagClick && onHashTagClick({ id, name: name.replace('#', '') });
      }
    },
    [onMentionClick, onHashTagClick]
  );

  useEffect(() => {
    convertMarkdownToHtmlStr(content, setHtmlContent);
  }, [content]);

  return (
    <div className={`${className} post-content`} onClick={handleClick}>
      {ellipsis ? (
        <Ellipsis
          className="text"
          content={htmlContent}
          defaultShortened
          lineClamp={3}
          triggerLess="show less"
          triggerMore="show more"
          observingEnvs={[isMobile, isTablet, isDesktop]}
        />
      ) : (
        <div className="text" dangerouslySetInnerHTML={{ __html: sanitize(htmlContent) }}></div>
      )}
    </div>
  );
};

export default FeedTextContent;
