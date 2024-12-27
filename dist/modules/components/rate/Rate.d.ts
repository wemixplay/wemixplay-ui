import React, { ReactElement } from 'react';
interface Props {
    /**
     * 컴포넌트에 적용할 클래스 이름
     */
    className?: string;
    /**
     * 평점 타입
     */
    rateType: 'increase' | 'decrease' | 'complement';
    /**
     * 평점 텍스트
     */
    rateText: ReactElement | string;
    /**
     * 아이콘 표시 여부
     */
    icon?: boolean;
}
/**
 * `Rate` 컴포넌트는 점수와 같은 숫자를 표시하는 데 사용되며, 증가, 감소, 유지 타입을 지원
 *
 * @component
 * @param {string} [props.className] - 컴포넌트에 적용할 클래스 이름
 * @param {('increase' | 'decrease' | 'complement')} props.rateType - 평점 타입
 * @param {ReactElement | string} props.rateText - 평점 텍스트
 * @param {boolean} [props.icon] - 아이콘 표시 여부
 *
 * @example
 *
 * <Rate rateType="increase" rateText="100" icon={true} />
 */
declare const Rate: ({ className, rateType, icon, rateText }: Props) => React.JSX.Element;
export type { Props as RateProps };
export default Rate;
