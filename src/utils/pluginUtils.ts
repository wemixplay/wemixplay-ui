/**
 * hashTag의 유효성 검사를 하는 함수
 * @param {string} str - hashTag안에 들어가는 텍스트
 */
export const checkValidHashTag = (str: string) => {
  // 정규식: 해시태그가 '#'로 시작하고, 그 뒤에 국가 문자, 숫자, 밑줄, 이모지가 올 수 있도록 허용
  const regex = /^#[\p{L}\p{N}_\u200d\p{Emoji_Presentation}\uFE0F]*$/u;

  // 해시태그가 '#'만 있어도 true를 반환
  return str === '#' || regex.test(str);
};

/**
 * mention의 유효성 검사를 하는 함수
 * @param {string} str - mention 태그안에 들어가는 텍스트
 */
export const checkValidMention = (str: string) => {
  // 정규식: mention이 '@'로 시작하고, 그 뒤에 국가 문자, 숫자, 밑줄이 올 수 있도록 허용
  const regex = /^@[\p{L}\p{N}_]*$/u;

  // mention이 '@'만 있어도 true를 반환
  return str === '@' || regex.test(str);
};
