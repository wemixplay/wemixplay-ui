import React, { CSSProperties, MouseEvent, ReactElement } from 'react';
interface PropsType {
    className?: string;
    /**
     * 데이터가 없을때 노출시킬 메세지 내용
     */
    icon?: ReactElement;
    nullText?: ReactElement | string;
    buttonText?: string;
    style?: CSSProperties;
    handleBtnClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}
declare const NoDataAction: ({ className, nullText, icon, buttonText, style, handleBtnClick }: PropsType) => React.JSX.Element;
export type { PropsType as NoDataActionProps };
export default NoDataAction;
