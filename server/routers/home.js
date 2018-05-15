/**
 * 主页子路由
 */

const router = require('koa-router')()
const auth = require('../filter/auth')

module.exports = router
  .get('/', auth, async (ctx) => {
	  	try {
  		  	const title = '中国翰园碑林管理平台'
  		  	const userName = ctx.session.userName
  		  	await ctx.render('index', {
  			  	  title,
  			  	  userName
  		  	})
	  	}
	  	catch(e) {
	  		console.log(e)
	  	}
  })
