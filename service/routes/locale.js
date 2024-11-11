const Router = require('@koa/router');
const localeBuilder = require('../../utils/node-gen/locale');
const respModel = require('../utils/responseModel');
const path = require('path');

module.exports = (prefix, opts) => {
    const router = new Router({ prefix });
    router.post('/in', async (ctx) => {
        const reqParams = ctx.request.body;
        const { formState, schemaList } = reqParams;
        ctx.type = 'text/json';
        try {
            const filePath = path.join(
                formState.folderPath,
                formState.moduleName,
                'locale.lang',
            );
            await localeBuilder(formState, filePath, schemaList);
            ctx.body = respModel();
        } catch (e) {
            ctx.body = respModel(null, e.message);
        }
    });

    return router.routes();
};
