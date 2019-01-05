
'use strict'
const router = require('koa-router')()
const database = require('../database')

//发送请求增加username
router
  .prefix('/checkout')
  .post('/', async (ctx) => {
    let {body}=ctx.request;
    await database.handleOrders(body.username,body.item,body.total).then(real=>{
      if(real===true){
        ctx.body={
          result:true,
          msg:'订单处理成功'
        }
      }else{
        ctx.body={
          result:false,
          msg:'订单处理失败'
        }
      }
    }).catch(err=>{
      ctx.body={
        result:false,
        msg:'订单处理失败'
      }
    })
  })

module.exports= router