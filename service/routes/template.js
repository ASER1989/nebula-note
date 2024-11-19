const Router = require('@koa/router');
const templateUtils = require('../../utils/template-utils');
const _ = require('lodash');
const templateStore = require('../../utils/template-utils/store');

module.exports = (prefix, opts) => {
    const router = new Router({ prefix });

    router.get('/list', async (ctx) => {
        return await templateUtils.getTemplateConfigs();
    });

    router.post('/upsert', async (ctx) => {
        const reqParams = ctx.request.body;
        const { name } = reqParams;
        const templateConfigs = (await templateUtils.getTemplateConfigs()) ?? [];
        const configIndex = templateConfigs.findIndex((item) => item.name === name);
        const configOption = configIndex >= 0 ? templateConfigs[configIndex] : undefined;
        if (configOption && configOption.version > reqParams.version) {
            return Error('模板版本号不一致');
        }
        const newConfig = _.omit(reqParams, ['meta', 'document']);
        newConfig.version = +new Date();
        newConfig.filePath = newConfig.filePath || [name, '/'].join('');
        newConfig.metaPath = templateUtils.filePathToMetaPath(newConfig.filePath);
        newConfig.docPath = templateUtils.filePathToDocPath(newConfig.filePath);
        newConfig.snippetList = _.map(reqParams.snippetList, (item) =>
            _.omit(item, 'content'),
        );
        if (configOption) {
            templateConfigs[configIndex] = newConfig;
        } else {
            templateConfigs.push(newConfig);
        }

        await templateUtils.updateTemplateConfigs(templateConfigs);
        await templateUtils.saveTemplateFile(reqParams.meta, newConfig.metaPath);
        await templateUtils.saveTemplateFile(reqParams.document, newConfig.docPath);
        const snippetFolderPath = templateUtils.filePathToSnippetFolderPath(
            newConfig.filePath,
        );
        await templateUtils.clearFolder(snippetFolderPath);

        while (reqParams.snippetList.length > 0) {
            const item = reqParams.snippetList.shift();
            const itemPath = templateUtils.filePathToSnippetPath(
                newConfig.filePath,
                item.title,
            );
            await templateUtils.saveTemplateFile(item.content, itemPath);
        }
        return newConfig.version;
    });

    router.get('/content', async (ctx) => {
        const { path, title } = ctx.query;
        const targetPath = templateUtils.filePathToSnippetPath(path, title);
        if (!_.isEmpty(targetPath)) {
            return templateUtils.getTemplateFile(targetPath);
        }
    });

    router.get('/meta', async (ctx) => {
        const { path } = ctx.query;
        if (!_.isEmpty(path)) {
            const metaPath = templateUtils.filePathToMetaPath(path);
            return templateUtils.getTemplateFile(metaPath);
        }
    });

    router.get('/doc', async (ctx) => {
        const { path } = ctx.query;
        if (!_.isEmpty(path)) {
            const docPath = templateUtils.filePathToDocPath(path);
            return templateUtils.getTemplateFile(docPath);
        }
    });

    router.get('/store/update', async (ctx) => {
        await templateStore.storeSync();
    });

    router.get('/config', async (ctx) => {
        return await templateUtils.getTemplateConfigs();
    });

    router.post('/config', async (ctx) => {
        const reqParams = ctx.request.body;
        const { settings } = reqParams;
        return await templateUtils.updateTemplateConfigs(settings);
    });

    return router.routes();
};
