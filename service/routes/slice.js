const Router = require('@koa/router');
const codeBuilder = require('../../utils/node-gen/ejsBuilder');
const columnTools = require('../utils/columns');

module.exports = (prefix, opts) => {
    const router = new Router({prefix});
    /*
    * 生成代码
    * */
    router.post('/code', async (ctx) => {
        const reqParams = ctx.request.body;
        const {formState, schemaList, template} = reqParams;

        let sortedSchemaList = schemaList;
        if (formState.columnSortNames) {
            const sortNames = columnTools.getSortNames(formState.columnSortNames);
            sortedSchemaList = columnTools.schemaSortWithSortColumns(schemaList, sortNames);
        }
        const result = codeBuilder.build({graphqlSchemaList: sortedSchemaList, formState}, template);
        return result;
    });


    return router.routes();
};
