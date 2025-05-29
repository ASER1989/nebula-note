import Koa from 'koa';
import historyApiFallback from 'koa2-connect-history-api-fallback';
import bodyParser from 'koa-bodyparser';
import serve from 'koa-static';
import * as process from 'node:process';
import * as path from 'path';
import { PORT } from './config';
import commonRoute from './routes/common';
import noteRoute from './routes/note';
import settingsRoute from './routes/settings';
import sliceRoute from './routes/slice';
import { useDefaultResponseType } from './utils/middlewares/defaultResponseType';
import { useRequestTime } from './utils/middlewares/requestTime';
import { useResponseFormatter } from './utils/middlewares/responseFormatter';
import { useRequestLog } from './utils/middlewares/requestLog';

const __dirname = (process as unknown as any)['resourcesPath'] ?? process.cwd();
const htmlFilePath = path.resolve(
    __dirname,
    process.env.MODE === 'dev' ? '..' : '',
    'nebula-client/dist',
);

const app = new Koa();
app.use(useRequestTime);
app.use(useRequestLog());
app.use(
    historyApiFallback({
        whiteList: ['/api', '/assets', 'favicon.ico'],
        index: '/',
        disableDotRule: true,
    }),
);
app.use(
    bodyParser({
        formLimit: '30mb',
        jsonLimit: '30mb',
    }),
);

app.use(serve(htmlFilePath, { gzip: true, brotli: true, maxage: 72000000 }));
app.use(useDefaultResponseType());
app.use(useResponseFormatter());
app.use(sliceRoute('/api/slice'));
app.use(settingsRoute('/api/settings'));
app.use(noteRoute('/api/note'));
app.use(commonRoute('/api/common'));

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}/`);
});
