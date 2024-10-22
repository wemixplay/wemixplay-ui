import Decimal from 'decimal.js';
import { isNaN, isNumber } from 'lodash';

/**
 * 특정 길이만큼 앞에 특정값을 채움
 */
export const pad = (v: string | number, p: string | number, len: number): string => {
  let r = `${v}`;
  if (r.length >= len) return r;
  while (r.length < len) r = p + r;
  return r;
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
 * 123000.12 형식의 string | number 값을 seperator(,)를 붙혀 반환
 * @param {string | number} value
 * @returns {string}
 */
export const commaWithValue = (value: string | number) => {
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

export const decodeHtmlEntities = (str: string) => {
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
    decodedStr = decodedStr.replace(/&[#\w]+;/g, (match) => entityMap[match] || match);
  }

  return decodedStr;
};

// 테이블 변환 함수
const markdownToHtmlTable = (markdownStr: string) => {
  const imgRegex = /<img\s+[^>]*src=["']?([^"'>]+)["']?[^>]*\/?>/i;
  // 줄바꿈으로 나누기
  const lines = markdownStr.trim().split('[LINEBREAK]');

  // HTML 테이블 시작
  let html = '<table>\n<thead>\n<tr>\n';

  // 헤더 처리
  const headers = lines[0].split('|').slice(1, -1); // 첫 번째 줄은 헤더
  headers.forEach((header) => {
    html += `<th>${header}</th>\n`;
  });
  html += '</tr>\n</thead>\n<tbody>\n';

  // 데이터 처리
  for (let i = 2; i < lines.length; i++) {
    const columns = lines[i].split('|').slice(1, -1); // 각 줄의 데이터
    if (columns.length > 0) {
      // 빈 줄이 아닐 경우
      html += '<tr>\n';

      columns.forEach((column) => {
        if (imgRegex.test(column)) {
          html += `<td><div class="img-td">${column}</div></td>\n`;
        } else {
          html += `<td>${column}</td>\n`;
        }
      });
      html += '</tr>\n';
    }
  }

  // HTML 테이블 종료
  html += '</tbody>\n</table>';

  return html;
};

export const convertMarkdownToHtmlStr = (text: string) => {
  // 변환된 문자열을 저장할 변수 초기화
  let convertStr = decodeHtmlEntities(text).replace(/<[^>]*>/g, '');

  // img 변환
  convertStr = convertStr.replace(/!\[.*?\]\((.*?)\)/g, '<img src="$1" alt="" />');

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
  // table 변환
  convertStr = convertStr.replace(
    /(\|[^\[]+\[LINEBREAK\])(\|[-:]+[-|:]*\|(\[LINEBREAK\]\|[^\[]+\|)+)/g,
    markdownToHtmlTable
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
