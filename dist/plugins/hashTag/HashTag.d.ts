import React, { ClipboardEvent } from 'react';
import type { WpEditorPlugin } from "../../components/editor/WpEditor";
import type { ChangeEvent, MouseEvent, KeyboardEvent, MutableRefObject } from 'react';
type HashTagInfo = {
    id: number;
    name: string;
    postCnt?: number;
} & {
    [key: string]: string | number | undefined;
};
type HashTagConfig = {
    /** hashtag 리스트 */
    list: HashTagInfo[];
    /** 중복 멘션을 막을건지 여부 */
    detectDuplicate?: boolean;
    /** 해시태그 item을 다르게 커스텀하고 싶을때 전달하는 JSX Element */
    listElement?: (item: HashTagInfo) => React.JSX.Element;
    /**
     * 해시태그 작성 중일때 트리거 되는 함수
     * @param {string} - 작성중인 hashTag 값 (# 제외)
     */
    onWriteHash?: (text: string) => void;
    /**
     * 해시태그 작성이 완료되거나 해시태그 내용이 변경될때 트리거 되는 함수
     * @param {HashTagInfo[]} [params.allHashTag] - 작성된 해시태그 전체 배열
     * @param {HashTagInfo} [params.currentHashTag] - 현재 작성이 완료된 해시태그
     */
    onCompleteHash?: ({ allHashTag, currentHashTag }: {
        allHashTag: HashTagInfo[];
        currentHashTag?: HashTagInfo;
    }) => void;
    /** hashtag 리스트가 열릴때 트리거 되는 함수 */
    onOpenHashList?: () => void;
    /** hashtag 리스트가 닫힐때 트리거 되는 함수 */
    onCloseHashList?: () => void;
};
/**
 * HashTag는 에디터에서 해시태그 기능을 사용할 수 있도록 지원하는 플러그인 입니다.
 */
declare class HashTag implements WpEditorPlugin {
    /** HashTag 플러그인의 고유 commandKey */
    readonly commandKey = "hash";
    /** HashTag 클래스 내부 hashId */
    private _hashId;
    /** observing 패턴을 위한 targetHashId를 set해주는 외부 함수를 나타내는 함수 */
    private setTargetHashId;
    /** contentEditable div Element를 가르키는 참조값 */
    contentEditableEl: MutableRefObject<HTMLDivElement>;
    /** hashtag 리스트 UI 컴포넌트를 가르키는 참조값 */
    private hashListRef;
    /** 현재 입력된 hashList를 저장하는 변수 */
    private currentHashList;
    /** HashTag 플러그인의 설정(옵션) 값 */
    private _config;
    /** observing 패턴을 위한 config를 set 해주는 외부 함수를 나타내는 함수 */
    private setNewConfig;
    constructor({ contentEditableEl }: {
        contentEditableEl: MutableRefObject<HTMLDivElement>;
    });
    /**
     * 내부 인스턴스 값인 _hashId를 set하고 hashId를 변경할때 그에 띠른 함수들을 호출해주는 setter 함수
     */
    set hashId(id: string);
    /**
     * 내부 인스턴스 값인 _hashId를 반환하는 getter 함수
     */
    get hashId(): string;
    /**
     * 내부 인스턴스 값인 _config를 set하고 config가 변경될때 setNewConfig 함수를 호출하는 setter 함수
     */
    set config(newConfig: HashTagConfig);
    /**
     * 내부 인스턴스 값인 _config를 반환하는 getter 함수
     */
    get config(): HashTagConfig;
    /**
     * config setter 함수를 이용하여 config 정보 업데이트하는 함수
     * @param {HashTagConfig} config - 업데이트할 config 정보
     */
    setConfig(config: HashTagConfig): void;
    /**
     * HashTag 플러그인과 관련하여 랜더링할 컴포넌트가 있을 시 작성하는데 hashtag는 hashTag 리스트를 mapping하는 컴포넌트를 랜더링
     * @param {HashTag} [params.plugin] - HashTag 클래스로 만들어진 객체
     */
    component({ plugin }: {
        plugin: HashTag;
    }): React.JSX.Element;
    /**
     * 에디터에 현재 등록된 hashTag들을 HashTagInfo 타입의 배열로 가공하여 반환하는 함수
     * @returns {HashTagInfo[]}
     */
    getAllHashTag(): HashTagInfo[];
    /**
     * 에디터에 현재 등록된 hashTag들과 현재 작성한 hashTag 정보를 currentHashList에 업데이트하고 onCompleteHash 함수를 실행하는 함수
     * @param {HashTagInfo} hashTag - 현재 작성한 hashTag 정보 (optional)
     */
    updateCurrentHashList(hashTag?: HashTagInfo): void;
    /**
     * hashTag 작성이 끝나고 나서 그 후에 hashTag 정보를 상황에 맞게 파싱 후 커서의 위치를 조정하는 함수
     * @param {HashTagInfo} [params.hash] - hashTag 정보가 명확히 있을때(complete) 전달된 hashTag 정보
     * @param {boolean} [params.keepTag] - hashTag 태그를 상황에 따라 변환하지 않고 현재 태그 상태로 유지하고 싶을때 true로 전달
     */
    leaveHashTag({ hash, keepTag }?: {
        hash?: HashTagInfo;
        keepTag?: boolean;
    }): void;
    /**
     * hashTag 리스트에서 hashTag 요소를 선택하였을 때 호출되는 함수
     * @param index - hashTag 리스트 중 선택된 요소의 index
     */
    selectHashItem(index?: number): void;
    /**
     * 에디터를 클릭 했을때 호출되는 함수로써 HashTag 에서는 hashTag를 클릭했을때의 이벤트를 컨트롤
     * @param {MouseEvent<HTMLDivElement>} [params.event] - click 이벤트
     */
    handleClick({ event }: {
        event: MouseEvent<HTMLDivElement>;
    }): void;
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
    /**
     * 에디터에서 undo나 redo를 하였을 경우 호출되는 함수
     */
    handleUndoRedo(): void;
    handlePaste({ event }: {
        event: ClipboardEvent<HTMLDivElement>;
    }): void;
    /**
     * observig 패턴으로 특정 값이 변경되었을때 같이 실행할 함수를 전달
     * HashTag 플러그인에서는 targetHashId나 config가 변경될때마다 호출될 함수를 전달
     */
    observe({ setTargetHashId, setConfig }: {
        setTargetHashId: (targetHashId: string) => void;
        setConfig: (newConfig: HashTagConfig) => void;
    }): void;
}
export type { HashTagConfig, HashTagInfo };
export default HashTag;
