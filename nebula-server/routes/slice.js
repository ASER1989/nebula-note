import Router from '@koa/router';
import codeBuilder from '../../utils/node-gen/ejsBuilder';

export default (prefix, opts) => {
    const router = new Router({ prefix });
    router.post('/build/meta', async (ctx) => {
        const reqParams = ctx.request.body;
        const { meta, content, filePath } = reqParams;
        const metaJson = JSON.parse(meta);
        return codeBuilder.build(metaJson, content, filePath ?? '');
    });

    return router.routes();
};
