import React from 'react';
type Props = {
    /**
     * 컴포넌트 최상단 요소에 적용될 추가적인 CSS 클래스명
     */
    className?: string;
    /**
     * 미리보기에서 보여줄 Open Graph 메타데이터 정보
     */
    ogMetaData: {
        /**
         * 링크의 제목
         */
        title: string;
        /**
         * 링크의 설명
         */
        description?: string;
        /**
         * 링크의 대표 이미지
         */
        image?: string;
        /**
         * 링크 URL
         */
        url: string;
    };
    /**
     * 삭제 버튼 클릭 시 호출될 함수. 삭제하려는 URL과 동작 타입을 인자로 받음
     * @param {string[]} [params.urls] - 삭제하려는 URL 배열
     * @param {'add' | 'delete'} [params.type] - 동작 타입 ('add' 또는 'delete')
     */
    handleDeleteOgMetaData?: ({ urls, type }: {
        urls: string[];
        type: 'add' | 'delete';
    }) => void;
};
/**
 * `FeedLinkPreview`는 Open Graph 메타데이터(ogMetaData)를 기반으로 링크 미리보기를 제공하는 컴포넌트입니다.
 * 링크 클릭 시 외부 URL로 이동하거나, 삭제 버튼이 있을 경우 해당 링크에 대한 미리보기를 제거할 수 있습니다.
 *
 * @component
 * @example
 * <FeedLinkPreview
 *   className="my-custom-class"
 *   ogMetaData={{ title: "Title", description: "Description", image: "image_url", url: "url" }}
 *   handleDeleteOgMetaData={({ urls, type }) => console.log(urls, type)}
 * />
 *
 * @param {string} [props.className] - 컴포넌트 최상단 요소에 적용될 추가적인 CSS 클래스명
 * @param {string} [props.ogMetaData.title] - 링크의 제목
 * @param {string} [props.ogMetaData.description] - 링크의 설명
 * @param {string} [props.ogMetaData.image] - 링크의 대표 이미지
 * @param {string} [props.ogMetaData.url] - 링크 URL
 * @param {function} [props.handleDeleteOgMetaData] - 삭제 버튼 클릭 시 호출될 함수. 삭제하려는 URL과 동작 타입을 인자로 받음
 */
declare const FeedLinkPreview: ({ className, ogMetaData, handleDeleteOgMetaData }: Props) => React.JSX.Element;
export type { Props as FeedLinkPreviewProps };
export default FeedLinkPreview;
