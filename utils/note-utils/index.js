const path = require('path');
const fileUtils = require('../fileUtils');
const systemConfig = require('../system-config');
const _ = require('lodash');
const rimraf = require('rimraf');
const { defaultDataSource } = require('../config');

let _config;

const getDataFolder = () => {
    const config = systemConfig.getConfig();
    const customFolder = config?.dataSource?.find((item) => item.isActive);
    return _.isEmpty(customFolder) ? defaultDataSource : customFolder?.path;
};
const getConfigPath = async () => {
    const folder = await getDataFolder();
    return path.join(folder, 'config.json');
};

const reloadConfig = async () => {
    _config = [];
    const customConfigPath = await getConfigPath();

    if (await fileUtils.isPathExisted(customConfigPath)) {
        const configString = await fileUtils.readFile(customConfigPath);
        _config = JSON.parse(configString);
    }
};

const getConfig = async () => {
    if (_config) {
        return _config;
    }
    await reloadConfig();

    return _config;
};

const updateConfig = async (config) => {
    if (!config) {
        return;
    }
    const configPath = await getConfigPath();
    await fileUtils.writeFile(configPath, JSON.stringify(config, null, '\t'));
    await reloadConfig();
};

const saveFile = async (content, filePath) => {
    const configPath = getDataFolder();
    return await fileUtils.writeFile(path.join(configPath, filePath), content);
};

const getFile = async (filePath) => {
    const configPath = await getDataFolder();
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
    const configPath = getDataFolder();
    const targetPath = path.join(configPath, folderPath);
    return await rimraf.rimraf(targetPath);
};

const folderRename = async (oldName, newName) => {
    const configPath = getDataFolder();
    const oldPath = path.join(configPath, oldName);
    const newPath = path.join(configPath, newName);
    if (fileUtils.isPathExistedSync(oldPath)) {
        return await fileUtils.rename(oldPath, newPath);
    }
    return true;
};

systemConfig.subscribe(reloadConfig);

module.exports = {
    getConfig,
    updateConfig,
    saveFile,
    getFile,
    getDataFolder,
    reloadConfig,
    filePathToMetaPath,
    filePathToDocPath,
    filePathToTemplatePath,
    filePathToTemplateFolderPath,
    clearFolder,
    folderRename,
    nameToPath,
};
