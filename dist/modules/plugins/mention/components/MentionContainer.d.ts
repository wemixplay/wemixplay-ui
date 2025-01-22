import React, { ReactNode } from 'react';
import Mention, { MentionConfig } from '../Mention';
type Props = {
    /** 멘션의 ID를 포함한 멘션 정보를 담은 객체 */
    mention?: Mention;
    /**
     * 멘션 설정 및 ID를 전달받아 렌더링할 자식 컴포넌트를 반환하는 함수.
     * @param {HashTagConfig} [params.config] - 멘션과 관련된 설정 정보.
     * @param {string} [params.targetMentionId] - 멘션 ID.
     * @returns {ReactNode} 자식 컴포넌트를 렌더링하기 위한 React 노드.
     */
    children: (params: {
        config: MentionConfig;
        targetMentionId: string;
    }) => ReactNode;
};
/**
 * `MentionContainer` 컴포넌트는 멘션과 관련된 설정 및 멘션 ID를 관리하고,
 * `MentionPortal`을 통해 자식 컴포넌트를 특정 DOM 위치에 렌더링합니다.
 * 멘션 관찰자(`mention.observe`)를 사용하여 멘션의 상태를 동적으로 업데이트할 수 있습니다.
 *
 * @component
 * @example
 * <MentionContainer mention={mentionInstance}>
 *   {({ config, targetMentionId }) => (
 *     <YourComponent config={config} targetMentionId={targetMentionId} />
 *   )}
 * </MentionContainer>
 *
 * @param {HashTag} [props.hash] - 멘션 객체로, 멘션의 ID 및 설정 정보를 포함합니다.
 * @param {function} [props.children] - 멘션 설정 및 ID를 전달받아 렌더링할 자식 컴포넌트를 반환하는 함수입니다.
 *                                    `children` 함수는 `{ config, targetMentionId }`를 인자로 받아 해당 값을 사용해 렌더링할 JSX를 반환합니다.
 *
 * @returns 멘션 ID가 존재하면 `HashPortal`을 통해 자식 컴포넌트를 렌더링하고, 존재하지 않으면 빈 요소를 반환합니다.
 */
declare const MentionContainer: ({ mention, children }: Props) => React.JSX.Element;
export default MentionContainer;
