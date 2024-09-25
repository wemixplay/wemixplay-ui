
# Mention 플러그인

`Mention` 플러그인은 커스텀 WpEditor에서 멘션 기능을 제공하는 플러그인입니다. 이 플러그인은 `@` 기호를 통해 특정 사용자나 개체를 멘션할 수 있는 기능을 제공하며, 멘션 중복 감지, 멘션 제한 등 다양한 설정을 제공합니다.

## 기능

- **멘션 리스트**: `@` 기호를 입력하면 자동으로 멘션 리스트가 열리고, 해당 리스트에서 항목을 선택할 수 있습니다.
- **중복 멘션 감지**: 동일한 멘션을 여러 번 입력하지 않도록 설정할 수 있습니다.
- **멘션 제한**: 최대 멘션 개수를 설정하여 제한된 수의 멘션만 입력할 수 있습니다.
- **커스텀 멘션 아이템**: 멘션 리스트의 항목을 커스터마이징하여 사용할 수 있습니다.
- **이벤트 기반의 확장성**: 멘션 작성 중, 완료, 리스트 열림/닫힘 등의 이벤트를 설정할 수 있습니다.

## 사용법

1. `WpEditor`에 `Mention` 플러그인을 추가합니다.

```tsx
import Mention from '@/plugins/mention/Mention';

// WpEditor에 Mention 플러그인 추가
const editorPlugins = [Mention];

<WpEditor plugin={editorPlugins} config={{ mention: mentionConfig }} />;
```

2. `mentionConfig`를 통해 멘션 설정을 관리할 수 있습니다.

```tsx
const mentionConfig = {
  list: [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Doe', profileImg: 'path/to/image' },
  ],
  maxMentionCnt: 5, // 최대 멘션 개수
  detectDuplicate: true, // 중복 멘션 감지
  onWriteMention: (text) => console.log('멘션 작성 중: ', text),
  onCompleteMention: ({ allMention, currentMention }) =>
    console.log('완료된 멘션:', allMention),
};
```

## 설정값 (MentionConfig)

`Mention` 플러그인은 다양한 설정값을 제공합니다. 이를 통해 사용자 요구에 맞게 동작을 조정할 수 있습니다.

- **list**: 멘션할 수 있는 객체들의 배열입니다. 각 객체는 `id`, `name` 필드를 가져야 하며, 추가적으로 `profileImg`, `isOfficial` 등의 필드를 추가할 수 있습니다.
  
  ```ts
  type MentionInfo = {
    id: number;
    name: string;
    profileImg?: string;
    isOfficial?: boolean;
    [key: string]: string | number | boolean | undefined;
  };
  ```

- **maxMentionCnt**: 입력할 수 있는 최대 멘션 개수를 지정합니다. 기본값은 무제한입니다.
- **detectDuplicate**: 중복 멘션을 허용할지 여부를 지정합니다.
- **listElement**: 멘션 리스트의 항목을 커스터마이징할 수 있는 JSX 요소를 제공합니다.

  ```tsx
  listElement?: (item: MentionInfo) => React.JSX.Element;
  ```

- **onWriteMention**: 멘션을 작성 중일 때 호출되는 함수입니다. 현재 작성 중인 텍스트를 전달합니다.
  
  ```ts
  onWriteMention?: (text: string) => void;
  ```

- **onCompleteMention**: 멘션 입력이 완료되면 호출되는 함수입니다. 전체 멘션 목록과, 현재 완료된 멘션 정보를 제공합니다.
  
  ```ts
  onCompleteMention?: ({
    allMention,
    currentMention
  }: {
    allMention: MentionInfo[];
    currentMention?: MentionInfo;
  }) => void;
  ```

- **onOpenMentionList**: 멘션 리스트가 열릴 때 호출되는 함수입니다.
- **onCloseMentionList**: 멘션 리스트가 닫힐 때 호출되는 함수입니다.
- **onMaxMentionList**: 설정된 최대 멘션 개수를 초과할 때 호출되는 함수입니다. 기본적으로 alert 창을 띄웁니다.

## 주요 메서드

- **setConfig(config: MentionConfig)**: 플러그인의 설정 값을 업데이트합니다.
  
  ```ts
  setConfig(config?: MentionConfig): void;
  ```

- **handleClick({ event })**: 멘션 태그가 클릭되었을 때 호출됩니다.
  
  ```ts
  handleClick({ event }: { event: MouseEvent<HTMLDivElement> }): void;
  ```

- **handleKeyDown({ event })**: 키보드 입력이 발생했을 때 호출됩니다. 멘션 리스트 탐색, 커서 이동 등을 제어합니다.
  
  ```ts
  handleKeyDown({ event }: { event: KeyboardEvent<HTMLDivElement> }): void;
  ```

- **handleChange({ event })**: 에디터 내용이 변경되었을 때 호출됩니다. 멘션 생성을 포함한 내용을 처리합니다.
  
  ```ts
  handleChange({ event }: { event: ChangeEvent<HTMLDivElement> }): void;
  ```

- **handleUndoRedo()**: `undo` 및 `redo`가 발생했을 때 호출됩니다. 멘션 상태를 적절히 복구합니다.
  
  ```ts
  handleUndoRedo(): void;
  ```

## 주요 이벤트 처리 흐름


### `handleKeyDown` 설명

`handleKeyDown` 함수는 키보드 입력 시 동작을 처리하는 함수입니다. 주로 방향키, 엔터키, 삭제 키 등의 동작을 처리하며, 멘션 리스트와의 상호작용을 관리합니다.

- **방향키(ArrowLeft, ArrowRight)**: 커서가 멘션 태그 안에서 이동할 때 멘션 리스트를 열거나 멘션을 취소할 수 있습니다.
- **위/아래 방향키(ArrowUp, ArrowDown)**: 멘션 리스트에서 항목을 선택할 때 사용됩니다.
- **엔터키(Enter)**: 멘션 리스트에서 항목을 선택하거나 새로운 줄을 삽입할 수 있습니다.
- **오른쪽 방향키**: 미완성 멘션을 빠져나가거나 자동으로 완성할 때 사용됩니다.

#### 1. **방향키 (ArrowLeft, ArrowRight) 처리**

```ts
if (event.code === 'ArrowLeft' || event.code === 'ArrowRight') {
  // 관련 처리
}
```

- **설명**: 좌우 방향키가 눌렸을 때 처리하는 조건문입니다. 커서가 멘션 내부에 있을 때 멘션을 수정하거나 리스트를 열어야 할 경우를 감지합니다.

- **처리**
  1. **포커싱된 요소가 `mention` 태그인지 확인**:
     - `focusInMentionTag`로 커서가 멘션 태그 안에 위치한지를 확인합니다.
  2. **커서가 멘션 안에서 이동할 때 멘션 리스트 열기**:
     - 멘션 태그의 특정 위치에서 좌우로 이동할 때 리스트를 다시 열기 위해 `mentionId`를 설정하여, 리스트를 재활성화 시킵니다.
  3. **커서가 멘션을 벗어날 때 멘션을 취소**:
     - 멘션 내부에서 커서가 태그를 완전히 벗어날 때 `mentionId`를 빈 값으로 설정해 멘션 동작을 취소합니다.

#### 2. **오른쪽 방향키 (ArrowRight)와 미완성 멘션 처리**

```ts
if (event.code === 'ArrowRight') {
  // 관련 처리
}
```

- **설명**: 오른쪽 방향키가 눌렸을 때, 미완성된 멘션을 빠져나가거나 자동으로 완성합니다.

- **처리**
  1. **멘션이 완성되지 않은 상태에서 커서가 멘션의 마지막에 위치할 경우**:
     - `this.leaveMentionTag()`를 호출하여 멘션을 빠져나가게 처리합니다.
  2. **커서가 멘션 태그 안에 있고, 첫 번째 문자가 `@`일 경우**:
     - 자동으로 멘션을 완성하고 리스트를 닫습니다.

#### 3. **위/아래 방향키 (ArrowUp, ArrowDown)로 멘션 리스트 탐색**

```ts
if (event.code === 'ArrowUp' || event.code === 'ArrowDown') {
  // 관련 처리
}
```

- **설명**: 멘션 리스트가 열렸을 때, 위/아래 방향키로 리스트 항목을 선택할 수 있도록 처리하는 조건문입니다.

- **처리**
  - `handleArrowUp()` 또는 `handleArrowDown()`을 호출하여 리스트에서 선택된 항목을 위아래로 이동시키며, 해당 항목을 선택할 수 있게 합니다.

#### 4. **엔터키 (Enter)로 멘션 선택**

```ts
if (event.code === 'Enter') {
  // 관련 처리
}
```

- **설명**: 엔터키를 눌렀을 때, 멘션을 선택하거나 새로운 줄을 삽입하는 처리를 합니다.

- **처리**
  1. **멘션 리스트가 열려 있을 때**:
     - 현재 선택된 항목을 엔터키로 선택하여 `selectMentionItem()`을 호출해 멘션을 완료합니다.
  2. **멘션 태그 안에 커서가 있고 `@`앞에 커서가 있을때, 줄바꿈을 삽입해야 할 때**:
     - 멘션을 유지한 채로 멘션태그(span) 앞에 `br` 태그를 삽입하여 줄을 나눕니다.

---

### `handleChange` 설명

`handleChange` 함수는 에디터 내용이 변경되었을 때 호출되며, 멘션 관련 텍스트 변화를 처리합니다. 주로 멘션을 생성하거나, 잘못된 멘션을 수정하는 로직을 포함합니다.

- **멘션 시작**: `@` 기호가 입력되면 멘션을 시작하고 멘션 리스트를 엽니다.
- **공백 입력 시 멘션 취소**: 멘션 태그 안에서 공백이 입력되면 멘션이 취소됩니다.
- **유효하지 않은 멘션 취소**: 유효하지 않은 멘션은 태그를 일반 텍스트로 변환합니다.
- **완성된 멘션 수정**: 완성된 멘션이 수정되면 다시 미완성 상태로 변경됩니다.
- **멘션 리스트 업데이트**: 현재 작성된 멘션의 상태를 실시간으로 업데이트합니다.

#### 1. **멘션 시작 처리**

```ts
const isStartMention = 
  !prevCurrentInputChar?.trim() &&
  focusNode?.nodeType === Node.TEXT_NODE &&
  !focusInMentionTag &&
  currentInputChar === '@';
```

- **설명**: 사용자가 `@`를 입력하여 멘션을 시작하려고 할 때를 감지하는 조건입니다.

- **처리**
  - `@` 입력 시 새로운 멘션을 시작하고, 해당 `@`를 `span` 요소로 감싸며 멘션 상태를 유지합니다. 이때 `mentionId`를 생성하고 리스트를 엽니다.

#### 2. **공백 입력 시 멘션 취소 처리**

```ts
if (focusInMentionTag && focusOffset === 1 && currentInputChar === ' ') {
  // 관련 처리
}
```

- **설명**: 멘션 태그 안에서 공백이 입력되었을 때 멘션을 취소합니다.

- **처리**
  - 멘션 태그를 제거하고, 공백을 포함한 일반 텍스트로 변환합니다.

#### 3. **유효하지 않은 멘션 처리**

```ts
if (focusInMentionTag && !this.checkValidMention(focusNode.textContent)) {
  // 관련 처리
}
```

- **설명**: 멘션에 입력된 내용이 유효하지 않은 경우, 멘션을 취소합니다.

- **처리**
  - 유효하지 않은 멘션 텍스트를 감지하고, `mention` 태그를 일반 텍스트로 변환합니다.

#### 4. **완성된 멘션 수정 처리**

```ts
if (focusInCompleteMentionTag &&
  focusNode.parentElement.dataset.name.trim() !== 
    focusNode.parentElement.textContent.replace('@', '').trim()) {
  // 관련 처리
}
```

- **설명**: 완성된 멘션의 이름이 수정되었을 때, 다시 미완성 멘션으로 변경합니다.

- **처리**
  - `complete-mention` 클래스를 `will-mention` 클래스로 변경하여 다시 미완성 상태로 돌아가며, 추가적인 수정을 허용합니다.

#### 5. **멘션 리스트와 현재 멘션 수 업데이트**

```ts
if (this.currentMentionList.length !== allMentionEls.length) {
  this.getCurrentMentionList();
}
```

- **설명**: 멘션이 추가되거나 삭제될 때, 에디터의 멘션 상태를 업데이트합니다.

- **처리**
  - `getCurrentMentionList()`를 호출하여 현재 작성된 멘션 목록을 업데이트하고, 새로운 멘션 정보를 반영합니다.

---

### 요약

- `handleKeyDown`은 주로 방향키 및 엔터키와 같은 키보드 이벤트를 처리하며, 멘션 리스트 탐색, 멘션 태그 수정, 멘션 완료 등의 동작을 제어합니다.
- `handleChange`는 에디터 내용이 변경될 때 멘션 생성, 취소, 수정 등의 동작을 처리하며, 현재 입력 중인 멘션 상태를 실시간으로 관리합니다.


## 커스텀 멘션 아이템

멘션 리스트 항목을 커스터마이징하려면 `listElement` 옵션을 사용할 수 있습니다.

```tsx
const mentionConfig = {
  list: [
    { id: 1, name: 'John Doe', profileImg: 'path/to/img' },
    { id: 2, name: 'Jane Doe', isOfficial: true },
  ],
  listElement: (item) => (
    <div>
      {item.profileImg && <img src={item.profileImg} alt={`${item.name}'s profile`} />}
      <span>{item.name}</span>
      {item.isOfficial && <span>✔️</span>}
    </div>
  ),
};
```