import React, { HTMLAttributes } from 'react';
import { makeCxFunc } from '@/utils/forReactUtils';
import style from './Typography.module.scss';
import { createElement, ReactNode } from 'react';
import { TYPOGRAPHY_FONT_STYLES, TYPOGRAPHY_COLORS } from '@/constants/sematicCssVariables.c';

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

const cx = makeCxFunc(style);

const Typography = ({
  className,
  tag = 'span',
  hLevel = 1,
  type,
  color,
  children
}: TypographyProps) => {
  //logic

  return createElement(
    tag === 'h' ? `${tag}${hLevel}` : tag,
    {
      className: cx('typography', className, type),
      style: {
        color: color ? `var(--wp-semantic-${color})` : undefined
      }
    },
    children
  );
};

export const H = (props: TypographyHProps) => <Typography {...props} tag="h" />;
export const P = (props: TypographyPProps) => <Typography {...props} tag="p" />;
export const Span = (props: TypographySpanProps) => <Typography {...props} tag="span" />;
export const Font = (props: TypographyFontProps) => <Typography {...props} tag="font" />;
export const Label = (props: TypographyLabelProps) => <Typography {...props} tag="label" />;

Typography.H = H;
Typography.P = P;
Typography.Span = Span;
Typography.Font = Font;
Typography.Label = Label;

export type {
  TypographyProps,
  TypographyHProps,
  TypographyPProps,
  TypographySpanProps,
  TypographyFontProps,
  TypographyLabelProps
};
export default Typography;
