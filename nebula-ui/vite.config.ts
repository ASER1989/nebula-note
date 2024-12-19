import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

const path = require('path');

export default defineConfig(({ command, mode }) => {
    return {
        resolve: {
            alias: {
                '@ui': path.resolve(__dirname, './src'),
            },
        },
        plugins: [
            react(),
            dts({
                rollupTypes: true,
                insertTypesEntry: true,
                exclude: [
                    '**/*.stories.tsx',
                    '**/*.stories.ts',
                    '**/*.stories.mdx',
                    '**/*.test.tsx',
                    '**/*.test.ts',
                ],
            }),
            cssInjectedByJsPlugin()
        ],
        build: {
            lib: {
                entry: 'src/index.ts',
                name: 'Nebula-UI',
                formats: ['es'],
                fileName: (format) => {
                    if (format === 'es') {
                        return 'index.js';
                    }
                    return `index.${format}.js`;
                },
            },
            rollupOptions: {
                external: ['react', 'react-dom', 'classnames', 'lodash'],
                output: {
                    globals: {
                        react: 'React',
                        'react-dom': 'ReactDOM',
                    },
                },
            },
            minify: 'terser',
            terserOptions: {
                compress: {
                    drop_console: true,
                    drop_debugger: true,
                },
                output: {
                    comments: false,
                },
            },
        },
    };
});
