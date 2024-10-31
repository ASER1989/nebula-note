const path = require('path');
const fileUtils = require('../fileUtils');
const initialConfig = require('../../config.json');
const _ = require('lodash');

const userFolderPath = process.env.HOME || process.env.USERPROFILE;
const configPath = path.join(userFolderPath, 'Nebula/config.json');

let _systemConfig;
const subscribes = [];

const mergeConfig = (defaultConfig, customConfig) => {
    const result = {};
    Object.keys(defaultConfig).forEach((key) => {
        if (!customConfig.hasOwnProperty(key)) {
            result[key] = defaultConfig[key]
        } else if (_.isPlainObject(defaultConfig[key])) {
            result[key] = mergeConfig(defaultConfig[key], customConfig[key]);
        } else {
            result[key] = customConfig[key];
        }

    })
    return result;
}

const reloadConfig = () => {
    const isConfigExisted = fileUtils.isFileExistedSync(configPath)
    if (isConfigExisted) {
        const configFileContent = fileUtils.readFileSync(configPath);
        const customConfig = JSON.parse(configFileContent);
        _systemConfig = mergeConfig(initialConfig, customConfig);
        _systemConfig.version = initialConfig.version;
    }
}

const getConfig = () => {
    if (!_systemConfig) {
        _systemConfig = initialConfig;
        reloadConfig();
    }
    console.log("SystemConfig:", _systemConfig);
    return _systemConfig;
}

const updateConfig = async (config) => {
    await fileUtils.writeFile(configPath, JSON.stringify(config, null, '\t'));
    _systemConfig = undefined;
    subscribes.forEach((callback) => {
        callback?.();
    });
}

const subscribe = (callback) => {
    subscribes.push(callback);
}


module.exports = {
    getConfig,
    updateConfig,
    subscribe
}
