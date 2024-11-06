const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const ejsUtils = require('../ejs-helper');
const templateUtils = require('../template-utils');

const build = (meta, templateString) => {
    const providerData = {
        utils: ejsUtils,
        _
    };
    const template = ejs.compile(templateString, {client: true});

    return template(_.defaults({meta}, providerData), null, (includePath, includeParams) => {
        const includeTemp = getIncludeTemplateContent(includePath);
        return ejs.render(includeTemp, _.defaults(includeParams, providerData));
    });
}

const getIncludeTemplateContent = (relatePath) => {
    const templateBasePath = templateUtils.getTemplateFolder();
    const filePath = path.resolve(
        __dirname,
        path.join(templateBasePath, relatePath),
    )
    const templateString = fs.readFileSync(filePath, 'utf8');
    return templateString;
}

module.exports = {
    build
};
