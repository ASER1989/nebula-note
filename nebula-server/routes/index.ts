import Router from '@koa/router';
import * as fs from 'fs';
import * as path from 'path';
import { Context } from 'koa';

const __dirname = path.resolve();

type MIMETypeMap = {
    [key: string]: string;
};

const MIMEType: MIMETypeMap = {
    js: 'application/javascript',
    css: 'text/css',
};

const resolveMIMEType = (fileName: string): string | undefined => {
    const isJs = /\.js$/.test(fileName);
    if (isJs) {
        return MIMEType.js;
    }

    const isCss = /\.css$/.test(fileName);
    if (isCss) {
        return MIMEType.css;
    }
};

export default (prefix: string) => {
    const router = new Router({ prefix });

    router.get('/', (ctx: Context) => {
        const htmlFilePath = path.resolve(
            __dirname,
            '../nebula-client/dist/index.html',
        );
        const htmlFile = fs.readFileSync(htmlFilePath);
        ctx.type = 'text/html';
        ctx.body = htmlFile;
    });

    router.get('assets/:sourcePath+', (ctx: Context) => {
        const { sourcePath }: { sourcePath: string } = ctx.params;
        const sourceFilePath = path.resolve(
            __dirname,
            `../nebula-client/dist/assets/${sourcePath}`,
        );
        const sourceFile = fs.readFileSync(sourceFilePath);
        const responseMIMEType = resolveMIMEType(sourcePath);
        if (responseMIMEType) {
            ctx.type = responseMIMEType;
        }
        ctx.body = sourceFile;
    });

    return router.routes();
};
