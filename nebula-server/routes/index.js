import Router from '@koa/router';
import fs from 'fs';
import path from 'path';

const MIMEType = {
    js: 'application/javascript',
    css: 'text/css',
};

const resolveMIMEType = (fileName) => {
    const isJs = /\.js/.test(fileName);
    if (isJs) {
        return MIMEType.js;
    }

    const isCss = /\.css/.test(fileName);
    if (isCss) {
        return MIMEType.css;
    }
};

export default (prefix, opts) => {
    const router = new Router(prefix);
    router.get('/', (ctx) => {
        const htmlFilePath = path.resolve(
            __dirname,
            '../../nebula-client/dist/index.html',
        );
        const htmlFile = fs.readFileSync(htmlFilePath);
        ctx.type = 'text/html';
        ctx.body = htmlFile;
    });

    router.get('/assets/:sourcePath+', (ctx) => {
        const { sourcePath } = ctx.params;
        const sourceFilePath = path.resolve(
            __dirname,
            `../../nebula-client/dist/assets/${sourcePath}`,
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
