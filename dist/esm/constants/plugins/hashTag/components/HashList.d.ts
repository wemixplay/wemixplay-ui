import React, { MutableRefObject } from 'react';
import { HashTagInfo } from '../HashTag';
type HashListRef = HTMLDivElement & {
    /** 위쪽 방향으로 선택 항목을 이동시키는 함수 */
    handleArrowUp: () => void;
    /** 아래쪽 방향으로 선택 항목을 이동시키는 함수 */
    handleArrowDown: () => void;
    /**
     * 현재 선택된 해시태그를 제출하는 함수
     * @param {number} [index] - 선택된 해시태그의 인덱스, 선택되지 않으면 현재 focus된 항목을 제출
     * @returns {HashTagInfo} 선택된 해시태그 정보
     */
    handleSubmit: (index?: number) => HashTagInfo;
};
type Props = {
    /** 컴포넌트의 고유 ID */
    id?: string;
    /** 추가적인 CSS 클래스명 */
    className?: string;
    /** 해시태그 목록 */
    list?: HashTagInfo[];
    /** 선택할 해시태그의 ID */
    targetHashId?: string;
    /** 해시태그가 적용될 콘텐츠 편집 영역의 참조 객체 */
    contentEditableEl: MutableRefObject<HTMLDivElement>;
    /**
     * 해시태그 목록 아이템을 커스텀 렌더링하는 함수
     * @param {HashTagInfo} item - 해시태그 정보 객체
     * @returns {React.JSX.Element} 렌더링할 해시태그 리스트 아이템
     */
    listElement?: (item: HashTagInfo) => React.JSX.Element;
    /**
     * 해시태그 아이템을 선택했을 때 호출되는 콜백 함수
     * @param {number} index - 선택된 해시태그 아이템의 인덱스
     */
    selectHashItem: (index: number) => void;
    /**
     * 해시태그 목록이 닫힐때 호출되는 함수
     */
    closeHashList: () => void;
};
/**
 * `HashList` 컴포넌트는 해시태그 목록을 표시하고 사용자가 선택할 수 있도록 돕는 UI 컴포넌트입니다.
 * 해시태그 목록은 사용자가 해시태그를 입력할 때 자동 완성 제안으로 사용됩니다.
 * 목록에서 선택한 해시태그는 외부에서 지정된 콜백 함수로 처리됩니다.
 *
 * @component
 * @example
 * <HashList
 *   list={hashTags}
 *   targetHashId="target-hash-id"
 *   contentEditableEl={contentEditableRef}
 *   selectHashItem={handleSelectHashItem}
 *   closeHashList={handleCloseHashList}
 * />
 */
declare const HashList: React.ForwardRefExoticComponent<Props & React.RefAttributes<HashListRef>>;
export type { Props as HashListProps, HashListRef };
export default HashList;
