
'use strict'
const router = require('koa-router')()

router
    .prefix('/hello')
    .get('/', async ({response}) => {
        response.body={
            msg:'success',
            name:'zk'
        }
        
    })

module.exports= router
