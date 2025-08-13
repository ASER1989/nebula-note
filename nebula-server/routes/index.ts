import Router from '@koa/router';
import * as fs from 'fs';
import { Context } from 'koa';
import * as mime from 'mime-types';
import * as path from 'path';
import templateUtils from '../../utils/note-utils';

export default (prefix: string) => {
    const router = new Router({ prefix });

    router.get('image/:sourcePath+', (ctx: Context) => {
        const { sourcePath }: { sourcePath: string } = ctx.params;
        const configPath = templateUtils.getDataFolder();
        const assertPath = path.join(configPath, sourcePath);
        if (!fs.existsSync(assertPath)) {
            ctx.throw(404, `Not Found ${assertPath}`);
        }

        ctx.type = mime.lookup(assertPath) || 'application/octet-stream';
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

    return router.routes();
};
