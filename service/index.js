const config = require('../config.json');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const middlewares = require('./utils/middlewares');

const indexRoute = require('./routes/index');
const sliceRoute = require('./routes/slice');
const settingsRoute = require('./routes/settings');
const noteRoute = require('./routes/note');
const commonRoute = require('./routes/common');

const app = new Koa();

app.use(
    bodyParser({
        formLimit: '30mb',
        jsonLimit: '30mb',
    }),
);
app.use(middlewares.setDefaultResponseType());
app.use(middlewares.formatResponse());
app.use(indexRoute('/'));
app.use(sliceRoute('/api/slice'));
app.use(settingsRoute('/api/settings'));
app.use(noteRoute('/api/note'));
app.use(commonRoute('/api/common'));
app.listen(config.service_port);

console.log(`http://localhost:${config.service_port}/`);
