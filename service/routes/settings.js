const Router = require('@koa/router');
const _ = require('lodash');
const systemConfig = require('../../utils/system-config');

module.exports = (prefix, opts) => {
    const router = new Router({prefix});

    router.get('/', (ctx) => {
        return systemConfig.getConfig();
    });

    router.post('/', async (ctx) => {
        const reqParams = ctx.request.body;
        const {settings} = reqParams;
        const config = systemConfig.getConfig();
        const newConfig = _.merge(config, settings);

        const result = await systemConfig.updateConfig(newConfig);
        return result;
    })

    return router.routes();
};
