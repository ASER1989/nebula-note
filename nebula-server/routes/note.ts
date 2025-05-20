import Router from '@koa/router';
import templateUtils from '../../utils/note-utils';
import _ from 'lodash';
import templateStore from '../../utils/note-utils/store';
import {Context} from 'koa';
import './types';
import {useReadonly} from "../utils/middlewares/permission";

export default (prefix: string) => {
  const router = new Router({prefix});

  router.get('/list', async (ctx: Context) => {
    return await templateUtils.getConfig();
  });

  router.post('/upsert', useReadonly, async (ctx: Context) => {
    const reqParams = <Note.NoteRecordReq>ctx.request.body;
    const {name} = reqParams;
    const templateConfigs: Note.NoteRecord[] = (await templateUtils.getConfig()) ?? [];
    const configIndex = templateConfigs.findIndex((item) => item.name === name);
    const configOption = configIndex >= 0 ? templateConfigs[configIndex] : undefined;

    if (!Boolean(name)) {
      ctx.status = 400;
      ctx.body = new Error('名称不能为空');
      return;
    }

    const reqDataVersion = reqParams.version ?? 0;
    const dataVersion = configOption?.version ?? 0;
    if (configOption && dataVersion > reqDataVersion && !reqParams.replace) {
      ctx.status = 400;
      ctx.body = new Error('版本号不一致');
      return;
    }

    const newConfig: Note.NoteRecord = _.pick(reqParams, [
      'name',
      'keyword',
      'filePath',
      'templateList',
    ]);
    newConfig.version = +new Date();
    newConfig.filePath = newConfig.filePath || templateUtils.nameToPath(name);
    const metaPath = templateUtils.filePathToMetaPath(newConfig.filePath);
    const docPath = templateUtils.filePathToDocPath(newConfig.filePath);
    newConfig.templateList = _.map(reqParams.templateList, (item: Note.TemplateRecord) =>
      _.pick(item, 'title', 'language')
    );

    if (configOption) {
      templateConfigs[configIndex] = newConfig;
    } else {
      templateConfigs.push(newConfig);
    }

    await templateUtils.updateConfig(templateConfigs);
    await templateUtils.saveFile(reqParams.meta, metaPath);
    await templateUtils.saveFile(reqParams.document, docPath);
    const snippetFolderPath = templateUtils.filePathToTemplateFolderPath(newConfig.filePath);
    await templateUtils.clearFolder(snippetFolderPath);

    while (reqParams.templateList?.length ?? 0 > 0) {
      const item = reqParams.templateList?.shift();
      const itemPath = templateUtils.filePathToTemplatePath(newConfig.filePath, item?.title);
      await templateUtils.saveFile(item?.content, itemPath);
    }
    return newConfig.version;
  });

  router.get('/content', async (ctx: Context) => {
    const {path, title} = ctx.query;
    const targetPath = templateUtils.filePathToTemplatePath(path, title);
    if (!_.isEmpty(targetPath)) {
      return await templateUtils.getFile(targetPath);
    }
  });

  router.get('/meta', async (ctx: Context) => {
    const {path} = ctx.query;
    if (!_.isEmpty(path)) {
      const metaPath = templateUtils.filePathToMetaPath(path);
      return await templateUtils.getFile(metaPath);
    }
  });

  router.get('/doc', async (ctx: Context) => {
    const {path} = ctx.query;
    if (!_.isEmpty(path)) {
      const docPath = templateUtils.filePathToDocPath(path);
      return await templateUtils.getFile(docPath);
    }
  });

  router.get('/store/update', async (ctx: Context) => {
    await templateStore.storeSync();
    return 'Store updated';
  });

  router.get('/config', async (ctx: Context) => {
    return await templateUtils.getConfig();
  });


  router.post('/remove', useReadonly, async (ctx: Context) => {
    const {name} = <{ name: string }>ctx.request.body;
    const templateConfigs: Note.NoteRecord[] = (await templateUtils.getConfig()) ?? [];
    const configIndex = templateConfigs.findIndex((item) => item.name === name);
    if (configIndex >= 0) {
      const filePath = templateConfigs[configIndex]?.filePath;
      if (!Boolean(filePath) || filePath === '/') {
        return false;
      }
      await templateUtils.clearFolder(filePath);
      templateConfigs.splice(configIndex, 1);
      await templateUtils.updateConfig(templateConfigs);
      return true;
    }
    return false;

  });

  router.post('/rename', useReadonly, async (ctx: Context) => {
    const {name, newName} = <{ name: string, newName: string }>ctx.request.body;
    if (!Boolean(newName)) {
      return new Error('名称不能为空');
    }
    const templateConfigs: Note.NoteRecord[] = (await templateUtils.getConfig()) ?? [];
    const isNameRepeat = templateConfigs.some((item) => item.name === newName);
    if (isNameRepeat) {
      return new Error('名称已存在');
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
