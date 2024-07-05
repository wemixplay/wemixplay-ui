'use client';

import { useState, useEffect, ReactElement, ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PropsType {
  /**
   * portal 영역을 적용할 엘리먼트의 id
   *
   * (없을시 portal-wrapper 로 default 값 반영)
   */
  id?: string;
  /**
   * portal 영역 안에 랜더링될 ReactElement나 string
   */
  children: ReactNode;
}

/**
 * Portal 컴포넌트는 자식 요소를 DOM의 다른 위치로 이동시키는데 사용됩니다.
 * 이 컴포넌트는 React의 Portal 기능을 활용하여, 특정 DOM 엘리먼트 안에 자식 컴포넌트를 렌더링합니다.
 *
 * @component
 * @param {string} [props.id='portal-wrapper'] - portal 영역을 적용할 엘리먼트의 id입니다. 지정하지 않을 경우 'portal-wrapper'가 기본값으로 사용됩니다.
 * @param {ReactElement} [props.children] - portal 영역 안에 랜더링될 ReactElement입니다. 이 prop은 필수입니다.
 *
 * @example
 * return (
 *   <Portal id="custom-portal-id">
 *     <div>이 내용은 #custom-portal-id 엘리먼트 안에 렌더링됩니다.</div>
 *   </Portal>
 * )
 */
const Portal = ({ children, id = 'portal-wrapper' }: PropsType) => {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (id) {
      // 존재하지 않는 엘리먼트를 시스템이 직접 만들었는지 확인하는 flag
      let systemCreated = false;
      // document에서 props.id를 id값으로 가진 element
      let element = document.getElementById(id);

      // element가 없다면 시스템이 직접 생성
      if (!element) {
        systemCreated = true;

        const wrapperElement = document.createElement('div');
        wrapperElement.setAttribute('id', id);
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
    }
  }, [id]);

  return wrapperElement && createPortal(children, wrapperElement);
};

export type { PropsType as PortalProps };
export default Portal;
