import Router from '@koa/router';
import systemConfig from '../../utils/system-config';

export default (prefix, opts) => {
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
