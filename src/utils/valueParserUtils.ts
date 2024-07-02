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
