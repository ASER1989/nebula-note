import Router from '@koa/router';
import fs from 'fs';
import path from 'path';
import { getDataFolder } from '../../utils/note-utils';
import systemConfig from '../../utils/system-config';
import respModel from '../utils/responseModel';

const loopFolder = (folderName, basePath) => {
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
};

export default (prefix, opts) => {
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
        const { folderPath } = ctx.request.body;

        try {
            let parts = [];
            if (folderPath) {
                parts = folderPath.split(/[\\/]/);
            } else {
                const dataPath = getDataFolder();
                parts = dataPath.split(/[\\/]/);
                parts.pop();
            }
            const targetPath = parts.join(path.sep);
            const folderList = loopFolder('', targetPath);

            // 获取最后一个元素
            const lastFolderName = parts.pop();
            ctx.body = respModel({
                name: lastFolderName,
                path: targetPath,
                children: folderList,
            });
        } catch (ex) {
            ctx.body = respModel(null, ex.message);
        }
    });

    return router.routes();
};
