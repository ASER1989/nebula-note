import { Context, Next } from 'koa';
import respModel from '../responseModel';

type Middleware = (ctx: Context, next: Next) => Promise<void>;

export const setDefaultResponseType: () => Middleware = () => {
    return async function (ctx: Context, next: Next) {
        ctx.type = 'text/json';
        await next();
    };
};

export const formatResponse: () => Middleware = () => {
    return async function (ctx: Context, next: Next) {
        try {
            if (ctx.path.startsWith('/assets')) {
                next();
                return;
            }
            const result = await next();
            if (ctx.body instanceof Error) {
                ctx.body = respModel(null, ctx.body.message);
            } else if (!ctx.body) {
                ctx.body = respModel(result);
            }
        } catch (ex) {
            ctx.body = respModel(null, (ex as Error).message.toString());
        }
    };
};
