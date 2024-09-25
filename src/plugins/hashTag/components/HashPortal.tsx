'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  /** 포탈을 통해 렌더링할 자식 컴포넌트들 */
  children: ReactNode;
};

/**
 * `HashPortal` 컴포넌트는 `ReactDOM.createPortal`을 사용하여 특정 DOM 노드에 자식 컴포넌트를 렌더링합니다.
 * 기본적으로 `#wp-editor-hash-portal`이라는 `div` 요소를 만들어 그 안에 자식을 렌더링하며,
 * 해당 DOM 노드가 없을 경우, 시스템이 직접 생성하여 문서의 body에 추가합니다.
 *
 * 컴포넌트가 언마운트될 때 시스템이 생성한 DOM 요소는 자동으로 제거됩니다.
 *
 * @component
 * @example
 * <HashPortal>
 *   <YourComponent />
 * </HashPortal>
 *
 * @param {ReactNode} [props.children] - 포탈을 통해 렌더링할 자식 컴포넌트들.
 */
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
