import React, { CSSProperties, ReactElement } from 'react';
interface PropsType {
    /**
     * 데이터가 없을때 노출시킬 메세지 내용
     */
    nullText?: ReactElement | string;
    icon?: ReactElement;
    style?: CSSProperties;
    className?: string;
}
declare const NoDataIconText: ({ className, nullText, icon, style }: PropsType) => React.JSX.Element;
export type { PropsType as NoDataIconTextProps };
export default NoDataIconText;
