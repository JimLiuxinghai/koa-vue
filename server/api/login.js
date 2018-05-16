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
		console.log(reqData)
		let ok = null
		if(reqData.data.retCode == 0) {
			ctx.session.isLogin = true
			ctx.session.user = {
				phone: reqData.data.data.phone,
				name: reqData.data.data.name,
				rate: reqData.data.data.rate,
				status: reqData.data.data.enable,
				province: reqData.data.data.province,
				city: reqData.data.data.city,
				county: reqData.data.data.county

			}
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


