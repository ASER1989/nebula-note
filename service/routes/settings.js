const Router = require('@koa/router');
const _ = require('lodash');
const systemConfig = require('../../utils/system-config');

module.exports = (prefix, opts) => {
    const router = new Router({ prefix });

    router.get('/', (ctx) => {
        return systemConfig.getConfig();
    });

    router.post('/', async (ctx) => {
        const settings = ctx.request.body;
        return await systemConfig.updateConfig(settings);
    });

    return router.routes();
};
