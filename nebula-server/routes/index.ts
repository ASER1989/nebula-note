import Router from '@koa/router';
import * as fs from 'fs';
import { Context } from 'koa';
import * as mime from 'mime-types';
import * as process from 'node:process';
import * as path from 'path';

const LRU = require('lru-cache');

const __dirname = (process as unknown as any)['resourcesPath'] ?? process.cwd();
const memoryCache = new LRU({ max: 10 });

const getStaticAssets = (filePath: string) => {
    if (memoryCache.has(filePath)) {
        return memoryCache.get(filePath);
    }
    const content = fs.readFileSync(filePath);
    memoryCache.set(filePath, content);
    return content;
};

export default (prefix: string) => {
    const router = new Router({ prefix });

    router.get('/', (ctx: Context) => {
        const htmlFilePath = path.resolve(__dirname, 'nebula-client/dist/index.html');

        const htmlFile = fs.readFileSync(htmlFilePath);
        ctx.type = 'text/html';
        ctx.body = htmlFile;
    });

    router.get('assets/:sourcePath+', async (ctx: Context) => {
        const { sourcePath }: { sourcePath: string } = ctx.params;
        const absBase = path.resolve(__dirname, 'nebula-client/dist/assets');

        const fullPath = path.join(absBase, sourcePath);
        const mimeType = mime.lookup(sourcePath);

        if (mimeType) ctx.type = mimeType;
        ctx.set('Vary', 'Accept-Encoding');

        const acceptEncodings = ctx.acceptsEncodings();
        const tryCompressed = async (ext: string, encoding: string) => {
            const compressedPath = `${fullPath}.${ext}`;
            if (fs.existsSync(compressedPath)) {
                ctx.set('Content-Encoding', encoding);
                ctx.body = getStaticAssets(compressedPath);
                return true;
            }
            return false;
        };

        // 优先返回 brotli 或 gzip 文件
        if (acceptEncodings.includes('br') && (await tryCompressed('br', 'br'))) return;
        if (acceptEncodings.includes('gzip') && (await tryCompressed('gz', 'gzip')))
            return;

        // 返回原始文件
        if (fs.existsSync(fullPath)) {
            ctx.body = getStaticAssets(fullPath);
        } else {
            ctx.status = 404;
            ctx.body = 'Not Found';
        }
    });

    return router.routes();
};
