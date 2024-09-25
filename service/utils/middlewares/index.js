const respModel = require('../responseModel');

function setDefaultResponseType() {
    return async function (ctx, next) {
        ctx.type = 'text/json';
        await next();
    }
}

function formatResponse() {
    return async function (ctx, next) {
        try {
            const result = await next();
            if(result instanceof Error){
                ctx.body = respModel(null,result.message);
            }else if (!ctx.body) {
                ctx.body = respModel(result)
            }
        } catch (ex) {
            ctx.body = respModel(null, ex.message.toString());
        }
    }
}

module.exports = {
    setDefaultResponseType,
    formatResponse
}