import React, { MutableRefObject } from 'react';
import { MentionInfo } from '../Mention';
type MentionListRef = HTMLDivElement & {
    /** 위쪽 방향으로 선택 항목을 이동시키는 함수 */
    handleArrowUp: () => void;
    /** 아래쪽 방향으로 선택 항목을 이동시키는 함수 */
    handleArrowDown: () => void;
    /**
     * 현재 선택된 멘션을 제출하는 함수
     * @param {number} [index] - 선택된 멘션의 인덱스, 선택되지 않으면 현재 focus된 항목을 제출
     * @returns {MentionInfo} 선택된 멘션 정보
     */
    handleSubmit: (index?: number) => MentionInfo;
};
type Props = {
    /** 추가적인 CSS 클래스명 */
    className?: string;
    /** 멘션 목록 */
    list?: MentionInfo[];
    /** 선택할 멘션의 ID */
    targetMentionId?: string;
    /** 멘션이 적용될 콘텐츠 편집 영역의 참조 객체 */
    contentEditableEl: MutableRefObject<HTMLDivElement>;
    /**
     * 멘션 목록 아이템을 커스텀 렌더링하는 함수
     * @param {MentionInfo} item - 멘션 정보 객체
     * @returns {React.JSX.Element} 렌더링할 멘션 리스트 아이템
     */
    listElement?: (item: MentionInfo) => React.JSX.Element;
    /**
     * 멘션 아이템을 선택했을 때 호출되는 콜백 함수
     * @param {number} index - 선택된 멘션 아이템의 인덱스
     */
    selectMentionItem: (index?: number) => void;
    /**
     * 멘션 목록이 닫힐때 호출되는 함수
     */
    closeMentionList: () => void;
};
/**
 * `MentionList` 컴포넌트는 멘션 목록을 표시하고 사용자가 선택할 수 있도록 돕는 UI 컴포넌트입니다.
 * 멘션 목록은 사용자가 멘션를 입력할 때 자동 완성 제안으로 사용됩니다.
 * 목록에서 선택한 멘션은 외부에서 지정된 콜백 함수로 처리됩니다.
 *
 * @component
 * @example
 * <MentionList
 *   list={mentions}
 *   targetMentionId="target-mention-id"
 *   contentEditableEl={contentEditableRef}
 *   selectMentionItem={handleSelectMentionItem}
 *   closeMentionList={handleCloseMentionList}
 * />
 */
declare const MentionList: React.ForwardRefExoticComponent<Props & React.RefAttributes<MentionListRef>>;
export type { Props as MentionListProps, MentionListRef };
export default MentionList;
