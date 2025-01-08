import Router from '@koa/router';
import * as fs from 'fs';
import {Context} from 'koa';
import * as path from 'path';
import {getDataFolder} from '../../utils/note-utils';
import * as systemConfig from '../../utils/system-config';
import respModel from '../utils/responseModel';

const __dirname = path.resolve();
const configFolder = 'config'; // 假设 configFolder 是一个字符串常量

type FolderItem = {
  name: string;
  path: string;
};

const loopFolder = (folderName: string, basePath: string): FolderItem[] => {
  const readPath = path.join(basePath, folderName);
  const files = fs.readdirSync(readPath, {withFileTypes: true});
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

export default (prefix: string) => {
  const router = new Router({prefix});

  router.get('/folder', async (ctx: Context) => {
    ctx.type = 'text/json';
    try {
      const config = systemConfig.getConfig();
      const readPath =
        config?.folder?.localeRoot ??
        __dirname.substring(0, __dirname.indexOf(configFolder));

      const folderList = loopFolder('', readPath);
      ctx.body = respModel(folderList);
    } catch (ex) {
      ctx.body = respModel(null, (ex as Error).message);
    }
  });

  router.post('/folder/list', async (ctx: Context) => {
    ctx.type = 'text/json';
    const {folderPath} = <{ folderPath: string }>ctx.request.body;

    try {
      let parts: string[] = [];
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
      ctx.body = respModel(null, (ex as Error).message);
    }
  });

  return router.routes();
};
