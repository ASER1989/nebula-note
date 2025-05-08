const path = require('path');

const userFolderPath = process.env.HOME || process.env.USERPROFILE;

const userConfigPath = userFolderPath;

const defaultDataSource = userFolderPath;

module.exports = {
    userConfigPath,
    defaultDataSource,
};
