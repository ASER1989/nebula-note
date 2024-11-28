const path = require('path');
const fileUtils = require('../fileUtils');
const systemConfig = require('../system-config');
const _ = require('lodash');
const rimraf = require('rimraf');

const userFolderPath = process.env.HOME || process.env.USERPROFILE;
const configFolder = path.join(userFolderPath, 'Nebula/Notes');

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

    if (await fileUtils.isPathExisted(customConfigPath)) {
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
    const isExisted = await fileUtils.isPathExisted(targetPath);
    if (isExisted) {
        return await fileUtils.readFile(path.join(configPath, filePath));
    }
    return null;
};

const nameToPath = (name) => {
    return [name, '/'].join('');
};

const filePathToMetaPath = (filePath) => {
    return path.join(filePath, 'meta.json');
};

const filePathToDocPath = (filePath) => {
    return path.join(filePath, 'doc.md');
};
const filePathToTemplateFolderPath = (filePath) => {
    return path.join(filePath, 'template');
};
const filePathToTemplatePath = (filePath, title) => {
    const folderPath = filePathToTemplateFolderPath(filePath);
    return path.join(folderPath, `${title}.ejs`);
};

const clearFolder = async (folderPath) => {
    const configPath = getTemplateFolder();
    const targetPath = path.join(configPath, folderPath);
    return await rimraf.rimraf(targetPath);
};

const folderRename = async (oldName, newName) => {
    const configPath = getTemplateFolder();
    const oldPath = path.join(configPath, oldName);
    const newPath = path.join(configPath, newName);
    if (fileUtils.isPathExistedSync(oldPath)) {
        return await fileUtils.rename(oldPath, newPath);
    }
    return true;
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
    filePathToTemplatePath,
    filePathToTemplateFolderPath,
    clearFolder,
    folderRename,
    nameToPath,
};
