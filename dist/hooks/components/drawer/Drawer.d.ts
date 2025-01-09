import React, { CSSProperties, ReactNode, TouchEvent as ReactTouchEvent } from 'react';
interface PropsType {
    className?: string;
    children: ReactNode;
    disabled?: boolean;
    direction: 'top' | 'left' | 'right';
    enableOverDrawer?: boolean;
    breakRatioPoint?: CSSProperties['height'][];
    onClose?: () => void;
    onTouchMove?: ({ target, startPoint }: {
        target: HTMLElement;
        startPoint: {
            x: number;
            y: number;
        };
    }, e: ReactTouchEvent<HTMLDivElement> | TouchEvent) => void;
}
declare const Drawer: ({ className, direction, disabled, children, breakRatioPoint, enableOverDrawer, onTouchMove, onClose }: PropsType) => React.JSX.Element;
export type { PropsType as DrawerProps };
export default Drawer;
