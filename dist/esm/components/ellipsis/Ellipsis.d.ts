import React, { ReactNode } from 'react';
interface Props {
    className?: string;
    /**
     * 컴포넌트 내부에 표시할 내용
     */
    content: ReactNode;
    /**
     * 내용 펼치기 버튼에 표시될 내용
     */
    triggerMore?: ReactNode;
    /**
     * 내용 숨기기 버튼에 표시될 내용
     */
    triggerLess?: ReactNode;
    /**
     * 줄임처리된 이후의 컨텐츠 문장의 수
     */
    lineClamp: number;
    /**
     * 기본으로 말줄임 처리를 할것인지에 대한 여부
     */
    defaultShortened?: boolean;
    /**
     * 관측하는 디바이스의 환경 boolean 배열
     */
    observingEnvs?: boolean[];
    onShowMoreLessClick?: () => void;
}
/**
 * `Ellipsis` 컴포넌트는 텍스트의 양이 많은 리액트 요소를 래핑하여 말줄임 처리를 쉽게 처리할 수 있도록 돕는 컴포넌트입니다.
 *
 * @param {string} [props.className] - 엘립시스 컴포넌트의 스타일을 위한 클래스 이름
 * @param {ReactNode} [props.content] - 표시할 텍스트 값인 string 또는 ReactElement 요소
 * @param {ReactNode} [props.triggerMore] - 펼치기 버튼에 나타낼 값인 string 또는 ReactElement 요소
 * @param {ReactNode} [props.triggerLess] - 접기 버튼에 나타낼 값인 string 또는 ReactElement 요소
 * @param {number} [props.lineClamp] - 텍스트 요소를 접었을 때 나타낼 문장의 수
 * @param {boolean} [props.defaultShortened] - 기본적으로 컨텐츠 영역이 말줄임 처리가 될 것인지에 대한 여부 boolean 값
 * @param {boolean[]} [props.observingEnvs] - 관측하는 디바이스의 환경 boolean 배열
 */
declare const Ellipsis: ({ className, content, triggerMore, triggerLess, lineClamp, defaultShortened, observingEnvs, onShowMoreLessClick }: Props) => React.JSX.Element;
export default Ellipsis;
export type { Props as EllipsisProps };
