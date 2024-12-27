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
  {
    transform(code, id) {
        return code.replace(/\/\*\* @class \*\//g, "\/*@__PURE__*\/");
    }
  },
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
            @import "./src/styles/abstracts/_animation.scss";
            @import "./src/styles/global.scss";
            @import "./src/styles/theme.scss";
          `
        }
      ]
    ],
    extract: 'styles.css',
    inject: false,
    minimize: true,
    sourceMap: process.env.NODE_ENV === 'development'
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
  }),
  commonjs()
]

if (process.env.NODE_ENV === 'production') {
  plugins.push(terser({
    compress: {
      unused: true,
      dead_code: true,
      conditionals: true,
      drop_console: true,
      pure_funcs: ['console.info', 'console.debug', 'console.warn'],
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

module.exports = [
  {
    external:  [
      ...Object.keys(packageJson.dependencies).filter(dep => dep !== 'react-youtube' || dep !== 'fs-extra'),
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
    treeshake: {
      moduleSideEffects: false,
      propertyReadSideEffects: false,
      unknownGlobalSideEffects: false,
    },
  },
  {
    external: ['react', 'react-dom', id => /fsevents/.test(id)],
    plugins,
    input: './src/modules/index.ts',
    output: [
			{
				dir: 'dist/modules',
				format: 'cjs',
        preserveModules: true, // indicate not create a single-file
        preserveModulesRoot: 'src/modules',
        exports: 'auto',
				sourcemap: process.env.NODE_ENV !== 'production',
			},
			{
				dir: 'dist/esm/modules',
				format: 'esm',
        preserveModules: true, // indicate not create a single-file
        preserveModulesRoot: 'src/modules',
				sourcemap: process.env.NODE_ENV !== 'production',
			},
		],
    treeshake: {
      moduleSideEffects: false,
      propertyReadSideEffects: false,
      unknownGlobalSideEffects: false,
    },
  }
];
