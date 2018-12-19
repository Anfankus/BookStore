
'use strict'
const router = require('koa-router')()

router
    .get('/', async (ctx) => {
        await ctx.render('./index');
    })

export default router
