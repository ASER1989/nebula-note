import { Context, Next } from 'koa';
import { IS_READONLY } from '../../config';

export const useReadonly = async (ctx: Context, next: Next) => {
    if (IS_READONLY) {
        ctx.status = 400;
        ctx.body = new Error(
            '当前为预览模式，内容无法保存，如需体验完整功能请下载安装桌面版',
        );
        return;
    }

    await next();
};
