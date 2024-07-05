'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import Mention, { MentionConfig } from '../Mention';
import MentionPortal from './MentionPortal';

type Props = {
  mention?: Mention;
  children: (params: { config: MentionConfig; targetMentionId: string }) => ReactNode;
};

const MentionContainer = ({ mention, children }: Props) => {
  const [targetMentionId, setTargetMentionId] = useState(mention.mentionId);
  const [config, setConfig] = useState(mention.config);

  useEffect(() => {
    mention.observe({ setTargetMentionId, setConfig });
  }, [mention]);

  return targetMentionId ? (
    <MentionPortal>{children({ config, targetMentionId })}</MentionPortal>
  ) : (
    <></>
  );
};

export default MentionContainer;
