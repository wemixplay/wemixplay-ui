import React, { CSSProperties, ReactElement } from 'react';
interface PropsType {
    /**
     * 데이터가 없을때 노출시킬 메세지 내용
     */
    nullText?: ReactElement | string;
    style?: CSSProperties;
    className?: string;
}
declare const NoDataText: ({ className, nullText, style }: PropsType) => React.JSX.Element;
export type { PropsType as NoDataTextProps };
export default NoDataText;
