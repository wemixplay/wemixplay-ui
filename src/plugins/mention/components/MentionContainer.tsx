'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import Mention, { MentionConfig } from '../Mention';
import MentionPortal from './MentionPortal';

type Props = {
  mention?: Mention;
  children: (config: MentionConfig) => ReactNode;
};

const MentionContainer = ({ mention, children }: Props) => {
  const [targetMentionId, setTargetMentionId] = useState(mention.mentionId);
  const [config, setConfig] = useState(mention.config);

  useEffect(() => {
    mention.observe({ setTargetMentionId, setConfig });
  }, [mention]);

  return <MentionPortal targetMentionId={targetMentionId}>{children(config)}</MentionPortal>;
};

export default MentionContainer;
