import { ChangeEvent, KeyboardEvent, MutableRefObject } from 'react';
import { WpEditorPlugin } from "../../components/editor/WpEditor";
type AutoUrlMatchConfig = {
    /**
     * 에디터에 url이 들어갔을때 해당 url 정보를 전달하는 함수
     * @param {string} [url] - 에디터에 들어간 url 정보
     */
    onMatchUrl?: (urls: string) => void;
    /**
     * 에디터의 입력된 url 정보가 변경되었을때 트리거되는 함수
     *  @param {string[]} [urls] - 에디터에 들어간 url 배열 정보
     */
    onChangeMatchUrls?: (urls: string[]) => void;
};
/**
 * AutoUrlMatch는 url 형태와 match가 되는 문자열을 자동으로 <a>태그로 변환하여
 * 하이퍼링크를 만들어주고 매칭된 url 정보를 확인할 수 있게 해주는 플러그인 입니다.
 */
declare class AutoUrlMatch implements WpEditorPlugin<AutoUrlMatchConfig> {
    /** AutoUrlMatch 플러그인의 고유 commandKey */
    commandKey: string;
    /** 에디터의 입력된 url 정보 */
    private urls;
    /** AutoUrlMatch 플러그인의 설정(옵션) 값 */
    config: AutoUrlMatchConfig;
    /** contentEditable div Element를 가르키는 참조값 */
    contentEditableEl: MutableRefObject<HTMLDivElement>;
    constructor({ contentEditableEl }: {
        contentEditableEl: MutableRefObject<HTMLDivElement>;
    });
    /**
     * config 설정 업데이트하는 함수
     * @param {AutoUrlMatchConfig} config - 업데이트할 config 정보
     */
    setConfig(config: AutoUrlMatchConfig): void;
    /**
     * 특정 문자열에서 url 형식에 맞는 것들만 매칭하여 배열로 반환하는 함수
     * @param {string} str - url 형태를 매칭 검사하고자 하는 문자열
     * @return url 형식에 맞는 문자열 배열 (url 배열)
     */
    getUrlMatchList(str: string): string[];
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
export type { AutoUrlMatchConfig };
export default AutoUrlMatch;
