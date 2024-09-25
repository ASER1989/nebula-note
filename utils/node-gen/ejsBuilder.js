const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const ejsUtils = require('../ejs-helper');
const templateUtils = require('../template-utils');

const build = (data, templateString) => {
    const providerData = {
        utils: ejsUtils,
        _
    };
    const template = ejs.compile(templateString, {client: true});

    return template(_.defaults({data}, providerData), null, (includePath, includeParams) => {
        const includeTemp = getTemplateByPath(includePath);
        return ejs.render(includeTemp, _.defaults(includeParams, providerData));
    });
}

const getTemplateByPath = (relatePath) => {
    const templateBasePath = templateUtils.getTemplateFolder();
    const tempfilePath = path.resolve(
        __dirname,
        path.join(templateBasePath, relatePath),
    )
    const templateString = fs.readFileSync(tempfilePath, 'utf8');
    return templateString;
}

module.exports = {
    build,
    getTemplateByPath
};
