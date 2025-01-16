import React, { ReactElement, MouseEvent, ReactNode, CSSProperties, MutableRefObject } from 'react';
import { RippleOption } from '../ripple/Ripple';
type TabItem = {
    /** tab item의 고유키 */
    key: string | number;
    /** tab 버튼에 나오는 버튼 내용 */
    label: ReactElement | string;
    /** tab content영역에 나오는 내용 */
    children?: ReactNode;
    /** 비활성화 여부 */
    disabled?: boolean;
    /** tab 버튼과 컨텐츠를 숨길지 여부 */
    isHide?: boolean;
};
interface PropsType {
    className?: string;
    /**
     * tab의 버튼 내용과 content영역에 나올 내용, 고유 key값, 비활성화 여부의 내용을 담고 있는 배열 요소
     */
    tabItems: TabItem[];
    /**
     * tabItems 배열 요소중 선택된 tab의 key값
     */
    activeKey?: string | number;
    /**
     * handleChange 두번째 인자에 전달될 name 값
     */
    name?: string;
    /**
     * 선택된 tab 버튼 밑에 나올 slider UI의 노출 여부
     */
    slider?: boolean;
    /**
     * tab의 전체적인 비활성화 여부
     */
    disabled?: boolean;
    /**
     * 선택되지 않은 tab의 children을 지울것인지에 대한 여부
     */
    destroyInactiveTabPanel?: boolean;
    /**
     * tab 버튼들의 좌우 스크롤을 담당하는 element ref 값이 있다면 전달
     */
    tabNavScrollRef?: MutableRefObject<HTMLElement>;
    /**
     * content영역을 swipe UI로 노출 할것인지 여부
     */
    swipeContent?: boolean;
    /**
     * ripple 효과 옵션
     *
     * default: `{ disabled: false }`
     */
    rippleOption?: RippleOption;
    /**
     * CSS 스타일 속성
     */
    style?: CSSProperties;
    /**
     * 선택된 tab이 변경될때 상위 컴포넌트로 선택된 tab의 key값을 전달하는 함수
     * @param key 선택된 tab의 key값
     * @param name  props로 전달받은 name 값
     */
    handleChange?: (key: JSONObject, name: string) => void;
    /**
     * tab 버튼을 클릭할때 호출되는 함수
     * @param key 선택된 tab의 key값
     * @param e  MouseEvent<HTMLButtonElement>
     */
    onClick?: (key: JSONObject, e: MouseEvent<HTMLButtonElement>) => void;
}
/**
 * `Tab` 컴포넌트는 탭 UI를 구성할 때 사용되며, swipe 형식의 UI를 제공할 수도 있습니다.
 *
 * @param {string} [props.className] - 탭 컴포넌트의 최상위 요소에 적용될 클래스 이름
 * @param {TabItem[]} props.tabItems - 탭의 각 항목을 나타내는 객체의 배열. 각 객체는 탭 버튼의 내용, 내용 영역에 표시될 컨텐츠, 고유 key 값, 비활성화 여부를 포함
 * @param {string|number} [props.activeKey] - 현재 활성화된 탭의 key 값. 이 값이 `tabItems` 배열에서 해당하는 요소를 활성화 상태로 표시
 * @param {string} [props.name] - `handleChange` 함수의 두 번째 인자로 전달될 문자열. 탭이 변경될 때 이 이름을 사용하여 어떤 탭이 선택되었는지 식별.
 * @param {boolean} [props.slider] - 선택된 탭 버튼 아래에 슬라이더 UI를 표시할지 여부를 결정.
 * @param {boolean} [props.disabled] - 탭의 전체적인 비활성화 여부를 결정. `true`로 설정하면 모든 탭 항목이 비활성화
 * @param {boolean} [props.destroyInactiveTabPanel] - 선택되지 않은 탭의 `children`을 DOM에서 제거할지 여부를 결정. `true`로 설정하면 비활성화된 탭의 내용이 제거
 * @param {boolean} [props.tabNavScrollRef] - tab 버튼들의 좌우 스크롤을 담당하는 element ref 값이 있다면 전달
 * @param {boolean} [props.swipeContent] - 탭의 내용 영역을 스와이프 UI로 표시할지 여부를 결정. 모바일 환경에서 유용하게 사용 가능
 * @param {RippleOption} [props.rippleOption] - 탭 버튼에 부여할 ripple 효과 옵션. default: `{ disabled: false }`
 * @param {CSSProperties} [props.style] - CSS 스타일 속성
 * @param {Function} [props.handleChange] - 선택된 탭이 변경될 때 호출될 함수. 선택된 탭의 key 값과 `props.name`을 인자로 받음
 * @param {Function} [props.onClick] - 탭 버튼을 클릭할 때 호출될 함수. 선택된 탭의 key 값과 클릭 이벤트를 인자로 받음
 */
declare const Tab: ({ className, tabItems, activeKey, name, slider, swipeContent, disabled, rippleOption, tabNavScrollRef, destroyInactiveTabPanel, onClick, handleChange }: PropsType) => React.JSX.Element;
export type { PropsType as TabProps, TabItem };
export default Tab;
