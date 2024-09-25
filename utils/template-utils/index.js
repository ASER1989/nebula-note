const path = require("path");
const fileUtils = require('../fileUtils');
const systemConfig = require('../system-config');
const _ = require('lodash');

const userFolderPath = process.env.HOME || process.env.USERPROFILE;
const configFolder = path.join(userFolderPath, 'AppData/Local/Nebula/Templates');

let templateConfigs;

const getTemplateFolder =  () => {
    const config =  systemConfig.getConfig();
    const customFolder = config.template.root;
    return _.isEmpty(customFolder) ? configFolder : customFolder;
}
const getTemplateConfigPath = async () => {
    const folder = await getTemplateFolder();
    return path.join(folder, 'config.json');
}

const reoladTemplateConfig = async () => {
    templateConfigs = [];
    const customConfigPath = await getTemplateConfigPath();

    if (await fileUtils.isFileExisted(customConfigPath)) {
        const configStr = await fileUtils.readFile(customConfigPath);
        templateConfigs = JSON.parse(configStr);
    }
}

const getTemplateConfigs = async () => {
    if (templateConfigs) {
        return templateConfigs;
    }
    await reoladTemplateConfig();

    return templateConfigs;
}

const updateTemplateConfigs = async (config) => {
    if (!config) {
        return;
    }
    const configPath = await getTemplateConfigPath();
    await fileUtils.writeFile(configPath, JSON.stringify(config, null, '\t'));
    await reoladTemplateConfig();
}

const saveTemplateFile = async (content, filePath) => {
    const configPath = await getTemplateFolder();
    return await fileUtils.writeFile(path.join(configPath, filePath), content);
}

const getTemplateFile = async (filePath) => {
    const configPath = await getTemplateFolder();
    return await fileUtils.readFile(path.join(configPath, filePath));
}

systemConfig.subscribe(reoladTemplateConfig);

module.exports = {
    getTemplateConfigs,
    updateTemplateConfigs,
    saveTemplateFile,
    getTemplateFile,
    getTemplateFolder,
    reoladTemplateConfig
}
