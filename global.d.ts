/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '*.scss';

declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare type JSONObject = any;
