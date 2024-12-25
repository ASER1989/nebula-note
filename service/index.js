const config = require('../config.json');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const middlewares = require('./utils/middlewares');
const morgan = require('koa-morgan');

const indexRoute = require('./routes/index');
const sliceRoute = require('./routes/slice');
const settingsRoute = require('./routes/settings');
const noteRoute = require('./routes/note');
const commonRoute = require('./routes/common');

const app = new Koa();

// 使用默认日志格式（'combined'）
// app.use(morgan('combined'));

// 自定义日志格式
// app.use(morgan(':method :url :status :response-time ms - :res[content-length]'));

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
app.listen(config.servicePort ?? 3816);

console.log(`http://localhost:${config.servicePort}/`);
