/** @type {import('vite').UserConfig} */
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import compression from 'vite-plugin-compression';
import { SupportedLang } from './src/components/codeEditor/queries';

const path = require('path');

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
    console.log('command:', command, mode);
    return {
        root: './',
        base: './',
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
                // external: (id) => {
                //     if (id.includes('@codemirror')) {
                //         console.log('extrnal @codemirror/lang', id);
                //     }

                //     if (id.includes('@codemirror/lang-')) {
                //         const match = id.match(/node_modules\/@codemirror\/lang-([^/]+)/);

                //         if (match) {
                //             const lang = match[1];
                //             if (!SupportedLang.includes(lang as unknown as any)) {
                //                 console.log('extrnal @codemirror/lang', lang);
                //                 return true;
                //             }
                //         }
                //     }
                // },
                output: {
                    manualChunks(id) {
                        if (id.includes('toast-ui')) return 'toast-ui';
                        if (id.includes('codemirror')) return 'codemirror';
                        if (id.includes('@uiw')) return 'codemirror';
                        if (id.includes('lodash')) return 'lodash';
                        return null;
                    },
                },
            },
            outDir: 'dist',
            sourcemap: command === 'serve',
            minify: mode === 'production' ? 'terser' : false,
        },
    };
});
