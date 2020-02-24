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
const signup=require('./api/signup');
const search=require('./api/search');
const book=require('./api/book');
const checkout=require('./api/checkout');
const comment = require('./api/comment');
const publish = require('./api/publish-book');

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
app.use(signup.routes(), signup.allowedMethods())
app.use(search.routes(), search.allowedMethods())
app.use(book.routes(), book.allowedMethods())
app.use(checkout.routes(), checkout.allowedMethods())
app.use(comment.routes(), comment.allowedMethods())
app.use(publish.routes(), publish.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});
module.exports= app
