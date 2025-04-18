import React, { MouseEvent, ReactElement } from 'react';
type Props = {
    /** 추가적인 CSS 클래스명을 정의하는 필드 */
    className?: string;
    /** 작성자의 이름 또는 사용자 정의 요소를 전달하는 필드 */
    writerName?: ReactElement | string;
    /** 작성자의 프로필 이미지 URL을 전달하는 필드 */
    writerImg?: string;
    /** 작성자의 팔로워 수를 전달하는 필드 */
    follwerCount?: number;
    /** 팔로워 수 텍스트를 커스터마이징 할 수 있는 필드 (기본값: 'Followers') */
    follwersText?: string;
    /** 로케일 정보로, 작성된 시간의 포맷을 설정하는 필드 */
    locale?: string;
    /** 댓글이 작성된 시간을 나타내는 타임스탬프 (밀리초 단위) */
    createdAt?: number;
    /** 댓글이 수정된 시간을 나타내는 타임스탬프 (밀리초 단위, optional) */
    updatedAt?: number;
    /**
     * 프로필을 클릭했을 때 호출되는 콜백 함수
     * @param {MouseEvent<HTMLElement>} e - 클릭 이벤트 객체
     */
    onProfileClick?: (e: MouseEvent<HTMLElement>) => void;
};
/**
 * `CommentWriterInfo`는 댓글 작성자의 정보를 보여주는 컴포넌트입니다.
 * 작성자의 프로필 이미지, 이름, 팔로워 수, 작성 시간 등을 표시하며, 프로필 클릭 시 상호작용을 처리할 수 있는 기능을 제공합니다.
 *
 * @component
 * @example
 * <CommentWriterInfo
 *   writerName="Jane Doe"
 *   writerImg="profile.jpg"
 *   follwerCount={150}
 *   createdAt={1628947200000}
 *   updatedAt={1628948200000}
 *   onProfileClick={(e) => console.log('Profile clicked', e)}
 * />
 */
declare const CommentWriterInfo: ({ className, writerName, writerImg, follwerCount, follwersText, locale, createdAt, updatedAt, onProfileClick }: Props) => React.JSX.Element;
export type { Props as CommentWriterInfoProps };
export default CommentWriterInfo;
