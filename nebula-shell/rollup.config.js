import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';

export default [{
    input: {
        main: './main.js',
    },
    output: {
        dir: 'dist',
        entryFileNames: 'main.js',
        sourcemap: true,
        format: 'esm',
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
    external: ['fs', 'path', 'electron'],
},{
    input: {
        preload: './preload.js',
    },
    output: {
        dir: 'dist',
        entryFileNames: 'preload.cjs',
        sourcemap: true,
        format: 'cjs',
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
    external: ['fs', 'path', 'electron'],
}];
