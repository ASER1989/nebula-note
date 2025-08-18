///<reference types="../types.d.ts" />
import Router from '@koa/router';
import { Context } from 'koa';
import _ from 'lodash';
import path from 'path';
import fileUtils from '../../utils/fileUtils';
import templateUtils from '../../utils/note-utils';
import templateStore from '../../utils/note-utils/store';
import { useReadonly } from '../utils/middlewares/permission';

import NoteRecord = Note.NoteRecord;

export default (prefix: string) => {
    const router = new Router({ prefix });

    router.get('/list', async (ctx: Context) => {
        return await templateUtils.getConfig();
    });

    router.post(
        '/upsert',
        useReadonly,
        async (ctx: RequestContext<Note.NoteRecordReq>) => {
            const reqParams = ctx.request.body;
            const { name } = reqParams;
            const templateConfigs: Note.NoteRecord[] =
                (await templateUtils.getConfig()) ?? [];
            const configIndex = templateConfigs.findIndex((item) => item.name === name);
            const configOption =
                configIndex >= 0 ? templateConfigs[configIndex] : undefined;

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
            newConfig.templateList = _.map(
                reqParams.templateList,
                (item: Note.TemplateRecord) => _.pick(item, 'title', 'language'),
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

            while (reqParams.templateList?.length ?? 0 > 0) {
                const item = reqParams.templateList?.shift();
                const itemPath = templateUtils.filePathToTemplatePath(
                    newConfig.filePath,
                    item?.title,
                );
                await templateUtils.saveFile(item?.content, itemPath);
            }
            return newConfig.version;
        },
    );

    router.post(
        '/image/upload',
        async (ctx: MultipartContext<Note.NoteImageUploadReq>) => {
            const { filePath } = ctx.request.body;
            const file = ctx.request.files?.file;

            if (file && fileUtils.isPathExistedSync(file.filepath)) {
                const folderPath = templateUtils.filePathToImgPath(filePath);
                const ext = path.extname(file.originalFilename);
                const configPath = templateUtils.getDataFolder();
                const targetDir = path.join(configPath, folderPath);
                const fileName = Date.now() + ext;
                const newPath = path.join(targetDir, fileName);

                await fileUtils.mkdir(targetDir);
                await fileUtils.rename(file.filepath, newPath);

                return path.join(
                    'note/doc/image',
                    folderPath.replace(filePath, ''),
                    fileName,
                );
            }

            return new Error('未检测到文件');
        },
    );

    router.get('/content', async (ctx: Context) => {
        const { path, title } = ctx.query;
        const targetPath = templateUtils.filePathToTemplatePath(path, title);
        if (!_.isEmpty(targetPath)) {
            return await templateUtils.getFile(targetPath);
        }
    });

    router.get('/meta', async (ctx: Context) => {
        const { path } = ctx.query;
        if (!_.isEmpty(path)) {
            const metaPath = templateUtils.filePathToMetaPath(path);
            return await templateUtils.getFile(metaPath);
        }
    });

    router.get('/doc', async (ctx: Context) => {
        const { path } = ctx.query;
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

    router.post(
        '/reorder',
        async (ctx: RequestContext<{ activeName: string; overName: string }>) => {
            const { activeName, overName } = ctx.request.body;
            const templateConfigs: Note.NoteRecord[] =
                (await templateUtils.getConfig()) || [];

            const activeIndex = templateConfigs.findIndex(
                (item: NoteRecord) => item.name === activeName,
            );
            const overIndex = templateConfigs.findIndex(
                (item: NoteRecord) => item.name === overName,
            );

            const clonedConfigs = templateConfigs.slice();

            clonedConfigs.splice(
                overIndex < 0 ? clonedConfigs.length + overIndex : overIndex,
                0,
                clonedConfigs.splice(activeIndex, 1)[0],
            );
            await templateUtils.updateConfig(clonedConfigs);
            return true;
        },
    );

    router.post('/remove', useReadonly, async (ctx: RequestContext<{ name: string }>) => {
        const { name } = ctx.request.body;
        const templateConfigs: Note.NoteRecord[] =
            (await templateUtils.getConfig()) ?? [];
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

    router.post(
        '/rename',
        useReadonly,
        async (ctx: RequestContext<{ name: string; newName: string }>) => {
            const { name, newName } = ctx.request.body;
            if (!Boolean(newName)) {
                return new Error('名称不能为空');
            }
            const templateConfigs: Note.NoteRecord[] =
                (await templateUtils.getConfig()) ?? [];
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
        },
    );

    return router.routes();
};
