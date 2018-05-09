import { request } from '../service/request'
/*
 * @param hasUv: true  //是否需要uv信息
*/
export async function login (ctx, config = {}) {
	try {
		let query = ctx.request.body
		
		let config = {
			url: '/actions/login',
			data: {
				username: query.name,
				password: query.pass
			}
		}
		let reqData = await request(ctx, config)
		let ok = null
		if(reqData.data.retCode == 0) {
			ctx.session.isLogin = true
			ctx.session.id = reqData.data.data.id
			ok = util.errorModal('ERR_OK')
		}
		else {
			ok = util.errorModal('ERR_ERROR_NAME')
		}
		
		ctx.body = ok
	}
	catch(e) {
		console.log(e)
		let ok = util.errorModal('ERR_SYSTEM_ERROR')
		ctx.body = ok
	}
}
module.exports = {
    'post /': login
}


