
'use strict'
const router = require('koa-router')()
const database = require('../database')

router
  .prefix('/search')
  .get('/', async ({request,response}) => {
    let {query}=request;
    //判断类型
    let type=0,content;
    if(query.bookid){
      type=1;
      content=query.bookid;}
    else if(query.bookname){
      type=2;
      content=query.bookname;}
    else if(query.author){
      type=3;
      content=query.author;}
    else{
      type=4;
      content=query.class;
    }
    
    await database.search(type,content).then(real=>{
        response.body=real;
    }).catch(err=>{
      response.body={
        result:false,
        msg:'无搜索结果'
      }
    })
  })

module.exports= router