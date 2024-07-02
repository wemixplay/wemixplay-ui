'use client';

import React, { CSSProperties } from 'react';
import style from './RoundCheckBox.module.scss';

import CheckBox, { CheckBoxProps } from './CheckBox';
import { makeCxFunc } from '@/utils/forReactUtils';

type Props = CheckBoxProps & {
  // type
};

const cx = makeCxFunc(style);

const RoundCheckBox = ({ className = '', ...CheckBoxProps }: Props) => {
  //logic

  return <CheckBox className={cx(className, 'checkbox-round')} {...CheckBoxProps} />;
};

RoundCheckBox.displayName = 'RoundCheckBox';
export type { Props as CheckBoxProps };
export default RoundCheckBox;
