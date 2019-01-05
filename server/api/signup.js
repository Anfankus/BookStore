'use strict'
const router = require('koa-router')()
const database = require('../database')

router
  .prefix('/signup')
  .post('/', async (ctx) => {
    let {body}=ctx.request;
    await database.signup(body.username,body.password,body.email).then(real=>{
      if(real===true){
        ctx.body={
          result:true,
          msg:'注册成功'
        }
      }else{
        ctx.body={
          result:false,
          msg:'用户信息错误'
        }
      }
    }).catch(err=>{
      ctx.body={
        result:false,
        msg:'注册失败'
      }
    })
  })

module.exports= router
