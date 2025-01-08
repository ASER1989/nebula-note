import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { babel } from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import typescript from 'rollup-plugin-typescript2';

export default {
  input: './index.ts',
  output: {
    file: 'dist/index.js',
    format: 'esm',
    sourcemap: true,
  },
  plugins: [
    typescript(),
    resolve(),
    commonjs(),
    json(),
    babel({
      babelHelpers: 'bundled',
    }),
  ],
  external: ['fs', 'path']
};
