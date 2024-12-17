'use client';

import React, { forwardRef } from 'react';

import { makeCxFunc } from '@/utils/forReactUtils';

import Ripple, { RippleOption } from '../../ripple/Ripple';

import RadioBox, { RadioBoxProps } from '../radiobox/RadioBox';
import style from './RadioButton.module.scss';

type Props = RadioBoxProps & {
  /**
   * ripple UI 효과 옵션
   *
   * default: `{ disabled: true }`
   */
  rippleOption?: RippleOption;
};

const cx = makeCxFunc(style);

const RadioButton = forwardRef<HTMLInputElement, Props>(
  ({ className = '', children, rippleOption = { disabled: true }, ...radioboxProps }, ref) => {
    //logic

    return (
      <Ripple {...rippleOption}>
        <RadioBox ref={ref} className={cx(className, 'radio-button')} {...radioboxProps}>
          <div className={cx('radio-button-text')}>{children}</div>
        </RadioBox>
      </Ripple>
    );
  }
);

RadioButton.displayName = 'RadioButton';

export type { Props as RadioButtonProps };
export default RadioButton;
