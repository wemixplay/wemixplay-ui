'use client';

import React, { ReactElement, ReactNode, useEffect, useState } from 'react';

type Props = {
  children?: ReactNode;
  fallback?: ReactNode | ReactElement | string;
};
const ClientOnly = ({ children, fallback }: Props) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? <>{children}</> : fallback;
};

export default ClientOnly;
