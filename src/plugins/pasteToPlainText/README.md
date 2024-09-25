# PasteToPlainText 플러그인

`PasteToPlainText`는 WpEditor에서 붙여넣기 할 때 HTML 포맷을 제거하고, 텍스트만 남겨서 붙여넣을 수 있도록 지원하는 플러그인입니다. 이 플러그인은 URL 패턴을 추출하여 미디어 링크(이미지, 비디오, iframe 등)와 일반 텍스트 URL을 분리하고, 이를 사용자가 원하는 형식으로 대체할 수 있게 해줍니다.

## 기능

- **HTML 포맷 제거**: 붙여넣기 시 HTML 태그를 제거하고, 텍스트만 남겨서 붙여넣습니다.
- **URL 추출 및 대체**: 붙여넣기된 텍스트에서 URL 패턴을 추출하고, 이미지, 비디오, iframe 태그 등도 URL로 변환할 수 있습니다.
- **URL 대체 처리**: 추출된 URL을 설정된 함수로 대체하여 사용자가 원하는 방식으로 변경할 수 있습니다.
- **문자열 길이 제한**: 설정된 에디터의 최대 문자열 길이를 초과하지 않도록 붙여넣기된 텍스트를 제한합니다.

## 사용법

1. `WpEditor`에 `PasteToPlainText` 플러그인을 추가합니다.

```tsx
import PasteToPlainText from '@/plugins/pasteToPlainText/PasteToPlainText';

// WpEditor에 PasteToPlainText 플러그인 추가
const editorPlugins = [PasteToPlainText];

<WpEditor plugin={editorPlugins} config={{ pasteToPlainText: pasteToPlainTextConfig }} />;
```

2. `pasteToPlainTextConfig` 설정을 통해 붙여넣기된 URL을 대체할 수 있는 함수 및 옵션을 정의할 수 있습니다.

```tsx
const pasteToPlainTextConfig = {
  onMatchUrlReplace: ({ textUrls, mediaUrls }) => {
    console.log('일반 URL:', textUrls);
    console.log('미디어 URL:', mediaUrls);
    return textUrls; // URL을 원하는 형식으로 대체할 수 있습니다.
  }
};
```

## 설정값 (PasteToPlainTextConfig)

`PasteToPlainText` 플러그인은 다양한 설정 옵션을 통해 동작을 제어할 수 있습니다.

- **onMatchUrlReplace**: 붙여넣기된 텍스트에서 URL을 추출하고, 이를 원하는 형식으로 대체할 수 있는 함수입니다.
  
  ```ts
  onMatchUrlReplace?: (params: {
    textUrls: string[];
    mediaUrls: { tag: 'img' | 'video' | 'iframe'; src: string }[];
  }) => string[];
  ```

  - **textUrls**: 일반 텍스트에 포함된 URL 목록입니다.
  - **mediaUrls**: 이미지, 비디오, iframe 등 미디어 URL 목록입니다.
  - **returns**: URL을 대체할 때 사용되는 새로운 URL 목록입니다.

## 주요 메서드

- **setConfig(config: PasteToPlainTextConfig)**: 플러그인의 설정 값을 업데이트합니다.
  
  ```ts
  setConfig(config: PasteToPlainTextConfig): void;
  ```

- **checkHTMLFormat(str: string)**: 주어진 문자열에 HTML 포맷이 있는지 확인합니다.
  
  ```ts
  checkHTMLFormat(str: string): boolean;
  ```

- **getMediaMatchUrlList(str: string)**: 주어진 문자열에서 이미지, 비디오, iframe 태그의 src 속성을 추출하여 배열로 반환합니다.
  
  ```ts
  getMediaMatchUrlList(str: string): { tag: 'img' | 'video' | 'iframe'; src: string }[];
  ```

- **getUrlMatchList(str: string)**: 주어진 문자열에서 URL 패턴을 추출하여 배열로 반환합니다.
  
  ```ts
  getUrlMatchList(str: string): string[];
  ```

- **handlePaste({ event })**: 붙여넣기 이벤트가 발생했을 때 HTML 태그를 제거하고, 텍스트만 남겨서 붙여넣습니다.
  
  ```ts
  handlePaste({ event }: { event: ClipboardEvent<HTMLDivElement> }): void;
  ```

## 주요 이벤트 처리 흐름

### `handlePaste` 설명

`handlePaste` 함수는 클립보드에서 붙여넣기된 텍스트에 포함된 HTML 태그를 제거하고, 순수 텍스트로 변환하여 에디터에 삽입하는 역할을 합니다. 또한, 붙여넣기된 텍스트에서 URL 패턴을 추출하고, 이를 설정된 함수로 대체할 수 있습니다.

#### 1. **HTML 포맷 제거 및 URL 추출**

```ts
const originHtmlTextData = event.nativeEvent.clipboardData.getData('text/html');
const matchMediaList = this.getMediaMatchUrlList(this.checkHTMLFormat(originHtmlTextData));
const matchUrlList = this.getUrlMatchList(plainTextData);
```

- **설명**: 붙여넣기된 HTML 포맷을 검사하여 미디어 URL과 일반 텍스트 URL을 각각 추출합니다.
- **처리**:
  - **미디어 URL 추출**: `<img>`, `<video>`, `<iframe>` 등의 태그에서 `src` 속성을 추출합니다.
  - **일반 텍스트 URL 추출**: 텍스트에서 URL 패턴을 추출합니다.

#### 2. **URL 대체 및 붙여넣기**

```ts
const replaceMatchUrlList = this.config.onMatchUrlReplace?.({
  textUrls: matchUrlList,
  mediaUrls: matchMediaList
}) ?? [];
```

- **설명**: 추출된 URL을 설정된 함수에 전달하여 원하는 형식으로 대체할 수 있습니다. 대체된 URL은 에디터에 삽입됩니다.
- **처리**:
  - **URL 대체**: URL을 설정된 함수에서 대체하여 반환합니다.
  - **텍스트 삽입**: 대체된 URL을 포함한 텍스트를 에디터에 삽입합니다.

---

### 요약

- `handlePaste`는 HTML 태그를 제거하고, 순수 텍스트로 변환하여 에디터에 삽입합니다.
- URL 추출 및 대체 기능을 통해 미디어 URL과 일반 텍스트 URL을 구분하고, 이를 원하는 형식으로 변경할 수 있습니다.