## WemixPlay UI

이 프로젝트는 **WemixPlay** 플랫폼에 사용되는 피드, 댓글, 에디터 등의 UI 컴포넌트를 포함한 다양한 공통 컴포넌트, 모듈, 유틸리티를 모아둔 라이브러리입니다. **WemixPlay**의 프론트엔드 개발을 위한 재사용 가능한 컴포넌트와 기능들을 관리하고, 일관성 있는 사용자 경험을 제공하기 위해 설계되었습니다.

### 프로젝트 구조

- **UI 컴포넌트**: Feed, Comment, Editor 등 WemixPlay에 최적화된 UI 요소들을 제공합니다.
- **공통 모듈**: 여러 컴포넌트에서 사용되는 상태 관리, 로직 등을 재사용 가능한 형태로 분리하여 제공합니다.
- **공통 유틸리티**: 데이터 포맷 변환, 시간 계산, URL 처리 등의 유틸리티 함수들을 포함합니다. 

### 주요 기능

1. **피드 시스템**
   - **FeedBox**: 사용자 피드 게시글을 렌더링하는 컴포넌트로, 작성자 정보, 이미지 및 비디오, 좋아요 및 댓글 기능 등을 포함합니다.
   - **FeedDetailEditor**: 피드 작성을 위한 리치 텍스트 에디터로, 이미지 업로드, 미디어 삽입, URL 미리보기 기능 등을 제공합니다.

2. **댓글 시스템**
   - **CommentBox**: 댓글을 표시하는 컴포넌트로, 작성자 정보와 댓글 내용을 포함하며 좋아요 및 관리 기능을 지원합니다.
   - **CommentEditor**: 댓글을 작성하기 위한 에디터로, 멘션 및 해시태그 인식, URL 매칭 기능을 포함합니다.

3. **공통 컴포넌트** 
   - **PopoverButton**: 팝오버를 통해 추가적인 선택 UI를 제공하는 버튼 컴포넌트입니다.
   - **Person**: 작성자의 아바타나 채널 이미지를 표시하는 컴포넌트로, 클릭 시 프로필이나 채널 정보를 표시할 수 있습니다.
   - **Spinner**: 로딩 상태를 표시하는 컴포넌트로, 데이터를 처리 중일 때 사용자에게 시각적으로 알립니다.

4. **공통 유틸리티**
   - **valueParserUtils**: 다양한 데이터 형식 변환, 숫자 포맷팅, 마크다운과 HTML 간의 변환 등을 처리하는 유틸리티 함수 모음입니다.
   - **dateUtils**: 날짜와 시간을 처리하고, 포맷팅하거나 계산하는 유틸리티입니다.
   - **fileUtils**: 이미지 파일 업로드, 파일 읽기 등의 파일 관련 유틸리티 함수들을 제공합니다.

### 설치 방법

프로젝트를 설치하려면 다음 명령어를 사용하세요: 

```bash
npm install wemixplay-ui
```

또는 yarn을 사용할 경우:

```bash
yarn add wemixplay-ui
```

### 사용 예시

#### FeedBox 사용 예시

```tsx
import React from 'react';
import FeedBox from 'wemixplay-ui/FeedBox';

const App = () => {
  return (
    <FeedBox
      writerName="John Doe"
      writerImg="profile.jpg"
      channelName="John's Channel"
      textContent="This is a sample post."
      images={["image1.jpg", "image2.jpg"]}
      commentCount={10}
      likeCount={50}
    />
  );
};

export default App;
```

#### CommentBox 사용 예시

```tsx
import React from 'react';
import CommentBox from 'wemixplay-ui/CommentBox';

const CommentExample = () => {
  return (
    <CommentBox
      writerName="Jane Doe"
      writerImg="profile.jpg"
      comment="This is a sample comment."
      likeInfo={{ likeCount: 20, isMyClick: false }}
      createdAt={new Date().getTime()}
    />
  );
};

export default CommentExample;
```

### 폴더 구조

```bash
.
├── rollup-plugins
├── scripts
├── example
│   ├── nextjs
│   └── vite
├── src
│   ├── assets
│   │   ├── font
│   │   └── svgs
│   ├── constants
│   ├── components
│   │   ├── avatars
│   │   ├── buttons
│   │   ├── carousel
│   │   ├── clientOnly
│   │   ├── comment
│   │   ├── editor
│   │   ├── ellipsis
│   │   ├── feed
│   │   ├── image
│   │   ├── ...
│   │   └── ripple
│   ├── hooks
│   ├── utils
│   ├── plugins
│   ├── styles
│   └── storybook
├── rollup.config.js
└── README.md
```

- **rollup-plugins**: rollup 플러그인들이 위치해 있습니다.
- **scripts**: rollup으로 빌드시 실행될 script 파일들이 위치해 있습니다.
- **example**: nextjs, vite 등의 환경에서 wemixplay-ui를 테스트 해보기 위해 각 환경에 대한 예제 프로젝트들이 위치해 있습니다.
- **components**: 각 기능별 컴포넌트들이 위치해 있으며, `feed`, `comment`, `editor`, `avatars` 등으로 분류되어 있습니다.
- **hooks**: 다양한 사용자 정의 훅(Hooks)들이 위치하며, 주로 상태 관리와 UI 관련 동작을 처리합니다.
- **utils**: 공통으로 사용되는 유틸리티 함수들이 모여 있습니다.
- **plugins**: 에디터에서 사용하는 플러그인들이 위치해 있습니다.
- **styles**: 프로젝트의 스타일 및 공통적인 SCSS 파일들이 위치해 있습니다.
- **rollup.config.js**: rollup 빌드 설정 파일