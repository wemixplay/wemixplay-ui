# SvgComponentGenerator

`SvgComponentGenerator`는 `.svg` 확장자의 파일을 React 컴포넌트로 자동 변환해주는 생성기입니다.<br />
기존의 `svgr`은 `.svg` 파일을 import하는 과정에서 React 컴포넌트로 변환해주는 역할을 했지만, `SvgComponentGenerator`과 `svgr`을 같이 사용하면 `.svg` 파일이 추가, 이동, 수정 또는 삭제될 때 이를 감지하고, React 컴포넌트 형태로 `index.tsx` 또는 `index.jsx`를 자동으로 생성합니다.

<br /><br />

## 네이밍 규칙
SVG 컴포넌트는 svg 파일 이름에 따라 생성되며, SVG 컴포넌트를 생성할 때의 네이밍 규칙은 다음과 같습니다.

```
ico-react.svg => SvgIcoReact
```
<br /><br />

## 자동 생성 타입
`SvgComponentGenerator`는 `.svg` 파일이 추가, 이동, 삭제 또는 수정될 때마다 컴포넌트뿐만 아니라 유용한 타입들도 자동으로 생성합니다.

1. 파일 이름에 대한 타입 생성
```ts
export type StaticSvgIconName = 'ico-close' | 'ico-search' | 'next' | 'react' | 'vercel';
```

2. SVG 컴포넌트 이름에 대한 타입 생성
```ts
export type SvgComponentName = 'SvgIcoClose' | 'SvgIcoSearch' | 'SvgNext' | 'SvgReact' | 'SvgVercel';
```
<br /><br />

## 사용 방법

### webpack (nextjs, cra)

`next.config.js`

```js
const { WebpackSvgComponentPlugin } = require('wemixplay-ui');

/** @type {import('next').NextConfig} */
module.exports = {
  webpack: (config) => {
    const fileLoaderRule = config.module.rules.find(rule => rule.test && rule.test.test('.svg'));
    fileLoaderRule.exclude = /\.svg$/;

    // svgr 설정
    config.module.rules.push({
      loader: '@svgr/webpack',
      options: {
        prettier: false,
        svgo: true,
        svgoConfig: {
          plugins: [
            {
              name: 'removeViewBox',
              active: false
            }
          ]
        },
        titleProp: true
      },
      test: /\.svg$/
    });

    config.plugins.push(new WebpackSvgComponentPlugin({
      svgFileDir: './public/svgs'
    }))

    return config;
  }
};
```

### vite 

`vite.config.js`

```js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { viteSvgComponentPlugin } from 'wemixplay-ui'

export default defineConfig({
  plugins: [
    react(), 
    viteSvgComponentPlugin({
      svgFileDir: 'src/assets/svgs', 
      typescript: true
    })],
})

```
<br/><br/>

## `SvgComponentGenerator` 옵션

| 옵션           | 타입                   | 기본값          | 설명                                                                                                                                                                                                      |
|----------------|------------------------|---------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| svgFileDir     | `string` | - (필수)       | 프로젝트의 `.svg` 파일이 저장된 디렉토리 경로    |
| outputDir      | `string` | `svgFileDir`   | 변환된 컴포넌트가 저장될 출력 디렉토리 경로이며, 기본값은 `svgFileDir`입니다. |
| typescript     | `boolean` | `false`        | 타입스크립트를 사용할지 여부를 설정합니다. `true`로 설정하면 `index.tsx` 파일과 `types/index.d.ts`가 생성됩니다. `false`인 경우 `index.jsx`가 생성됩니다.                                               |
<br />

```ts 
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { viteSvgComponentPlugin } from 'monkey-d/modules'

export default defineConfig({
  plugins: [
    react(), 
    viteSvgComponentPlugin({
      svgFileDir: 'src/assets/svgs'
    })],
})
 ```