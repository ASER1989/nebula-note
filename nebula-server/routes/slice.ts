///<reference types="../types.d.ts" />
import Router from '@koa/router';
import { Context } from 'koa';
import codeBuilder from '../../utils/node-gen/ejsBuilder';

// 定义请求体的类型
interface BuildRequestBody {
    meta: string;
    content: string;
    filePath?: string;
}

export default (prefix: string) => {
    const router = new Router({ prefix });

    router.post('/build/meta', async (ctx: RequestContext<BuildRequestBody>) => {
        const reqParams = ctx.request.body;
        const { meta, content, filePath } = reqParams;
        const metaJson = JSON.parse(meta);
        try {
            return await codeBuilder.build(metaJson, content, filePath ?? '');
        } catch (error) {
            ctx.status = 500;
            ctx.body = { error: (error as Error).message };
        }
    });

    return router.routes();
};
