import Router from '@koa/router';
import * as fs from 'fs';
import * as path from 'path';
import {Context} from 'koa';
import * as process from "node:process";
import * as mime from 'mime-types';

const __dirname = (process as unknown as any)['resourcesPath'] ?? process.cwd();

type MIMETypeMap = {
  [key: string]: string;
};

const MIMEType: MIMETypeMap = {
  js: 'application/javascript',
  css: 'text/css',
};

const resolveMIMEType = (fileName: string): string | undefined => {
  const isJs = /\.js$/.test(fileName);
  if (isJs) {
    return MIMEType.js;
  }

  const isCss = /\.css$/.test(fileName);
  if (isCss) {
    return MIMEType.css;
  }
};

export default (prefix: string) => {
  const router = new Router({prefix});

  router.get('/', (ctx: Context) => {
    const htmlFilePath = path.resolve(
      __dirname,
      'nebula-client/dist/index.html',
    );

    const htmlFile = fs.readFileSync(htmlFilePath);
    ctx.type = 'text/html';
    ctx.body = htmlFile;

  });

  router.get('/assets/(.*)', async (ctx: Context) => {
    const sourcePath = ctx.params[0];
    const absBase = path.resolve(__dirname, 'nebula-client/dist/assets');

    const fullPath = path.join(absBase, sourcePath);
    const mimeType = mime.lookup(sourcePath);

    if (mimeType) ctx.type = mimeType
    ctx.set('Vary', 'Accept-Encoding');

    const acceptEncoding = ctx.acceptsEncodings('br', 'gzip', 'identity');
    const tryCompressed = async (ext: string, encoding: string) => {
      const compressedPath = `${fullPath}.${ext}`;
      if (fs.existsSync(compressedPath)) {
        ctx.set('Content-Encoding', encoding);
        ctx.body = fs.createReadStream(compressedPath);
        return true
      }
      return false
    }

    // 优先返回 brotli 或 gzip 文件
    if (acceptEncoding === 'br' && await tryCompressed('br', 'br')) return
    if (acceptEncoding === 'gzip' && await tryCompressed('gz', 'gzip')) return

    // 返回原始文件
    if (fs.existsSync(fullPath)) {
      ctx.body = fs.createReadStream(fullPath)
    } else {
      ctx.status = 404
      ctx.body = 'Not Found'
    }
  });

  return router.routes();
};
