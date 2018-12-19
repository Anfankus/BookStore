/* eslint-disable no-console */
import Koa from 'koa';
const app = new Koa()
import json from 'koa-json';
import onerror from 'koa-onerror';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';

import hello from './api/hello';
// error handler
onerror(app)
// middleWares
app.use(bodyParser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'));

// router
app.use(hello.routes(), hello.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});
export default app
