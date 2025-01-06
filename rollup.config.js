const path = require('path');
const babel = require('@rollup/plugin-babel').default;
const typescript = require('rollup-plugin-typescript2');
const json = require('@rollup/plugin-json');
const terser = require('@rollup/plugin-terser');
const ignore = require('rollup-plugin-ignore');
const postcss = require('rollup-plugin-postcss');
const resolve = require('@rollup/plugin-node-resolve').nodeResolve;
const commonjs = require('@rollup/plugin-commonjs');
const svgr = require('@svgr/rollup');
const alias = require('@rollup/plugin-alias');
const replace = require('@rollup/plugin-replace');
const peerDepsExternal = require('rollup-plugin-peer-deps-external');
const { visualizer } = require("rollup-plugin-visualizer");
const packageJson = require('./package.json');
const { optimizeLodashImports } = require("@optimize-lodash/rollup-plugin");
const renameNodeModules = require("rollup-plugin-rename-node-modules");
const { preserveDirectives } = require('rollup-plugin-preserve-directives');

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

const plugins = [
  peerDepsExternal(),
  json(),
  ignore(['fsevents']),
  typescript({
    typescript: require('ttypescript'),
    tsconfigDefaults: {
      compilerOptions: {
        plugins: [
          { "transform": "typescript-transform-paths" },
          { "transform": "typescript-transform-paths", "afterDeclarations": true }
        ]
      }
    }
  }),
  optimizeLodashImports(),
  babel({
    babelHelpers: 'runtime', // 여전히 runtime helpers를 사용할 수 있지만 core-js는 사용하지 않음
    exclude: 'node_modules/**',
    extensions,
    presets: [
      [
        '@babel/preset-env',
        {
          // useBuiltIns 옵션을 제거하여 core-js 의존성을 없앰
          targets: '> 0.25%, not dead', // 브라우저 타겟을 설정하여 필요한 최소 기능만 변환
        }
      ],
      '@babel/preset-react',
      '@babel/preset-typescript'
    ],
    plugins: [
      '@babel/plugin-transform-runtime' // corejs 없이 runtime 헬퍼만 사용
    ]
  }),
  preserveDirectives({ exclude: ["**/*.scss", "**/*.svg"] }),
  postcss({
    modules: true,
    extensions: ['.css', '.scss', '.sass'],
    use: [
      [
        'sass',
        {
          data: `
            @import "./src/styles/abstracts/_variables.scss";
            @import "./src/styles/abstracts/_mixin.scss";
          `
        }
      ]
    ],
    extract: false,
    minimize: true,
    sourceMap: process.env.NODE_ENV === 'development'
  }),
  renameNodeModules('ext', process.env.NODE_ENV === 'development'),
  svgr({
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
  }),
  alias({
    entries: [
      { find: '@', replacement: path.resolve(__dirname, 'src') }
    ]
  }),
  resolve({
    extensions,
    browser: true,
    dedupe: ['react', 'react-dom', 'lodash-es', 'core-js']
  }),
  replace({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    preventAssignment: true,
  }),
  commonjs()
]

if (process.env.NODE_ENV === 'production') {
  plugins.push(terser({
    compress: {
      unused: true,
      dead_code: true,
      conditionals: true,
      pure_funcs: ['console.log', 'console.debug', 'console.warn'],
    },
    mangle: {
      toplevel: true,
    },
    output: {
      comments: false,
    },
  }));
}

if (process.env.NODE_VI === 'OK') {
  plugins.push(visualizer({
    filename: 'bundle-analysis.html',
    open: true,
  }))
}

const makeExportConfig = ({external = ['react', 'react-dom', id => /fsevents/.test(id)], input, output, plugins}) => {
  return {
    external,
    plugins,
    input,
    output,
    onwarn: (warning, warn) => {
      // "use client" 지시어와 관련된 경고 무시
      if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
        if (warning.message.includes('"use client"')) {
          return;
        }
      }
      // 다른 경고는 기본 경고 처리기 사용
      warn(warning);
    },
    treeshake: {
      moduleSideEffects: false,
      propertyReadSideEffects: false,
      unknownGlobalSideEffects: false,
    },
  }
}

module.exports = [
  makeExportConfig({
    external:  [
      ...Object.keys(packageJson.dependencies).filter(dep => dep !== 'react-youtube' && dep !== 'swiper'),
      /@babel\/runtime/,
      /fsevents/
    ],
    plugins,
    input: './src/components/index.ts',
    output: [
      {
        dir: 'dist/esm',
        format: 'esm',
        preserveModules: true, // indicate not create a single-file
        preserveModulesRoot: 'src',
        sourcemap: process.env.NODE_ENV === 'development'
      },
      {
        dir: 'dist',
        format: 'cjs',
        preserveModules: true, // indicate not create a single-file
        preserveModulesRoot: 'src',
        exports: 'auto',
        sourcemap: process.env.NODE_ENV === 'development'
      }
    ],
  }),
  makeExportConfig({
    plugins,
    input: './src/hooks/index.ts',
    output: [
      {
        file: 'dist/hooks/index.cjs.js',
        format: 'cjs',
        sourcemap: process.env.NODE_ENV !== 'production',
      },
      {
        file: 'dist/esm/hooks/index.esm.mjs',
        format: 'esm',
        sourcemap: process.env.NODE_ENV !== 'production',
      },
    ],
  }),
  makeExportConfig({
    plugins,
    input: './src/modules/index.ts',
    output: [
      {
        file: 'dist/modules/index.cjs.js',
        format: 'cjs',
        sourcemap: process.env.NODE_ENV !== 'production',
      },
      {
        file: 'dist/esm/modules/index.esm.mjs',
        format: 'esm',
        sourcemap: process.env.NODE_ENV !== 'production',
      },
    ],
  }),
  makeExportConfig({
    plugins,
    input: './src/utils/index.ts',
    output: [
      {
        file: 'dist/utils/index.cjs.js',
        format: 'cjs',
        sourcemap: process.env.NODE_ENV !== 'production',
      },
      {
        file: 'dist/esm/utils/index.esm.mjs',
        format: 'esm',
        sourcemap: process.env.NODE_ENV !== 'production',
      },
    ],
  }),
  makeExportConfig({
    plugins,
    input: './src/constants/index.ts',
    output: [
      {
        file: 'dist/constants/index.cjs.js',
        format: 'cjs',
        sourcemap: process.env.NODE_ENV !== 'production',
      },
      {
        file: 'dist/esm/constants/index.esm.mjs',
        format: 'esm',
        sourcemap: process.env.NODE_ENV !== 'production',
      },
    ],
  })
];

