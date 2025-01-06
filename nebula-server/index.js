import config from '../config.json';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import middlewares from './utils/middlewares';
import morgan from 'koa-morgan';

import indexRoute from './routes/index';
import sliceRoute from './routes/slice';
import settingsRoute from './routes/settings';
import noteRoute from './routes/note';
import commonRoute from './routes/common';

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
