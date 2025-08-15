import { Context, Middleware, Next } from 'koa';

export const useRequestLog: () => Middleware = () => {
    return async function (ctx: Context, next: Next) {
        await next();
        console.log(`[${ctx.status}]Received:`, ctx.url);
    };
};
