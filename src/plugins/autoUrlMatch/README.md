# AutoUrlMatch 플러그인

`AutoUrlMatch` 플러그인은 커스텀 WpEditor에서 URL 형식을 감지하여 자동으로 하이퍼링크를 생성해주는 기능을 제공합니다. 사용자가 입력한 URL 형식의 문자열을 자동으로 `<a>` 태그로 변환하고, 해당 URL의 변경 사항을 처리합니다.

## 기능

- **자동 URL 감지**: 에디터에 입력된 텍스트 중 URL 형식의 문자열을 자동으로 감지하여 하이퍼링크로 변환합니다.
- **하이퍼링크 생성 및 수정**: 감지된 URL은 자동으로 `<a>` 태그로 변환되며, 사용자가 수정할 경우 해당 `<a>` 태그를 업데이트합니다.
- **이벤트 기반 URL 감지**: URL이 감지되거나 변경될 때 특정 콜백 함수를 실행할 수 있습니다.

## 사용법

1. `WpEditor`에 `AutoUrlMatch` 플러그인을 추가합니다.

```tsx
import AutoUrlMatch from '@/plugins/autoUrlMatch/AutoUrlMatch';

// WpEditor에 AutoUrlMatch 플러그인 추가
const editorPlugins = [AutoUrlMatch];

<WpEditor plugin={editorPlugins} config={{ autoUrlMatch: autoUrlMatchConfig }} />;
```

2. `autoUrlMatchConfig`를 통해 URL 매칭 및 변경 시 처리할 이벤트 핸들러를 정의할 수 있습니다.

```tsx
const autoUrlMatchConfig = {
  onMatchUrl: (url) => console.log('URL 감지됨: ', url),
  onChangeMatchUrls: (urls) => console.log('URL 목록 변경됨: ', urls),
};
```

## 설정값 (AutoUrlMatchConfig)

`AutoUrlMatch` 플러그인은 다양한 설정값을 제공하여 URL 매칭 시의 동작을 제어할 수 있습니다.

- **onMatchUrl**: URL이 감지되었을 때 호출되는 함수입니다. 감지된 URL을 파라미터로 전달합니다.
  
  ```ts
  onMatchUrl?: (url: string) => void;
  ```

- **onChangeMatchUrls**: 에디터에 입력된 URL 목록이 변경되었을 때 호출되는 함수입니다. 변경된 URL 배열을 파라미터로 전달합니다.
  
  ```ts
  onChangeMatchUrls?: (urls: string[]) => void;
  ```

## 주요 메서드

- **setConfig(config: AutoUrlMatchConfig)**: 플러그인의 설정 값을 업데이트합니다.
  
  ```ts
  setConfig(config: AutoUrlMatchConfig): void;
  ```

- **getUrlMatchList(str: string)**: 문자열에서 URL 형식의 문자열을 감지하고, URL 목록을 반환합니다.
  
  ```ts
  getUrlMatchList(str: string): string[];
  ```

- **handleKeyDown({ event })**: 키보드 입력이 발생했을 때 호출되는 함수입니다. URL을 감지하고, 하이퍼링크를 자동으로 생성하거나 수정합니다.
  
  ```ts
  handleKeyDown({ event }: { event: KeyboardEvent<HTMLDivElement> }): void;
  ```

- **handleChange({ event })**: 에디터 내용이 변경되었을 때 호출됩니다. 감지된 URL이 없거나 잘못된 URL인 경우 일반 텍스트로 변환합니다.
  
  ```ts
  handleChange({ event }: { event: ChangeEvent<HTMLDivElement> }): void;
  ```

## 주요 이벤트 처리 흐름

### `handleKeyDown` 설명

`handleKeyDown` 함수는 에디터에서 키보드 입력이 발생할 때 URL 형식을 감지하고, URL이 입력된 경우 자동으로 하이퍼링크를 생성하는 역할을 합니다. 공백 또는 엔터키가 입력될 때 URL을 감지하고 `<a>` 태그로 변환합니다.

#### 1. **공백 또는 엔터 입력 시 URL 감지**

```ts
if (event.code === 'Space' || event.code === 'Enter' || event.code === 'NumpadEnter') {
  // 관련 처리
}
```

- **설명**: 사용자가 URL을 입력한 후, 공백이나 엔터를 입력하면 해당 URL을 감지하여 `<a>` 태그로 변환합니다.
- **처리**:
  - **공백이 입력된 경우**: URL을 감지하여, 감지된 URL을 기반으로 `<a>` 태그를 생성합니다. 그 후 공백을 추가하고 커서를 적절한 위치로 이동시킵니다.
  - **엔터가 입력된 경우**: URL을 감지하여, 감지된 URL을 `<a>` 태그로 변환하고, 이후 공백을 추가하고 커서를 적절한 위치로 이동시킵니다.

#### 2. **이미 존재하는 `<a>` 태그 안에서의 URL 수정 처리**

```ts
if (focusNode.parentElement?.tagName === 'A') {
  // 관련 처리
}
```

- **설명**: 이미 `<a>` 태그로 감싸진 URL이 수정되는 경우, 해당 태그의 내용을 업데이트합니다.
- **처리**:
  - **URL이 수정된 경우**: `<a>` 태그의 `href` 속성을 수정된 URL로 변경합니다.
  - **URL 형식이 아닌 텍스트가 입력된 경우**: `<a>` 태그를 일반 텍스트 노드로 변환합니다.

### `handleChange` 설명

`handleChange` 함수는 에디터 내용이 변경될 때마다 호출되어, URL이 제거되었거나 잘못된 형식으로 변환된 경우 `<a>` 태그를 제거하고 일반 텍스트로 되돌리는 작업을 수행합니다.

#### 1. **URL 형식이 아닌 `<a>` 태그 제거**

```ts
if (focusNode.parentElement?.tagName === 'A') {
  if (!this.getUrlMatchList(focusNode.textContent).length) {
    // 관련 처리
  }
}
```

- **설명**: `<a>` 태그 안에 있는 텍스트가 URL 형식에 맞지 않으면 일반 텍스트로 변환합니다.
- **처리**:
  - `<a>` 태그의 텍스트가 더 이상 URL 형식에 맞지 않으면 태그를 제거하고 텍스트 노드로 변환합니다.

#### 2. **URL 목록 변경 감지**

```ts
if (matchUrls.length !== this.urls.length || !matchUrls.every((url) => this.urls.includes(url))) {
  // 관련 처리
}
```

- **설명**: 에디터에 입력된 URL 목록이 변경된 경우를 감지하여 `onChangeMatchUrls` 콜백 함수를 호출합니다.
- **처리**:
  - 에디터에 있는 모든 URL을 다시 확인하고, 변경된 URL 목록을 콜백 함수로 전달합니다.

---

### 요약

- `handleKeyDown`은 주로 URL 입력 및 수정 작업을 처리하며, URL을 감지하여 `<a>` 태그로 변환하고, 그 뒤에 공백이나 줄바꿈을 추가합니다.
- `handleChange`는 에디터 내용 변경 시 `<a>` 태그의 유효성을 확인하고, 잘못된 형식의 URL을 일반 텍스트로 되돌리는 작업을 수행합니다.