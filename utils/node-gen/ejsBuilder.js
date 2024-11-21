const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const ejsUtils = require('../ejs-helper');
const templateUtils = require('../template-utils');

const build = (meta, templateString, dirPath) => {
    const providerData = {
        utils: ejsUtils,
        _,
    };
    const template = ejs.compile(templateString, { client: true });

    return template(
        _.defaults({ meta }, providerData),
        null,
        (includePath, includeParams) => {
            const includeTemp = getIncludeTemplateContent(includePath, dirPath);
            return ejs.render(includeTemp, _.defaults(includeParams, providerData));
        },
    );
};

const getIncludeTemplateContent = (relatePath, dirPath) => {
    const templateBasePath = templateUtils.getTemplateFolder();
    const filePath = path.resolve(
        __dirname,
        path.join(templateBasePath, dirPath, relatePath),
    );
    const templateString = fs.readFileSync(filePath, 'utf8');
    return templateString;
};

module.exports = {
    build,
};
