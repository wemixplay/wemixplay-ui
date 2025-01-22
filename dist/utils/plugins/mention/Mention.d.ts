import React from 'react';
import type { ChangeEvent, MouseEvent, ClipboardEvent, KeyboardEvent, MutableRefObject } from 'react';
import { WpEditorPlugin } from "../../components/editor/WpEditor";
type MentionInfo = {
    id: number;
    name: string;
    profileImg?: string;
    isOfficial?: boolean;
} & {
    [key: string]: string | number | boolean | undefined;
};
type MentionConfig = {
    /** mention 리스트 */
    list: MentionInfo[];
    /** 최대 mention 갯수 */
    maxMentionCnt?: number;
    /** 중복 멘션을 막을건지 여부 */
    detectDuplicate?: boolean;
    /** 멘션 item을 다르게 커스텀하고 싶을때 전달하는 JSX Element */
    listElement?: (item: MentionInfo) => React.JSX.Element;
    /**
     * 멘션 작성 중일때 트리거 되는 함수
     * @param {string} - 작성중인 mention 값 (@ 제외)
     */
    onWriteMention?: (text: string) => void;
    /**
     * 멘션 작성이 완료되거나 멘션 내용이 변경될때 트리거 되는 함수
     * @param {MentionInfo[]} [params.allMention] - 작성된 mention 전체 배열
     * @param {MentionInfo} [params.currentMention] - 현재 작성이 완료된 mention
     */
    onCompleteMention?: ({ allMention, currentMention }: {
        allMention: MentionInfo[];
        currentMention?: MentionInfo;
    }) => void;
    /** metion 리스트가 열릴때 트리거 되는 함수 */
    onOpenMentionList?: () => void;
    /** metion 리스트가 닫힐때 트리거 되는 함수 */
    onCloseMentionList?: () => void;
    /** mention 갯수가 최대보다 크게 작성되려고 할때 트리거 되는 함수 (alert 등이 내용을 따로 처리 가능) */
    onMaxMentionList?: () => void | Promise<void>;
};
/**
 * Mention은 에디터에서 멘션 기능을 사용할 수 있도록 지원하는 플러그인 입니다.
 */
declare class Mention implements WpEditorPlugin {
    /** Mention 플러그인의 고유 commandKey */
    readonly commandKey = "mention";
    /** Mention 클래스 내부 mentionId */
    private _mentionId;
    /** observing 패턴을 위한 targetMentionId를 set해주는 외부 함수를 나타내는 함수 */
    private setTargetMentionId;
    /** contentEditable div Element를 가르키는 참조값 */
    contentEditableEl: MutableRefObject<HTMLDivElement>;
    /** mentionList UI 컴포넌트를 가르키는 참조값 */
    private mentionListRef;
    /** 현재 입력된 mentionList를 저장하는 변수 */
    private currentMentionList;
    /** Mention 플러그인의 설정(옵션) 값 */
    private _config;
    /** observing 패턴을 위한 config를 set 해주는 외부 함수를 나타내는 함수 */
    private setNewConfig;
    constructor({ contentEditableEl }: {
        contentEditableEl: MutableRefObject<HTMLDivElement>;
    });
    /**
     * 내부 인스턴스 값인 _mentionId를 set하고 mentionId를 변경할때 그에 띠른 함수들을 호출해주는 setter 함수
     */
    set mentionId(id: string);
    /**
     * 내부 인스턴스 값인 _mentionId를 반환하는 getter 함수
     */
    get mentionId(): string;
    /**
     * 내부 인스턴스 값인 _config를 set하고 config가 변경될때 setNewConfig 함수를 호출하는 setter 함수
     */
    set config(newConfig: MentionConfig);
    /**
     * 내부 인스턴스 값인 _config를 반환하는 getter 함수
     */
    get config(): MentionConfig;
    /**
     * config setter 함수를 이용하여 config 정보 업데이트하는 함수
     * @param {MentionConfig} config - 업데이트할 config 정보
     */
    setConfig(config?: MentionConfig): void;
    /**
     * Mention 플러그인과 관련하여 랜더링할 컴포넌트가 있을 시 작성하는데 mention은 mention 리스트를 mapping하는 컴포넌트를 랜더링
     * @param {Mention} [params.plugin] - Mention 클래스로 만들어진 객체
     */
    component({ plugin }: {
        plugin: Mention;
    }): React.JSX.Element;
    /** 현재 완성된 mention 리스트를 모두 탐색하여 onCompleteMention 함수를 호출하고 모든 mention 정보를 배열로 반환하는 함수 */
    getCurrentMentionList(): MentionInfo[];
    /**
     * mention 작성이 끝나고 나서 그 후에 mention 정보를 상황에 맞게 파싱 후 커서의 위치를 조정하는 함수
     * @param {MentionInfo} [params.mention] - mention 정보가 명확히 있을때(complete) 전달된 mention 정보
     * @param {boolean} [params.keepTag] - mention 태그를 상황에 따라 변환하지 않고 현재 태그 상태로 유지하고 싶을때 true로 전달
     */
    leaveMentionTag({ mention, keepTag }?: {
        mention?: MentionInfo;
        keepTag?: boolean;
    }): void;
    /**
     * 에디터를 클릭 했을때 호출되는 함수로써 Mention 에서는 mention 태그를 클릭했을때의 이벤트를 컨트롤
     * @param {MouseEvent<HTMLDivElement>} [params.event] - click 이벤트
     */
    handleClick({ event }: {
        event: MouseEvent<HTMLDivElement>;
    }): void;
    /**
     * mention 리스트에서 mention을 선택하였을 때 호출되는 함수
     * @param index - mentoin 리스트 중 선택된 요소의 index
     */
    selectMentionItem(index?: number): Promise<void>;
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
    }): boolean;
    /**
     * 에디터에서 undo나 redo를 하였을 경우 호출되는 함수
     */
    handleUndoRedo(): void;
    handlePaste({ event }: {
        event: ClipboardEvent<HTMLDivElement>;
    }): void;
    /**
     * observig 패턴으로 특정 값이 변경되었을때 같이 실행할 함수를 전달
     * Mention 플러그인에서는 targetMentionId나 config가 변경될때마다 호출될 함수를 전달
     */
    observe({ setTargetMentionId, setConfig }: {
        setTargetMentionId: (targetMentionId: string) => void;
        setConfig: (newConfig: MentionConfig) => void;
    }): void;
}
export type { MentionConfig, MentionInfo };
export default Mention;
