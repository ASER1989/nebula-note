import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { babel } from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';

export default {
  input: './main.js',
  output: {
    file: 'dist/index.js',
    format: 'esm',
    sourcemap: true,
  },
  plugins: [
    resolve(),
    commonjs(),
    json(),
    babel({
      babelHelpers: 'bundled',
      // exclude: 'node_modules/**', // 排除 node_modules
    }),
  ],
  external: ['fs', 'path','electron']
};
