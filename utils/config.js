const path = require('path');

const userFolderPath = process.env.HOME || process.env.USERPROFILE;

const userConfigPath = path.join(userFolderPath, 'Nebula/config.json');

const defaultDataSource = path.join(userFolderPath, 'Nebula/Notes');

module.exports = {
    userConfigPath,
    defaultDataSource
}
