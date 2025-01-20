import React, { CSSProperties } from 'react';
interface BaseProps {
    className?: string;
    src: string;
    /** src의 경로로 이미지를 요청했을 때, 에러가 난다면 에러사진을 요청할 경로 */
    errorSrc?: string;
    alt?: string;
    /** 이미지 지연로딩을 할 것인지 여부 */
    isLazy?: boolean;
    /** 지연로딩 시 이미지를 불러와 보여줄 때, blur 상태를 잠깐 보여줄 것인지에 대한 여부 */
    blur?: boolean;
    /** 이미지 로드 후 이미지가 화면에 보여지는 transition의 지속 시간 */
    transitionDuration?: number;
    /** 이미지 로드 후 이미지가 화면에 보여지는 transition 시작 딜레이 */
    transitionDelay?: number;
    /** src prop으로 호출한 이미지가 불러져 왔을 때 실행할 수 있는 함수  */
    onImageLoad?: () => void;
}
interface WidthAndHeight {
    /**
     * 이미지의 너비 값
     */
    width: CSSProperties['width'];
    /**
     * 이미지의 높이 값
     */
    height: CSSProperties['height'];
}
interface BackgroundTrue extends BaseProps, Required<WidthAndHeight> {
    /** 이미지를 span 요소의 background 속성으로 표현할 것인지 또는 이미지 요소로 표현할 것인지에 대한 여부 */
    isBackground: true;
}
interface BackgroundFalse extends BaseProps, Partial<WidthAndHeight> {
    isBackground?: false;
}
type Props = BackgroundTrue | BackgroundFalse;
declare const _default: React.MemoExoticComponent<({ className, src, errorSrc, alt, isBackground, isLazy, blur, width, height, transitionDuration, transitionDelay, onImageLoad }: Props) => React.JSX.Element>;
export default _default;
export type { Props as WpImageProps };
