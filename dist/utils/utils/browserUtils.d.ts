/**
 * Next.js window undefined 여부 검증
 * @returns boolean
 */
export declare const hasWindow: () => boolean;
/**
 *
 * @description 전역 스크롤 막기
 */
export declare const scrollFreeze: () => void;
/**
 *
 * @description 전역 스크롤 가능
 */
export declare const scrollRelease: () => void;
/**
 * 클립보드에 특정 문자열을 복사하는 함수
 *
 * @param {string} [params.text] - 복사하고자 하는 문자열
 */
export declare const copyClipboard: ({ text }: {
    text: string;
}) => void;
