/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '*.scss';

declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

interface Window {
  android?: any;
  webkit?: any;
  feedIframeIo?: IntersectionObserver;
  cacheImgs: {
    [key: string]: CacheImage;
  };
}

declare type JSONObject = any;
