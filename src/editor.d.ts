import React, {
  MutableRefObject,
  MouseEvent,
  KeyboardEvent,
  ChangeEvent,
  ClipboardEvent
} from 'react';

export interface WpEditorPlugin<C extends any = any> {
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
