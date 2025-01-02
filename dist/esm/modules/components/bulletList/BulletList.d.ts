import React, { ReactElement, ReactNode } from 'react';
interface Props {
    className?: string;
    list: (ReactElement | string)[] | ReactNode[];
    icon?: ReactElement | string;
}
declare const BulletList: ({ className, list, icon }: Props) => React.JSX.Element;
export type { Props as BulletListProps };
export default BulletList;
