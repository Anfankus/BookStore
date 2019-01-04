/* eslint-disable no-console */
const Koa =require ('koa');
const app = new Koa()
const json =require ('koa-json');
const onerror =require ('koa-onerror');
const bodyParser =require ('koa-bodyparser');
const logger =require ('koa-logger');
const path=require('path')
const hello =require ('./api/hello');
const signin=require('./api/signin');

// error handler
onerror(app)
// middleWares
app.use(bodyParser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(path.resolve(__dirname, '..','dist')));

// router
app.use(hello.routes(), hello.allowedMethods())
app.use(signin.routes(), signin.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});
module.exports= app
