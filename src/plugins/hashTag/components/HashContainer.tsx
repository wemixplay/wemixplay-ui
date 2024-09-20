'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import HashTag, { HashTagConfig } from '../HashTag';
import HashPortal from './HashPortal';

type Props = {
  hash?: HashTag;
  children: (params: { config: HashTagConfig; targetHashId: string }) => ReactNode;
};

const HashContainer = ({ hash, children }: Props) => {
  const [targetHashId, setTargetHashId] = useState(hash.hashId);
  const [config, setConfig] = useState(hash.config);

  useEffect(() => {
    if (hash?.observe) {
      hash.observe({ setTargetHashId, setConfig });
    }
  }, [hash]);

  return targetHashId ? <HashPortal>{children({ config, targetHashId })}</HashPortal> : <></>;
};

export default HashContainer;
