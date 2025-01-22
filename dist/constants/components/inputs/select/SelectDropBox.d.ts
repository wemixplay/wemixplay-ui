import React, { Dispatch, ReactElement, ReactNode, SetStateAction } from 'react';
interface PropsType {
    className?: string;
    /**
     * DropBox가 SelectBox의 위에 나오게 할지 아래에 나오게 할지에 대한 방향 값
     */
    direction?: 'top' | 'bottom';
    children: ReactNode | ReactNode[];
    /** 모바일, 태블릿 일때 DropBox 상단에 노출될 제목(라벨) */
    label?: string;
    /** DropBox가 갖는 최대 높이값 */
    maxHeight?: number;
    /** SelectBox 컴포넌트의 최상위 element */
    parentEl: HTMLDivElement;
    /** SelectBox안에 있는 input element */
    inputEl: HTMLInputElement;
    /** option list를 찾는 search 기능 활성화 여부  */
    search?: boolean;
    /** option list를 찾는 input태그의 value 값 */
    searchText?: string;
    /** option을 검색하는 input 태그에 들어갈 placeholder */
    searchPlaceholder?: string;
    /**
     * option list가 없거나 검색에 포함된 option이 아무것도 없을때 나타나는 `string | ReactElement` 형식의 메세지
     */
    noDataMsg?: string | ReactElement;
    /** 상단에 close button을 노출할지 여부 */
    showCloseBtn?: boolean;
    /** 스크롤 시 DropBox가 닫히게 할지 여부 */
    whenScrollCloseDropBox?: boolean;
    /** DropBox open 상태 state를 dispatch 할 수 있는 setState 함수 */
    setOpen: Dispatch<SetStateAction<boolean>>;
    /** option을 검색하는 input 태그의 값을 상위 컴포넌트에 전달하는 함수 */
    handleSearchTextChange: (value: string) => void;
    /** option을 검색하는 input 태그가 focus된 상태일때 키보드를 누르면 호출되는 함수 */
    handleKeyPress: (e: React.KeyboardEvent) => void;
}
/**
 * `SelectDropBox` 컴포넌트는 사용자가 선택을 위해 클릭한 `SelectBox`에 연결된 옵션 목록을 표시하는 드롭다운 박스입니다.
 * 사용자는 이 드롭다운에서 옵션을 검색하고 선택할 수 있습니다.
 *
 * @component
 * @param {Object} props - `SelectDropBox` 컴포넌트에 전달되는 프로퍼티들
 * @param {string} [props.className] - `SelectDropBox` 컴포넌트에 적용될 추가 CSS 클래스명
 * @param {'top'|'bottom'} [props.direction='bottom'] - 드롭다운 박스가 `SelectBox`의 위에 표시될지 아래에 표시될지 결정하는 방향 값
 * @param {React.ReactNode} props.children - 드롭다운 내부에 렌더링될 자식 요소들. 주로 옵션 목록이 위치
 * @param {string} [props.label] - 모바일, 태블릿 환경에서 드롭박스 상단에 표시될 라벨(제목)
 * @param {number} [props.maxHeight] - 드롭박스가 갖는 최대 높이값. 이 값을 넘어서는 내용은 스크롤을 통해 볼 수 있음
 * @param {HTMLDivElement} props.parentEl - `SelectBox` 컴포넌트의 최상위 요소
 * @param {HTMLInputElement} props.inputEl - `SelectBox` 내부에 있는 입력 필드 요소
 * @param {boolean} [props.search=false] - 옵션 리스트 내 검색 기능 활성화 여부
 * @param {string} [props.searchText] - 옵션을 검색하는 입력 필드의 현재 값
 * @param {string} [props.searchPlaceholder] - 검색 입력 필드에 표시될 플레이스홀더 텍스트
 * @param {string | ReactElement} [props.noDataMsg] - option list가 없거나 검색에 포함된 option이 아무것도 없을때 나타나는 `string | ReactElement` 형식의 메세지
 * @param {boolean} [props.showCloseBtn=false] - 드롭다운 박스 상단에 닫기 버튼 표시 여부
 * @param {boolean} [props.whenScrollCloseDropBox=false] - 스크롤 시 드롭다운 박스를 자동으로 닫을지 여부
 * @param {Dispatch<SetStateAction<boolean>>} props.setOpen - 드롭박스의 열림/닫힘 상태를 제어할 수 있는 상태 설정 함수
 * @param {function} props.handleSearchTextChange - 옵션을 검색하는 입력 필드 값이 변경될 때 호출되는 함수. 변경된 값을 상위 컴포넌트에 전달
 * @param {function} props.handleKeyPress - 옵션을 검색하는 입력 필드가 포커스된 상태에서 키보드 입력이 있을 때 호출되는 함수
 */
declare const SelectDropBox: React.ForwardRefExoticComponent<PropsType & React.RefAttributes<HTMLDivElement>>;
export type { PropsType as SelectDropBoxProps };
export default SelectDropBox;
