
'use strict'
const router = require('koa-router')()
const database = require('../database')

//发送请求增加username
router
  .prefix('/comment')
  .get('/', async ({request,response}) => {
    let {query}=request;
    await database.searchComments(query.bid).then(real=>{
      if(real){
        response.body=real;
      }else{
        response.body={
          result:false,
          msg:'无查询结果'
        }
      }
    }).catch(err=>{
      response.body={
        result:false,
        msg:'无查询结果'
      }
    })
  })
  .post('/', async (ctx) => {
    let {body}=ctx.request;
    await database.publishComment(body.bid,body.username,body.comment).then(ret=>{
      if(ret){
        ctx.body={
          result:true,
          msg:'评论成功'
        }
      }else{
        ctx.body={
          result:false,
          msg:'评论失败'
        }
      }
    }).catch(err=>{
      console.log(err)
      ctx.body={
        result:false,
        msg:'评论失败'
      }
    })
  })

module.exports= router