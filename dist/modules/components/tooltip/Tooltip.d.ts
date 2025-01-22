import React, { CSSProperties, ReactNode } from 'react';
export type PlaceType = 'top' | 'right' | 'bottom' | 'left';
interface PropsType {
    className?: string;
    /**
     * 툴팁 UI를 사용할 요소의 id값
     */
    anchorId: string;
    /**
     * 툴팁의 넓이
     *
     * `default: 200`
     */
    width?: number;
    /**
     * 툴팁 UI가 나올 위치
     */
    place?: PlaceType;
    /**
     * 툴팁 UI를 작동시킬 이벤트 종류
     */
    events?: ('hover' | 'click')[];
    /**
     * 툴팁의 arrow 요소의 x 또는 y축 이동값
     *
     * `place`가 `top` | `bottom` 일 경우 x축, `left` | `right` 일 경우 y축
     */
    arrowPosition?: number;
    /**
     * 툴팁의 위치 조정 값
     */
    tooltipPosition?: {
        top?: number;
        left?: number;
    };
    /**
     * 툴팁의 배경 색상
     */
    tooltipColor?: CSSProperties['color'];
    /**
     * 툴팁의 텍스트 색상
     */
    tooltipTextColor?: CSSProperties['color'];
    /**
     * 툴팁의 박스 스타일 (ex: '0 0 6px #ddd')
     */
    tooltipBoxShadow?: CSSProperties['boxShadow'];
    /**
     * 툴팁의 박스 border-radius
     */
    tooltipBorderRadius?: CSSProperties['borderRadius'];
    /**
     * arrow UI 숨김 처리 여부
     */
    hideArrow?: boolean;
    /**
     * 툴팁 UI를 사용할 요소와의 간격
     */
    space?: number;
    /**
     * 툴팁 UI를 노출 상태를 강제로 정하고 고정할 수 있는 값
     */
    open?: boolean;
    /**
     * 스크롤시 툴팁이 닫히게 할지 여부
     */
    whenWindowScrollClose?: boolean;
    /**
     * 툴팁 UI안에 랜더링 할 내용
     */
    children: ReactNode | string;
}
/**
 * `Tooltip` 컴포넌트는 사용자 인터페이스에 추가 정보를 제공하는 데 사용됩니다.
 * 해당 요소에 마우스를 올리거나 클릭할 때 툴팁 UI가 나타납니다.
 *
 * @component
 * @param {string} [props.className] - 툴팁 컴포넌트에 추가할 CSS 클래스 이름
 * @param {string} props.anchorId - 툴팁 UI를 사용할 요소의 id값. 툴팁이 위치할 요소를 식별
 * @param {number} [props.width=200] - 툴팁의 넓이. 기본값은 200
 * @param {('top'|'left'|'bottom'|'right')} [props.place='bottom'] - 툴팁 UI가 나올 위치. 'top', 'left', 'bottom', 'right' 중 하나 지정 가능
 * @param {Array<'hover'|'click'>} [props.events=['hover']] - 툴팁 UI를 작동시킬 이벤트 종류. 'hover', 'click' 중 하나 또는 둘 다를 배열 형태로 지정할 수 있습니다.
 * @param {{ top?: number; left?: number }} [props.tooltipPosition] - 툴팁의 위치 조정 값입니다.
 * @param {CSSProperties['color']} [props.tooltipColor] - 툴팁의 배경 색상
 * @param {CSSProperties['color']} [props.tooltipTextColor] - 툴팁의 텍스트 색상
 * @param {CSSProperties['boxShadow']} [props.tooltipBoxShadow] - 툴팁의 박스 스타일 (ex: '0 0 6px #ddd')
 * @param {CSSProperties['borderRadius']} [props.tooltipBorderRadius] - 툴팁의 박스 border-radius
 * @param {boolean} [props.hideArrow] - arrow UI 숨김 처리 여부 입니다.
 * @param {number} [props.space=4] - 툴팁 UI를 사용할 요소와의 간격. 단위는 픽셀(px)입니다.
 * @param {boolean} [props.open] - 툴팁 UI의 노출 상태를 강제로 정하고 고정할 수 있는 값. true로 설정하면 툴팁이 항상 보이게 됩니다.
 * @param {boolean} [props.whenWindowScrollClose] - 스크롤 시 툴팁이 닫히게 할지 여부. true로 설정하면 사용자가 스크롤할 때 툴팁이 자동으로 닫힙니다.
 * @param {ReactNode|string} [props.children] - 툴팁 UI 안에 랜더링할 내용. React 컴포넌트 또는 문자열을 전달할 수 있습니다.
 */
declare const Tooltip: ({ className, anchorId, width, space, place, events, arrowPosition, hideArrow, tooltipPosition, tooltipColor, tooltipTextColor, tooltipBoxShadow, tooltipBorderRadius, open, whenWindowScrollClose, children }: PropsType) => React.JSX.Element;
export type { PropsType as TooltipProps };
export default Tooltip;
