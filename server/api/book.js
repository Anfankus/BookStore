
'use strict'
const router = require('koa-router')()
const database = require('../database')

router
  .prefix('/book')
  .get('/', async ({response}) => {
    let {body}=response.request;
    await database.searchBookInfo(body.bookid).then(real=>{
      if(real){
        response.body={
          result:true,
          msg:'查询成功'
        }
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

module.exports= router