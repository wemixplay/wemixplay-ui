import React from 'react';
import { CheckBoxProps } from './CheckBox';
type Props = CheckBoxProps & {};
declare const RoundCheckBox: {
    ({ className, ...CheckBoxProps }: Props): React.JSX.Element;
    displayName: string;
};
export type { Props as CheckBoxProps };
export default RoundCheckBox;
