import Koa from 'koa';
import historyApiFallback from 'koa2-connect-history-api-fallback';
import bodyParser from 'koa-bodyparser';
import { PORT } from './config';
import commonRoute from './routes/common';
import indexRoute from './routes/index';
import noteRoute from './routes/note';
import settingsRoute from './routes/settings';
import sliceRoute from './routes/slice';
import { formatResponse, setDefaultResponseType } from './utils/middlewares';
import { useRequestTime } from './utils/middlewares/requestTime';

const app = new Koa();
app.use(
    historyApiFallback({
        whiteList: ['/api', '/assets', 'favicon.ico'],
        index: '/',
        disableDotRule: true,
    }),
);
app.use(useRequestTime);
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

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}/`);
});
