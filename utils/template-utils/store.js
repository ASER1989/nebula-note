const simpleGit = require('simple-git');
const templateUtils = require('./index');
const systemConfig = require('../system-config');
const fileUtils = require('../fileUtils');

const storeSync = async () => {
    const templateFolder = await templateUtils.getTemplateFolder();
    await fileUtils.mkdir(templateFolder);
    const git = simpleGit(templateFolder);
    const isRepo = await git.checkIsRepo();
    if (!isRepo) {
        await initialiseRepo(git);
    }
    await git.pull('origin', 'master');
    await templateUtils.reloadTemplateConfig();
};

const initialiseRepo = async (git) => {
    const config = systemConfig.getConfig();
    await git.init();
    await git.addRemote('origin', config.template.repo);
};

module.exports = {
    storeSync,
};
