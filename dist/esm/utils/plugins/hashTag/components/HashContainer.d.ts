import React, { ReactNode } from 'react';
import HashTag, { HashTagConfig } from '../HashTag';
type Props = {
    /** 해시태그의 ID를 포함한 해시태그 정보를 담은 객체 */
    hash?: HashTag;
    /**
     * 해시태그 설정 및 ID를 전달받아 렌더링할 자식 컴포넌트를 반환하는 함수.
     * @param {HashTagConfig} [params.config] - 해시태그와 관련된 설정 정보.
     * @param {string} [params.targetHashId] - 해시태그 ID.
     * @returns {ReactNode} 자식 컴포넌트를 렌더링하기 위한 React 노드.
     */
    children: (params: {
        config: HashTagConfig;
        targetHashId: string;
    }) => ReactNode;
};
/**
 * `HashContainer` 컴포넌트는 해시태그와 관련된 설정 및 해시태그 ID를 관리하고,
 * `HashPortal`을 통해 자식 컴포넌트를 특정 DOM 위치에 렌더링합니다.
 * 해시태그 관찰자(`hash.observe`)를 사용하여 해시태그의 상태를 동적으로 업데이트할 수 있습니다.
 *
 * @component
 * @example
 * <HashContainer hash={hashTagInstance}>
 *   {({ config, targetHashId }) => (
 *     <YourComponent config={config} targetHashId={targetHashId} />
 *   )}
 * </HashContainer>
 *
 * @param {HashTag} [props.hash] - 해시태그 객체로, 해시태그의 ID 및 설정 정보를 포함합니다.
 * @param {function} [props.children] - 해시태그 설정 및 ID를 전달받아 렌더링할 자식 컴포넌트를 반환하는 함수입니다.
 *                                    `children` 함수는 `{ config, targetHashId }`를 인자로 받아 해당 값을 사용해 렌더링할 JSX를 반환합니다.
 *
 * @returns 해시태그 ID가 존재하면 `HashPortal`을 통해 자식 컴포넌트를 렌더링하고, 존재하지 않으면 빈 요소를 반환합니다.
 */
declare const HashContainer: ({ hash, children }: Props) => React.JSX.Element;
export default HashContainer;
