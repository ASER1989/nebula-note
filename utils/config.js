const path = require('path');

const userFolderPath = process.env.HOME || process.env.USERPROFILE;

const userConfigPath = path.join(userFolderPath,"/config.json");

const defaultDataSource = userFolderPath;

module.exports = {
    userConfigPath,
    defaultDataSource,
};
