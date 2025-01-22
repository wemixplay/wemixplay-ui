import React, { ButtonHTMLAttributes, MouseEvent, ReactNode } from 'react';
import { RippleOption } from '../ripple/Ripple';
interface PropsType extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    /** button 태그의 type */
    type?: 'button' | 'submit';
    /** button 요소 안에 랜더링될 내용 */
    children: ReactNode | string;
    /** button 사이즈 */
    size?: 'large' | 'medium' | 'small';
    /** 버튼의 UI타입별로 컬러가 추가될 시 사용할 예정 */
    color?: 'primary' | 'secondary';
    /**
     * ripple 효과 option
     *
     * { color?: string; duration?: number; maxSize?: number; disabled?: boolean }
     */
    ripple?: RippleOption;
    /** 비활성화 여부 */
    disabled?: boolean;
    /** 더블 클릭 방지 여부 */
    detectDoubleClick?: boolean;
    /**
     * button을 loading 처리할지 여부
     *
     * `true`면 `Spinner` 컴포넌트 노출
     */
    loading?: boolean;
    /** button 태그를 클릭했을때 호출되는 함수 */
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}
/**
 * Button 컴포넌트는 다양한 버튼 관련 기능을 제공합니다. <br/>
 *
 * @component
 * @param {string} [props.className=''] - 추가할 CSS 클래스 이름
 * @param {'button' | 'submit'} [props.type='button'] - button 태그의 type 속성값
 * @param {ReactNode | string} props.children - button 요소 안에 랜더링될 내용
 * @param {string} props.size - button 사이즈
 * @param {string} props.color - button 색상
 * @param {Object} [props.ripple] - Ripple 효과 옵션
 * @param {string} [props.ripple.color] - Ripple 효과의 색상
 * @param {number} [props.ripple.duration] - Ripple 효과의 지속 시간
 * @param {number} [props.ripple.maxSize] - Ripple 효과의 최대 크기
 * @param {boolean} [props.ripple.disabled] - Ripple 효과 비활성화 여부
 * @param {boolean} [props.disabled] - 버튼 비활성화 여부
 * @param {boolean} [props.detectDoubleClick] - 더블 클릭 방지 여부
 * @param {boolean} [props.loading=false] - button을 loading 처리할지 여부. `true`면 `Spinner` 컴포넌트 노출
 * @param {Function} [props.onClick] - button 태그를 클릭했을 때 호출되는 함수. MouseEvent<HTMLButtonElement>를 인자로 받음
 */
declare const Button: ({ className, type, children, size, color, ripple, detectDoubleClick, disabled, loading, onClick, ...buttonProps }: PropsType) => React.JSX.Element;
export type { PropsType as ButtonProps };
export default Button;
