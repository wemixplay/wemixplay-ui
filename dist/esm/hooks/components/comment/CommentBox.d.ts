import React, { MouseEvent, ReactElement } from 'react';
type Props = {
    /** 추가적인 CSS 클래스명 */
    className?: string;
    /** 댓글 작성자의 이름 또는 요소 */
    writerName?: ReactElement | string;
    /** 댓글 작성자의 프로필 이미지 URL */
    writerImg?: string;
    /** 팔로워 수 */
    follwerCount?: number;
    /** 팔로워를 나타내는 텍스트 (기본값: 'Followers') */
    follwersText?: string;
    /** 댓글 내용 */
    comment?: string;
    /** 좋아요 정보 */
    likeInfo?: {
        /** 좋아요 개수 */
        likeCount: number;
        /** 사용자가 좋아요를 눌렀는지 여부 */
        isMyClick?: boolean;
    };
    /** 댓글 생성 시간 (timestamp) */
    createdAt?: number;
    /** 댓글 수정 시간 (timestamp) */
    updatedAt?: number;
    /** 삭제된 댓글 메시지 */
    deletedMsg?: string;
    /** 관리 팝오버에 표시할 요소 (수정, 삭제 등) */
    managePopoverElement?: ReactElement;
    /** 로케일 정보 */
    locale?: string;
    /**
     * 관리 버튼 클릭 시 호출되는 함수
     * @param {MouseEvent<HTMLButtonElement>} e - 관리 버튼 클릭 이벤트 객체
     */
    onManageBtnClick?: null | ((e: MouseEvent<HTMLButtonElement>) => void);
    /**
     * 프로필 클릭 시 호출되는 함수
     * @param {MouseEvent<HTMLElement>} e - 프로필 클릭 이벤트 객체
     */
    onProfileClick?: (e: MouseEvent<HTMLElement>) => void;
    /**
     * 좋아요 버튼 클릭 시 호출되는 함수
     * @param {MouseEvent<HTMLButtonElement>} e - 좋아요 버튼 클릭 이벤트 객체
     */
    onLikeBtnClick?: (e: MouseEvent<HTMLButtonElement>) => void;
    /**
     * 멘션 클릭 시 호출되는 함수
     * @param {string} [params.name] - 멘션된 사용자 이름
     * @param {string} [params.id] - 멘션된 사용자 ID
     */
    onMentionClick?: (params: {
        name: string;
        id: string;
    }) => void;
    /**
     * 해시태그 클릭 시 호출되는 함수
     * @param {string} [params.name] - 해시태그 이름
     * @param {string} [params.id] - 해시태그 ID
     */
    onHashTagClick?: (params: {
        name: string;
        id: string;
    }) => void;
    /**
     * 댓글 전체를 클릭할 때 호출되는 함수
     * @param {MouseEvent<HTMLElement>} e - 댓글 클릭 이벤트 객체
     */
    onClick?: (e: MouseEvent<HTMLElement>) => void;
};
/**
 * `CommentBox`는 댓글을 표시하는 컴포넌트로, 작성자 정보, 댓글 내용, 좋아요 버튼, 관리 버튼 등을 제공합니다.
 * 삭제된 댓글인 경우 `deletedMsg`를 표시하고, 댓글 작성자의 정보와 내용, 좋아요 정보, 관리 기능(수정/삭제)을 포함할 수 있습니다.
 *
 * @component
 * @example
 * <CommentBox
 *   writerName="John Doe"
 *   writerImg="profile.jpg"
 *   follwerCount={1500}
 *   comment="This is a sample comment."
 *   likeInfo={{ likeCount: 10, isMyClick: true }}
 *   createdAt={1623423423}
 *   managePopoverElement={<div>Manage Options</div>}
 *   onLikeBtnClick={(e) => console.log('Like button clicked', e)}
 *   onManageBtnClick={(e) => console.log('Manage button clicked', e)}
 * />
 */
declare const CommentBox: ({ className, writerName, writerImg, follwerCount, follwersText, comment, likeInfo, createdAt, updatedAt, managePopoverElement, deletedMsg, locale, onManageBtnClick, onProfileClick, onLikeBtnClick, onMentionClick, onHashTagClick, onClick }: Props) => React.JSX.Element;
export type { Props as CommentBoxProps };
export default CommentBox;
