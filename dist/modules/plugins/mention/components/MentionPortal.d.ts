import React, { ReactNode } from 'react';
type Props = {
    /** 포탈을 통해 렌더링할 자식 컴포넌트들 */
    children: ReactNode;
};
/**
 * `MentionPortal` 컴포넌트는 `ReactDOM.createPortal`을 사용하여 특정 DOM 노드에 자식 컴포넌트를 렌더링합니다.
 * 기본적으로 `#wp-editor-mention-portal`이라는 `div` 요소를 만들어 그 안에 자식을 렌더링하며,
 * 해당 DOM 노드가 없을 경우, 시스템이 직접 생성하여 문서의 body에 추가합니다.
 *
 * 컴포넌트가 언마운트될 때 시스템이 생성한 DOM 요소는 자동으로 제거됩니다.
 *
 * @component
 * @example
 * <MentionPortal>
 *   <div>멘션 목록 내용</div>
 * </MentionPortal>
 */
declare const MentionPortal: ({ children }: Props) => React.ReactPortal;
export default MentionPortal;
