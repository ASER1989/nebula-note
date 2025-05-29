import { Context, Middleware, Next } from 'koa';

export const useDefaultResponseType: () => Middleware = () => {
    return async function (ctx: Context, next: Next) {
        if (/\/api\//.test(ctx.path)) {
            ctx.type = 'application/json';
        }
        await next();
    };
};
