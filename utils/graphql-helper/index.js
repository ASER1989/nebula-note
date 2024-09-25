const {getIntrospectionQuery, buildClientSchema} = require('graphql');
const _ = require('lodash');
const fetch = require('node-fetch');
const systemConfig = require('../system-config');

const schemaCache = {
    data: null, timestamp: 0
}

const querySchema = () => {
    const queryString = getIntrospectionQuery({
        schemaDescription: true, inputValueDeprecation: true,
    });
    return JSON.stringify({
        query: queryString, variables: {}, operationName: 'IntrospectionQuery',
    });
};

const fetchSchema = async () => {
    const config = systemConfig.getConfig();
    const fetchResp = await fetch(config.graphql_remote_url, {
        method: 'POST', headers: {
            'Content-Type': 'application/json', Accept: '*/*', 'Accept-Encoding': 'gzip, deflate, br',
        }, body: querySchema(),
    });
    const resp = await fetchResp.json();
    return resp.data;
};

const getSchema = async () => {
    const now = +new Date();
    if (now - schemaCache.timestamp < 15000) {
        return schemaCache.data;
    }
    const schema = await fetchSchema();
    schemaCache.data = schema;
    schemaCache.timestamp = +new Date();

    return schema;
}


const getSchemaByQueryName = (schemaIntrospection, queryName, preciseMatch) => {
    const schema = buildClientSchema(schemaIntrospection);
    const queryFields = schema.getQueryType().getFields();
    const queries = _.toArray(queryFields);
    const fields = _.chain(queries)
        .filter(item => {
            if (preciseMatch === "true") {
                return item?.name === queryName;
            }
            return item?.name?.includes(queryName) || item?.description?.includes(queryName);
        })
        .map(item => {
            item.isQueryObject = true;
            return item;
        })
        .value();
    return {fields};
}

const getAllQueriesSchema = (schemaIntrospection) => {
    const schema = buildClientSchema(schemaIntrospection);
    const queries = schema.getQueryType().getFields();
    const fields = _.toArray(queries).map(item => {
        item.isQueryObject = true;
        return item;
    })
    return {fields};
}

const getSchemaByTypeName = (schema, typeName) => {
    return schema?.__schema.types.find((item) => item.name === typeName);
};


const resolveNamedType = (fieldType) => {
    const resolveHelper = (type) => {
        if (type.name) {
            return type.name;
        } else if (type.ofType) {
            return resolveHelper(type.ofType);
        }
        return null;
    };

    return resolveHelper(fieldType);
};

const loopFindSchemaTypeChild = (schema, node, parentKey, typeChain) => {
    try {
        node.fields?.forEach((field) => {
            field.key = [parentKey, field.name]
                .filter((item) => item !== undefined)
                .join('.');

            const fieldType = resolveNamedType(field.type);

            // 类型链
            const fieldTypeChain = [..._.castArray(typeChain ?? [])];
            fieldTypeChain.push(fieldType);
            field.typeChain = fieldTypeChain;

            const chainCount = _.countBy(fieldTypeChain);
            if (chainCount[fieldType] > 2) {
                return;
            }

            if (fieldType) {
                const child = getSchemaByTypeName(schema, fieldType);
                if (child?.kind === 'ENUM') {
                    field.enumValues = child.enumValues;
                    field.fields = child.enumValues;
                    field.isEnumObject = true;
                    return;
                }
                if (field.type?.kind === 'LIST' || (field.type?.kind === 'NON_NULL' && field.type?.ofType?.kind === 'LIST')) {
                    field.isArrayObject = true;
                }
                if (child) {
                    const childNode = loopFindSchemaTypeChild(schema, {
                        ...child,
                        fields: _.cloneDeep(child?.fields)
                    }, field.key, fieldTypeChain,);
                    if (childNode && childNode.fields) {
                        field.fields = childNode?.fields;
                    }
                }
            }
        });
        return node;
    } catch (e) {
        return null;
    }
};

module.exports = {
    getSchema, getSchemaByTypeName, getSchemaByQueryName, loopFindSchemaTypeChild, getAllQueriesSchema
};
