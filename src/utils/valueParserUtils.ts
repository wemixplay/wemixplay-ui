import Decimal from 'decimal.js';
import { isNaN, isNumber } from 'lodash-es';

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

export const convertMarkdownToHtmlStr = (text: string) => {
  let convertStr = text;

  convertStr = convertStr.replace(
    /WP@\[(.*?)\]\((\d+)\)/g,
    '<span class="mention complete-mention" data-id="$2" data-name="$1">@$1</span>'
  );

  convertStr = convertStr.replace(
    /WP#\[(.*?)\]\((\d+)\)/g,
    '<span class="hash complete-hash" data-id="$2" data-name="$1">#$1</span>'
  );

  convertStr = convertStr.replace(
    /\[([^\]]+)\]\(([^)]+)\)\[:(target="_blank")\]/g,
    '<a href="$2" $3>$1</a>'
  );

  convertStr = convertStr.replace(/\[LINEBREAK\]/g, '<br />');

  return convertStr;
};

export const convertHtmlToMarkdownStr = (text: string) => {
  let convertStr = text.replace(/\\/g, '').replace(/&nbsp;/g, ' ');

  convertStr = convertStr.replace(/<div>/g, '<br />').replace(/<\/div>/g, '');

  convertStr = convertStr.replace(/<br\s*\/?>/gi, '[LINEBREAK]');

  convertStr = convertStr
    .replace(
      /<span[^>]*\bclass="mention complete-mention\b[^>]*\bdata-id="(\d+)"[^>]*(?:\s+data-[^>]*="[^"]*")*[^>]*>@([^<]+)<\/span>/g,
      (match, p1, p2) => `WP@[${p2.trim()}](${p1.trim()})`
    )
    .replace(
      /<span[^>]*\bclass="mention unknown-mention\b[^>]*>(?:\s+data-[^>]*="[^"]*")*[^>]*>@([^<]+)<\/span>/g,
      '$1'
    )
    .replace(
      /<span[^>]*\bclass="mention will-mention\b[^>]*>(?:\s+data-[^>]*="[^"]*")*[^>]*>@([^<]+)<\/span>/g,
      '$1'
    );

  convertStr = convertStr
    .replace(
      /<span[^>]*\bclass="hash complete-hash\b[^>]*\bdata-id="(\d+)"[^>]*(?:\s+data-[^>]*="[^"]*")*[^>]*>#([^<]+)<\/span>/g,
      (match, p1, p2) => `WP#[${p2.trim()}](${p1.trim()})`
    )
    .replace(
      /<span[^>]*\bclass="hash unknown-hash\b[^>]*\bdata-id="(\d+)"[^>]*(?:\s+data-[^>]*="[^"]*")*[^>]*>#([^<]+)<\/span>/g,
      'WP#[$2]($1)'
    )
    .replace(
      /<span[^>]*\bclass="hash will-hash\b[^>]*>(?:\s+data-[^>]*="[^"]*")*[^>]*>#([^<]+)<\/span>/g,
      '$1'
    );

  convertStr = convertStr.replace(
    /<a href="(.*?)" target="_blank">(.*?)<\/a>/g,
    '[$2]($1)[:target="_blank"]'
  );

  return convertStr;
};
