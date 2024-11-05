const Router = require('@koa/router');
const templateUtils = require('../../utils/template-utils');
const _ = require('lodash');
const templateStore = require('../../utils/template-utils/store');

module.exports = (prefix, opts) => {
    const router = new Router({prefix});

    router.get('/list', async (ctx) => {
        return  await templateUtils.getTemplateConfigs();
    });

    router.post('/add', async (ctx) => {
        const reqParams = ctx.request.body;
        const {name} = reqParams;
        const templateConfigs = await templateUtils.getTemplateConfigs() ?? [];
        const configOption = templateConfigs.find(item => item.name === name);
        if (configOption) {
            return Error('模板名称已存在');
        }
        const newConfig = _.omit(reqParams, ["template"]);
        newConfig.version = +new Date();
        newConfig.filePath = newConfig.filePath || [name, 'ejs'].join('.');
        templateConfigs.push(newConfig);

        await templateUtils.updateTemplateConfigs(templateConfigs);
        await templateUtils.saveTemplateFile(reqParams.content, newConfig.filePath);
    });

    router.post('/update', async (ctx) => {
        const reqParams = ctx.request.body;
        const {filePath, content} = reqParams;
        await templateUtils.saveTemplateFile(content, filePath);
    });

    router.get('/detail', async (ctx) => {
        const {path} = ctx.query;
        if (!_.isEmpty(path)) {
            const templateContent = templateUtils.getTemplateFile(path);
            return templateContent;
        }
    })

    router.get('/store/update', async (ctx) => {
        await templateStore.storeSync();
    });

    router.get('/config', async (ctx) => {
        return await templateUtils.getTemplateConfigs();
    });
    router.post('/config', async (ctx) => {
        const reqParams = ctx.request.body;
        const {settings} = reqParams;
        return await templateUtils.updateTemplateConfigs(settings);
    });



    return router.routes();
};
