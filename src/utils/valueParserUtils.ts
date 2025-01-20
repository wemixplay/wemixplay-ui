import Decimal from 'decimal.js';
import { sanitize } from 'isomorphic-dompurify';
import { isNaN, isNumber } from 'lodash';

type MatchEntities =
  | '&amp;'
  | '&lt;'
  | '&gt;'
  | '&quot;'
  | '&#39;'
  | '&#x2F;'
  | '&#x60;'
  | '&#x3D;';

/**
 * 특정 길이만큼 앞에 특정값을 채움
 */
export const pad = (v: string | number, p: string | number, len: number): string => {
  let r = `${v}`;
  if (r.length >= len) return r;
  while (r.length < len) r = p + r;
  return r;
};

/**
 * 콤마로 천단위 분리를 수행한 후 다시 두 부분을 합쳐 숫자 스트링을 반환하는 함수
 * @param arg 문자열로 들어온 숫자값
 * @returns {string} 화면에 렌더할 최종적인 숫자 스트링
 */
export const makeParts = (arg: string): [string, string | undefined] => {
  const parts = arg.split('.') as [string, string | undefined];
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts;
};

const SI = [
  { value: 1, symbol: '' },
  { value: 1e3, symbol: 'K' }, // Thousand
  { value: 1e6, symbol: 'M' }, // Million
  { value: 1e9, symbol: 'B' }, // Billion
  { value: 1e12, symbol: 'T' } // Trilion
] as const;

/**
 * 숫자 천단위 문자열 변환 처리.
 * ex) 1000 -> 1K, 1000000 -> 1M
 * @param num: number
 * @param digits: number
 * @returns string
 */
export const toFormatterByInt = (num: number, digits: number, si = SI): string => {
  if (!isNumber(num) || isNaN(num)) {
    return '0';
  }

  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;

  let i = 0;

  for (i = si.length - 1; i > 0; i -= 1) {
    if (Math.abs(num) >= si[i].value) {
      break;
    }
  }

  return `${new Decimal(num || 0)
    .div(si[i].value)
    .toFixed(digits, Decimal.ROUND_DOWN)
    .replace(rx, '$1')}${si[i].symbol}`;
};

/**
 * 123,000.12 형식의 string 값을 number 형식으로 변환
 * @param {string} value
 * @returns {number}
 */
export const commaStrToNumber = (value: string): number => {
  return Number(value.replace(/,/gi, ''));
};

/**
 * 123000.12 형식의 string | number 값을 seperator(,)를 붙혀 반환
 * @param {string | number} value
 * @returns {string}
 */
export const commaWithValue = (value: string | number): string => {
  value = String(value ?? 0);
  if (value.match(/[^0-9,.]/g)) return value;
  if (value) {
    const parts = value.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }
  return '0';
};

export const removeSpaceAndLineBreak = (str: string) => {
  return str.replace(/\[LINEBREAK\]/g, '').replace(/\s+/g, '');
};

export const decodeHtmlEntities = (str: string, matchEntities: MatchEntities[] = []) => {
  const entityMap = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&#x2F;': '/',
    '&#x60;': '`',
    '&#x3D;': '='
  };

  let decodedStr = str;

  // 반복적으로 HTML 엔티티를 디코딩
  let prevStr = '';

  while (decodedStr !== prevStr) {
    prevStr = decodedStr;
    decodedStr = decodedStr.replace(/&[#\w]+;/g, (match) =>
      matchEntities.includes(match as MatchEntities) || !matchEntities.length
        ? entityMap[match] || match
        : match
    );
  }

  return decodedStr;
};

export const convertMarkdownToHtmlStr = (text: string) => {
  // 변환된 문자열을 저장할 변수 초기화
  let convertStr = decodeHtmlEntities(text, ['&quot;', '&amp;', '&#x3D;']);

  convertStr = sanitize(convertStr, {
    ALLOWED_TAGS: [], // 모든 HTML 태그 제거
    KEEP_CONTENT: true // 태그 안의 컨텐츠는 유지
  });

  // WP@ 변환
  convertStr = convertStr.replace(
    /WP@\[(.*?)\]\((\d+)\)/g,
    '<span class="mention complete-mention" data-id="$2" data-name="$1">@$1</span>'
  );

  // WP# 변환
  convertStr = convertStr.replace(
    /WP#\[(.*?)\]\((\d+)\)/g,
    '<span class="hash complete-hash" data-id="$2" data-name="$1">#$1</span>'
  );

  // 링크 변환
  convertStr = convertStr.replace(
    /\[([^\]]+)\]\(([^)]+)\)\[:(target="_blank")\]/g,
    '<a href="$2" target="_blank">$1</a>'
  );

  // [LINEBREAK] 변환
  convertStr = convertStr.replace(/\[LINEBREAK\]/g, '<br />');

  // 변환된 문자열 반환
  return convertStr;
};

export const convertHtmlToMarkdownStr = (text: string) => {
  // 역슬래시와 &nbsp; 변환
  let convertStr = text.replace(/&nbsp;/g, ' ');

  // div => br 태그로 변환
  convertStr = convertStr.replace(/<div>/g, '<br />').replace(/<\/div>/g, '');
  // br 태그, \n 을 [LINEBREAK]로 변환
  convertStr = convertStr.replace(/<br\s*\/?>/gi, '[LINEBREAK]').replace(/\n/g, '[LINEBREAK]');

  // 문자열 마지막의 여러 개의 [LINEBREAK]를 빈 문자열로 대체
  // convertStr = convertStr.replace(/(\[LINEBREAK\])+$/g, '');

  // 멘션 WP@ 변환
  convertStr = convertStr
    .replace(
      /<span[^>]*\bclass="mention complete-mention\b[^>]*\bdata-id="(\d+)"[^>]*(?:\s+data-[^>]*="[^"]*")*[^>]*>@([^<]+)<\/span>/g,
      (match, p1, p2) => `WP@[${p2.trim()}](${p1.trim()})`
    )
    .replace(/<span[^>]*\bclass="mention unknown-mention\b[^>]*>([^<]*)<\/span>/g, '$1')
    .replace(
      /<span[^>]*\bclass="mention will-mention\b[^>]*>(?:\s+data-[^>]*="[^"]*")?[^>]*>@([^<]+)<\/span>/g,
      '@$1'
    );

  // 해시태그 WP# 변환
  convertStr = convertStr
    .replace(
      /<span[^>]*\bclass="hash complete-hash\b[^>]*\bdata-id="(\d+)"[^>]*(?:\s+data-[^>]*="[^"]*")*[^>]*>#([^<]+)<\/span>/g,
      (match, p1, p2) => `WP#[${p2.trim()}](${p1.trim()})`
    )
    .replace(
      /<span[^>]*\bclass="hash\b[^>]*\bdata-id="(\d+)"[^>]*(?:\s+data-[^>]*="[^"]*")*[^>]*>#([^<]+)<\/span>/g,
      'WP#[$2]($1)'
    );
  // a태그 markdown 형식으로 변환
  convertStr = convertStr.replace(/<a href="(.*?)"(.*?)>(.*?)<\/a>/g, '[$3]($1)[:target="_blank"]');

  const htmlTagPattern = /<\/?[^>]+(>|$)/;

  if (htmlTagPattern.test(convertStr)) {
    const tempEl = document.createElement('div');

    tempEl.innerHTML = convertStr;

    convertStr = tempEl.textContent;
  }

  return convertStr;
};

/**
 * 문자열로 들어온 숫자값에서 정수 부분과 소수 부분을 나누어 배열로 반환하는 함수
 * @param {string} numberString 문자열로 들어온 숫자값
 * @returns {[string, string]} 배열의 첫 번째 요소는 숫자 스트링의 정부 부분이 스트링으로 변환된 값, 두 번째 요소는 숫자 스트링의 소수 부분이 스트링으로 변환된 값
 */
export const splitNumberStringByComma = (numberString: string): [string, string] => {
  const parts = numberString.split('.');
  const integerPart = parts[0];
  const decimalPart = parts[1];

  return [integerPart, decimalPart];
};

/**
 * 문자열로 들어온 숫자값을 정수 부분과 소수 부분으로 분리하여 정수 부분은 콤마로 천단위 분리를 수행한 후 다시 두 부분을 합쳐 숫자 스트링을 반환하는 함수
 * @param {string} numberValue 문자열로 들어온 숫자값
 * @returns {string} 화면에 렌더할 최종적인 숫자 스트링
 */
export const formatNumberValueWithComma = (numberValue: string | number): string => {
  if (typeof numberValue === 'number') {
    numberValue = String(numberValue);
  }

  const [integerPart, decimalPart] = splitNumberStringByComma(numberValue);

  const decimalPartWithComma = decimalPart ? `.${decimalPart}` : '';

  const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return `${formattedIntegerPart}${decimalPartWithComma}`;
};

/**
 * 소수 몇번째 짜리까지 0채워서 표현
 * @param {number} value - 소수 값
 * @param {number} fixed - 몇번째자리 까지 표현 할 것인지
 * @returns string
 */
export const getFloatFixed = (value: number, fixed: number) => {
  return parseFloat(String(Math.round(value * 100) / 100)).toFixed(fixed);
};
