'use client';

import React, { HTMLAttributes, forwardRef } from 'react';
import classNames from 'classnames/bind';
import style from './WpEditorContents.module.scss';

interface Props extends HTMLAttributes<HTMLDivElement> {
  // type
}

const cx = classNames.bind(style);

const WpEditorContents = forwardRef<HTMLDivElement, Props>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cx(className, 'editor-contents')} {...props}></div>;
});

WpEditorContents.displayName = 'WpEditorContents';

export type { Props as WpEditorContentsProps };
export default WpEditorContents;
