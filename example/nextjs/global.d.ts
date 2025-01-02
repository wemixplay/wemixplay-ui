/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="react-scripts" />

declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}
declare module '*.png' {
  const value: any;
  export = value;
}