# WpEditor

`WpEditor`는 다양한 플러그인을 지원하는 **리치 텍스트 에디터** 컴포넌트로, 플러그인을 통해 모든 동작을 제어할 수 있습니다. **개행 처리**, **기본적인 복구 및 되돌리기 기능**, **`font` 태그 자동 삭제** 외에는 **모든 기능이 플러그인으로 위임**되며, **플러그인에 따라 에디터의 성격이 결정**됩니다. 이를 통해 사용자는 `WpEditor`를 필요에 맞게 유연하게 커스터마이징할 수 있습니다.

## 주요 기능

- **플러그인 지원**: 플러그인 시스템을 통해 텍스트 편집기의 성격을 결정할 수 있습니다. 모든 기능(텍스트 스타일링, 포맷, 특수 기능 등)은 플러그인을 통해 구현됩니다.
- **Undo/Redo**: 기본적으로 복구 및 되돌리기 기능을 지원합니다.
- **개행 처리**: 텍스트 입력 시 엔터키를 통한 개행을 기본적으로 처리합니다.
- **`font` 태그 자동 삭제**: 복사 붙여넣기 등으로 인한 불필요한 `<font>` 태그는 자동으로 제거됩니다.

> **참고**: 위의 기본 동작을 제외한 나머지 모든 에디터 동작은 플러그인을 통해 구현되어야 합니다. 즉, `WpEditor`는 플러그인을 사용하지 않으면 단순한 텍스트 입력 상자에 불과하며, 각종 포맷팅, 커스텀 동작은 모두 플러그인에서 정의됩니다.

## 사용 방법

```tsx
import WpEditor from './components/WpEditor';

const MyComponent = () => {
  const handleChange = (value: string) => {
    console.log('Editor content:', value);
  };

  // 에디터의 초기 값 설정
  return (
    <WpEditor
      className="my-editor"
      initialValue="Hello, world!"
      placeholder="Enter your text here..."
      maxLength={1000}
      handleChange={handleChange}
      plugin={[MyCustomPlugin]}  // 플러그인 적용
    />
  );
};
```

## 주요 Props

| Prop             | Type                                              | Description                                                                      |
|------------------|---------------------------------------------------|----------------------------------------------------------------------------------|
| `initialValue`   | `string`                                          | 에디터에 초기값을 설정할 수 있습니다.                                             |
| `placeholder`    | `string`                                          | 아무 텍스트가 입력되지 않았을 때 보여줄 플레이스홀더 텍스트입니다.                |
| `maxLength`      | `number`                                          | 텍스트의 최대 길이를 제한할 수 있습니다.                                          |
| `plugin`         | `WpEditorPluginConstructor[]`                     | 에디터에 적용할 플러그인 배열입니다.                                              |
| `config`         | `object`                                          | 각종 플러그인의 설정을 지정할 수 있습니다.                                         |
| `handleChange`   | `(value: string, name?: string) => void`          | 에디터의 내용이 변경될 때 호출되는 콜백 함수입니다.                                |



### initialValue와 setData

`initialValue`는 **초기 렌더링 시에만 적용**되는 값입니다. 이 값은 에디터가 처음 마운트될 때 한 번만 설정되며, 그 이후로는 `initialValue`가 변경되어도 에디터 내용이 자동으로 업데이트되지 않습니다.

만약 **중간에 에디터 내용을 업데이트하거나 수정**하고 싶다면, `initialValue` 대신 **`setData`** 메서드를 사용해야 합니다. `setData`를 사용하면 에디터의 내용을 프로그램적으로 변경할 수 있습니다.

```tsx
// 에디터 내용을 동적으로 업데이트하는 예시
const MyComponent = () => {
  const editorRef = useRef(null);

  const updateEditorContent = () => {
    if (editorRef.current) {
      editorRef.current.setData("새로운 내용이 여기에 적용됩니다.");
    }
  };

  return (
    <>
      <WpEditor
        ref={editorRef}
        initialValue="Hello, world!"
        placeholder="Enter your text here..."
      />
      <button onClick={updateEditorContent}>Update Content</button>
    </>
  );
};
```

이 예시에서, 버튼을 클릭하면 `setData` 메서드를 통해 에디터의 내용을 동적으로 변경할 수 있습니다.

## 플러그인 작성 방법

`WpEditor`의 플러그인을 만들 때는 `WpEditorPlugin` 타입을 **확장**하여 작성해야 하며, **플러그인이 에디터의 모든 동작을 정의**합니다. 플러그인을 통해 텍스트 포맷팅, 키보드 이벤트 처리, 사용자 인터페이스 구성 등을 제어할 수 있습니다.

### WpEditorPlugin 인터페이스

```ts
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
```

### 이벤트 핸들러

플러그인에 정의되는 각종 **이벤트 핸들러**는 `WpEditor`의 `contentEditable` 요소에서 발생하는 이벤트를 처리할 수 있도록 설계되었습니다. 에디터에서 발생하는 <u>모든 동작(키보드 입력, 마우스 클릭, 텍스트 붙여넣기 등)은 해당 핸들러를 통해 플러그인으로 전달</u>됩니다.

- **handleClick**: 클릭 이벤트를 처리합니다.
- **handleKeyDown**: 키보드 입력 이벤트를 처리합니다.
- **handleChange**: 텍스트 변경 이벤트를 처리합니다.
- **handlePaste**: 텍스트 붙여넣기 이벤트를 처리합니다.
- **handleCopy**: 텍스트 복사 이벤트를 처리합니다.
- **handleFocus**: 에디터가 포커스를 받을 때 호출됩니다.
- **handleBlur**: 에디터가 포커스를 잃을 때 호출됩니다.
- **handleUndoRedo**: 되돌리기 및 재실행 이벤트를 처리합니다.

이러한 핸들러들은 `WpEditor`의 `contentEditable` 요소에서 발생하는 이벤트를 받아 처리하는 방식으로, 플러그인에 따라 에디터의 다양한 기능을 확장할 수 있습니다.

### 플러그인 예시

```ts
class MyPlugin implements WpEditorPlugin {
  commandKey = 'myPlugin';
  contentEditableEl: MutableRefObject<HTMLDivElement>;
  config: any;

  constructor({ contentEditableEl }: { contentEditableEl: MutableRefObject<HTMLDivElement> }) {
    this.contentEditableEl = contentEditableEl;
  }

  setConfig(config: any) {
    this.config = config;
  }

  handleKeyDown({ event }: { event: KeyboardEvent<HTMLDivElement> }) {
    if (event.key === 'Enter') {
      console.log('Enter key pressed!');
    }
  }

  handleChange({ event }: { event: ChangeEvent<HTMLDivElement> }) {
    console.log('Content changed:', this.contentEditableEl.current.innerHTML);
  }
}
```

## 여러 플러그인을 동시에 사용할 때 충돌을 방지하려면?

각 플러그인은 특정한 역할만 담당하도록 설계해야 합니다. 즉, 플러그인이 자신의 책임을 넘어 다른 플러그인의 역할을 침범하지 않도록 기능을 모듈화합니다. 예를 들어, 하나의 플러그인이 텍스트 포맷팅을 담당하고, 다른 플러그인이 이미지 삽입을 담당하도록 서로의 역할이 분리되어야 합니다. 이렇게 하면 플러그인 간의 충돌 가능성을 크게 줄일 수 있습니다.