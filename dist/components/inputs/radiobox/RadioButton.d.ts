import React from 'react';
import { RippleOption } from '../../ripple/Ripple';
import { RadioBoxProps } from '../radiobox/RadioBox';
type Props = RadioBoxProps & {
    /**
     * ripple UI 효과 옵션
     *
     * default: `{ disabled: true }`
     */
    rippleOption?: RippleOption;
};
declare const RadioButton: React.ForwardRefExoticComponent<RadioBoxProps & {
    /**
     * ripple UI 효과 옵션
     *
     * default: `{ disabled: true }`
     */
    rippleOption?: RippleOption;
} & React.RefAttributes<HTMLInputElement>>;
export type { Props as RadioButtonProps };
export default RadioButton;
