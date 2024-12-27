import React, { ReactElement, MouseEvent } from 'react';
type EmojiInfo = {
    emojiNo?: number;
    imageNo?: number;
    imageUrl?: string;
    clickCount?: number;
    isMyClick?: boolean;
};
type Props = {
    /**
     * 추가적인 CSS 클래스명
     */
    className?: string;
    /**
     * 이모지 목록 배열
     */
    emojiList: EmojiInfo[];
    /**
     * 이모지 선택 버튼에 표시될 popover 요소
     */
    emojiSelectPopoverElement?: null | ReactElement;
    /**
     * 이모지를 클릭할 때 호출되는 함수
     * @param {EmojiInfo} params - 클릭된 이모지 정보
     */
    onEmojiClick?: (params: EmojiInfo) => void;
    /**
     * 이모지 선택 버튼을 클릭할 때 호출되는 함수
     * @param {MouseEvent<HTMLButtonElement>} e - 버튼 클릭 이벤트
     */
    onEmojiSelectBtnClick?: null | ((e: MouseEvent<HTMLButtonElement>) => void);
};
/**
 * `FeedEmojiArea`는 게시물에 이모지를 표시하고 선택할 수 있는 영역을 제공합니다.
 * 기존의 이모지 목록과 이모지 선택 버튼을 표시하며, 각 이모지는 클릭 이벤트를 처리할 수 있습니다.
 *
 * @component
 * @example
 * <FeedEmojiArea
 *   emojiList={[{ emojiNo: 1, imageUrl: 'emoji.png', clickCount: 10, isMyClick: true }]}
 *   emojiSelectPopoverElement={<MyEmojiPopover />}
 *   onEmojiClick={(emojiInfo) => console.log('Emoji clicked', emojiInfo)}
 *   onEmojiSelectBtnClick={(e) => console.log('Emoji select button clicked')}
 * />
 *
 * @param {string} [props.className] - 추가적인 CSS 클래스명
 * @param {EmojiInfo[]} [props.emojiList] - 이모지 목록 배열
 * @param {ReactElement|null} [props.emojiSelectPopoverElement] - 이모지 선택 버튼에 표시될 popover 요소
 * @param {function} [props.onEmojiClick] - 이모지를 클릭할 때 호출되는 함수
 * @param {function} [props.onEmojiSelectBtnClick] - 이모지 선택 버튼을 클릭할 때 호출되는 함수
 */
declare const FeedEmojiArea: ({ className, emojiList, emojiSelectPopoverElement, onEmojiClick, onEmojiSelectBtnClick }: Props) => React.JSX.Element;
export type { Props as FeedEmojiAreaProps, EmojiInfo };
export default FeedEmojiArea;
