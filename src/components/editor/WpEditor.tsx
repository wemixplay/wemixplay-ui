/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, {
  ChangeEvent,
  ClipboardEvent,
  FocusEvent,
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
import style from './WpEditor.module.scss';
import { MentionConfig } from '../../plugins/mention/Mention';
import { HashTagConfig } from '../../plugins/hashTag/HashTag';
import { AutoUrlMatchConfig } from '../../plugins/autoUrlMatch/AutoUrlMatch';
import { debounce } from 'lodash';
import { PasteToPlainTextConfig } from '../../plugins/pasteToPlainText/PasteToPlainText';
import { CountTextLengthConfig } from '../../plugins/countTextLength/CountTextLength';
import WpEditorContents from './WpEditorContents';
import { makeCxFunc } from '@/utils/forReactUtils';

export interface WpEditorPlugin<C extends any = any> {
  commandKey: string;
  contentEditableEl: MutableRefObject<HTMLDivElement>;
  config: C;

  setConfig: (config?: C | undefined) => void;
  component?: <P extends { plugin: any }>(props: P) => React.JSX.Element;
  handleClick?: (params: { event: MouseEvent<HTMLDivElement> }) => void;
  handleKeyDown?: (params: { event: KeyboardEvent<HTMLDivElement> }) => void;
  handleChange?: (params: { event: ChangeEvent<HTMLDivElement> }) => void;
  handlePaste?: (params: { event: ClipboardEvent<HTMLDivElement> }) => void;
  handleCopy?: (params: { event: ClipboardEvent<HTMLDivElement> }) => void;
  handleFocus?: (params: { event: FocusEvent<HTMLDivElement> }) => void;
  handleBlur?: (params: { event: FocusEvent<HTMLDivElement> }) => void;
  handleUndoRedo?: (params: { type: 'historyUndo' | 'historyRedo' }) => void;
}

export interface WpEditorPluginConstructor {
  new ({
    contentEditableEl
  }: {
    contentEditableEl: MutableRefObject<HTMLDivElement>;
  }): WpEditorPlugin;
}

type WpEditorRef = HTMLDivElement & {
  setData: (data: string, option?: { keepRange?: boolean }) => void;
};

type Props = Omit<TextareaHTMLAttributes<HTMLDivElement>, 'aria-placeholder' | 'value'> & {
  className?: string;
  name?: string;
  initialValue?: string;
  placeholder?: string;
  maxLength?: number;
  plugin?: WpEditorPluginConstructor[];
  config?: {
    mention?: MentionConfig;
    hash?: HashTagConfig;
    autoUrlMatch?: AutoUrlMatchConfig;
    pasteToPlainText?: PasteToPlainTextConfig;
    countTextLength?: CountTextLengthConfig;
  };
  handleChange?: (value: string, name?: string) => void;
};

const cx = makeCxFunc(style);

/**
 * 에디터 Plugin 클래스들의 생성자 함수를 실행하여 각 plugin 객체를 만들어 배열로 반환하는 함수
 * @param {WpEditorPluginConstructor[]} [params.plugin] - Plugin 클래스 배열
 * @param {MutableRefObject<HTMLDivElement | undefined>} [params.contentEditableEl] - 에디터 참조 객체
 * @returns {WpEditorPlugin[]} - plugin 객체 배열
 */
const constructEditorPlugin = ({
  plugin,
  contentEditableEl
}: {
  plugin: WpEditorPluginConstructor[];
  contentEditableEl: MutableRefObject<HTMLDivElement | undefined>;
}): WpEditorPlugin[] => {
  return plugin.map((p) => new p({ contentEditableEl }));
};

const WpEditor = forwardRef<WpEditorRef, Props>(
  (
    {
      className = '',
      name,
      initialValue,
      config = {},
      plugin = [],
      placeholder,
      maxLength,
      onClick,
      handleChange,
      ...textareaProps
    },
    ref
  ) => {
    const initValueStatus = useRef(false);
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

    /** Plugin 클래스들로 만들어진 plugin 객체 배열 */
    const [plugins, setPlugins] = useState(constructEditorPlugin({ plugin, contentEditableEl }));

    /** undo, redo를 컨트롤 하기 위한 기록을 stack 형식으로 기록하는 함수 */
    const recordStack = useMemo(
      () =>
        debounce(() => {
          if (
            !contentEditableEl.current ||
            previousRevisions.current.stack[previousRevisions.current.index] ===
              contentEditableEl.current?.innerHTML
          ) {
            return;
          }

          previousRevisions.current.stack.push(contentEditableEl.current.innerHTML);
          previousRevisions.current.index += 1;
        }, 300),
      []
    );

    /**
     * undo, redo를 기록하기 위해 에디터의 내용 변화를 감지하기 위한 mutationObserver
     */
    const mutationObserver = useMemo(() => {
      if (typeof window === 'undefined') {
        return;
      }

      return new MutationObserver(() => {
        if (!contentEditableEl.current || !previousRevisions.current) {
          return;
        }

        if (previousRevisions.current.disabled) {
          previousRevisions.current.disabled = false;
        } else {
          recordStack();
        }
      });
    }, [recordStack]);

    /** 현재의 커서 정보를 가져오는 함수 */
    const getSelection = useCallback(() => {
      const range = document.createRange();
      const selection = window.getSelection();

      return { selection, range };
    }, []);

    /** 에디터 안에 <font> 태그가 들어갔을 시 font태그를 제거하고 안에 textConent만 나오도록 하는 함수 */
    const removeFontTagAtCursor = () => {
      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const parent = range.startContainer.parentNode;

        // 부모가 font 태그인지 확인
        if ('tagName' in parent && (parent.tagName as string).toLowerCase() === 'font') {
          // font 태그의 내용을 가져옴
          const fontContent = parent.textContent;

          // font 태그를 제거하고 그 내용을 삽입
          const fragment = document.createDocumentFragment();
          const textNode = document.createTextNode(fontContent);
          fragment.appendChild(textNode);
          parent.parentNode.replaceChild(fragment, parent);

          // 커서를 새로 생성된 텍스트 노드의 끝으로 이동
          range.setStart(textNode, fontContent.length);
          range.setEnd(textNode, fontContent.length);
          selection.removeAllRanges();
          selection.addRange(range);
        }
      }
    };

    /**
     * 에디터 내용의 끝 부분으로 커서를 옮기게 하는 range를 만드는 함수
     */
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

    /**
     * 앞으로 복구, 뒤로 복구 이벤트가 발생할때 호출되는 함수
     */
    const handleUndoRedo = useCallback(
      (e: InputEvent | { inputType: string; preventDefault: () => void }) => {
        let { range } = getSelection();

        if (e.inputType === 'historyUndo' || e.inputType === 'historyRedo') {
          e.preventDefault && e.preventDefault();

          const { index, stack } = previousRevisions.current;
          const targetIndex = e.inputType === 'historyUndo' ? index - 1 : index + 1;

          if (targetIndex >= 0 && targetIndex < stack.length) {
            const content = stack[targetIndex];

            contentEditableEl.current.innerHTML = content;

            handleChange && handleChange(content.replace(/&nbsp;/g, ' '), name);

            range = rangeMoveContentEnd();

            if (e.inputType === 'historyUndo') {
              previousRevisions.current.index -= 1;
            } else {
              previousRevisions.current.index += 1;
            }

            const cursorPosition = range.getBoundingClientRect();
            const editableRect = contentEditableEl.current.getBoundingClientRect();

            // 복구시 커서의 위치에 따라 스크롤 위치를 변경
            if (cursorPosition.top < editableRect.top) {
              contentEditableEl.current.scrollTop -= editableRect.top - cursorPosition.top;
            } else if (cursorPosition.bottom > editableRect.bottom) {
              contentEditableEl.current.scrollTop += cursorPosition.bottom - editableRect.bottom;
            }
          }

          previousRevisions.current.disabled = true;

          plugins.forEach((plugin) => {
            plugin.handleUndoRedo &&
              plugin.handleUndoRedo({ type: e.inputType as 'historyUndo' | 'historyRedo' });
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

    /**
     * 에디터 keydown 이벤트 발생시 호출되는 함수
     */
    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLDivElement>) => {
        const { selection } = getSelection();
        const prevData = contentEditableEl.current.innerHTML;

        // 폰트 굴게 변하게 하는 단축키 무효화
        if ((e.ctrlKey && e.code === 'KeyB') || (e.metaKey && e.code === 'KeyB')) {
          e.preventDefault();
        }

        // 앞으로 복구 단축키시 강제로 historyRedo 이벤트 dispatch
        if (e.code === 'KeyZ' && (e.metaKey || e.ctrlKey) && e.shiftKey) {
          handleUndoRedo({ ...e, inputType: 'historyRedo' });

          e.preventDefault();
        }

        plugins.forEach((plugin) => {
          plugin.handleKeyDown && plugin.handleKeyDown({ event: e });
        });

        // Enter 입력시 개행 처리 (플러그인에서 Enter 입력시 내용 변경을 한것이 없다면 개행처리 진행)
        if (
          (e.code === 'Enter' || e.code === 'NumpadEnter') &&
          !e.shiftKey &&
          !e.nativeEvent.isComposing &&
          contentEditableEl.current.innerHTML === prevData
        ) {
          e.preventDefault();
          e.stopPropagation();

          document.execCommand('insertLineBreak');

          let range = selection.getRangeAt(0);
          range = range.cloneRange();
          range.setStart(range.startContainer, 0);

          // 현재 커서 위치가 뷰포트에 노출되었는지 확인
          const cursorPosition = range.getBoundingClientRect();
          const containerRect = contentEditableEl.current.getBoundingClientRect();

          // 커서가 컨테이너의 하단을 벗어났는지 확인
          const isCursorBelowView = cursorPosition.bottom > containerRect.bottom;

          // 커서가 화면에 보이지 않으면 스크롤을 이동
          if (isCursorBelowView) {
            // 커서가 컨테이너 하단을 벗어났을 때
            const scrollOffset = cursorPosition.bottom - containerRect.bottom;
            contentEditableEl.current.scrollTo({
              top: contentEditableEl.current.scrollTop + scrollOffset * 2
            }); // 아래로 스크롤 이동
          }
        }

        textareaProps.onKeyDown && textareaProps.onKeyDown(e);
      },
      [getSelection, handleUndoRedo, plugins, textareaProps]
    );

    /**
     * 에디터의 input 이벤트 발생시 호출되는 함수
     */
    const handlePostDataChange = useCallback(
      (e: ChangeEvent<HTMLDivElement>) => {
        if (!e.target.innerHTML) {
          // 전체 HTML을 제거하여 초기화 (브라우저의 이전 폰트 스타일이 남아있는 것을 염두하여 초기화 진행)
          contentEditableEl.current.innerHTML = '';
        }

        // font 태그는 제거하고 textContent만 나오도록
        removeFontTagAtCursor();

        for (const plugin of plugins) {
          plugin.handleChange && plugin.handleChange({ event: e });
        }

        handleChange &&
          handleChange(contentEditableEl.current.innerHTML.replace(/&nbsp;/g, ' '), name);
        textareaProps.onChange && textareaProps.onChange(e);
        textareaProps.onInput && textareaProps.onInput(e);

        recordStack();
      },
      [handleChange, recordStack, name, plugins, textareaProps]
    );

    /**
     * 에디터 내부 클릭 이벤트 발생시 호출되는 함수
     */
    const handleClick = useCallback(
      (e: MouseEvent<HTMLDivElement>) => {
        plugins.forEach((plugin) => {
          plugin.handleClick && plugin.handleClick({ event: e });
        });
      },
      [plugins]
    );

    const handleCopy = useCallback(
      (e: ClipboardEvent<HTMLDivElement>) => {
        plugins.forEach((plugin) => {
          plugin.handleCopy && plugin.handleCopy({ event: e });
        });

        textareaProps.onCopy && textareaProps.onCopy(e);
      },
      [plugins, textareaProps]
    );

    const handlePaste = useCallback(
      (e: ClipboardEvent<HTMLDivElement>) => {
        if (
          previousRevisions.current.stack[previousRevisions.current.index] !==
          contentEditableEl.current.innerHTML
        ) {
          previousRevisions.current.stack.push(contentEditableEl.current.innerHTML);
          previousRevisions.current.index += 1;
        }

        plugins.forEach((plugin) => {
          plugin.handlePaste && plugin.handlePaste({ event: e });
        });

        textareaProps.onPaste && textareaProps.onPaste(e);
      },
      [plugins, textareaProps]
    );

    const handleFocus = useCallback(
      (e: FocusEvent<HTMLDivElement>) => {
        plugins.forEach((plugin) => {
          plugin.handleFocus && plugin.handleFocus({ event: e });
        });

        textareaProps.onFocus && textareaProps.onFocus(e);
      },
      [plugins, textareaProps]
    );

    const handleBlur = useCallback(
      (e: FocusEvent<HTMLDivElement>) => {
        plugins.forEach((plugin) => {
          plugin.handleBlur && plugin.handleBlur({ event: e });
        });

        textareaProps.onBlur && textareaProps.onBlur(e);
      },
      [plugins, textareaProps]
    );

    const setData = useCallback(
      (data: string, option: { keepRange?: boolean } = { keepRange: true }) => {
        contentEditableEl.current.innerHTML = data;

        contentEditableEl.current.dispatchEvent(new Event('input', { bubbles: true }));

        if (option.keepRange) {
          rangeMoveContentEnd();
        }
      },
      [rangeMoveContentEnd]
    );

    useEffect(() => {
      plugins.forEach((plugin) => {
        plugin.setConfig && plugin.setConfig(config[plugin.commandKey]);
      });
    }, [config, plugins]);

    useEffect(() => {
      if (mutationObserver) {
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
      }
    }, [mutationObserver, handleUndoRedo]);

    useEffect(() => {
      if (initialValue && !contentEditableEl.current.innerHTML && !initValueStatus.current) {
        contentEditableEl.current.innerHTML = initialValue;

        rangeMoveContentEnd();

        initValueStatus.current = true;
      }
    }, [initialValue, rangeMoveContentEnd]);

    useEffect(() => {
      setPlugins(constructEditorPlugin({ plugin, contentEditableEl }));
    }, []);

    useImperativeHandle(ref, () => {
      contentEditableEl.current.setData = setData;

      return contentEditableEl.current;
    });

    return (
      <div className={cx('wp-editor')} onClick={onClick}>
        <WpEditorContents
          ref={contentEditableEl}
          className={cx(className, 'wp-editor-content')}
          {...textareaProps}
          aria-placeholder={placeholder}
          aria-valuemax={maxLength} // maxLength props 를 통해 입력받은 수치를 aria-valuemax 에 할당
          contentEditable
          onInput={handlePostDataChange}
          onPaste={handlePaste}
          onCopy={handleCopy}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onClick={handleClick}
        ></WpEditorContents>
        {plugins
          .filter((plugin) => plugin?.component)
          .map((plugin, index) => {
            const Component = plugin.component;
            return <Component key={plugin.commandKey ?? index} plugin={plugin} />;
          })}
      </div>
    );
  }
);

WpEditor.displayName = 'WpEditor';

export type { Props as WpEditorProps, WpEditorRef };
export default WpEditor;
