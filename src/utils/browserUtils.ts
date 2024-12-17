/**
 * Next.js window undefined 여부 검증
 * @returns boolean
 */
export const hasWindow = (): boolean => {
  return typeof window !== 'undefined';
};

/**
 *
 * @description 전역 스크롤 막기
 */
export const scrollFreeze = () => {
  if (!hasWindow()) return;

  const scrollPosition = window.scrollY;

  const body = document.body as HTMLBodyElement;

  // 몇번의 scrollFreeze를 실행하였는지 파악
  body.setAttribute('data-fz', body.dataset.fz ? `${Number(body.dataset.fz) + 1}` : '1');

  // 현재 스크롤 위치 기록
  if (body.style.position !== 'fixed') {
    body.setAttribute('data-scroll-y', String(scrollPosition));
  }

  // if (!checkMobile()) body.style.paddingRight = '12px';

  // 스크롤 막으면서 뒷 화면을 fixed
  body.style.overflow = 'hidden';
  body.style.touchAction = 'none';
  body.style.position = 'fixed';
  body.style.top = `-${body.dataset.scrollY}px`;
  body.style.left = '0';
  body.style.width = '100%';
};

/**
 *
 * @description 전역 스크롤 가능
 */
export const scrollRelease = () => {
  if (!hasWindow()) return;

  const body = document.body as HTMLBodyElement;

  // data-fz를 감소시키고 data-fz가 0이 되기전에는 body 스타일을 유지
  if (body.dataset.fz && Number(body.dataset.fz) > 1) {
    body.setAttribute('data-fz', `${Number(body.dataset.fz) - 1}`);
  } else {
    body.removeAttribute('data-fz');

    // 스크롤 막으면서 뒷 화면을 fixed한 스타일 원복
    body.style.position = '';
    body.style.top = '';
    body.style.left = '';
    body.style.width = '';
    body.style.overflow = '';
    body.style.paddingRight = '';
    body.style.backgroundColor = '';
    body.style.touchAction = '';

    window.scrollTo(0, Number(body.dataset.scrollY));
  }
};

/**
 * 클립보드에 특정 문자열을 복사하는 함수
 *
 * @param {string} [params.text] - 복사하고자 하는 문자열
 */
export const copyClipboard = ({ text }: { text: string }) => {
  navigator.clipboard.writeText(text);
};
