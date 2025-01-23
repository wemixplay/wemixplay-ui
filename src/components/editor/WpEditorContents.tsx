'use client';

import React, { HTMLAttributes, forwardRef } from 'react';
import style from './WpEditorContents.module.scss';
import { makeCxFunc } from '@/utils/forReactUtils';

interface Props extends HTMLAttributes<HTMLDivElement> {
  // type
}

const cx = makeCxFunc(style);

const WpEditorContents = forwardRef<HTMLDivElement, Props>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cx(className, 'editor-contents')}
      {...props}
      suppressContentEditableWarning={true}
    ></div>
  );
});

WpEditorContents.displayName = 'WpEditorContents';

export type { Props as WpEditorContentsProps };
export default WpEditorContents;
