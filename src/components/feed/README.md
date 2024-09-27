## FeedBox 컴포넌트

`FeedBox`는 소셜 미디어 피드 항목을 렌더링하는 핵심 컴포넌트입니다. 작성자 정보, 콘텐츠(텍스트, 이미지, 비디오 등), 이모지 반응, 댓글 수, 좋아요 수, 공유 기능 등 다양한 피드 관련 요소들을 하나의 박스로 구성하여 화면에 출력합니다.

### 주요 기능
- **작성자 정보**: 작성자의 프로필 정보와 채널 정보를 표시합니다.
- **이미지 및 비디오**: 피드에 포함된 이미지 또는 미디어를 보여줍니다.
- **이모지 반응**: 피드에 사용자가 이모지를 선택하여 반응할 수 있는 기능을 제공합니다.
- **좋아요 및 댓글**: 피드에 대한 좋아요 및 댓글 수를 표시하고, 해당 버튼을 통해 상호작용할 수 있습니다.
- **링크 미리보기**: 피드에 포함된 링크에 대한 미리보기(OG Meta Data)를 제공합니다.

---

### FeedBox에 사용된 컴포넌트

#### 1. **FeedWriterInfo**
작성자의 이름, 프로필 사진, 채널 정보 등을 보여줍니다. 인증된 사용자인지 여부도 나타냅니다.

#### 2. **FeedImagesView**
피드에 포함된 이미지들을 보여주는 Carousel 컴포넌트입니다. 이미지를 클릭했을 때 사용자 상호작용을 처리할 수 있습니다.

#### 3. **FeedIframesView**
YouTube 및 Twitch와 같은 외부 비디오 콘텐츠를 보여줍니다. IntersectionObserver를 이용해 스크롤에 따른 자동 재생/정지를 지원합니다.

#### 4. **FeedTextContent**
피드 본문 텍스트를 표시합니다. 해시태그 및 멘션을 감지하고, 클릭 시 각각의 상호작용을 처리할 수 있습니다.

#### 5. **FeedLinkPreview**
피드에 포함된 링크의 미리보기 (OG 메타데이터)를 보여줍니다.

#### 6. **FeedEmojiArea**
이모지를 통해 사용자 반응을 표시하고 선택할 수 있는 기능을 제공합니다. 이모지 선택 팝오버와 반응 카운트를 표시합니다.

#### 7. **FeedEtcInfoArea**
좋아요 수, 댓글 수, 공유 기능 등을 포함한 피드의 하단 정보 영역입니다.

---

### 사용 예시

```tsx
import FeedBox from './FeedBox';

const Example = () => {
  return (
    <FeedBox
      writerName="John Doe"
      writerImg="profile.jpg"
      channelName="John's Channel"
      channelImg="channel.jpg"
      channelIsOfficial={true}
      textContent="This is an example feed content with #hashtag and @mention"
      images={["image1.jpg", { src: "image2.jpg", inappositeMsg: "Image not suitable" }]}
      media={[{ type: 'youtube', src: 'https://youtube.com/watch?v=abcd1234' }]}
      emojiList={[{ emojiNo: 1, imageUrl: 'emoji1.png', clickCount: 10, isMyClick: true }]}
      commentCount={5}
      likeCount={20}
      isMyLike={true}
      ogMetaData={{
        title: 'Example Title',
        description: 'This is a description',
        image: 'og_image.jpg',
        url: 'https://example.com'
      }}
      onLikeBtnClick={(e) => console.log('Liked!')}
      onCommentBtnClick={(e) => console.log('Comment clicked!')}
    />
  );
};
```
<br /><br />
## FeedDetailEditor 컴포넌트

`FeedDetailEditor`는 피드 게시글을 작성하고 편집할 수 있는 리치 텍스트 에디터입니다. 이 컴포넌트는 텍스트 입력, 이미지, 비디오, URL 등을 처리할 수 있으며, 마크다운(Markdown)과 HTML 변환, 드래그 앤 드롭 이미지 업로드, iframe 미디어 임베딩 등의 고급 기능을 제공합니다. 또한 텍스트 길이 유효성 검사 및 외부 URL 처리도 가능합니다.

### 주요 기능

- **텍스트 편집**: 사용자가 텍스트를 입력할 수 있으며, 마크다운을 HTML로 자동 변환합니다.
- **이미지 업로드**: 사용자는 이미지를 드래그 앤 드롭으로 추가하거나 파일 입력을 통해 업로드할 수 있습니다.
- **미디어 임베딩**: YouTube와 Twitch 비디오를 URL을 붙여넣는 것만으로 쉽게 게시글에 추가할 수 있습니다.
- **외부 URL 미리보기**: URL을 자동으로 감지하여 메타데이터를 통해 웹 링크 미리보기를 제공합니다.
- **해시태그 및 멘션**: 에디터 내에서 해시태그(`#`)와 멘션(`@`)을 인식하고 처리할 수 있습니다.
- **이모지**: 게시글에 이모지를 추가할 수 있습니다.
- **텍스트 길이 유효성 검사**: 최대 글자 수를 설정할 수 있으며, 실시간 글자 수를 표시하고 유효성을 검사합니다.

---

### FeedDetailEditor에 사용된 컴포넌트 & 플러그인

#### 1. **WpEditor**
텍스트 편집을 위한 에디터로, 작성자의 글을 입력할 수 있는 메인 입력 영역입니다. 해시태그, 멘션, URL 자동 매칭 등 다양한 플러그인과 함께 사용되어 피드 콘텐츠를 보다 풍부하게 작성할 수 있습니다.

#### 2. **Mention**
에디터 내에서 특정 사용자를 멘션하는 기능을 제공하는 플러그인입니다. `@` 기호 뒤에 사용자의 이름을 입력하면 해당 사용자를 멘션으로 변환하여 상호작용할 수 있게 합니다.

#### 3. **HashTag**
해시태그를 자동으로 인식하고, 에디터 내에서 해시태그를 쉽게 추가할 수 있도록 도와줍니다. `#` 기호를 사용하여 키워드를 입력하면 해시태그로 변환됩니다.

#### 4. **AutoUrlMatch**
입력된 텍스트에서 URL을 자동으로 감지하여 하이퍼링크로 변환해 주는 기능을 제공하는 플러그인입니다. URL을 감지하면, 링크로 자동 변환되어 클릭 시 외부 사이트로 이동할 수 있게 됩니다.

#### 5. **PasteToPlainText**
사용자가 텍스트를 붙여넣을 때 HTML 형식의 텍스트를 자동으로 제거하고 순수 텍스트만 남기는 기능을 제공하는 플러그인입니다. 이를 통해 외부에서 복사한 HTML 콘텐츠를 깨끗하게 붙여넣을 수 있습니다.

#### 6. **FeedImagesView**
피드에 포함된 이미지를 Carousel 형태로 보여줍니다. 사용자가 업로드한 이미지를 미리보기 형식으로 보여주며, 여러 장의 이미지를 업로드할 수 있습니다. 이미지 삭제 기능도 포함되어 있습니다.

#### 7. **FeedIframesView**
YouTube, Twitch와 같은 외부 비디오 콘텐츠를 삽입하여 보여줍니다. IntersectionObserver를 통해 사용자가 화면을 스크롤할 때 비디오가 자동으로 재생되거나 일시 정지될 수 있도록 관리합니다.

#### 8. **FeedLinkPreview**
에디터에 입력된 URL에서 OG 메타데이터를 가져와 링크 미리보기를 생성해 보여줍니다. 링크를 클릭하면 해당 URL로 이동할 수 있으며, 메타데이터에는 제목, 설명, 이미지 등이 포함될 수 있습니다.

#### 9. **PopoverButton**
선택 버튼을 클릭하면 팝업 형태로 추가적인 UI를 제공하는 컴포넌트입니다. 카테고리나 채널 선택과 같은 기능을 지원하며, 사용자가 팝오버를 통해 상세 선택을 할 수 있습니다.

#### 10. **Person**
작성자 또는 채널의 프로필 이미지를 표시하는 아바타 컴포넌트입니다. 작성자의 프로필 이미지나 채널 이미지를 동적으로 표시하며, 클릭 시 사용자 정보에 접근할 수 있도록 지원합니다.

#### 11. **Spinner**
로딩 중인 상태를 보여주는 컴포넌트로, 데이터를 처리 중일 때 스피너 애니메이션을 통해 사용자에게 로딩 상태를 표시합니다.

#### 12. **CountTextLength**
에디터에서 입력된 텍스트의 길이를 실시간으로 측정하여 표시하는 플러그인입니다. 사용자가 입력할 수 있는 최대 문자 수를 제한하고, 초과 시 경고를 표시하는 기능도 포함하고 있습니다.

---

### 사용 예시

```jsx
import FeedDetailEditor from './FeedDetailEditor';

const MyFeedEditor = () => {
  const handleTextChange = (value) => {
    console.log('텍스트 내용:', value);
  };

  const handleImageChange = (images) => {
    console.log('이미지 업데이트:', images);
  };

  const handleSubmit = (value) => {
    console.log('제출된 내용:', value);
  };

  return (
    <FeedDetailEditor
      writerName="홍길동"
      writerImg="/images/profile.jpg"
      channelName="테크 채널"
      channelImg="/images/channel.jpg"
      categoryName="기술"
      textValue="최신 기술 소식이 궁금하시다면?"
      handleTextChange={handleTextChange}
      handleImageChange={handleImageChange}
      handleSubmit={handleSubmit}
    />
  );
};
```

---

### 세부 기능 설명

#### 1. **텍스트 에디터**

`FeedDetailEditor`는 `WpEditor`라는 커스터마이징 가능한 에디터를 사용하여 사용자가 리치 텍스트를 입력할 수 있도록 합니다. 텍스트 입력 시 wemixplay 피드 전용 마크다운을 HTML로 변환하며, 실시간으로 내용을 저장하거나 편집할 수 있습니다. `placeholder` 및 `maxLength` 등을 설정할 수 있습니다.

- **텍스트 길이 유효성 검사**: `handleTextChange` 함수를 통해 텍스트가 변경될 때마다 실시간으로 글자 수를 업데이트하고, 설정된 최소 및 최대 글자 수를 유효성 검사합니다.

#### 2. **이미지 업로드**

사용자는 이미지를 드래그 앤 드롭으로 추가하거나 파일 입력을 통해 업로드할 수 있습니다.

- **이미지 처리**: 이미지는 `FeedImagesView` 컴포넌트를 통해 업로드되고 즉시 미리보기가 제공됩니다.
- **파일 업로드 유효성 검사**: 이미지 파일이 형식 및 크기 요구 사항을 충족하는지 확인합니다.
- **이미지 개수 제한**: 최대 이미지 업로드 개수(`imageMaxCnt`)를 제한하여 설정할 수 있습니다.

#### 3. **미디어 임베딩**

유튜브 및 트위치 비디오 URL을 붙여넣으면 자동으로 미디어가 게시글에 임베딩됩니다.

- **미디어 자동 임베딩**: YouTube 또는 Twitch URL을 감지하면 자동으로 임베딩됩니다.
- **미디어 처리**: `FeedIframesView` 컴포넌트를 통해 임베딩된 미디어가 표시되며, 사용자는 필요에 따라 미디어를 삭제할 수 있습니다.
- **미디어 개수 제한**: 업로드 가능한 iframe(미디어)의 최대 개수를 `iframeMaxCnt`를 통해 설정할 수 있습니다.

#### 4. **외부 URL 감지**

에디터 내에서 입력된 URL을 자동으로 감지하고, URL에 해당하는 메타데이터(제목, 설명, 이미지)를 통해 링크 미리보기를 제공합니다.

- **URL 처리**: 감지된 URL은 `handleExternalUrlChange` 함수를 통해 관리됩니다.
- **URL 미리보기**: `FeedLinkPreview` 컴포넌트를 통해 감지된 외부 URL을 리치하게 미리보기할 수 있습니다.

#### 5. **마크다운 변환 및 텍스트 포맷팅**

에디터는 리치 텍스트 포맷팅을 지원하며, 해시태그(`@`) 및 멘션(`@`) 인식을 포함한 마크다운 스타일을 사용할 수 있습니다. 이를 위해 `convertMarkdownToHtmlStr` 및 `convertHtmlToMarkdownStr` 유틸리티를 사용하여 변환 작업을 처리합니다.

#### 6. **제출 로직**

사용자는 모든 조건이 충족되었을 때에만 제출 버튼을 클릭할 수 있습니다.

- 텍스트 콘텐츠가 `minLength` 이상일 경우
- 텍스트 콘텐츠나 이미지 콘텐츠, 미디어 콘텐츠 모두 아무것도 입력되지 않았을 경우
- 이미지가 파일 업로드 중이지 않을 경우

제출 버튼을 클릭하면 `handleSubmit` 콜백이 호출되며, 모든 포스트 데이터(텍스트, 이미지, 미디어, URL 메타데이터)를 구조화된 형태로 제공합니다.