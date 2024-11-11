const Router = require('@koa/router');
const fs = require('fs');
const path = require('path');
const respModel = require('../utils/responseModel');
const systemConfig = require('../../utils/system-config');

const projectPath = 'tools\\nova-precreator';
const filters = ['.', 'node_modules', 'cypress', 'dist', 'build', 'deploy'];

const loopFolder = (folderName, basePath) => {
    const readPath = path.join(basePath, folderName);
    const files = fs.readdirSync(readPath, { withFileTypes: true });
    const folderList = files
        .filter((item) => item.isDirectory())
        .filter((item) => {
            return filters.every((filter) => item.name.indexOf(filter) === -1);
        });

    const folder = {
        name: folderName,
        path: readPath,
    };

    folder.children = folderList?.map((item) => loopFolder(item.name, readPath));
    folder.children = folder.children ?? [];

    return folder;
};

module.exports = (prefix, opts) => {
    const router = new Router({ prefix });
    router.get('/folder', async (ctx) => {
        ctx.type = 'text/json';
        try {
            const config = systemConfig.getConfig();
            const readPath =
                config?.folder?.localeRoot ??
                __dirname.substring(0, __dirname.indexOf(projectPath));

            const folderList = loopFolder('', readPath);
            ctx.body = respModel(folderList);
        } catch (ex) {
            ctx.body = respModel(null, ex.message);
        }
    });

    return router.routes();
};
