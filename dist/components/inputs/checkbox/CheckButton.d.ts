import React from 'react';
import { RippleOption } from '../../ripple/Ripple';
import { CheckBoxProps } from './CheckBox';
type Props = CheckBoxProps & {
    /**
     * ripple UI 효과 옵션
     *
     * default: `{ disabled: true }`
     */
    rippleOption?: RippleOption;
};
declare const CheckButton: React.ForwardRefExoticComponent<CheckBoxProps & {
    /**
     * ripple UI 효과 옵션
     *
     * default: `{ disabled: true }`
     */
    rippleOption?: RippleOption;
} & React.RefAttributes<HTMLInputElement>>;
export type { Props as CheckButtonProps };
export default CheckButton;
