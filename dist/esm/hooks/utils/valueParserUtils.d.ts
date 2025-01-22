type MatchEntities = '&amp;' | '&lt;' | '&gt;' | '&quot;' | '&#39;' | '&#x2F;' | '&#x60;' | '&#x3D;';
/**
 * 특정 길이만큼 앞에 특정값을 채움
 */
export declare const pad: (v: string | number, p: string | number, len: number) => string;
/**
 * 콤마로 천단위 분리를 수행한 후 다시 두 부분을 합쳐 숫자 스트링을 반환하는 함수
 * @param arg 문자열로 들어온 숫자값
 * @returns {string} 화면에 렌더할 최종적인 숫자 스트링
 */
export declare const makeParts: (arg: string) => [string, string | undefined];
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
 * 123,000.12 형식의 string 값을 number 형식으로 변환
 * @param {string} value
 * @returns {number}
 */
export declare const commaStrToNumber: (value: string) => number;
/**
 * 123000.12 형식의 string | number 값을 seperator(,)를 붙혀 반환
 * @param {string | number} value
 * @returns {string}
 */
export declare const commaWithValue: (value: string | number) => string;
export declare const removeSpaceAndLineBreak: (str: string) => string;
export declare const decodeHtmlEntities: (str: string, matchEntities?: MatchEntities[]) => string;
export declare const convertMarkdownToHtmlStr: (text: string) => string;
export declare const convertHtmlToMarkdownStr: (text: string) => string;
/**
 * 문자열로 들어온 숫자값에서 정수 부분과 소수 부분을 나누어 배열로 반환하는 함수
 * @param {string} numberString 문자열로 들어온 숫자값
 * @returns {[string, string]} 배열의 첫 번째 요소는 숫자 스트링의 정부 부분이 스트링으로 변환된 값, 두 번째 요소는 숫자 스트링의 소수 부분이 스트링으로 변환된 값
 */
export declare const splitNumberStringByComma: (numberString: string) => [string, string];
/**
 * 문자열로 들어온 숫자값을 정수 부분과 소수 부분으로 분리하여 정수 부분은 콤마로 천단위 분리를 수행한 후 다시 두 부분을 합쳐 숫자 스트링을 반환하는 함수
 * @param {string} numberValue 문자열로 들어온 숫자값
 * @returns {string} 화면에 렌더할 최종적인 숫자 스트링
 */
export declare const formatNumberValueWithComma: (numberValue: string | number) => string;
/**
 * 소수 몇번째 짜리까지 0채워서 표현
 * @param {number} value - 소수 값
 * @param {number} fixed - 몇번째자리 까지 표현 할 것인지
 * @returns string
 */
export declare const getFloatFixed: (value: number, fixed: number) => string;
export {};
