'use client';

import React from 'react';

import { makeCxFunc } from '@/utils/forReactUtils';

import Button, { ButtonProps } from './Button';
import style from './Button.module.scss';

type Props = ButtonProps & {
  // type
};

const cx = makeCxFunc(style);

const SolidSquareButton = ({ className = '', ...buttonProps }: Props) => {
  //logic

  return <Button className={cx(className, 'btn-solid-square')} {...buttonProps} />;
};

SolidSquareButton.displayName = 'SolidSquareButton';
export type { Props as SolidSquareButtonProps };
export default SolidSquareButton;
