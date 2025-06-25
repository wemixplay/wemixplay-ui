import React, { MouseEvent, ReactElement } from 'react';
type Props = {
    className?: string;
    /** 사용자의 레벨 */
    level?: number;
    /** 사용자의 프로필 이미지 URL */
    src: string;
    /** 사용자의 고유 ID */
    uid?: string | number;
    /** 사용자의 이름 또는 닉네임 */
    name?: string;
    /** 아바타 UI의 크기 (기본값: 'medium') */
    size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'custom';
    /** 아바타 UI의 맞춤형 크기 (기본값: 50) */
    customSize?: number;
    /** 아바타 UI 우측 상단에 표시될 커스텀 bedge UI 요소 */
    bedgeElement?: ReactElement;
    /** 아바타 UI를 클릭했을때 호출되는 함수 */
    onClick?: (e: MouseEvent<HTMLDivElement>) => void;
};
/**
 * Person 컴포넌트
 * 사용자의 프로필 이미지와 관련 정보를 표시하는 아바타 UI 컴포넌트입니다.
 *
 * @param {string} [props.className=''] - 추가적인 CSS 클래스 이름
 * @param {number} [props.level] - 사용자의 레벨
 * @param {string} props.src - 사용자의 프로필 이미지 URL
 * @param {string|number} [props.uid] - 사용자의 고유 ID
 * @param {string} [props.name] - 사용자의 이름 또는 닉네임
 * @param {number} [props.size=DEFAULT_AVATAR_SIZE] - 아바타 UI의 크기 (기본값: 50)
 * @param {ReactElement} [props.bedgeElement] - 아바타 UI 우측 상단에 표시될 커스텀 배지 UI 요소
 * @param {(e: MouseEvent<HTMLDivElement>) => void} [props.onClick] - 아바타 UI를 클릭했을때 호출되는 함수
 */
declare const Person: ({ className, level, src, uid, name, size, customSize, bedgeElement, onClick }: Props) => React.JSX.Element;
export type { Props as PersonProps };
export default Person;
