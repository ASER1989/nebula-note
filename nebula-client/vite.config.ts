/** @type {import('vite').UserConfig} */
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
const path = require('path');

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {

    return {
        root: './',
        base: './',
        resolve: {
            alias: {
                '@client': path.resolve(__dirname, './src'),
                // '@ui': path.resolve(__dirname, '../nebula-ui/src'),
                '@nebula-note/ui': path.resolve(__dirname, '../nebula-ui/dist'),
            },
        },
        mode,
        server: {
            port: 3107,
            strictPort: true,
            proxy: {
                '^/api': {
                    target: 'http://localhost:3816/',
                },
            },
            hmr: true,
        },
        plugins: [react()],
        build: {
            rollupOptions: {
                input: ['./index.html'],
            },
            outDir: 'dist',
            sourcemap: command === 'serve',
            minify: command === 'build',
        }
    };

});
