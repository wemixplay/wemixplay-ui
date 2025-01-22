import React from 'react';
import { ButtonProps } from './Button';
type Props = ButtonProps & {};
declare const SolidSquareButton: {
    ({ className, ...buttonProps }: Props): React.JSX.Element;
    displayName: string;
};
export type { Props as SolidSquareButtonProps };
export default SolidSquareButton;
