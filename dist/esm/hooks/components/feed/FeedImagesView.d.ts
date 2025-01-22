import React from 'react';
type Props = {
    /**
     * 컴포넌트에 추가할 추가적인 CSS 클래스명
     */
    className?: string;
    /**
     * 이미지 정보 배열. 이미지 파일, 로딩 상태, 소스 URL 및 오류 상태를 포함
     */
    images?: {
        /**
         * 업로드한 이미지 파일
         */
        file?: File;
        /**
         * 이미지 로딩 상태 여부
         */
        loading?: boolean;
        /**
         * 이미지 소스 URL
         */
        src: string;
        /**
         * 이미지 로드 중 에러 발생 여부
         */
        isError?: boolean;
        /**
         * 부적절한 콘텐츠 경고 메시지
         */
        inappositeMsg?: string;
    }[];
    /**
     * 이미지 삭제 버튼 클릭 시 호출되는 함수
     * @param {number} [params.deleteIndex] - 삭제할 이미지의 인덱스
     */
    handleDeleteImg?: ({ deleteIndex }: {
        deleteIndex: number;
    }) => void;
    /**
     * 이미지 클릭 시 호출되는 함수
     * @param {string} [params.src] - 클릭한 이미지의 소스 URL
     * @param {number} [params.index] - 클릭한 이미지의 인덱스
     */
    onImageClick?: ({ src, index }: {
        src: string;
        index: number;
    }) => void;
};
/**
 * `FeedImagesView`는 여러 이미지를 슬라이드 방식으로 미리보기 형태로 보여주며, 각 이미지를 삭제하거나 클릭할 수 있는 기능을 제공합니다.
 * 이미지 로딩, 에러 처리, 부적절한 콘텐츠 표시 등의 다양한 기능을 지원합니다.
 *
 * @component
 * @example
 * <FeedImagesView
 *   className="custom-feed-image-view"
 *   images={[{ src: 'image_url', loading: false, isError: false, inappositeMsg: 'Content Warning' }]}
 *   handleDeleteImg={({ deleteIndex }) => console.log('Deleted Image Index:', deleteIndex)}
 *   onImageClick={({ src, index }) => console.log('Clicked Image:', src, index)}
 * />
 *
 * @param {string} [props.className] - 컴포넌트에 추가할 추가적인 CSS 클래스명
 * @param {Object[]} [props.images] - 이미지 정보 배열. 이미지 파일, 로딩 상태, 소스 URL 및 오류 상태를 포함
 * @param {File} [props.images.file] - 업로드한 이미지 파일
 * @param {boolean} [props.images.loading] - 이미지 로딩 상태 여부
 * @param {string} [props.images.src] - 이미지 소스 URL
 * @param {boolean} [props.images.isError] - 이미지 로드 중 에러 발생 여부
 * @param {string} [props.images.inappositeMsg] - 부적절한 콘텐츠 경고 메시지
 * @param {function} [props.handleDeleteImg] - 이미지 삭제 버튼 클릭 시 호출되는 함수
 * @param {function} [props.onImageClick] - 이미지 클릭 시 호출되는 함수
 */
declare const FeedImagesView: ({ className, images, handleDeleteImg, onImageClick }: Props) => React.JSX.Element;
export type { Props as FeedImagesViewProps };
export default FeedImagesView;
