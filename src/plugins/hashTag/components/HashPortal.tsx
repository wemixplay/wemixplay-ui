'use client';

import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  targetHashId: string;
  children: ReactNode;
};

const HashPortal = ({ targetHashId, children }: Props) => {
  const prevTatgetHashId = useRef('');

  const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (targetHashId) {
      const element = document.getElementById(`${targetHashId}`) ?? null;

      setWrapperElement(element);
      prevTatgetHashId.current = targetHashId;
    } else if (prevTatgetHashId.current) {
      prevTatgetHashId.current = '';
      setWrapperElement(null);
    }
  }, [targetHashId]);

  return wrapperElement && createPortal(children, wrapperElement);
};

export default HashPortal;
