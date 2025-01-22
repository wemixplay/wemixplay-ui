import React, { ChangeEvent, ReactElement, ReactNode, CSSProperties } from 'react';
import { RippleOption } from '../ripple/Ripple';
interface PropsType {
    className?: string;
    /**
     * 다른 accordion이 열릴때 이외의 accordion이 닫히게 하고 싶을 경우 사용 가능
     * 같은 값의 name을 제공하여 같은 종류의 아코디언임을 나타내어 toggle ui를 제공
     */
    name?: string;
    /**
     * accordion의 title
     */
    title: string | ReactElement;
    /**
     * accordion의 우측에 나오는 arrow icon
     *
     * ex) icon={<SvgIcoToastLinkArrow />}
     */
    icon?: string | ReactElement;
    /**
     * accordion의 border 색상
     */
    borderColor?: CSSProperties['borderColor'];
    /**
     * Accordion 내부 컨텐츠 영역에 랜더링될 내용
     */
    children: ReactNode;
    /**
     * ripple 옵션
     *
     * `{ color?: string; duration?: number; maxSize?: number; disabled?: boolean; }`
     *
     * `default: { disabled: true }`
     */
    ripple?: RippleOption;
    /**
     * accordion ui의 열리거나 닫힌 상태에 대한 상태값
     *
     * true: 열림, false: 닫힘
     */
    open?: boolean;
    /**
     * accordion의 ui가 처음 열림/닫힘에 대한 상태값
     * 처음 상태만 지정하고 그 다음은 open 값으로 컨트롤이 가능하다
     */
    initialOpen?: boolean;
    /** accordion이 비활성화 상태인지 여부 */
    disabled?: boolean;
    /** accordion의 열림/닫힘 상태 값이 변경될 때 호출될 함수
     *
     * @param {boolean} status 변경된 열림/닫힘 상태
     * @param {ChangeEvent<HTMLInputElement>} e accordion 상태가 변경될때 발생하는 ChangeEvent
     */
    handleOpenChange?: (status: boolean, e: ChangeEvent<HTMLInputElement>) => void;
}
/**
 * Accordion 컴포넌트는 접고 펼칠 수 있는 UI를 제공합니다.
 *
 * @component
 * @param {string} [props.name] 다른 accordion이 열릴때 이외의 accordion이 닫히게 하고 싶을 경우 사용 가능. 같은 값의 name을 제공하여 같은 종류의 아코디언임을 나타내어 toggle ui를 제공
 * @param {string | ReactElement} [props.title] - Accordion의 제목. 문자열 또는 React 요소를 받을 수 있음
 * @param {string | ReactElement} [props.icon=<SvgIcoToastLinkArrow />] - Accordion 우측에 표시될 아이콘. 문자열 또는 React 요소를 받을 수 있으며, 기본값은 SvgIcoToastLinkArrow 컴포넌트
 * @param {ReactNode} [props.children] - Accordion 내부에 랜더링될 컨텐츠.
 * @param {string} [props.className=''] - Accordion 컴포넌트에 추가할 클래스명. 기본값은 빈 문자열.
 * @param {Object} [props.ripple={ disabled: true }] - Ripple 효과에 관한 옵션. `color`, `duration`, `maxSize`, `disabled` 속성을 설정할 수 있으며, 기본값은 `disabled: true`
 * @param {boolean} [props.open] - Accordion의 열림/닫힘 상태. `true`일 경우 열린 상태, `false`일 경우 닫힌 상태
 * @param {boolean} [props.initialOpen=false] - Accordion의 초기 열림/닫힘 상태. 이후 상태는 `open` prop으로 컨트롤 가능.
 * @param {boolean} [props.disabled] - Accordion이 비활성화 상태인지 여부. `true`일 경우 비활성화.
 * @param {function} [props.handleOpenChange] - Accordion의 열림/닫힘 상태가 변경될 때 호출될 함수. 변경된 상태값을 boolean 형태로 받음.
 */
declare const Accordion: ({ className, name, title, ripple, icon, borderColor, open, initialOpen, children, disabled, handleOpenChange }: PropsType) => React.JSX.Element;
export type { PropsType as AccordionProps };
export default Accordion;
