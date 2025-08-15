import Koa from 'koa';
import historyApiFallback from 'koa2-connect-history-api-fallback';
import bodyParser from 'koa-bodyparser';
import serve from 'koa-static';
import * as process from 'node:process';
import * as path from 'path';
import templateUtils from '../utils/note-utils';
import { PORT } from './config';
import defaultRoute from './routes';
import commonRoute from './routes/common';
import noteRoute from './routes/note';
import settingsRoute from './routes/settings';
import sliceRoute from './routes/slice';
import { useDefaultResponseType } from './utils/middlewares/defaultResponseType';
import { useMultipart } from './utils/middlewares/multipart';
import { useRequestLog } from './utils/middlewares/requestLog';
import { useRequestTime } from './utils/middlewares/requestTime';
import { useResponseFormatter } from './utils/middlewares/responseFormatter';

const __dirname = (process as unknown as any)['resourcesPath'] ?? process.cwd();
const htmlFilePath = path.resolve(
    __dirname,
    (process as unknown as any)['resourcesPath'] ? '.' : '..',
    'nebula-client/dist',
);
const configPath = templateUtils.getDataFolder();

const app = new Koa();
app.use(useRequestTime);
app.use(useRequestLog());
app.use(
    historyApiFallback({
        whiteList: ['/api', '/assets', 'favicon.ico', '/note/doc/image'],
        index: '/',
        disableDotRule: true,
    }),
);
app.use(
    bodyParser({
        formLimit: '60mb',
        jsonLimit: '30mb',
        textLimit: '30mb',
    }),
);
app.use(useMultipart(path.join(configPath, '.tmp')));

app.use(defaultRoute('/'));
app.use(useDefaultResponseType());
app.use(useResponseFormatter());
app.use(sliceRoute('/api/slice'));
app.use(settingsRoute('/api/settings'));
app.use(noteRoute('/api/note'));
app.use(commonRoute('/api/common'));
app.use(
    serve(htmlFilePath, {
        gzip: true,
        brotli: true,
        maxage: 72000000,
        setHeaders: (res, path) => {
            if (path.endsWith('.html')) {
                res.setHeader('Cache-Control', 'no-cache');
            }
        },
    }),
);
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}/`);
});
