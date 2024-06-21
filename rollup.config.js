const babel = require('@rollup/plugin-babel').default;
const typescript = require('@rollup/plugin-typescript');
const json = require('@rollup/plugin-json');
const terser = require('@rollup/plugin-terser');
const ignore = require('rollup-plugin-ignore');
const postcss = require('rollup-plugin-postcss');
const resolve = require('@rollup/plugin-node-resolve').nodeResolve; // NodeResolve 함수를 직접 가져옴
const commonjs = require('@rollup/plugin-commonjs');
const createIndexFilePlugin = require('./plugins/rollup-plugin-create-index.js');

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
		plugins: ['@emotion'],
	}),
	postcss({
		modules: true,
		extensions: ['.css', '.scss', '.sass'],
		use: [
			['sass', {
				includePaths: ['./src/styles']
			}]
		],
		extract: false,
		minimize: true,
		sourceMap: true
	}),
	createIndexFilePlugin({
		target: '',
		fileName: {
			cjs: 'index.cjs.js',
			esm: 'index.esm.mjs',
		},
	}),
]

if (process.env.NODE_ENV === 'production') {
	plugins.push(terser({
		compress: {
			unused: true,
			dead_code: true,
			conditionals: true,
			drop_console: true, // 콘솔 로그 제거
			pure_funcs: ['console.info', 'console.debug', 'console.warn'], // 특정 콘솔 함수 제거
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
	manualChunks(id) {
		if (id.includes('node_modules')) {
			return 'vendors';
		}
	}
};
