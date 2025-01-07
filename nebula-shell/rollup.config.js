import { babel } from '@rollup/plugin-babel';
import { DEFAULT_EXTENSIONS } from '@babel/core';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';

const configBase = {
    plugins: [
        typescript(),
        resolve(),
        commonjs(),
        json(),
        babel({
            babelHelpers: 'bundled',
            extensions:[...DEFAULT_EXTENSIONS,'ts']
        }),
    ],
    external: ['fs', 'path','os', 'electron'],
};
export default [
    {
        ...configBase,
        input: {
            main: './src/main.ts',
        },
        output: {
            dir: 'dist',
            entryFileNames: 'main.js',
            sourcemap: true,
            format: 'esm',
        },
    },
    {
        ...configBase,
        input: {
            preload: './src/preload.ts',
        },
        output: {
            dir: 'dist',
            entryFileNames: 'preload.cjs',
            sourcemap: true,
            format: 'cjs',
        },
    },
];
