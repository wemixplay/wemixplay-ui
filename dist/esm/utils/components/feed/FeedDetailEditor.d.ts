import React, { MouseEvent, ReactElement } from 'react';
import { WpEditorProps, WpEditorRef } from '../editor/WpEditor';
import { FeedLinkPreviewProps } from './FeedLinkPreview';
type PostEditorImageValue = {
    file?: File;
    loading?: boolean;
    src: string;
} & {
    [key: string]: string | number | boolean | File | undefined;
};
type PostEditorMediaValue = {
    type: 'youtube' | 'twitch';
    src: string;
};
type FeedDetailEditorValue = {
    textValue?: string;
    images?: PostEditorImageValue[];
    media?: PostEditorMediaValue[];
    ogMetaData?: FeedLinkPreviewProps['ogMetaData'];
};
type Props = Omit<WpEditorProps, 'plugin' | 'initialValue' | 'handleChange'> & {
    /** 추가적인 CSS 클래스명 */
    className?: string;
    /** 에디터에 입력해야 하는 최소 텍스트 길이 */
    minLength?: number;
    /** 제출 버튼 텍스트 */
    btnSubmitText?: ReactElement | string;
    /** 에디터 텍스트 값 */
    textValue?: string;
    /** 업로드된 이미지 배열 */
    images?: PostEditorImageValue[];
    /** 업로드된 미디어 배열 */
    media?: PostEditorMediaValue[];
    /** 링크 미리보기 메타데이터 */
    ogMetaData?: FeedLinkPreviewProps['ogMetaData'];
    /** 에디터 이름 */
    name?: string;
    /** 사용자가 공식인지 여부 */
    isOfficial?: boolean;
    /** 작성자의 이름 */
    writerName: string;
    /** 작성자의 프로필 이미지 URL */
    writerImg: string;
    /** 채널 이름 */
    channelName: string;
    /** 채널 이미지 URL */
    channelImg: string;
    /** 카테고리 이름 */
    categoryName?: string;
    /** 채널 선택 팝오버 요소 */
    selectChannelPopoverElement?: ReactElement;
    /** 카테고리 선택 팝오버 요소 */
    selectCategoryPopoverElement?: ReactElement;
    /** 업로드 가능한 최대 이미지 개수 */
    imageMaxCnt?: number;
    /** 업로드 가능한 최대 iframe 개수 */
    iframeMaxCnt?: number;
    /** 로딩 상태 */
    loading?: boolean;
    /** 제출 버튼 비활성화 여부 */
    isSubmitDisabled?: boolean;
    /** 외부 URL이 변경될 때 호출되는 함수 */
    handleExternalUrlChange?: (url: string) => void;
    /** 작성자 프로필 클릭 이벤트 핸들러 */
    onUserClick?: (e: MouseEvent<HTMLElement>) => void;
    /** 채널 선택 클릭 이벤트 핸들러 */
    onSelectChannelClick?: (e: MouseEvent<HTMLButtonElement>) => void;
    /** 카테고리 선택 클릭 이벤트 핸들러 */
    onSelectCategoryClick?: (e: MouseEvent<HTMLButtonElement>) => void;
    /** 이미지가 최대보다 크게 업로드 하려고 할시 실행되는 함수 */
    onMaxImageUploads?: () => void;
    /** iframe이 최대보다 크게 업로드 되려고 할시 실행되는 함수 */
    onMaxIframeUploads?: () => void;
    /** 텍스트 변경 시 호출되는 함수 */
    handleTextChange: (value: string, name?: string) => void;
    /** 이미지 변경 시 호출되는 함수 */
    handleImageChange: (value: PostEditorImageValue[], name?: string) => void;
    /** 미디어 변경 시 호출되는 함수 */
    handleMediaChange: (value: PostEditorMediaValue[], name?: string) => void;
    /** 제출 시 호출되는 함수 */
    handleSubmit: (value: FeedDetailEditorValue, name?: string) => void;
};
/**
 * `FeedDetailEditor`는 피드 작성 및 수정 시 사용되는 에디터 컴포넌트입니다.
 * 텍스트, 이미지, 미디어, 링크 미리보기 등을 지원하며, 텍스트 길이 제한 및 입력된 URL 자동 매칭 기능도 포함되어 있습니다.
 *
 * @component
 * @example
 * <FeedDetailEditor
 *   writerName="John Doe"
 *   writerImg="profile.jpg"
 *   handleTextChange={(value) => console.log(value)}
 *   handleImageChange={(images) => console.log(images)}
 *   handleSubmit={(value) => console.log(value)}
 * />
 */
declare const FeedDetailEditor: React.ForwardRefExoticComponent<Omit<WpEditorProps, "plugin" | "initialValue" | "handleChange"> & {
    /** 추가적인 CSS 클래스명 */
    className?: string;
    /** 에디터에 입력해야 하는 최소 텍스트 길이 */
    minLength?: number;
    /** 제출 버튼 텍스트 */
    btnSubmitText?: ReactElement | string;
    /** 에디터 텍스트 값 */
    textValue?: string;
    /** 업로드된 이미지 배열 */
    images?: PostEditorImageValue[];
    /** 업로드된 미디어 배열 */
    media?: PostEditorMediaValue[];
    /** 링크 미리보기 메타데이터 */
    ogMetaData?: FeedLinkPreviewProps['ogMetaData'];
    /** 에디터 이름 */
    name?: string;
    /** 사용자가 공식인지 여부 */
    isOfficial?: boolean;
    /** 작성자의 이름 */
    writerName: string;
    /** 작성자의 프로필 이미지 URL */
    writerImg: string;
    /** 채널 이름 */
    channelName: string;
    /** 채널 이미지 URL */
    channelImg: string;
    /** 카테고리 이름 */
    categoryName?: string;
    /** 채널 선택 팝오버 요소 */
    selectChannelPopoverElement?: ReactElement;
    /** 카테고리 선택 팝오버 요소 */
    selectCategoryPopoverElement?: ReactElement;
    /** 업로드 가능한 최대 이미지 개수 */
    imageMaxCnt?: number;
    /** 업로드 가능한 최대 iframe 개수 */
    iframeMaxCnt?: number;
    /** 로딩 상태 */
    loading?: boolean;
    /** 제출 버튼 비활성화 여부 */
    isSubmitDisabled?: boolean;
    /** 외부 URL이 변경될 때 호출되는 함수 */
    handleExternalUrlChange?: (url: string) => void;
    /** 작성자 프로필 클릭 이벤트 핸들러 */
    onUserClick?: (e: MouseEvent<HTMLElement>) => void;
    /** 채널 선택 클릭 이벤트 핸들러 */
    onSelectChannelClick?: (e: MouseEvent<HTMLButtonElement>) => void;
    /** 카테고리 선택 클릭 이벤트 핸들러 */
    onSelectCategoryClick?: (e: MouseEvent<HTMLButtonElement>) => void;
    /** 이미지가 최대보다 크게 업로드 하려고 할시 실행되는 함수 */
    onMaxImageUploads?: () => void;
    /** iframe이 최대보다 크게 업로드 되려고 할시 실행되는 함수 */
    onMaxIframeUploads?: () => void;
    /** 텍스트 변경 시 호출되는 함수 */
    handleTextChange: (value: string, name?: string) => void;
    /** 이미지 변경 시 호출되는 함수 */
    handleImageChange: (value: PostEditorImageValue[], name?: string) => void;
    /** 미디어 변경 시 호출되는 함수 */
    handleMediaChange: (value: PostEditorMediaValue[], name?: string) => void;
    /** 제출 시 호출되는 함수 */
    handleSubmit: (value: FeedDetailEditorValue, name?: string) => void;
} & React.RefAttributes<WpEditorRef>>;
export type { Props as FeedDetailEditorProps, PostEditorImageValue, PostEditorMediaValue, FeedDetailEditorValue };
export default FeedDetailEditor;
