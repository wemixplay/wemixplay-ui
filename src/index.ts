/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  MutableRefObject,
  MouseEvent,
  KeyboardEvent,
  ChangeEvent,
  ClipboardEvent
} from 'react';

import WpEditor, { WpEditorProps, WpEditorRef } from './components/editor/WpEditor';
import FeedDetailEditor, {
  FeedDetailEditorProps,
  FeedDetailEditorValue,
  PostEditorMediaValue
} from './components/editor/FeedDetailEditor';

import FeedBox, { FeedBoxProps } from './components/feed/FeedBox';

interface WpEditorPlugin<C extends any = any> {
  commandKey: string;
  contentEditableEl: MutableRefObject<HTMLDivElement>;
  config: C;

  setConfig: (config?: C | undefined) => void;
  component?: <P extends { plugin: any }>(props: P) => React.JSX.Element;
  handleClick?: (params: {
    selection: Selection;
    range: Range;
    event: MouseEvent<HTMLDivElement>;
  }) => void;
  handleKeyDown?: (params: {
    selection: Selection;
    range: Range;
    event: KeyboardEvent<HTMLDivElement>;
  }) => void;
  handleChange?: (params: {
    selection: Selection;
    range: Range;
    event: ChangeEvent<HTMLDivElement>;
  }) => void;
  handlePaste?: (params: {
    selection: Selection;
    range: Range;
    event: ClipboardEvent<HTMLDivElement>;
  }) => void;
  handleCopy?: (params: {
    selection: Selection;
    range: Range;
    event: ClipboardEvent<HTMLDivElement>;
  }) => void;
  handleUndoRedo?: (params: { selection: Selection; range: Range }) => void;
}

interface WpEditorPluginConstructor {
  new ({
    contentEditableEl
  }: {
    contentEditableEl: MutableRefObject<HTMLDivElement>;
  }): WpEditorPlugin;
}

export type {
  WpEditorRef,
  WpEditorProps,
  WpEditorPlugin,
  WpEditorPluginConstructor,
  FeedDetailEditorProps,
  PostEditorMediaValue,
  FeedDetailEditorValue,
  FeedBoxProps
};
export { WpEditor, FeedDetailEditor, FeedBox };
