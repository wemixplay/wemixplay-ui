import { WpEditorPlugin } from "../../components/editor/WpEditor";
import type { MutableRefObject, KeyboardEvent, ChangeEvent } from 'react';
type CountTextLengthConfig = {
    /** CountTextLength 플러그인에서 제공하는 자체 문자열 길이 표시 UI 숨김 처리의 여부  */
    hideUi?: boolean;
    /**
     * 문자열 길이가 바뀔때마다 트리거되는 함수
     * @param {number} length - 현재 문자열 길이
     */
    onChangeTextLength?: (length: number) => void;
};
/**
 * CountTextLength는 에디터의 작성된 문자 길이를 측정하고
 * 에디터의 최대 문자 길이보다 현재 문자열 길이가 작거나 같도록 유지하게 하는 플러그인 입니다.
 */
declare class CountTextLength implements WpEditorPlugin<CountTextLengthConfig> {
    /** CountTextLength 플러그인의 고유 commandKey */
    commandKey: string;
    /** CountTextLength 플러그인의 설정(옵션) 값 */
    config: CountTextLengthConfig;
    /** contentEditable div Element를 가르키는 참조값 */
    contentEditableEl: MutableRefObject<HTMLDivElement>;
    /** MutationObserver WebAPI를 이용하여 만든 observer 객체 */
    private mutationObserver;
    constructor({ contentEditableEl }: {
        contentEditableEl: MutableRefObject<HTMLDivElement>;
    });
    /**
     * config 설정 업데이트하는 함수
     * CountTextLength에서는 문자열 길이 표시 UI에 대한 처음 세팅도 진행
     * MutationObserver를 이용하여 에디터 내용이 바뀔때마다 문자열 길이를 update
     *
     * @param {CountTextLengthConfig} config - 업데이트할 config 정보
     */
    setConfig(config: CountTextLengthConfig): void;
    /**
     * 에디터의 문자열 길이를 계산하는 함수
     */
    countText(): number;
    /**
     * 에디터에서 keydown 이벤트가 발생하였을때 호출되는 함수
     * @param {KeyboardEvent<HTMLDivElement>} [params.event] - keydown 이벤트
     */
    handleKeyDown({ event }: {
        event: KeyboardEvent<HTMLDivElement>;
    }): void;
    /**
     * 에디터에서 onChange 이벤트가 발생하였을때 호출되는 함수
     * @param {ChangeEvent<HTMLDivElement>} [params.event] - change 이벤트
     */
    handleChange({ event }: {
        event: ChangeEvent<HTMLDivElement>;
    }): void;
}
export type { CountTextLengthConfig };
export default CountTextLength;
