'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  children: ReactNode;
};

const HashPortal = ({ children }: Props) => {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // 존재하지 않는 엘리먼트를 시스템이 직접 만들었는지 확인하는 flag
    let systemCreated = false;
    // document에서 props.id를 id값으로 가진 element
    let element = document.getElementById('wp-editor-hash-portal');

    // element가 없다면 시스템이 직접 생성
    if (!element) {
      systemCreated = true;

      const wrapperElement = document.createElement('div');
      wrapperElement.setAttribute('id', 'wp-editor-hash-portal');
      document.body.appendChild(wrapperElement);

      element = wrapperElement;
    }

    setWrapperElement(element);

    return () => {
      // 시스템이 직접 만들어준 element라면 unmount시 element 삭제
      if (systemCreated && element?.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, []);

  return wrapperElement && createPortal(children, wrapperElement);
};

export default HashPortal;
