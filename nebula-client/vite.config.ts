/** @type {import('vite').UserConfig} */
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import type { PluginOption } from 'vite';
import compression from 'vite-plugin-compression';
import { SupportedLang } from './src/components/codeEditor/queries';
import removeLangDatasPlugin from './vite_plugins/removeLangDatasPlugin';
import removeLangsPlugin from './vite_plugins/removeLangsPlugin';

const path = require('path');

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
    console.log('command:', command, mode);
    let removeLangPlugins: Array<PluginOption> = [];
    if (mode === 'production') {
        removeLangPlugins = [
            removeLangsPlugin(SupportedLang as unknown as Array<string>),
            removeLangDatasPlugin(SupportedLang as unknown as Array<string>),
        ];
    }
    return {
        root: './',
        base: '/',
        resolve: {
            alias: {
                '@client': path.resolve(__dirname, './src'),
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
        plugins: [
            ...removeLangPlugins,
            react(),
            compression({
                algorithm: 'gzip',
                ext: '.gz',
                threshold: 1024,
                deleteOriginFile: false,
            }),
            compression({
                algorithm: 'brotliCompress',
                ext: '.br',
            }),
        ],
        build: {
            rollupOptions: {
                input: ['./index.html'],
            },
            outDir: 'dist',
            sourcemap: command === 'serve',
            minify: mode === 'production' ? 'terser' : false,
        },
    };
});
