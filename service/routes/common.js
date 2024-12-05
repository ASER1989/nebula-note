const Router = require('@koa/router');
const fs = require('fs');
const path = require('path');
const respModel = require('../utils/responseModel');
const systemConfig = require('../../utils/system-config');
const { getDataFolder } = require('../../utils/note-utils');

const loopFolder = (folderName, basePath, targetLevel = undefined, level = 0) => {
    const readPath = path.join(basePath, folderName);
    const files = fs.readdirSync(readPath, { withFileTypes: true });
    const folderList = files
        .filter((item) => item.isDirectory())
        .map((item) => {
            return {
                name: item.name,
                path: path.join(readPath, item.name),
            };
        });

    return folderList ?? [];

    const folder = {
        name: folderName,
        path: readPath,
    };

    if (targetLevel && level < targetLevel) {
        folder.children =
            folderList?.map((item) =>
                loopFolder(item.name, readPath, targetLevel, ++level),
            ) ?? [];
    }

    return [folder];
};

module.exports = (prefix, opts) => {
    const router = new Router({ prefix });
    router.get('/folder', async (ctx) => {
        ctx.type = 'text/json';
        try {
            const config = systemConfig.getConfig();
            const readPath =
                config?.folder?.localeRoot ??
                __dirname.substring(0, __dirname.indexOf(configFolder));

            const folderList = loopFolder('', readPath);
            ctx.body = respModel(folderList);
        } catch (ex) {
            ctx.body = respModel(null, ex.message);
        }
    });

    router.post('/folder/list', async (ctx) => {
        ctx.type = 'text/json';
        const { path } = ctx.request.body;

        try {
            const readPath = path ?? getDataFolder();

            const folderList = loopFolder('', readPath, 1);
            ctx.body = respModel(folderList);
        } catch (ex) {
            ctx.body = respModel(null, ex.message);
        }
    });

    return router.routes();
};
