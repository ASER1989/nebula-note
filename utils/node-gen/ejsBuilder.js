const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const noteUtils = require('../note-utils');

const build = (meta, templateString, dirPath) => {
    const providerData = {
        _,
    };
    const template = ejs.compile(templateString, { client: true });

    return template(
        _.defaults({ meta }, providerData),
        null,
        (includePath, includeParams) => {
            const includeTemp = getIncludeTemplateContent(includePath, dirPath);
            return ejs.render(
                includeTemp,
                _.defaults(includeParams, { meta }, providerData),
            );
        },
    );
};

const getIncludeTemplateContent = (relatePath, dirPath) => {
    const templateBasePath = noteUtils.getDataFolder();
    const filePath = path.resolve(
        __dirname,
        path.join(templateBasePath, dirPath, relatePath),
    );
    return fs.readFileSync(filePath, 'utf8');
};

module.exports = {
    build,
};
