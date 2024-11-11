const fs = require('fs');
const fileUtils = require('../fileUtils');

const isEnum = (schema) => schema?._values?.length > 0;
const isObject = (schema) => schema?._fields !== undefined;
const genTranslateKey = (fieldNameList) => fieldNameList.filter((name) => name).join('_');

const genEnumLocale = (schema, locale, parentName) => {
    const result = locale ?? {};
    schema._values.forEach((item) => {
        const itemKey = genTranslateKey(['Enum', parentName, item.name]);
        result[itemKey] = item.description;
    });
    return result;
};

const queryRefObject = (schema) => {
    if (schema.ofType) {
        return queryRefObject(schema.ofType);
    }
    return schema;
};

const genObjectLocale = (schema, locale, parentName, uniqueRecord) => {
    let result = locale ?? {};
    const typeRecord = uniqueRecord || {};
    const schemaFieldMap = schema.getFields();
    Object.keys(schemaFieldMap).forEach((fieldKey) => {
        const fieldSchema = schemaFieldMap[fieldKey];
        if (typeRecord[fieldSchema.name]) {
            return;
        }
        typeRecord[fieldSchema.name] = true;
        const itemKey = genTranslateKey([parentName, fieldSchema.name]);
        if (isEnum(fieldSchema)) {
            result = genEnumLocale(fieldSchema, result, itemKey);
        } else if (isObject(fieldSchema)) {
            result = genObjectLocale(fieldSchema, result, itemKey, typeRecord);
        } else if (fieldSchema.description === null && fieldSchema.type) {
            const refSchema = queryRefObject(fieldSchema.type);
            if (isEnum(refSchema)) {
                result = genEnumLocale(refSchema, result, itemKey);
            } else if (isObject(refSchema)) {
                result = genObjectLocale(refSchema, result, itemKey, typeRecord);
            }
            result[itemKey] = refSchema.description;
        } else {
            result[itemKey] = fieldSchema.description;
        }
    });
    return result;
};

const genFieldLocale = (schema, locale) => {
    const result = locale ?? {};
    result[schema.name] = schema.description;
    return result;
};

const genLocale = (schemaList) => {
    let localeMap = {};
    schemaList.forEach((schema) => {
        if (isEnum(schema)) {
            localeMap = genEnumLocale(schema, localeMap, schema.name);
        } else if (isObject(schema)) {
            localeMap = genObjectLocale(schema, localeMap);
        } else {
            localeMap = genFieldLocale(schema, localeMap);
        }
    });
    return localeMap;
};

const getLocale = (filePath) => {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(filePath)) {
            fs.readFile(filePath, 'utf-8', (error, data) => {
                if (error) {
                    reject(error);
                }
                try {
                    const localejson = JSON.parse(data);
                    resolve(localejson);
                } catch (e) {
                    reject(new Error('locale内容解析错误，请检查当前locale文件'));
                }
            });
        } else {
            resolve({});
        }
    });
};

const localeBuilder = async (answers, filePath, schemaList) => {
    const ownLocale = await getLocale(filePath);
    const ownZhLocale = ownLocale['zh-CN'] ?? {};
    return new Promise((resolve, reject) => {
        const zhLocale = genLocale(schemaList);
        const localization = {
            __namespace: `hms_${answers.moduleName}`,
            'zh-CN': {
                ...ownZhLocale,
                ...zhLocale,
            },
        };

        fileUtils
            .writeFile(filePath, JSON.stringify(localization, null, '\t'))
            .then(() => {
                resolve('success');
            })
            .catch((error) => {
                reject(error);
            });
    });
};

module.exports = localeBuilder;
