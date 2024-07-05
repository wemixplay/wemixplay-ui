const path = require('path');
const babel = require('@rollup/plugin-babel').default;
const typescript = require('@rollup/plugin-typescript');
const json = require('@rollup/plugin-json');
const terser = require('@rollup/plugin-terser');
const ignore = require('rollup-plugin-ignore');
const postcss = require('rollup-plugin-postcss');
const resolve = require('@rollup/plugin-node-resolve').nodeResolve; // NodeResolve 함수를 직접 가져옴
const commonjs = require('@rollup/plugin-commonjs');
const svgr = require('@svgr/rollup');
const alias = require('@rollup/plugin-alias');

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

const plugins = [
	json(),
	ignore(['fsevents']),
	resolve({
		extensions,
	}),
	commonjs(),
	typescript(),
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
		`
				}
			]
		],
		extract: false,
		minimize: true,
		sourceMap: process.NODE_ENV === 'development'
	}),
	alias({
		entries: [
			{ find: '@', replacement: path.resolve(__dirname, 'src') }
		]
	})
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

module.exports = {
	external: ['react', 'react-dom', id => /fsevents/.test(id)],
	plugins,
	input: './src/index.ts',
	output: [
		{
			file: 'dist/index.cjs.js',
			format: 'cjs',
			sourcemap: process.env.NODE_ENV !== 'production',
		},
		{
			file: 'dist/index.esm.mjs',
			format: 'esm',
			sourcemap: process.env.NODE_ENV !== 'production',
		},
	],
	treeshake: {
		moduleSideEffects: false,
		propertyReadSideEffects: false,
		unknownGlobalSideEffects: false,
	},
	// manualChunks(id) {
	// 	if (id.includes('node_modules')) {
	// 		return 'vendors';
	// 	}
	// }
};
