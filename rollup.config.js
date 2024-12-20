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
		babelHelpers: 'runtime',
		exclude: 'node_modules/**',
		extensions,
		presets: [
			[
				'@babel/preset-env',
				{
					useBuiltIns: 'usage',
					corejs: 3, // core-js version 3 사용
				}
			],
			'@babel/preset-react',
			'@babel/preset-typescript'
		],
		plugins: [
			'@babel/plugin-transform-runtime'
		],
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
    dedupe: ['react', 'react-dom', 'lodash-es']
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

module.exports = {
  external:  [
    ...Object.keys(packageJson.dependencies).filter(dep => dep !== 'react-youtube'),
    /@babel\/runtime/,
    /fsevents/
  ],
  plugins,
  input: './src/index.ts',
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
      sourcemap: process.env.NODE_ENV === 'development'
    }
  ],
	treeshake: {
		moduleSideEffects: false,
		propertyReadSideEffects: false,
		unknownGlobalSideEffects: false,
	},
};
