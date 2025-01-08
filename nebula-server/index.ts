import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import config from '../config.json';
import commonRoute from './routes/common';
import indexRoute from './routes/index';
import noteRoute from './routes/note';
import settingsRoute from './routes/settings';
import sliceRoute from './routes/slice';
import { formatResponse, setDefaultResponseType } from './utils/middlewares';

// 定义 config 的类型
interface Config {
    servicePort?: number;
}

const app = new Koa();

app.use(
    bodyParser({
        formLimit: '30mb',
        jsonLimit: '30mb',
    }),
);

app.use(setDefaultResponseType());
app.use(formatResponse());
app.use(indexRoute('/'));
app.use(sliceRoute('/api/slice'));
app.use(settingsRoute('/api/settings'));
app.use(noteRoute('/api/note'));
app.use(commonRoute('/api/common'));

const port = config.servicePort ?? 3816;
app.listen(port, () => {
    console.log(`http://localhost:${port}/`);
});
