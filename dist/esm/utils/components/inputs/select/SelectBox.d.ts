import React, { InputHTMLAttributes, ReactElement, ReactNode, ChangeEvent } from 'react';
type SelectBoxRef = HTMLInputElement & {
    handleClickSelectBox?: () => void;
};
interface PropsType extends Pick<InputHTMLAttributes<HTMLInputElement>, 'name' | 'placeholder' | 'disabled' | 'readOnly' | 'onChange' | 'onFocus' | 'onBlur' | 'onInput'> {
    className?: string;
    /**
     * option list를 찾는 search 기능 활성화 여부
     */
    search?: boolean;
    /** SelectBox가 갖는 value 값 */
    value?: string | number;
    /**
     * Option 컴포넌트만 받는 children
     *
     * Option 컴포넌트가 아니면 미노출 (단 Option 컴포넌트의 children은 노출)
     */
    children: ReactNode | ReactNode[];
    /**
     * 모바일, 태블릿 일때 DropBox 상단에 노출될 제목(라벨)
     */
    mobileLabel?: string;
    /**
     * SelectBox 우측에 나올 arrow 아이콘
     *
     * `ex) selectArrow={<SvgIcoSelectboxArrow />}`
     */
    selectArrow?: ReactElement;
    /**
     * SelectDropBox에 전달할 className
     */
    dropBoxClassName?: string;
    /**
     * Option을 선택해도 DropBox가 계속 닫히지 않고 열려있기를 원할때 사용
     */
    keepDropDown?: boolean;
    /**
     * DropBox 안에 option을 검색하는 input 태그에 들어갈 placeholder
     */
    searchPlaceholder?: string;
    /**
     * option list가 없거나 검색에 포함된 option이 아무것도 없을때 나타나는 `string | ReactElement` 형식의 메세지
     */
    noDataMsg?: string | ReactElement;
    /**
     * DropBox 상단에 close button을 노출할지 여부
     */
    showCloseBtn?: boolean;
    /**
     * 스크롤 시 DropBox가 닫히게 할지 여부
     */
    whenScrollCloseDropBox?: boolean;
    /**
     * error 상태
     */
    error?: boolean;
    /**
     * SelectBox를 눌렀을때 DropBox가 열리는게 아니고 특정 로직이 실행되어야 한다면 onClick 함수 전달
     */
    onClick?: () => void;
    /** 값이 변경될 때 호출될 함수 */
    handleChange?: (value: JSONObject, name: string) => void;
    onChange?: (e: ChangeEvent<HTMLInputElement> | {
        target: HTMLInputElement;
    }) => void;
}
export type SelectData = {
    label: ReactNode | string;
    value: string | number | null;
};
/**
 * `SelectBox` 컴포넌트는 사용자에게 드롭다운 형태의 선택 옵션들을 제공합니다.
 * 이 컴포넌트는 HTML `<input>` 태그의 주요 속성들을 상속받으며, 추가적인 커스터마이징 옵션을 제공합니다.
 *
 * @component
 * @param {string} [props.className] - `SelectBox` 컴포넌트에 적용될 추가 CSS 클래스명
 * @param {boolean} [props.search=false] - 옵션 리스트 내 검색 기능 활성화 여부
 * @param {string|number} [props.value] - 현재 선택된 `SelectBox`의 값
 * @param {ReactNode|ReactNode[]} props.children - `SelectBox` 내부에 렌더링될 자식 요소들. 주로 `Option` 컴포넌트들이 위치
 * @param {string} [props.mobileLabel] - 모바일, 태블릿 환경에서 드롭박스 상단에 표시될 라벨(제목)
 * @param {ReactElement} [props.selectArrow] - `SelectBox` 우측에 표시될 화살표 아이콘 요소. 예: `selectArrow={<SvgIcoSelectboxArrow />}`
 * @param {string} [props.dropBoxClassName] - 드롭다운 박스(`DropBox`)에 적용될 추가 CSS 클래스명
 * @param {boolean} [props.keepDropDown=false] - 옵션 선택 시 드롭다운 박스를 계속 열린 상태로 유지할지 여부
 * @param {string} [props.searchPlaceholder] - 검색 입력 필드에 표시될 플레이스홀더 텍스트
 * @param {string | ReactElement} [props.noDataMsg] - option list가 없거나 검색에 포함된 option이 아무것도 없을때 나타나는 `string | ReactElement` 형식의 메세지
 * @param {boolean} [props.showCloseBtn=false] - 드롭다운 박스 상단에 닫기 버튼 표시 여부
 * @param {boolean} [props.whenScrollCloseDropBox=false] - 스크롤 시 드롭다운 박스를 자동으로 닫을지 여부
 * @param {boolean} [props.error] - error 상태
 * @param {Function} [props.onClick] - `SelectBox` 클릭 시 실행될 콜백 함수. 특정 로직을 실행할 필요가 있을 때 사용
 * @param {Function} [props.handleChange] - 값이 변경될 때 호출될 함수. `(value: JSONObject, name: JSONObject) => void`
 *
 * @example
 * <SelectBox
 *   className="my-selectbox"
 *   search={true}
 *   value="option1"
 *   mobileLabel="Choose an option"
 *   selectArrow={<MyCustomArrowIcon />}
 *   dropBoxClassName="my-custom-dropdown"
 *   keepDropDown={true}
 *   searchPlaceholder="Search options..."
 *   showCloseBtn={true}
 *   whenScrollCloseDropBox={true}
 *   onClick={() => console.log('SelectBox clicked')}
 *   handleChange={(value, name) => console.log(`Selected: ${value}`)}
 *   handleEnter={(value, name) => console.log(`Enter pressed: ${value}`)}
 * >
 *   <Option value="option1">Option 1</Option>
 *   <Option value="option2">Option 2</Option>
 *   <Option value="option3">Option 3</Option>
 * </SelectBox>
 */
declare const SelectBox: React.ForwardRefExoticComponent<PropsType & React.RefAttributes<SelectBoxRef>>;
export type { PropsType as SelectBoxProps, SelectBoxRef };
export default SelectBox;
