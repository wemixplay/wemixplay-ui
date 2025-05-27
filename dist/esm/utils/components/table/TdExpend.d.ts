import React, { CSSProperties, ReactElement } from 'react';
interface PropsType {
    /**
     * 클래스 이름
     */
    className?: string;
    /**
     * 자식 요소
     */
    children: ReactElement | string;
    /**
     * 스타일
     */
    style?: CSSProperties;
}
/**
 * `Table` 컴포넌트에서 아코디언 UI를 지원하는 컴포넌트
 * @component
 * @param {string} [props.className] - 클래스 이름
 * @param {ReactElement | string} props.children - 자식 요소
 */
declare const TdExpend: {
    ({ className, children, style }: PropsType): React.JSX.Element;
    displayName: string;
};
export type { PropsType as TdExpendProps };
export default TdExpend;
