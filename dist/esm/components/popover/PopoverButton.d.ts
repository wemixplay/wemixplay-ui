import React, { CSSProperties, MouseEvent, ReactElement, ReactNode } from 'react';
import { RippleOption } from '../ripple/Ripple';
interface PropsType {
    id?: string;
    className?: string;
    /**
     * 버튼 내에 랜더링될 내용
     */
    children: ReactNode | string;
    /**
     * ripple 효과에 대한 옵션
     */
    ripple?: RippleOption;
    /**
     * 버튼 비활성화 여부
     */
    disabled?: boolean;
    /**
     * 중복 클릭 방지 여부
     */
    detectDoubleClick?: boolean;
    /**
     * popover 요소가 랜더링될 요소의 id값
     *
     * 값이 빈문자열이라면 popover가 작동하지 않음
     */
    anchorId: string;
    /**
     * popover 요소
     */
    popoverElement: ReactElement;
    /**
     * popover의 랜더링될 위치값 스타일
     */
    popoverStyle?: Pick<CSSProperties, 'top' | 'left' | 'bottom' | 'right' | 'zIndex'>;
    /**
     * popover가 나타날때와 사라질때 애니메이션 옵션
     */
    popoverAnimation?: {
        name: string;
        duration: number;
        timingFunc?: string;
    };
    /**
     * click outside가 작동할때 예외처리할 요소의 id값을 담은 배열
     */
    excludeOutSideIds?: string[];
    /**
     * 스크롤할때 popover를 닫히게 할지에 대한 여부
     */
    whenWindowScrollClose?: boolean;
    /**
     * 버튼을 클릭할때 호출될 클릭 함수
     * @param e MouseEvent<HTMLButtonElement>
     */
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}
interface RefPopoverButton {
    /** popover를 닫히게 하는 함수 */
    close: () => void | Promise<void>;
    /** popover를 열리게 하는 함수 */
    open: () => void | Promise<void>;
}
/**
 * `PopoverButton`은 버튼 클릭 시 지정된 위치에 popover를 랜더링하는 컴포넌트입니다.
 * 사용자 정의 버튼 스타일, 클릭 이벤트 핸들러, popover의 애니메이션과 스타일 설정 등 다양한 기능을 지원합니다.
 *
 * @component
 * @example
 * <PopoverButton
 *  className="my-custom-button"
 *  anchorId="unique-anchor-id"
 *  popoverElement={<MyPopoverContent />}
 *  onClick={(e) => console.log('Button clicked', e)}
 * >
 *   Click Me!
 * </PopoverButton>
 *
 * @param {string} [props.id] - 컴포넌트 최상단 요소에 적용될 id
 * @param {string} [props.className=''] - 버튼에 적용할 추가적인 CSS 클래스명
 * @param {string} props.anchorId - popover 요소가 랜더링될 요소의 id값. 빈문자열인 경우 popover는 작동하지 않음.
 * @param {boolean} [props.detectDoubleClick] - 중복 클릭 방지 여부
 * @param {ReactElement} props.popoverElement - popover로 랜더링될 React 요소
 * @param {Object} [props.popoverStyle={ top: 0, left: 0, zIndex: 1 }] - popover 요소의 위치를 정의하는 스타일 객체
 * @param {Object} [props.popoverAnimation={ name: '', duration: 0 }] - popover 애니메이션 이름, 지속 시간 및 타이밍 함수를 정의하는 객체
 * @param {string[]} [props.excludeOutSideIds] - click outside 이벤트 발생 시 예외 처리할 요소의 id 배열
 * @param {boolean} [props.whenWindowScrollClose] - window 스크롤 시 popover를 자동으로 닫을지에 대한 여부
 * @param {RippleOption} [props.ripple] - Ripple 효과 옵션
 * @param {ReactNode|string} props.children - 버튼 내에 랜더링될 내용
 * @param {function} [props.onClick] - 버튼 클릭 시 호출될 함수. MouseEvent 객체를 인자로 받음.
 * @param {ForwardedRef<RefPopoverButton>} [ref] - 컴포넌트 외부에서 popover를 제어할 수 있는 ref 객체. `open`과 `close` 함수를 포함함.
 */
declare const PopoverButton: React.ForwardRefExoticComponent<PropsType & React.RefAttributes<RefPopoverButton>>;
export type { PropsType as PopoverButtonProps, RefPopoverButton };
export default PopoverButton;
