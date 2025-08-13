import Router from '@koa/router';
import * as fs from 'fs';
import { Context } from 'koa';
import { LRUCache } from 'lru-cache';
import * as mime from 'mime-types';
import * as process from 'node:process';
import * as path from 'path';
import templateUtils from '../../utils/note-utils';

const __dirname = (process as unknown as any)['resourcesPath'] ?? process.cwd();
const memoryCache = new LRUCache({ max: 10 });

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

        ctx.type = 'text/html';
        ctx.body = fs.createReadStream(htmlFilePath);
    });

    router.get('image/:sourcePath+', (ctx: Context) => {
        debugger
        const { sourcePath }: { sourcePath: string } = ctx.params;
        const configPath = templateUtils.getDataFolder();
        const assertPath = path.join(configPath, sourcePath);
        if (!fs.existsSync(assertPath)) {
            ctx.throw(404, 'Not Found');
        }

        const stats = fs.statSync(assertPath);
        const range = ctx.headers.range;

        if (range) {
            const [startStr, endStr] = range.replace(/bytes=/, '').split('-');
            const start = parseInt(startStr, 10);
            const end = endStr ? parseInt(endStr, 10) : stats.size - 1;

            ctx.status = 206; // Partial Content
            ctx.set('Content-Range', `bytes ${start}-${end}/${stats.size}`);
            ctx.set('Accept-Ranges', 'bytes');
            ctx.length = end - start + 1;

            ctx.body = fs.createReadStream(assertPath, { start, end });
        } else {
            ctx.length = stats.size;
            ctx.body = fs.createReadStream(assertPath);
        }
    });

    router.get('assets/:sourcePath+', (ctx: Context) => {
        const { sourcePath }: { sourcePath: string } = ctx.params;
        const absBase = path.resolve(__dirname, 'nebula-client/dist/assets');

        const fullPath = path.join(absBase, sourcePath);
        const mimeType = mime.lookup(sourcePath);

        if (mimeType) ctx.type = mimeType;
        ctx.set('Vary', 'Accept-Encoding');

        const acceptEncodings = ctx.acceptsEncodings();
        const tryCompressed = (ext: string, encoding: string) => {
            const compressedPath = `${fullPath}.${ext}`;
            if (fs.existsSync(compressedPath)) {
                ctx.set('Content-Encoding', encoding);
                ctx.body = fs.createReadStream(compressedPath);
                return true;
            }
            return false;
        };

        // 优先返回 brotli 或 gzip 文件
        if (acceptEncodings.includes('br') && tryCompressed('br', 'br')) return;
        if (acceptEncodings.includes('gzip') && tryCompressed('gz', 'gzip')) return;

        // 返回原始文件
        if (fs.existsSync(fullPath)) {
            ctx.body = fs.createReadStream(fullPath);
        } else {
            ctx.status = 404;
            ctx.body = 'Not Found';
        }
    });

    return router.routes();
};
