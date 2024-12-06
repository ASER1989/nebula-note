const Router = require('@koa/router');
const templateUtils = require('../../utils/note-utils');
const _ = require('lodash');
const templateStore = require('../../utils/note-utils/store');

module.exports = (prefix, opts) => {
    const router = new Router({ prefix });

    router.get('/list', async (ctx) => {
        return await templateUtils.getConfig();
    });

    router.post('/upsert', async (ctx) => {
        const reqParams = ctx.request.body;
        const { name } = reqParams;
        const templateConfigs = (await templateUtils.getConfig()) ?? [];
        const configIndex = templateConfigs.findIndex((item) => item.name === name);
        const configOption = configIndex >= 0 ? templateConfigs[configIndex] : undefined;
        if (configOption && configOption.version > reqParams.version) {
            return Error('模板版本号不一致');
        }
        const newConfig = _.pick(reqParams, [
            'name',
            'keyword',
            'filePath',
            'templateList',
        ]);
        newConfig.version = +new Date();
        newConfig.filePath = newConfig.filePath || templateUtils.nameToPath(name);
        const metaPath = templateUtils.filePathToMetaPath(newConfig.filePath);
        const docPath = templateUtils.filePathToDocPath(newConfig.filePath);
        newConfig.templateList = _.map(reqParams.templateList, (item) =>
            _.pick(item, 'title', 'language'),
        );
        if (configOption) {
            templateConfigs[configIndex] = newConfig;
        } else {
            templateConfigs.push(newConfig);
        }

        await templateUtils.updateConfig(templateConfigs);
        await templateUtils.saveFile(reqParams.meta, metaPath);
        await templateUtils.saveFile(reqParams.document, docPath);
        const snippetFolderPath = templateUtils.filePathToTemplateFolderPath(
            newConfig.filePath,
        );
        await templateUtils.clearFolder(snippetFolderPath);

        while (reqParams.templateList.length > 0) {
            const item = reqParams.templateList.shift();
            const itemPath = templateUtils.filePathToTemplatePath(
                newConfig.filePath,
                item.title,
            );
            await templateUtils.saveFile(item.content, itemPath);
        }
        return newConfig.version;
    });

    router.get('/content', async (ctx) => {
        const { path, title } = ctx.query;
        const targetPath = templateUtils.filePathToTemplatePath(path, title);
        if (!_.isEmpty(targetPath)) {
            return templateUtils.getFile(targetPath);
        }
    });

    router.get('/meta', async (ctx) => {
        const { path } = ctx.query;
        if (!_.isEmpty(path)) {
            const metaPath = templateUtils.filePathToMetaPath(path);
            return templateUtils.getFile(metaPath);
        }
    });

    router.get('/doc', async (ctx) => {
        const { path } = ctx.query;
        if (!_.isEmpty(path)) {
            const docPath = templateUtils.filePathToDocPath(path);
            return templateUtils.getFile(docPath);
        }
    });

    router.get('/store/update', async (ctx) => {
        await templateStore.storeSync();
    });

    router.get('/config', async (ctx) => {
        return await templateUtils.getConfig();
    });

    router.post('/config', async (ctx) => {
        const reqParams = ctx.request.body;
        const { settings } = reqParams;
        return await templateUtils.updateConfig(settings);
    });

    router.post('/remove', async (ctx) => {
        const { name } = ctx.request.body;
        const templateConfigs = (await templateUtils.getConfig()) ?? [];
        const configIndex = templateConfigs.findIndex((item) => item.name === name);
        if (configIndex >= 0) {
            const filePath = templateConfigs[configIndex]?.filePath;
            await templateUtils.clearFolder(filePath);
            templateConfigs.splice(configIndex, 1);
            await templateUtils.updateConfig(templateConfigs);
            return true;
        }
        return false;
    });

    router.post('/rename', async (ctx) => {
        const { name, newName } = ctx.request.body;
        const templateConfigs = (await templateUtils.getConfig()) ?? [];
        const isNameRepeat = templateConfigs.some((item) => item.name === newName);
        if (isNameRepeat) {
            return Error('名称已存在');
        }
        const config = templateConfigs.find((item) => item.name === name);
        if (config) {
            config.name = newName;
            config.filePath = templateUtils.nameToPath(newName);
            await templateUtils.updateConfig(templateConfigs);
            await templateUtils.folderRename(name, newName);
            return config;
        }
    });

    return router.routes();
};
