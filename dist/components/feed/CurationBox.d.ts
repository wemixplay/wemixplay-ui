import React, { MouseEvent } from 'react';
type CurationBoxRef = HTMLDivElement;
declare const CurationBox: React.ForwardRefExoticComponent<Props & React.RefAttributes<HTMLDivElement>>;
type Props = {
    /** 추가적인 CSS 클래스명 */
    className?: string;
    /** 프로필 이미지의 크기 */
    avatarSize?: number;
    /** 작성자의 이름 */
    writerName?: string;
    /** 작성자의 프로필 이미지 URL */
    writerImg?: string;
    /** 채널 이름 */
    channelName?: string;
    /** 채널 이미지 URL */
    channelImg?: string;
    /** 채널이 공식인지 여부 */
    channelIsOfficial?: boolean;
    /** 피드 본문 텍스트 */
    textContent?: string;
    /** 카테고리 이름 */
    categoryName?: string;
    /** 작성자가 인증된 사용자 여부 */
    certificated?: boolean;
    /** 작성 시간 */
    createdAt?: number;
    /** 수정 시간 */
    updatedAt?: number;
    /** 시간 및 날짜 포맷에 사용되는 로케일 */
    locale?: string;
    /**
     * 피드 클릭 시 호출되는 함수
     * @param e MouseEvent<HTMLSpanElement>
     */
    onClick?: (e: MouseEvent<HTMLSpanElement>) => void;
    /**
     * 멘션 클릭 시 호출되는 함수
     * @param params 멘션 정보 (이름, ID 포함)
     */
    onMentionClick?: (params: {
        name: string;
        id: string;
    }) => void;
    /**
     * 해시태그 클릭 시 호출되는 함수
     * @param params 해시태그 정보 (이름, ID 포함)
     */
    onHashTagClick?: (params: {
        name: string;
        id: string;
    }) => void;
    /**
     * 작성자 프로필 클릭 시 호출되는 함수
     * @param e MouseEvent<HTMLElement>
     */
    onWriterProfileClick?: (e: MouseEvent<HTMLElement>) => void;
    /**
     * 채널 클릭 시 호출되는 함수
     * @param e MouseEvent<HTMLElement>
     */
    onChannelClick?: (e: MouseEvent<HTMLElement>) => void;
};
export type { Props as CurationBoxProps, CurationBoxRef };
export default CurationBox;
