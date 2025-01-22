import { ClipboardEvent, MutableRefObject } from 'react';
import { WpEditorPlugin } from "../../components/editor/WpEditor";
type PasteToPlainTextConfig = {
    /**
     * 에디터에 입력된 내용중 url형식에 매칭이되는 정보를 일반 url 정보와 이미지, 비디오, iframe 등과 같은 media 형식의 url 정보로 분리하여 전달하는 함수
     * 이렇게 매칭된 url 정보를 원하는 형태의 url 형식으로 변경이 가능하도록 하는 함수이기도 함
     * @param {string[]} [params.textUrls] - 이미지, 비디오, iframe 등과 같은 media 형식의 url 정보
     * @param {{ tag: 'img' | 'video' | 'iframe'; src: string }[]} [params.mediaUrls] - 일반 url 정보
     * @returns {string[]} - 대체 url 정보
     */
    onMatchUrlReplace?: (params: {
        textUrls: string[];
        mediaUrls: {
            tag: 'img' | 'video' | 'iframe';
            src: string;
        }[];
    }) => string[];
};
/**
 * PasteToPlainText 클래스는 에디터에 붙여넣기 할 때 HTML 포맷을 제거하고,
 * 텍스트만 남겨서 붙여넣도록 하는 플러그인입니다.
 */
declare class PasteToPlainText implements WpEditorPlugin<PasteToPlainTextConfig> {
    /** PasteToPlainText 플러그인의 고유 commandKey */
    commandKey: string;
    /** PasteToPlainText 플러그인의 설정(옵션) 값 */
    config: PasteToPlainTextConfig;
    /** contentEditable div Element를 가르키는 참조값 */
    contentEditableEl: MutableRefObject<HTMLDivElement>;
    constructor({ contentEditableEl }: {
        contentEditableEl: MutableRefObject<HTMLDivElement>;
    });
    /**
     * config 설정 업데이트하는 함수
     * @param {PasteToPlainTextConfig} config - 업데이트할 config 정보
     */
    setConfig(config: PasteToPlainTextConfig): void;
    /**
     * 입력된 문자열이 HTML 포맷을 포함하는지 확인하는 함수
     * @param {string} str - 검사할 문자열
     * @returns {boolean} - HTML 포맷 여부
     */
    checkHTMLFormat(str: string): boolean;
    /**
     * 입력된 문자열에서 이미지, 비디오, iframe 태그의 src 속성을 추출하는 함수
     * @param {string} str - 검사할 문자열
     * @returns {Array} - 추출된 미디어 URL 리스트
     */
    getMediaMatchUrlList(str: string): any[];
    /**
     * 입력된 문자열에서 URL 패턴을 추출하는 함수
     * @param {string} str - 검사할 문자열
     * @returns {Array} - 추출된 URL 리스트
     */
    getUrlMatchList(str: string): string[];
    /**
     * 에디터에서 붙여넣기 이벤트 처리 함수. HTML 태그를 제거하고 텍스트만 붙여넣습니다.
     * @param {ClipboardEvent<HTMLDivElement>} [params.event] - clipboard 이벤트
     */
    handlePaste({ event }: {
        event: ClipboardEvent<HTMLDivElement>;
    }): void;
}
export type { PasteToPlainTextConfig };
export default PasteToPlainText;
