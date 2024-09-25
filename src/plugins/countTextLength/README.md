# CountTextLength 플러그인

`CountTextLength`는 WpEditor에서 사용자가 입력하는 문자의 길이를 실시간으로 추적하고, 설정된 최대 길이를 넘지 않도록 관리하는 플러그인입니다. 이 플러그인은 최대 글자 수에 도달하면 추가 입력을 제한하고, 문자열 길이 표시 UI도 제공하여 사용자가 현재 입력 상태를 쉽게 파악할 수 있습니다.

## 기능

- **문자 길이 실시간 추적**: 에디터에 입력된 문자열의 길이를 실시간으로 추적하여 화면에 표시합니다.
- **최대 문자 길이 제한**: 설정된 최대 문자 길이보다 초과된 입력을 방지합니다.
- **길이 초과 시 경고 스타일**: 입력된 문자가 최대 길이를 초과하면 UI에 경고 스타일을 적용하여 사용자에게 시각적인 경고를 제공합니다.
- **커스터마이징 가능한 UI**: 사용자 정의 UI를 숨기거나 다른 방식으로 커스터마이즈할 수 있습니다.
- **문자 길이 변경 이벤트**: 문자 길이가 변경될 때마다 특정 이벤트를 실행할 수 있습니다.

## 사용법

1. `WpEditor`에 `CountTextLength` 플러그인을 추가합니다.

```tsx
import CountTextLength from '@/plugins/countTextLength/CountTextLength';

// WpEditor에 CountTextLength 플러그인 추가
const editorPlugins = [CountTextLength];

<WpEditor plugin={editorPlugins} config={{ countTextLength: countTextLengthConfig }} />;
```

2. `countTextLengthConfig` 설정을 통해 문자의 최대 길이와 이벤트 핸들러를 정의할 수 있습니다.

```tsx
const countTextLengthConfig = {
  hideUi: false,
  onChangeTextLength: (length) => console.log('현재 문자 길이: ', length),
};
```

## 설정값 (CountTextLengthConfig)

`CountTextLength` 플러그인은 다양한 설정 옵션을 제공하여 문자열 길이 추적에 대한 동작을 제어할 수 있습니다.

- **hideUi**: 플러그인에서 제공하는 기본 UI(문자 길이 표시)를 숨길지 여부를 결정합니다.
  
  ```ts
  hideUi?: boolean;
  ```

- **onChangeTextLength**: 문자열 길이가 변경될 때 호출되는 함수입니다. 현재 문자열 길이를 전달합니다.
  
  ```ts
  onChangeTextLength?: (length: number) => void;
  ```

## 주요 메서드

- **setConfig(config: CountTextLengthConfig)**: 플러그인의 설정 값을 업데이트합니다. 

  ```ts
  setConfig(config: CountTextLengthConfig): void;
  ```

- **countText()**: 에디터에서 현재 입력된 문자열의 길이를 계산하여 반환하고, UI에 반영합니다.
  
  ```ts
  countText(): number;
  ```

- **handleKeyDown({ event })**: 키보드 입력이 발생했을 때 호출됩니다. 문자열 길이를 초과하지 않도록 입력을 제한합니다.
  
  ```ts
  handleKeyDown({ event }: { event: KeyboardEvent<HTMLDivElement> }): void;
  ```

- **handleChange({ event })**: 에디터에서 내용이 변경되었을 때 호출되며, 초과된 문자열을 삭제하거나 커서를 조정합니다.
  
  ```ts
  handleChange({ event }: { event: ChangeEvent<HTMLDivElement> }): void;
  ```

## 주요 이벤트 처리 흐름

### `handleKeyDown` 설명

`handleKeyDown` 함수는 사용자가 키보드를 통해 문자열을 입력할 때 호출되며, 최대 문자열 길이를 초과하지 않도록 제한하는 역할을 합니다.

#### 1. **최대 길이 초과 시 입력 제한**

```ts
if (maxLength && currLength >= maxLength) {
  // 관련 처리
}
```

- **설명**: 현재 입력된 문자열의 길이가 설정된 최대 길이에 도달한 경우, 더 이상의 입력을 제한합니다.
- **처리**:
  - **허용되는 키**: 방향키, 복사, 붙여넣기, 삭제 등의 특정 키만 허용되며, 그 외의 입력은 제한됩니다.
  - **예외 처리**: 전체 선택(⌘ + A), 복사(⌘ + C), 잘라내기(⌘ + X), 되돌리기(⌘ + Z) 등의 기능은 여전히 허용됩니다.

### `handleChange` 설명

`handleChange` 함수는 에디터 내용이 변경될 때 호출되며, 최대 길이를 초과하는 경우 초과된 문자열을 삭제하거나 커서를 적절한 위치로 조정합니다.

#### 1. **최대 길이 초과 시 문자열 삭제**

```ts
if (currLength > maxLength) {
  // 관련 처리
}
```

- **설명**: 에디터에 입력된 문자열이 최대 길이를 초과한 경우, 초과된 부분을 삭제하고 커서를 적절한 위치로 이동시킵니다.
- **처리**:
  - **초과된 문자 삭제**: 초과된 부분을 제거하여 최대 길이를 유지합니다.
  - **커서 위치 조정**: 초과된 문자열이 삭제된 후, 커서를 삭제된 문자 직후에 위치시킵니다.

---

### 요약

- `handleKeyDown`은 키보드 입력을 제어하여 최대 문자열 길이를 초과하지 않도록 방지합니다.
- `handleChange`는 내용 변경 시 초과된 문자열을 제거하고, 적절한 커서 위치로 조정합니다.