import React from 'react';
import { PersonProps } from './Person';
type Props = {
    className?: string;
    /**
     * 아바타로 표현할 정보를 담은 배열
     *
     * Pick<PersonProps, 'src' | 'uid' | 'onClick'> :
     * { src: string; uid?: string | number; onClick?: (e: MouseEvent<HTMLDivElement>) => void; }
     */
    list: (string | Pick<PersonProps, 'src' | 'uid' | 'onClick'>)[];
    /**
     * 아바타의 크기 (기본값: 'small')
     */
    avatarSize?: PersonProps['size'];
    /** 아바타의 맞춤형 크기 (픽셀 단위) */
    avatarCustomSize?: PersonProps['customSize'];
    /**
     * 보여줄 아바타 갯수
     *
     * rotateDuration이 0보다 크다면 list 길이가 showCnt 보다 커야 합니다.
     * */
    showCnt?: number;
    /** 아바타 간의 겹침 간격 비율 */
    avatarHideRatio?: number;
    /** 아바타 리스트의 순환 간격 시간 (ms)
     *
     * 0이나 false일 경우 순환하지 않음
     */
    rotateDuration?: number | false;
};
/**
 * 여러 아바타를 겹쳐서 표시하는 컴포넌트. 아바타는 사용자의 프로필 사진이나 기타 이미지일 수 있으며,
 * 목록에서 여러 아바타를 순차적으로 보여주거나 겹쳐서 표시할 수 있습니다.
 *
 * @param {string} [props.className=''] - 컴포넌트에 추가할 CSS 클래스 이름
 * @param {(string | Pick<PersonProps, 'src' | 'uid' | 'onClick'>)[]} props.list
 *        아바타로 표현할 정보를 담은 배열. 문자열인 경우 이미지 경로로 간주하고,
 *        객체인 경우는 아바타 속성으로 사용됩니다.
 *        - src: 아바타 이미지 URL
 *        - uid: 아바타를 식별할 수 있는 고유 ID (선택 사항)
 *        - onClick: 아바타 클릭 시 실행할 콜백 함수 (선택 사항)
 * @param {number} [props.avatarSize='small'] - 아바타의 맞춤형 크기 (픽셀 단위)
 * @param {number} [props.avatarCustomSize=30] - 아바타의 맞춤형 크기 (픽셀 단위)
 * @param {number} [props.showCnt=4] - 한 번에 보여줄 최대 아바타 수
 * @param {number} [props.avatarHideRatio=0.5] - 아바타 간의 겹침 비율. 0에서 1 사이의 값으로, 높을수록 겹침이 적음
 * @param {(number | false)} [props.rotateDuration=5000] - 아바타 리스트를 순환하는 간격 시간 (밀리초).
 *        false일 경우 순환하지 않음
 */
declare const AvatarGroup: ({ className, list, avatarSize, avatarCustomSize, showCnt, avatarHideRatio, rotateDuration }: Props) => React.JSX.Element;
export type { Props as AvatarGroupProps };
export default AvatarGroup;
