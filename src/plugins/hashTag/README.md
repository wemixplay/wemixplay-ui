# HashTag 플러그인

`HashTag` 플러그인은 커스텀 WpEditor에서 해시태그 기능을 제공하는 플러그인입니다. 이 플러그인은 `#` 기호를 통해 특정 해시태그를 입력할 수 있는 기능을 제공하며, 해시태그 중복 감지, 커스터마이징 가능한 항목 등 다양한 설정을 지원합니다.

## 기능

- **해시태그 리스트**: `#` 기호를 입력하면 자동으로 해시태그 리스트가 열리고, 해당 리스트에서 항목을 선택할 수 있습니다.
- **중복 해시태그 감지**: 동일한 해시태그를 여러 번 입력하지 않도록 설정할 수 있습니다.
- **커스텀 해시태그 아이템**: 해시태그 리스트의 항목을 커스터마이징하여 사용할 수 있습니다.
- **이벤트 기반 확장성**: 해시태그 작성 중, 완료, 리스트 열림/닫힘 등의 이벤트를 설정할 수 있습니다.

## 사용법

1. `WpEditor`에 `HashTag` 플러그인을 추가합니다.

```tsx
import HashTag from '@/plugins/hashTag/HashTag';

// WpEditor에 HashTag 플러그인 추가
const editorPlugins = [HashTag];

<WpEditor plugin={editorPlugins} config={{ hash: hashTagConfig }} />;
```

2. `hashTagConfig`를 통해 해시태그 설정을 관리할 수 있습니다.

```tsx
const hashTagConfig = {
  list: [
    { id: 1, name: 'React' },
    { id: 2, name: 'JavaScript', postCnt: 42 },
  ],
  detectDuplicate: true, // 중복 해시태그 감지 여부
  onWriteHash: (text) => console.log('해시태그 작성 중: ', text),
  onCompleteHash: ({ allHashTag, currentHashTag }) =>
    console.log('완료된 해시태그:', allHashTag),
};
```

## 설정값 (HashTagConfig)

`HashTag` 플러그인은 다양한 설정값을 제공하여 해시태그 동작을 커스터마이징할 수 있습니다.

- **list**: 해시태그 리스트 항목들을 정의하는 배열입니다. 각 항목은 `id`, `name` 필드를 기본으로 가지며, 추가적으로 `postCnt` 등의 필드를 포함할 수 있습니다.
  
  ```ts
  type HashTagInfo = {
    id: number;
    name: string;
    postCnt?: number;
    [key: string]: string | number | undefined;
  };
  ```

- **detectDuplicate**: 중복 해시태그를 허용할지 여부를 지정합니다.
- **listElement**: 해시태그 리스트의 항목을 커스터마이징할 수 있는 JSX 요소를 제공합니다.

  ```tsx
  listElement?: (item: HashTagInfo) => React.JSX.Element;
  ```

- **onWriteHash**: 해시태그를 작성 중일 때 호출되는 함수입니다. 현재 작성 중인 해시태그 텍스트를 전달합니다.
  
  ```ts
  onWriteHash?: (text: string) => void;
  ```

- **onCompleteHash**: 해시태그 입력이 완료되면 호출되는 함수입니다. 전체 해시태그 목록과 현재 완료된 해시태그 정보를 제공합니다.
  
  ```ts
  onCompleteHash?: ({
    allHashTag,
    currentHashTag
  }: {
    allHashTag: HashTagInfo[];
    currentHashTag?: HashTagInfo;
  }) => void;
  ```

- **onOpenHashList**: 해시태그 리스트가 열릴 때 호출되는 함수입니다.
- **onCloseHashList**: 해시태그 리스트가 닫힐 때 호출되는 함수입니다.

## 주요 메서드

- **setConfig(config: HashTagConfig)**: 플러그인의 설정 값을 업데이트합니다.
  
  ```ts
  setConfig(config?: HashTagConfig): void;
  ```

- **handleClick({ event })**: 해시태그 태그가 클릭되었을 때 호출됩니다.
  
  ```ts
  handleClick({ event }: { event: MouseEvent<HTMLDivElement> }): void;
  ```

- **handleKeyDown({ event })**: 키보드 입력이 발생했을 때 호출됩니다. 해시태그 리스트 탐색, 커서 이동 등을 제어합니다.
  
  ```ts
  handleKeyDown({ event }: { event: KeyboardEvent<HTMLDivElement> }): void;
  ```

- **handleChange({ event })**: 에디터 내용이 변경되었을 때 호출됩니다. 해시태그 생성 및 유효성 검사를 포함한 내용을 처리합니다.
  
  ```ts
  handleChange({ event }: { event: ChangeEvent<HTMLDivElement> }): void;
  ```

- **handleUndoRedo()**: `undo` 및 `redo`가 발생했을 때 호출됩니다. 해시태그 상태를 적절히 복구합니다.
  
  ```ts
  handleUndoRedo(): void;
  ```

## 주요 이벤트 처리 흐름

### `handleKeyDown` 함수 설명

`handleKeyDown` 함수는 에디터에서 키보드 입력이 발생했을 때 호출되며, 주로 해시태그의 작성 및 수정 시 커서 이동이나 해시태그 리스트 선택 등을 처리하는 역할을 합니다.

- **방향키(ArrowLeft, ArrowRight)**: 커서가 해시태그 태그 안에서 이동할 때 해시태그 리스트를 열거나 해시태그 동작을 취소할 수 있습니다.
- **위/아래 방향키(ArrowUp, ArrowDown)**: 해시태그 리스트에서 항목을 선택할 때 사용됩니다.
- **엔터키(Enter)**: 해시태그 리스트에서 항목을 선택하거나 새로운 줄을 삽입할 수 있습니다.
- **오른쪽 방향키**: 미완성 해시태그를 빠져나가거나 자동으로 완성할 때 사용됩니다.

#### 1. **방향키 (ArrowLeft, ArrowRight) 처리**

```ts
if (event.code === 'ArrowLeft' || event.code === 'ArrowRight') {
  // 관련 처리
}
```

- **설명**: 좌우 방향키가 눌렸을 때 발생하는 상황을 처리하는 조건문입니다. 커서가 해시태그 내부에 있을 때 리스트를 열거나, 해시태그 수정이 필요한지 확인합니다.

- **처리**:
  1. **커서가 해시태그 내부에서 이동할 때**: 
     - 해시태그 태그 내부에서 좌우 방향키로 커서가 움직일 때, 해시태그 리스트를 다시 활성화할지 확인합니다.
     - 만약 커서가 `#` 기호를 제외한 해시태그 이름 부분에 있을 경우, `hashId`가 설정되고 해시태그 리스트가 열립니다.
  
  2. **커서가 해시태그를 벗어날 때**:
     - 커서가 해시태그 태그의 끝에 도달하거나 벗어날 경우, `hashId`를 빈 값으로 설정하여 해시태그 동작을 취소합니다.

#### 2. **오른쪽 방향키 (ArrowRight)와 미완성 해시태그 처리**

```ts
if (event.code === 'ArrowRight') {
  // 관련 처리
}
```

- **설명**: 오른쪽 방향키가 눌렸을 때, 미완성된 해시태그를 빠져나가거나 자동으로 완성해야 하는 경우를 처리합니다.

- **처리**:
  1. **미완성된 해시태그에 커서가 있을 때**:
     - 커서가 미완성된 해시태그 내부에 있을 때, `this.leaveHashTag()`를 호출하여 해시태그 작성 상태를 종료하고, 해시태그를 완성합니다.
  
  2. **커서가 해시태그 안의 첫 번째 문자 `#`에 있을 때**:
     - 해시태그가 완성되지 않았고, 커서가 첫 번째 문자인 `#`에 있을 경우, 자동으로 해시태그를 완성하고 리스트를 닫습니다.

#### 3. **위/아래 방향키 (ArrowUp, ArrowDown)로 해시태그 리스트 탐색**

```ts
if (event.code === 'ArrowUp' || event.code === 'ArrowDown') {
  // 관련 처리
}
```

- **설명**: 해시태그 리스트가 열려 있을 때, 위/아래 방향키를 사용하여 리스트 항목을 선택할 수 있도록 처리하는 조건문입니다.

- **처리**:
  - 해시태그 리스트가 열려 있는 경우, `handleArrowUp()` 또는 `handleArrowDown()`을 호출하여 해시태그 리스트에서 선택된 항목을 위아래로 이동시킵니다.

#### 4. **엔터키 (Enter)로 해시태그 선택**

```ts
if (event.code === 'Enter') {
  // 관련 처리
}
```

- **설명**: 엔터키를 눌렀을 때, 해시태그를 선택하거나 줄을 나누는 등의 처리를 합니다.

- **처리**:
  1. **해시태그 리스트가 열려 있을 때**:
     - 현재 선택된 항목을 엔터키로 선택하여 `selectHashItem()`을 호출해 해시태그 입력을 완료합니다.
  
  2. **해시태그 태그 내부에서 `#`앞에 커서가 있을때 줄을 나누어야 할 때**:
     - 해시태그를 유지한 채로 해시태그(span)앞에 `br` 태그를 삽입하여 줄을 나누고, 커서가 올바르게 동작하도록 조정합니다.

---

### `handleChange` 함수 설명

`handleChange` 함수는 에디터 내용이 변경될 때 호출되며, 주로 해시태그 작성, 수정, 유효성 검사 등의 로직을 처리합니다.

- **해시태그 시작**: `#` 기호가 입력되면 해시태그를 시작하고 해시태그 리스트를 엽니다.
- **공백 입력 시 해시태그 취소**: 해시태그 안에서 공백이 입력되면 해시태그가 취소됩니다.
- **유효하지 않은 해시태그 취소**: 유효하지 않은 해시태그는 태그를 일반 텍스트로 변환합니다.
- **완성된 해시태그 수정**: 완성된 해시태그가 수정되면 다시 미완성 상태로 변경됩니다.
- **해시태그 리스트 업데이트**: 현재 작성된 해시태그의 상태를 실시간으로 업데이트합니다.

#### 1. **해시태그 시작 감지**

```ts
const isStartHash = 
  !prevCurrentInputChar?.trim() &&
  focusNode?.nodeType === Node.TEXT_NODE &&
  !focusInHashTag &&
  currentInputChar === '#';
```

- **설명**: 사용자가 `#` 기호를 입력하여 해시태그를 시작하려고 할 때 감지하는 조건입니다.

- **처리**:
  - `#` 입력 시 새로운 해시태그가 시작되며, 해시태그를 감싸는 `span` 태그가 생성됩니다. 이때 `hashId`가 생성되고 해시태그 리스트가 열립니다.

#### 2. **공백 입력 시 해시태그 취소**

```ts
if (focusInHashTag && focusOffset === 1 && currentInputChar === ' ') {
  // 관련 처리
}
```

- **설명**: 해시태그 태그 내부에서 공백이 입력되었을 때 해시태그를 취소합니다.

- **처리**:
  - 해시태그가 더 이상 유효하지 않기 때문에 `hashId`를 빈 값으로 설정하고, 해시태그를 일반 텍스트로 변환합니다.

#### 3. **유효하지 않은 해시태그 처리**

```ts
if (focusInHashTag && !this.checkValidHashTag(focusNode.parentElement.textContent)) {
  // 관련 처리
}
```

- **설명**: 입력된 해시태그가 유효하지 않은 경우 해시태그를 취소하고, 유효하지 않은 텍스트를 일반 텍스트로 변환합니다.

- **처리**:
  - 정규식 검사를 통해 유효하지 않은 해시태그는 자동으로 해시태그 태그에서 분리되고, 해시태그 태그가 깨져 일반 텍스트로 전환됩니다.

#### 4. **완성된 해시태그 수정 처리**

```ts
if (focusInCompleteHashTag &&
  focusNode.parentElement.dataset.name.trim() !== 
    focusNode.parentElement.textContent.replace('#', '').trim()) {
  // 관련 처리
}
```

- **설명**: 완성된 해시태그가 수정될 경우 다시 미완성 해시태그로 변경하는 조건입니다.

- **처리**:
  - 완성된 해시태그와 실제 텍스트 내용이 일치하지 않으면 `complete-hash` 클래스를 제거하고, 태그를 다시 미완성 상태로 변경하여 수정을 허용합니다.

#### 5. **해시태그 리스트 및 현재 해시태그 목록 업데이트**

```ts
if (this.currentHashList.length !== this.getAllHashTag().length) {
  this.updateCurrentHashList();
}
```

- **설명**: 해시태그가 추가되거나 삭제될 때 해시태그 목록을 업데이트하는 로직입니다.

- **처리**:
  - `getAllHashTag()` 함수를 호출하여 현재 에디터에 입력된 모든 해시태그를 가져와 `currentHashList`에 저장하고, 해시태그 상태를 업데이트합니다.

---

## 커스텀 해시태그 아이템

해시태그 리스트 항목을 커스터마이징하려면 `listElement` 옵션을 사용할 수 있습니다.

```tsx
const hashTagConfig = {
  list: [
    { id: 1, name: 'React', postCnt: 100 },
    { id: 2, name: 'JavaScript', postCnt: 42 },
  ],
  listElement: (item) => (
    <div>
      <span>{item.name}</span>
      {item.postCnt && <span>({item.postCnt} posts)</span>}
    </div>
  ),
};
```