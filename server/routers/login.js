/**
 * 主页子路由
 */

const router = require('koa-router')()


module.exports = router
  .get('/', async (ctx) => {
	  	try {
  		  	const title = 'login'
  		  	
  		  	await ctx.render('login', { 
  			  	  title
  		  	})
	  	}
	  	catch(e) {
	  		console.log(e)
	  	}
  })
