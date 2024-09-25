const config = require('../config.json');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const middlewares  =require('./utils/middlewares');

const indexRoute = require('./routes/index');
const localeRoute = require('./routes/locale');
const sliceRoute = require('./routes/slice');
const graphqlRoute = require('./routes/graphql');
const commonRoute = require('./routes/common');
const settingsRoute = require('./routes/settings');
const templatesRoute = require('./routes/template');

const app = new Koa();

app.use(bodyParser({
    formLimit: '10mb',
    jsonLimit: '10mb'
}));
app.use(middlewares.setDefaultResponseType());
app.use(middlewares.formatResponse());
app.use(indexRoute('/'));
app.use(localeRoute('/api/locale'));
app.use(sliceRoute('/api/slice'));
app.use(graphqlRoute('/api/graphql'));
app.use(commonRoute('/api/common'));
app.use(settingsRoute('/api/settings'));
app.use(templatesRoute('/api/template'));
app.listen(config.service_port);

console.log(`http://localhost:${config.service_port}/`);
