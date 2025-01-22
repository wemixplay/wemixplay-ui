import React, { HTMLAttributes } from 'react';
import { ReactNode } from 'react';
import { TYPOGRAPHY_FONT_STYLES, TYPOGRAPHY_COLORS } from "../../constants/sematicCssVariables.c";
type TypographyType = keyof typeof TYPOGRAPHY_FONT_STYLES;
type TypographyColorType = keyof typeof TYPOGRAPHY_COLORS;
interface TypographyProps extends HTMLAttributes<HTMLElement> {
    className?: string;
    tag?: 'h' | 'p' | 'span' | 'font' | 'label';
    hLevel?: 1 | 2 | 3 | 4 | 5 | 6;
    type?: TypographyType;
    color?: TypographyColorType;
    children: ReactNode;
}
type TypographyHProps = Omit<TypographyProps, 'tag'>;
type TypographyPProps = Omit<TypographyProps, 'tag' | 'hLevel'>;
type TypographySpanProps = Omit<TypographyProps, 'tag' | 'hLevel'>;
type TypographyFontProps = Omit<TypographyProps, 'tag' | 'hLevel'>;
type TypographyLabelProps = Omit<TypographyProps, 'tag' | 'hLevel'>;
declare const Typography: {
    ({ className, tag, hLevel, type, color, children }: TypographyProps): React.ReactElement<{
        className: string;
        style: {
            color: string;
        };
    }, string | React.JSXElementConstructor<any>>;
    H: (props: TypographyHProps) => React.JSX.Element;
    P: (props: TypographyPProps) => React.JSX.Element;
    Span: (props: TypographySpanProps) => React.JSX.Element;
    Font: (props: TypographyFontProps) => React.JSX.Element;
    Label: (props: TypographyLabelProps) => React.JSX.Element;
};
export declare const H: (props: TypographyHProps) => React.JSX.Element;
export declare const P: (props: TypographyPProps) => React.JSX.Element;
export declare const Span: (props: TypographySpanProps) => React.JSX.Element;
export declare const Font: (props: TypographyFontProps) => React.JSX.Element;
export declare const Label: (props: TypographyLabelProps) => React.JSX.Element;
export type { TypographyProps, TypographyHProps, TypographyPProps, TypographySpanProps, TypographyFontProps, TypographyLabelProps };
export default Typography;
