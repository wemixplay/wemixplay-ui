import React from 'react';
import { TabProps } from './Tab';
type Props = TabProps & {};
declare const ChipTab: {
    ({ className, ...tabProps }: Props): React.JSX.Element;
    displayName: string;
};
export type { Props as ChipTabProps };
export default ChipTab;
