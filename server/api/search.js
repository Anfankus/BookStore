
'use strict'
const router = require('koa-router')()
const database = require('../database')

router
  .prefix('/search')
  .get('/', async ({response}) => {
    let {body}=response.request;
    //判断类型
    let type=0,content;
    if(body.bookid){
      type=1;
      content=body.bookid;}
    else if(body.bookname){
      type=2;
      content=body.bookname;}
    else if(body.author){
      type=3;
      content=body.author;}
    else{
      type=4;
      content=body.class;
    }
    
    await database.search(type,content).then(real=>{
      if(real){
        response.body={
          result:true,
          msg:'搜索成功'
        }
      }else{
        response.body={
          result:false,
          msg:'无搜索结果'
        }
      }
    }).catch(err=>{
      response.body={
        result:false,
        msg:'无搜索结果'
      }
    })
  })

module.exports= router