const Router = require('@koa/router');
const {
    getSchema,
    getAllQueriesSchema,
    getSchemaByTypeName,
    getSchemaByQueryName,
    loopFindSchemaTypeChild,
} = require('../../utils/graphql-helper/index.js');

module.exports = (prefix, opts) => {
    const router = new Router({prefix});
    router.get('/querySchemaByType', async (ctx) => {
        const params = ctx.query;
        const schema = await getSchema();
        const typeSchema = getSchemaByTypeName(schema, params?.typeName);
        if (typeSchema) {
            const fullSchema = loopFindSchemaTypeChild(schema, typeSchema);
            return fullSchema;
        }
    });

    router.get('/querySchemaByQueryName', async (ctx) => {
        const params = ctx.query;
        const schema = await getSchema();
        if (!params?.queryName) {
            return getAllQueriesSchema(schema);
        }

        const querySchema = getSchemaByQueryName(schema, params?.queryName, params?.preciseMatch);
        return querySchema;
        if (querySchema) {
            const queryFullSchema = loopFindSchemaTypeChild(schema, querySchema);
            return queryFullSchema;
        }
    });

    router.get('/schema', async (ctx) => {
        return await getSchema();
    })

    return router.routes();
};
