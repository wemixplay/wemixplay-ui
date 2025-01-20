import React, { CSSProperties } from 'react';
type Props = {
    className?: string;
    /**
     * NoImage 컴포넌트가 불러올 이미지 src
     *
     * `default: '/assets/imgs/noimage-placeholder.svg'`
     */
    src?: string;
    style?: CSSProperties;
};
/**
 * `NoImage` 컴포넌트는 데이터가 없을 때 사용자에게 보여줄 메시지를 렌더링합니다.
 * 이 컴포넌트는 사용자가 지정한 메시지 또는 React 엘리먼트를 화면에 표시합니다.
 *
 * @component
 * @param {string} [props.className=''] - 컴포넌트에 적용할 CSS 클래스 이름
 */
declare const NoImage: ({ className, src, style }: Props) => React.JSX.Element;
export type { Props as NoImageProps };
export default NoImage;
