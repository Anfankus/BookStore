
'use strict'
const router = require('koa-router')()
const database = require('../database')

router
  .prefix('/book')
  .get('/', async ({request,response}) => {
    let {query}=request;
    await database.searchBookInfo(query.bookid).then(real=>{
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

module.exports= router