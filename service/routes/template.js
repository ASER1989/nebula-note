const Router = require('@koa/router');
const templateUtils = require('../../utils/template-utils');
const _ = require('lodash');
const templateStore = require('../../utils/template-utils/store');

module.exports = (prefix, opts) => {
    const router = new Router({ prefix });

    router.get('/list', async (ctx) => {
        return await templateUtils.getTemplateConfigs();
    });

    router.post('/add', async (ctx) => {
        const reqParams = ctx.request.body;
        const { name } = reqParams;
        const templateConfigs = (await templateUtils.getTemplateConfigs()) ?? [];
        const configOption = templateConfigs.find((item) => item.name === name);
        if (configOption) {
            return Error('模板名称已存在');
        }
        const newConfig = _.omit(reqParams, ['content', 'meta']);
        newConfig.version = +new Date();
        newConfig.filePath = newConfig.filePath || [name, 'ejs'].join('.');
        newConfig.metaPath = templateUtils.filePathToMetaPath(newConfig.filePath);
        templateConfigs.push(newConfig);

        await templateUtils.updateTemplateConfigs(templateConfigs);
        await templateUtils.saveTemplateFile(reqParams.content, newConfig.filePath);
        await templateUtils.saveTemplateFile(reqParams.meta, newConfig.metaPath);
    });

    router.post('/update', async (ctx) => {
        const reqParams = ctx.request.body;
        const { filePath, content, meta } = reqParams;
        const metaPath = templateUtils.filePathToMetaPath(filePath);
        await templateUtils.saveTemplateFile(content, filePath);
        await templateUtils.saveTemplateFile(meta, metaPath);
    });

    router.get('/content', async (ctx) => {
        const { path } = ctx.query;
        if (!_.isEmpty(path)) {
            return templateUtils.getTemplateFile(path);
        }
    });

    router.get('/meta', async (ctx) => {
        const { path } = ctx.query;
        if (!_.isEmpty(path)) {
            const metaPath = templateUtils.filePathToMetaPath(path);
            return templateUtils.getTemplateFile(metaPath);
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
