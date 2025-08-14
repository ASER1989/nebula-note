///<reference types="../types.d.ts" />
import Router from '@koa/router';
import { Context } from 'koa';
import systemConfig from '../../utils/system-config';
import { useReadonly } from '../utils/middlewares/permission';

export default (prefix: string) => {
    const router = new Router({ prefix });

    router.get('/', (ctx: Context) => {
        return systemConfig.getConfig();
    });

    router.post('/', useReadonly, async (ctx: Context) => {
        const settings = ctx.request.body as System.Settings;
        return await systemConfig.updateConfig(settings);
    });

    return router.routes();
};
