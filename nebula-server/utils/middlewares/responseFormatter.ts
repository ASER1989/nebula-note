import { Context, Middleware, Next } from 'koa';
import respModel from '../responseModel';

export const useResponseFormatter: () => Middleware = () => {
    return async function (ctx: Context, next: Next) {
        if (!/\/api\//.test(ctx.path)) {
            return await next();
        }
        
        try {
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
