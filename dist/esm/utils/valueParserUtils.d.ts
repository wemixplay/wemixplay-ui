/**
 * 특정 길이만큼 앞에 특정값을 채움
 */
export declare const pad: (v: string | number, p: string | number, len: number) => string;
/**
 * 숫자 천단위 문자열 변환 처리.
 * ex) 1000 -> 1K, 1000000 -> 1M
 * @param num: number
 * @param digits: number
 * @returns string
 */
export declare const toFormatterByInt: (num: number, digits: number, si?: readonly [{
    readonly value: 1;
    readonly symbol: "";
}, {
    readonly value: 1000;
    readonly symbol: "K";
}, {
    readonly value: 1000000;
    readonly symbol: "M";
}, {
    readonly value: 1000000000;
    readonly symbol: "B";
}, {
    readonly value: 1000000000000;
    readonly symbol: "T";
}]) => string;
/**
 * 123000.12 형식의 string | number 값을 seperator(,)를 붙혀 반환
 * @param {string | number} value
 * @returns {string}
 */
export declare const commaWithValue: (value: string | number) => string;
export declare const removeSpaceAndLineBreak: (str: string) => string;
export declare const decodeHtmlEntities: (str: string) => string;
/**
 * WP Mention 정규표현식
 */
export declare const WP_MENTION_REGEX: RegExp;
/**
 * WP# HashTag 정규표현식
 */
export declare const WP_HASH_REGEX: RegExp;
export declare const convertMarkdownToHtmlStr: (text: string) => string;
export declare const convertHtmlToMarkdownStr: (text: string) => string;
