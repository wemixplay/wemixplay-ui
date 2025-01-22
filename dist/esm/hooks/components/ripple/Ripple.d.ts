import React, { ReactNode } from 'react';
export interface RippleOption {
    /**
     * ripple 색상
     *
     * color로 전달된 색상값은 opacity가 0.3이 자동 적용됨
     */
    color?: string;
    /**
     * ripple이 작동하는 시간 (ms)
     */
    duration?: number;
    /**
     * ripple이 확장하는 max-width
     */
    maxSize?: number;
    /**
     * ripple 비활성화 여부
     */
    disabled?: boolean;
}
export declare const DEFAULT_RIPPLE_OPTION: {
    color: string;
    duration: number;
    maxSize: number;
    disabled: boolean;
};
interface PropsType extends RippleOption {
    children: ReactNode;
}
export declare const RippleForStorybook: ({ color, duration, maxSize, disabled, children }: PropsType) => React.JSX.Element;
export type { PropsType as RippleProps };
declare const _default: React.MemoExoticComponent<({ color, duration, maxSize, disabled, children }: PropsType) => React.JSX.Element>;
export default _default;
