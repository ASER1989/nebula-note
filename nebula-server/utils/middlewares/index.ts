import { Context, Next } from 'koa';
import respModel from '../responseModel';

// 定义中间件函数的类型
type Middleware = (ctx: Context, next: Next) => Promise<void>;

export const setDefaultResponseType: () => Middleware = () => {
    return async function (ctx: Context, next: Next) {
        ctx.type = 'application/json'; // 修正为正确的 MIME 类型
        await next();
    };
};

export const formatResponse: () => Middleware = () => {
    return async function (ctx: Context, next: Next) {
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
