const Router = require('@koa/router');
const codeBuilder = require('../../utils/node-gen/ejsBuilder');
const columnTools = require('../utils/columns');

module.exports = (prefix, opts) => {
    const router = new Router({ prefix });
    router.post('/build/meta', async (ctx) => {
        const reqParams = ctx.request.body;
        const { meta, content, filePath } = reqParams;
        const metaJson = JSON.parse(meta);
        return codeBuilder.build(metaJson, content, filePath ?? '');
    });

    return router.routes();
};
