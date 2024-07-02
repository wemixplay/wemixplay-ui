'use client';

import React, {
  ChangeEvent,
  ClipboardEvent,
  KeyboardEvent,
  MouseEvent,
  MutableRefObject,
  TextareaHTMLAttributes,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState
} from 'react';
import classNames from 'classnames/bind';
import style from './WpEditor.module.scss';
import Mention, { MentionConfig } from '@/plugins/mention/Mention';
import HashTag, { HashTagConfig } from '@/plugins/hashTag/HashTag';
import { WpEditorPluginConstructor } from '@/index';
import AutoUrlMatch, { AutoUrlMatchConfig } from '@/plugins/autoUrlMatch/AutoUrlMatch';
import { debounce } from 'lodash-es';
import PasteToPlainText, {
  PasteToPlainTextConfig
} from '@/plugins/pasteToPlainText/PasteToPlainText';

type WpEditorRef = HTMLDivElement & {
  setData: (data: string) => void;
};

type Props = Omit<TextareaHTMLAttributes<HTMLDivElement>, 'aria-placeholder' | 'value'> & {
  className?: string;
  name?: string;
  initialValue?: string;
  placeholder?: string;
  plugin?: WpEditorPluginConstructor[];
  config?: {
    mention?: MentionConfig;
    hash?: HashTagConfig;
    autoUrlMatch?: AutoUrlMatchConfig;
    pasteToPlainText?: PasteToPlainTextConfig;
  };
  handleChange?: (value: string, name?: string) => void;
};

const cx = classNames.bind(style);

const constructEditorPlugin = ({
  plugin,
  contentEditableEl
}: {
  plugin: WpEditorPluginConstructor[];
  contentEditableEl: MutableRefObject<HTMLDivElement | undefined>;
}) => {
  return plugin.map((p) => new p({ contentEditableEl }));
};

const WpEditor = forwardRef<WpEditorRef, Props>(
  (
    {
      className = '',
      name,
      initialValue,
      config = {},
      plugin = [Mention, HashTag, AutoUrlMatch, PasteToPlainText],
      placeholder = '입력해주세요..!',
      onClick,
      handleChange,
      ...textareaProps
    },
    ref
  ) => {
    const contentEditableEl = useRef<WpEditorRef>();
    const previousRevisions = useRef<{
      index: number;
      stack: string[];
      disabled: boolean;
    }>({
      index: 0,
      stack: [''],
      disabled: false
    });

    const [plugins] = useState(constructEditorPlugin({ plugin, contentEditableEl }));

    const mutationObserver = useMemo(() => {
      return new MutationObserver(() => {
        if (!contentEditableEl.current) {
          return;
        }

        const recordStack = debounce(() => {
          if (
            previousRevisions.current.stack[previousRevisions.current.index] ===
            contentEditableEl.current.innerHTML
          ) {
            return;
          }

          previousRevisions.current.stack.push(contentEditableEl.current.innerHTML);
          previousRevisions.current.index += 1;
        }, 300);

        if (previousRevisions.current.disabled) {
          previousRevisions.current.disabled = false;
        } else {
          recordStack();
        }
      });
    }, []);

    const getSelection = useCallback(() => {
      const range = document.createRange();
      const selection = window.getSelection();

      return { selection, range };
    }, []);

    const insertLineBreak = useCallback(() => {
      const { selection } = getSelection();

      const { focusNode, focusOffset } = selection;

      const br = document.createElement('br');
      const range = selection.getRangeAt(0);
      range.deleteContents(); // 선택된 내용을 삭제

      const frag = document.createDocumentFragment();
      const subBr = document.createElement('br');

      if (focusNode.nodeType === Node.TEXT_NODE) {
        if (focusNode.parentNode.nodeType === Node.ELEMENT_NODE) {
        }
        frag.appendChild(subBr);
      }
      frag.appendChild(br);

      range.insertNode(frag);
      range.setStartAfter(br);
      range.setEndAfter(br);

      selection.removeAllRanges();
      selection.addRange(range);

      range.collapse(false);

      const brRect = br.getBoundingClientRect();
      const editableRect = contentEditableEl.current.getBoundingClientRect();

      if (brRect.bottom >= editableRect.bottom) {
        contentEditableEl.current.scrollTop += brRect.bottom - editableRect.bottom + brRect.height;
      }
    }, []);

    const rangeMoveContentEnd = useCallback(() => {
      const { selection, range } = getSelection();

      // 콘텐츠의 끝으로 범위 설정
      range.selectNodeContents(contentEditableEl.current.lastChild ?? contentEditableEl.current);
      range.collapse(false);

      // 선택 객체에서 범위를 제거하고 새 범위 추가
      selection.removeAllRanges();
      selection.addRange(range);

      return range;
    }, [getSelection]);

    const handleUndoRedo = useCallback(
      (e: InputEvent | { inputType: string; preventDefault: () => void }) => {
        const { selection } = getSelection();
        let { range } = getSelection();

        if (e.inputType === 'historyUndo' || e.inputType === 'historyRedo') {
          e.preventDefault && e.preventDefault();

          const { index, stack } = previousRevisions.current;
          const targetIndex = e.inputType === 'historyUndo' ? index - 1 : index + 1;

          if (targetIndex >= 0 && targetIndex < stack.length) {
            const content = stack[targetIndex];

            contentEditableEl.current.innerHTML = content;

            handleChange && handleChange(content, name);

            range = rangeMoveContentEnd();

            if (e.inputType === 'historyUndo') {
              previousRevisions.current.index -= 1;
            } else {
              previousRevisions.current.index += 1;
            }

            const cursorPosition = range.getBoundingClientRect();
            const editableRect = contentEditableEl.current.getBoundingClientRect();

            if (cursorPosition.top < editableRect.top) {
              contentEditableEl.current.scrollTop -= editableRect.top - cursorPosition.top;
            } else if (cursorPosition.bottom > editableRect.bottom) {
              contentEditableEl.current.scrollTop += cursorPosition.bottom - editableRect.bottom;
            }
          }

          previousRevisions.current.disabled = true;

          plugins.forEach((plugin) => {
            plugin.handleUndoRedo && plugin.handleUndoRedo({ selection, range });
          });
        } else {
          const { index } = previousRevisions.current;

          if (index > 0) {
            previousRevisions.current.stack = previousRevisions.current.stack.slice(0, index + 1);
          }

          previousRevisions.current.disabled = false;
        }
      },
      [name, handleChange, getSelection, plugins, rangeMoveContentEnd]
    );

    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLDivElement>) => {
        const { selection, range } = getSelection();
        const prevData = contentEditableEl.current.innerHTML;

        if (e.code === 'KeyZ' && e.metaKey && e.shiftKey) {
          handleUndoRedo({ ...e, inputType: 'historyRedo' });

          e.preventDefault();
        }

        plugins.forEach((plugin) => {
          plugin.handleKeyDown && plugin.handleKeyDown({ selection, range, event: e });
        });

        if (
          e.code === 'Enter' &&
          !e.shiftKey &&
          !e.nativeEvent.isComposing &&
          contentEditableEl.current.innerHTML === prevData
        ) {
          e.preventDefault();
          e.stopPropagation();

          // e.preventDefault();
          document.execCommand('insertLineBreak');
          // const { focusNode, focusOffset } = selection;
          // const br = document.createElement('br');
          // const range = selection.getRangeAt(0);
          // range.deleteContents(); // 선택된 내용을 삭제
          // const frag = document.createDocumentFragment();
          // const subBr = document.createElement('br');
          // if (
          //   focusNode.nodeType === Node.TEXT_NODE &&
          //   focusNode.textContent.length === focusOffset
          // ) {
          //   frag.appendChild(subBr);
          // }
          // frag.appendChild(br);
          // range.insertNode(frag);
          // range.setStartAfter(br);
          // range.setEndAfter(br);
          // selection.removeAllRanges();
          // selection.addRange(range);
          // range.collapse(false);
          // const brRect = br.getBoundingClientRect();
          // const editableRect = contentEditableEl.current.getBoundingClientRect();
          // if (brRect.bottom >= editableRect.bottom) {
          //   contentEditableEl.current.scrollTop +=
          //     brRect.bottom - editableRect.bottom + brRect.height;
          // }
        }

        textareaProps.onKeyDown && textareaProps.onKeyDown(e);
      },
      [getSelection, handleUndoRedo, plugins, textareaProps]
    );

    const handlePostDataChange = useCallback(
      (e: ChangeEvent<HTMLDivElement>) => {
        const { selection, range } = getSelection();

        for (const plugin of plugins) {
          plugin.handleChange && plugin.handleChange({ selection, range, event: e });
        }

        if (!contentEditableEl.current.textContent) {
          contentEditableEl.current.innerHTML = '';
          document.execCommand('insertHTML', false, '');
        }

        handleChange && handleChange(contentEditableEl.current.innerHTML, name);
        textareaProps.onChange && textareaProps.onChange(e);
        textareaProps.onInput && textareaProps.onInput(e);
      },
      [getSelection, handleChange, name, plugins, textareaProps]
    );

    const handleClick = useCallback(
      (e: MouseEvent<HTMLDivElement>) => {
        const { selection, range } = getSelection();

        plugins.forEach((plugin) => {
          plugin.handleClick && plugin.handleClick({ selection, range, event: e });
        });
      },
      [getSelection, plugins]
    );

    const handleCopy = useCallback(
      (e: ClipboardEvent<HTMLDivElement>) => {
        const { selection, range } = getSelection();

        plugins.forEach((plugin) => {
          plugin.handleCopy && plugin.handleCopy({ selection, range, event: e });
        });

        textareaProps.onCopy && textareaProps.onCopy(e);
      },
      [getSelection, plugins, textareaProps]
    );

    const handlePaste = useCallback(
      (e: ClipboardEvent<HTMLDivElement>) => {
        const { selection, range } = getSelection();

        plugins.forEach((plugin) => {
          plugin.handlePaste && plugin.handlePaste({ selection, range, event: e });
        });

        textareaProps.onPaste && textareaProps.onPaste(e);
      },
      [getSelection, plugins, textareaProps]
    );

    const setData = useCallback(
      (data: string) => {
        contentEditableEl.current.innerHTML = data;
        rangeMoveContentEnd();
      },
      [rangeMoveContentEnd]
    );

    useEffect(() => {
      plugins.forEach((plugin) => {
        plugin.setConfig && plugin.setConfig(config[plugin.commandKey]);
      });
    }, [config, plugins]);

    useEffect(() => {
      const contentElement = contentEditableEl.current;

      mutationObserver.observe(contentElement, {
        childList: true,
        subtree: true,
        characterData: true
      });

      contentElement.addEventListener('beforeinput', handleUndoRedo);

      return () => {
        mutationObserver.disconnect();

        contentElement.removeEventListener('beforeinput', handleUndoRedo);
      };
    }, [mutationObserver, handleUndoRedo]);

    useEffect(() => {
      if (initialValue && !contentEditableEl.current.innerHTML) {
        contentEditableEl.current.innerHTML = initialValue;

        rangeMoveContentEnd();
      }
    }, [initialValue, rangeMoveContentEnd]);

    useImperativeHandle(ref, () => {
      contentEditableEl.current.setData = setData;

      return contentEditableEl.current;
    });

    return (
      <div className={cx('wp-editor')} onClick={onClick}>
        <div
          ref={contentEditableEl}
          className={cx(className, 'wp-editor-content')}
          {...textareaProps}
          aria-placeholder={placeholder}
          contentEditable
          onInput={handlePostDataChange}
          onPaste={handlePaste}
          onCopy={handleCopy}
          onKeyDown={handleKeyDown}
          onClick={handleClick}
        ></div>
        {plugins.map((plugin, index) =>
          plugin.component ? (
            <div key={index}>{plugin.component({ plugin })}</div>
          ) : (
            <div key={index}></div>
          )
        )}
      </div>
    );
  }
);

WpEditor.displayName = 'WpEditor';

export type { Props as WpEditorProps, WpEditorRef };
export default WpEditor;
