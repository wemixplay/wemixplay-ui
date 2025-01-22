import React from 'react';
type Props = {
    /**
     * 컴포넌트에 추가할 추가적인 CSS 클래스명
     */
    className?: string;
    /**
     * 미디어 정보 배열. 미디어 유형과 소스 URL을 포함
     */
    media?: {
        type?: 'youtube' | 'twitch';
        src?: string;
    }[];
    /**
     * 미디어가 뷰포트 안에 있을 때 자동 재생/일시정지할지 여부
     */
    intersectionVideo?: boolean;
    /**
     * 미디어 삭제 버튼 클릭 시 호출되는 함수
     * @param {number} [params.deleteIndex] - 삭제할 미디어의 인덱스
     */
    handleDeleteIframe?: ({ deleteIndex }: {
        deleteIndex: number;
    }) => void;
};
/**
 * Iframe 미디어의 재생 상태를 나타내는 타입 정의
 * - 'NOT_YET': 아직 재생되지 않음
 * - 'ENDED': 재생이 종료됨
 * - 'PLAYING': 재생 중
 * - 'AUTO_PAUSED': 자동 일시정지됨
 * - 'PAUSED': 일시정지됨
 * - 'BUFFERING': 버퍼링 중
 * - 'CUED': 대기 상태
 */
export type IframePlayState = 'NOT_YET' | 'ENDED' | 'PLAYING' | 'AUTO_PAUSED' | 'PAUSED' | 'BUFFERING' | 'CUED';
/**
 * FeedIframesView 컴포넌트에 대한 ref 정의
 * - `playState`: 현재 미디어의 재생 상태
 * - `playVideo`: 비디오를 재생하는 함수
 * - `pauseVideo`: 비디오를 일시정지하는 함수
 */
export type FeedIframesViewRef = HTMLDivElement & {
    playState: IframePlayState;
    playVideo: () => void;
    pauseVideo: () => void;
};
/**
 * `FeedIframesView`는 YouTube 또는 Twitch와 같은 미디어를 미리보기 형태로 보여주며, 각 미디어를 삭제하거나 클릭할 수 있는 기능을 제공합니다.
 * 자동 재생, 일시 정지 및 삭제 버튼과 같은 다양한 기능을 지원합니다.
 *
 * @component
 * @example
 * <FeedIframesView
 *   className="custom-iframe-view"
 *   media={[{ type: 'youtube', src: 'https://www.youtube.com/watch?v=example' }]}
 *   handleDeleteIframe={({ deleteIndex }) => console.log('Deleted Iframe Index:', deleteIndex)}
 * />
 *
 * @param {string} [props.className] - 컴포넌트에 추가할 추가적인 CSS 클래스명
 * @param {Object[]} [props.media] - 미디어 정보 배열. 미디어 유형과 소스 URL을 포함
 * @param {'youtube'|'twitch'} [props.media[].type] - 미디어 유형 ('youtube' 또는 'twitch')
 * @param {string} [props.media[].src] - 미디어 소스 URL
 * @param {boolean} [props.intersectionVideo] - 미디어가 뷰포트 안에 있을 때 자동 재생/일시정지할지 여부
 * @param {function} [props.handleDeleteIframe] - 미디어 삭제 버튼 클릭 시 호출되는 함수
 * @param {Object} [props.handleDeleteIframe.params] - 삭제할 미디어 정보
 * @param {number} [props.handleDeleteIframe.params.deleteIndex] - 삭제할 미디어의 인덱스
 */
declare const FeedIframesView: React.ForwardRefExoticComponent<Props & React.RefAttributes<FeedIframesViewRef>>;
export default FeedIframesView;
