/** @type {import('vite').UserConfig} */
import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({command, mode}) => {
    console.log(command, mode)
    return {
        root: './',
        base: './',
        resolve: {
            alias: {
                '@client': path.resolve(__dirname, './src'),
            },
        },
        mode,
        server: {
            port: 3107,
            strictPort: true,
            proxy: {
                '^/api': {
                    target: 'http://localhost:3816/',
                }
            },
            hmr: true
        },
        plugins: [react()],
        build: {
            rollupOptions: {
                input: ["./index.html"]
            },
            outDir: 'dist',
            sourcemap: command === 'serve',
            minify: command === 'build'
        },
    }
});
