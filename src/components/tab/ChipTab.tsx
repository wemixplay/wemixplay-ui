'use client';

import React from 'react';
import { makeCxFunc } from '@/utils/forReactUtils';
import style from './ChipTab.module.scss';
import Tab, { TabProps } from './Tab';

type Props = TabProps & {
  // type
};

const cx = makeCxFunc(style);

const ChipTab = ({ className = '', ...tabProps }: Props) => {
  //logic

  return <Tab className={cx(className, 'chip-tab')} {...tabProps} />;
};

ChipTab.displayName = 'ChipTab';

export type { Props as ChipTabProps };
export default ChipTab;
