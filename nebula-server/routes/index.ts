import Router from '@koa/router';
import * as fs from 'fs';
import * as path from 'path';
import {Context} from 'koa';
import * as process from "node:process";

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

  router.get('assets/:sourcePath+', (ctx: Context) => {
    const {sourcePath}: { sourcePath: string } = ctx.params;
  
    const responseMIMEType = resolveMIMEType(sourcePath);
    if (responseMIMEType) {
      ctx.type = responseMIMEType;
    }
    
    const acceptEncodings:Array<string> = ctx.acceptsEncodings();
    const acceptEncoding = acceptEncodings.includes('br')?'br': acceptEncodings.includes('gzip')?'gzip':'';
    if (["gzip","br"].includes(acceptEncoding)) {
        const compressFilePath = path.resolve(
          __dirname,
          `nebula-client/dist/assets/${sourcePath}.${acceptEncoding}`,
        );
      if(fs.existsSync(compressFilePath)){
          ctx.set('Content-Encoding', acceptEncoding);
          ctx.body = fs.readFileSync(compressFilePath);
      }
    }
    
    const sourceFilePath = path.resolve(
      __dirname,
      `nebula-client/dist/assets/${sourcePath}`,
    );
    ctx.body = fs.readFileSync(sourceFilePath);
  });

  return router.routes();
};
