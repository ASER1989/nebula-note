///<reference types="../../types.d.ts" />
import formidable from 'formidable';
import { Middleware, Next } from 'koa';
import fileUtils from '../../../utils/fileUtils';

export const useMultipart: (tempPath: string) => Middleware =
    (tempPath: string) => async (ctx: global.MultipartContext, next: Next) => {
        if (ctx.req.headers['content-type']?.includes('multipart/form-data;')) {
            if (tempPath) {
                await fileUtils.mkdir(tempPath);
            }
            const form = formidable({
                keepExtensions: true,
                uploadDir: tempPath,
            });
            const result = await form.parse(ctx.req);
            const [fields, files] = result;

            const reqParams: Record<string, unknown> = {};
            Object.keys(fields).forEach((key) => {
                reqParams[key] = fields?.[key]?.[0];
            });

            const uploadFiles: Record<string, formidable.File> = {};
            Object.keys(files).forEach((key) => {
                if (files?.[key]?.[0]) {
                    uploadFiles[key] = files?.[key]?.[0];
                }
            });

            ctx.request.body = reqParams;
            ctx.request.files = uploadFiles;
        }

        return next();
    };
