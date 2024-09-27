'use client';

import React, { ReactNode, useEffect, useState } from 'react';

type Props = {
  /** 클라이언트에서 렌더링할 자식 컴포넌트들 */
  children?: ReactNode;
  /** 서버 사이드 렌더링 시 표시할 대체 콘텐츠. 기본값은 빈 문자열 */
  fallback?: ReactNode;
};

/**
 * `ClientOnly` 컴포넌트는 클라이언트 사이드에서만 렌더링되는 컴포넌트입니다.
 * 서버 사이드 렌더링(SSR) 환경에서는 children을 렌더링하지 않고,
 * 클라이언트에서 컴포넌트가 마운트된 이후에만 children을 렌더링합니다.
 * 서버 렌더링 시에는 `fallback`으로 대체하여 표시됩니다.
 *
 * @component
 * @example
 * <ClientOnly fallback={<div>Loading...</div>}>
 *   <YourComponent />
 * </ClientOnly>
 *
 * @param {ReactNode} [props.children] - 클라이언트에서 렌더링할 자식 컴포넌트들.
 * @param {ReactNode} [props.fallback] - 서버 사이드 렌더링 시 표시할 대체 콘텐츠. 기본값은 빈 문자열입니다.
 */
const ClientOnly = ({ children, fallback = '' }: Props) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return <>{mounted ? children : fallback}</>;
};

export default ClientOnly;
