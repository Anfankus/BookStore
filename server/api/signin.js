
'use strict'
const router = require('koa-router')()
const database = require('../database')

router
    .prefix('/signin')
    .post('/', async (ctx) => {
        let {body}=ctx.request;
        await database.signin(body.username).then(real=>{
            if(real===body.password){
                ctx.body={
                    result:true,
                    msg:'登陆成功'
                }
            }else{
                ctx.body={
                    result:false,
                    msg:'用户名或密码错误'
                }
            }
        }).catch(err=>{
            ctx.body={
                result:false,
                msg:'用户名或密码错误'
            }
        })  
    })

module.exports= router
