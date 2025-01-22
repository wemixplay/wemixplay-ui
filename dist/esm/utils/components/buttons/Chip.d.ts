import React, { MouseEvent, ReactElement, ReactNode } from 'react';
type DefaultProps = {
    className?: string;
    /** 버튼 비활성화 여부 */
    disabled?: boolean;
    /** 닫기/제거 버튼 요소 */
    closeElement?: ReactElement;
    /** 닫기/제거 버튼을 눌렀을때 호출되는 함수 (함수가 `undefined`이면 닫기/제거 버튼 미노출) */
    handleClickClose?: (e: MouseEvent<HTMLButtonElement>) => void;
};
type TextChipProps = DefaultProps & {
    /** chip 박스 내부에 노출할 내용 (`children`이 있으면 불필요 ) */
    text: string | ReactElement;
};
type ChildrenChipProps = DefaultProps & {
    /** chip 박스 내부에 노출할 내용 (`text`가 있으면 불필요 ) */
    children: ReactNode;
};
type Props = TextChipProps | ChildrenChipProps;
/**
 * `Chip` 컴포넌트는 텍스트나 자식 요소를 포함하는 작은 정보 조각을 화면에 표시합니다.
 * 선택적으로 닫기/제거 버튼을 포함할 수 있으며, 이 버튼은 사용자 정의 가능합니다.
 *
 * @param {string} [props.className=''] - 컴포넌트에 적용할 CSS 클래스 이름
 * @param {boolean} [props.disabled] - 버튼이 비활성화 상태인지 여부. 비활성화 상태일 경우, 사용자 상호작용을 받지 않음
 * @param {ReactElement} [props.closeElement=<SvgIcoCloseBlack />] - 닫기/제거 버튼의 요소. 기본적으로는 검은색 닫기 아이콘을 사용
 * @param {function} [props.handleClickClose] - 닫기/제거 버튼 클릭 시 호출되는 함수.
 *   이 함수가 `undefined`이면, 닫기/제거 버튼은 화면에 노출되지 않습니다.
 * @param {string|ReactElement} [props.text] - `TextChipProps`를 사용하는 경우, chip 박스 내부에 노출할 텍스트 또는 React 요소
 * @param {ReactNode} [props.children] - `ChildrenChipProps`를 사용하는 경우, chip 박스 내부에 노출할 자식 요소
 * @returns {ReactElement} `Chip` 컴포넌트의 React 요소
 *
 * @example
 * <Chip text="Hello World" handleClickClose={(e) => console.log('Chip closed')} />
 *
 * @example
 * <Chip handleClickClose={(e) => console.log('Chip closed')}>
 *   Custom content here
 * </Chip>
 */
declare const Chip: ({ className, closeElement, disabled, handleClickClose, ...chipProps }: Props) => React.JSX.Element;
export type { Props as ChipProps };
export default Chip;
