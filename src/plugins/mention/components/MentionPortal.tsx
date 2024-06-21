'use client';

import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  targetMentionId: string;
  children: ReactNode;
};

const MentionPortal = ({ targetMentionId, children }: Props) => {
  const prevTatgetMentionId = useRef('');

  const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (targetMentionId) {
      const element = document.getElementById(`${targetMentionId}`) ?? null;

      setWrapperElement(element);
      prevTatgetMentionId.current = targetMentionId;
    } else if (prevTatgetMentionId.current) {
      prevTatgetMentionId.current = '';
      setWrapperElement(null);
    }
  }, [targetMentionId]);

  return wrapperElement && createPortal(children, wrapperElement);
};

export default MentionPortal;
