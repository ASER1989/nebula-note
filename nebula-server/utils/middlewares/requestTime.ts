import { Context, Next } from 'koa';

export const useRequestTime = async (ctx: Context, next: Next) => {
    const startTime = new Date().getMilliseconds();
    await next();
    const endTime = new Date().getMilliseconds();
    const ms = endTime - startTime;
    ctx.set('X-Response-Time', `${ms}ms`);
};
