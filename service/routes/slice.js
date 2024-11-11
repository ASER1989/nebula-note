const Router = require('@koa/router');
const codeBuilder = require('../../utils/node-gen/ejsBuilder');
const columnTools = require('../utils/columns');

module.exports = (prefix, opts) => {
    const router = new Router({ prefix });
    /*
     * 生成代码
     * */
    router.post('/build/form', async (ctx) => {
        const reqParams = ctx.request.body;
        const { formState, schemaList, template } = reqParams;

        let sortedSchemaList = schemaList;
        if (formState.columnSortNames) {
            const sortNames = columnTools.getSortNames(formState.columnSortNames);
            sortedSchemaList = columnTools.schemaSortWithSortColumns(
                schemaList,
                sortNames,
            );
        }
        return codeBuilder.build(
            { graphqlSchemaList: sortedSchemaList, ...formState },
            template,
        );
    });

    router.post('/build/meta', async (ctx) => {
        const reqParams = ctx.request.body;
        const { meta, content } = reqParams;
        const metaJson = JSON.parse(meta);
        return codeBuilder.build(metaJson, content);
    });

    return router.routes();
};
