/**
 * 主页子路由
 */

const router = require('koa-router')()


module.exports = router
  .get('/', async (ctx) => {
	  	try {
  		  	const title = '中国翰园碑林管理平台'
  		  	ctx.session.isLogin = false
  		  	await ctx.render('login', { 
  			  	  title
  		  	})
	  	}
	  	catch(e) {
	  		console.log(e)
	  	}
  })
