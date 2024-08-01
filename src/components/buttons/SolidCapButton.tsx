'use client';

import React, { CSSProperties } from 'react';
import style from './Button.module.scss';
import Button, { ButtonProps } from './Button';
import { makeCxFunc } from '@/utils/forReactUtils';

type Props = ButtonProps & {
  // type
};

const cx = makeCxFunc(style);

const SolidCapButton = ({ className = '', ...buttonProps }: Props) => {
  //logic

  return <Button className={cx(className, 'btn-solid-cap')} {...buttonProps} />;
};

SolidCapButton.displayName = 'SolidCapButton';
export type { Props as SolidCapButtonProps };
export default SolidCapButton;
