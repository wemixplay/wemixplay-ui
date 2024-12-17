'use client';

import React, { forwardRef } from 'react';

import { makeCxFunc } from '@/utils/forReactUtils';

import Ripple, { RippleOption } from '../../ripple/Ripple';

import CheckBox, { CheckBoxProps } from './CheckBox';
import style from './CheckButton.module.scss';

type Props = CheckBoxProps & {
  /**
   * ripple UI 효과 옵션
   *
   * default: `{ disabled: true }`
   */
  rippleOption?: RippleOption;
};

const cx = makeCxFunc(style);

const CheckButton = forwardRef<HTMLInputElement, Props>(
  ({ className = '', children, rippleOption = { disabled: true }, ...checkboxProps }, ref) => {
    //logic

    return (
      <Ripple {...rippleOption}>
        <CheckBox ref={ref} className={cx(className, 'check-button')} {...checkboxProps}>
          <div className={cx('check-button-text')}>{children}</div>
        </CheckBox>
      </Ripple>
    );
  }
);

CheckButton.displayName = 'CheckButton';

export type { Props as CheckButtonProps };
export default CheckButton;
