import React, { MouseEvent } from 'react';
import { PersonProps } from '../avatars/Person';
type Props = PersonProps & {
    className?: string;
    /** 아바타 UI의 크기 (기본값: 'medium') */
    size?: PersonProps['size'];
    /** 아바타 UI의 맞춤형 크기 (기본값: 50) */
    customSize?: PersonProps['customSize'];
    /** 아바타 UI를 클릭했을때 호출되는 함수 */
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};
/**
 * AvatarButton 컴포넌트
 * 사용자의 프로필 이미지와 관련 정보를 표시하는 아바타 UI 버튼 컴포넌트입니다.
 *
 * @param {string} [props.className=''] - 추가적인 CSS 클래스 이름
 * @param {number} [props.level] - 사용자의 레벨
 * @param {string} props.src - 사용자의 프로필 이미지 URL
 * @param {string|number} [props.uid] - 사용자의 고유 ID
 * @param {string} [props.name] - 사용자의 이름 또는 닉네임
 * @param {number} [props.size=DEFAULT_AVATAR_SIZE] - 아바타 UI의 크기 (기본값: 50)
 * @param {ReactElement} [props.bedgeElement] - 아바타 UI 우측 상단에 표시될 커스텀 배지 UI 요소
 * @param {boolean} [props.showBorder] - 아바타 UI 주변의 테두리 표시 여부
 * @param {(e: MouseEvent<HTMLDivElement>) => void} [props.onClick] - 아바타 UI를 클릭했을때 호출되는 함수
 */
declare const AvatarButton: ({ className, size, onClick, ...personProps }: Props) => React.JSX.Element;
export type { Props as AvatarButtonProps };
export default AvatarButton;
