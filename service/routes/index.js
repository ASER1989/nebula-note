const Path = require('path');
const Fs = require('fs');
const Router = require('@koa/router');

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

module.exports = (prefix, opts) => {
    const router = new Router(prefix);
    router.get('/', (ctx) => {
        const htmlFilePath = Path.resolve(__dirname, '../../nebula-client/dist/index.html');
        const htmlFile = Fs.readFileSync(htmlFilePath);
        ctx.type = 'text/html';
        ctx.body = htmlFile;
    });

    router.get('/assets/:sourcePath+', (ctx) => {
        const { sourcePath } = ctx.params;
        const sourceFilePath = Path.resolve(
            __dirname,
            `../../nebula-client/dist/assets/${sourcePath}`,
        );
        const sourceFile = Fs.readFileSync(sourceFilePath);
        const responseMIMEType = resolveMIMEType(sourcePath);
        if (responseMIMEType) {
            ctx.type = responseMIMEType;
        }
        ctx.body = sourceFile;
    });
    return router.routes();
};
