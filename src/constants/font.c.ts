import localFont from 'next/font/local';

/**
 * NOTE
 * Font loader values must be explicitly written literals.
 * flatMap, Map을 이용해 아래의 값을 동적으로 생성하면 위의 에러가 발생합니다.
 * 즉, 변수나 반복문, 맵핑 함수 등을 사용하여 동적으로 생성된 값들은 사용할 수 없다는 뜻입니다.
 */
export const pretendard = localFont({
  src: [
    {
      path: '../assets/font/pretendard/Pretendard-Regular.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../assets/assets/font/pretendard/Pretendard-Regular.woff',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../assets/assets/font/pretendard/Pretendard-Regular.ttf',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../assets/assets/font/pretendard/Pretendard-SemiBold.woff2',
      weight: '600',
      style: 'normal'
    },
    {
      path: '../assets/assets/font/pretendard/Pretendard-SemiBold.woff',
      weight: '600',
      style: 'normal'
    },
    {
      path: '../assets/assets/font/pretendard/Pretendard-SemiBold.ttf',
      weight: '600',
      style: 'normal'
    },
    {
      path: '../assets/assets/font/pretendard/Pretendard-Bold.woff2',
      weight: '700',
      style: 'normal'
    },
    {
      path: '../assets/assets/font/pretendard/Pretendard-Bold.woff',
      weight: '700',
      style: 'normal'
    },
    {
      path: '../assets/assets/font/pretendard/Pretendard-Bold.ttf',
      weight: '700',
      style: 'normal'
    }
  ],
  display: 'swap',
  variable: '--font-pretendard'
});

export const twkEverett = localFont({
  src: [
    {
      path: '../assets/assets/font/everett/TWKEverett-Regular-web.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../assets/assets/font/everett/TWKEverett-Regular-web.woff',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../assets/assets/font/everett/TWKEverett-Regular-web.ttf',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../assets/assets/font/everett/TWKEverett-Bold-web.woff2',
      weight: '700',
      style: 'normal'
    },
    {
      path: '../assets/assets/font/everett/TWKEverett-Bold-web.woff',
      weight: '700',
      style: 'normal'
    },
    {
      path: '../assets/assets/font/everett/TWKEverett-Bold-web.ttf',
      weight: '700',
      style: 'normal'
    }
  ],
  display: 'swap',
  variable: '--font-twk-everett'
});
