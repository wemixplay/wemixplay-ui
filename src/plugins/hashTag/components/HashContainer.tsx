'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import Hash, { HashConfig } from '../Hash';
import HashPortal from './HashPortal';

type Props = {
  hash?: Hash;
  children: (config: HashConfig) => ReactNode;
};

const HashContainer = ({ hash, children }: Props) => {
  const [targetHashId, setTargetHashId] = useState(hash.hashId);
  const [config, setConfig] = useState(hash.config);

  useEffect(() => {
    hash.observe({ setTargetHashId, setConfig });
  }, [hash]);

  return <HashPortal targetHashId={targetHashId}>{children(config)}</HashPortal>;
};

export default HashContainer;
