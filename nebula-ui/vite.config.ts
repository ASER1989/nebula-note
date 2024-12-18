import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

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
        ],
        build: {
            lib: {
                entry: 'src/index.ts',
                name: 'Nebula-UI',
                formats: ['es', 'umd'],
                fileName: (format) => {
                    if (format === 'umd') {
                        return 'index.js';
                    }
                    return `index.${format}.js`;
                },
            },
            rollupOptions: {
                external: ['react', 'react-dom'],
                output: {
                    globals: {
                        react: 'React',
                        'react-dom': 'ReactDOM',
                    },
                },
            },
        },
    };
});
