const path = require('path');
const fileUtils = require('../fileUtils');
const initialConfig = require('../../config.json');
const _ = require('lodash');
const { userConfigPath, defaultDataSource } = require('../config');

let _systemConfig;
const subscribes = [];

const reloadConfig = () => {
    const isConfigExisted = fileUtils.isPathExistedSync(userConfigPath);

    if (isConfigExisted) {
        const configFileContent = fileUtils.readFileSync(userConfigPath);
        _systemConfig = JSON.parse(configFileContent);
    } else {
        _systemConfig = initialConfig;
        _systemConfig.dataSource = [
            {
                path: defaultDataSource,
                isActive: true,
            },
        ];
    }
};

const getConfig = () => {
    if (!_systemConfig) {
        _systemConfig = initialConfig;
        reloadConfig();
    }
    return _systemConfig;
};

const updateConfig = async (config) => {
    await fileUtils.writeFile(userConfigPath, JSON.stringify(config, null, '\t'));
    _systemConfig = undefined;
    subscribes.forEach((callback) => {
        callback?.();
    });
};

const subscribe = (callback) => {
    subscribes.push(callback);
};

module.exports = {
    getConfig,
    updateConfig,
    subscribe,
};
