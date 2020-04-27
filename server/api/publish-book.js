
'use strict'
const router = require('koa-router')()
const database = require('../database')

//发送请求增加username
router
  .prefix('/publish-book')
  .post('/', async (ctx) => {
    let {body}=ctx.request;
    let {bookname,author,price,quantity,classid,username} = body;
    await database.publishBook(bookname,author,price,quantity,classid,username).then(ret=>{
      if(ret){
        ctx.body={
          result:true,
          msg:'发布成功'
        }
      }else{
        ctx.body={
          result:false,
          msg:'发布失败'
        }
      }
    }).catch(err=>{
      console.log(err)
      ctx.body={
        result:false,
        msg:'发布失败'
      }
    })
  })

module.exports= router