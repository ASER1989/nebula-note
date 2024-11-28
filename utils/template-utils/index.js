const path = require('path');
const fileUtils = require('../fileUtils');
const systemConfig = require('../system-config');
const _ = require('lodash');
const rimraf = require('rimraf');

const userFolderPath = process.env.HOME || process.env.USERPROFILE;
const configFolder = path.join(userFolderPath, 'Nebula/Templates');

let templateConfigs;

const getTemplateFolder = () => {
    const config = systemConfig.getConfig();
    const customFolder = config.template.root;
    return _.isEmpty(customFolder) ? configFolder : customFolder;
};
const getTemplateConfigPath = async () => {
    const folder = await getTemplateFolder();
    return path.join(folder, 'config.json');
};

const reloadTemplateConfig = async () => {
    templateConfigs = [];
    const customConfigPath = await getTemplateConfigPath();

    if (await fileUtils.isFileExisted(customConfigPath)) {
        const configStr = await fileUtils.readFile(customConfigPath);
        templateConfigs = JSON.parse(configStr);
    }
};

const getTemplateConfigs = async () => {
    if (templateConfigs) {
        return templateConfigs;
    }
    await reloadTemplateConfig();

    return templateConfigs;
};

const updateTemplateConfigs = async (config) => {
    if (!config) {
        return;
    }
    const configPath = await getTemplateConfigPath();
    await fileUtils.writeFile(configPath, JSON.stringify(config, null, '\t'));
    await reloadTemplateConfig();
};

const saveTemplateFile = async (content, filePath) => {
    if (content) {
        const configPath = getTemplateFolder();
        return await fileUtils.writeFile(path.join(configPath, filePath), content);
    }
};

const getTemplateFile = async (filePath) => {
    const configPath = await getTemplateFolder();
    const targetPath = path.join(configPath, filePath);
    const isExisted = await fileUtils.isFileExisted(targetPath);
    if (isExisted) {
        return await fileUtils.readFile(path.join(configPath, filePath));
    }
    return null;
};

const filePathToMetaPath = (filePath) => {
    return path.join(filePath, 'meta.json');
};

const filePathToDocPath = (filePath) => {
    return path.join(filePath, 'doc.md');
};
const filePathToSnippetFolderPath = (filePath) => {
    return path.join(filePath, 'snippet');
};
const filePathToSnippetPath = (filePath, title) => {
    const folderPath = filePathToSnippetFolderPath(filePath);
    return path.join(folderPath, `${title}.ejs`);
};

const clearFolder = async (folderPath) => {
    const configPath = getTemplateFolder();
    const targetPath = path.join(configPath, folderPath);
    return await rimraf.rimraf(targetPath);
};

systemConfig.subscribe(reloadTemplateConfig);

module.exports = {
    getTemplateConfigs,
    updateTemplateConfigs,
    saveTemplateFile,
    getTemplateFile,
    getTemplateFolder,
    reloadTemplateConfig,
    filePathToMetaPath,
    filePathToDocPath,
    filePathToSnippetPath,
    filePathToSnippetFolderPath,
    clearFolder,
};
