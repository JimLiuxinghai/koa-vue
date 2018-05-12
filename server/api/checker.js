import { request } from '../service/request'
/*
 * @param hasUv: true  //是否需要uv信息
*/
export async function list (ctx, config = {}) {
	try {
		let query = ctx.query
		let id = ctx.session.id
		let config = {
			url: '/actions/getCheckers?loginId=' + id,
			data: {
				username: query.username,
				enable: query.enable,
				page: {
					pageIndex: query.page,
					pageSize: 10
				}
			}
		}
		let data = await request(ctx, config)
		
		let ok = util.errorModal('ERR_OK')
		ok.data = data.data
		ctx.body = ok
	}
	catch (e) {
		console.log(e)
		let ok = util.errorModal('ERR_SYSTEM_ERROR')
		ctx.body = ok
	}
}


export async function add (ctx, config = {}) {
	try {
		let query = ctx.request.body
		let id = ctx.session.id
		let config = {
			url: '/actions/saveChecker?loginId=' + id,
			data: {
				username: query.username,
				password: query.password,
				enable: 1
			}
		}
		let data = await request(ctx, config)
		
		let ok = util.errorModal('ERR_OK')
		ok.data = data.data
		ctx.body = ok
	}
	catch (e) {
		console.log(e)
		let ok = util.errorModal('ERR_SYSTEM_ERROR')
		ctx.body = ok
	}
}


module.exports = {
    'get /': list,
    'post /': add
}


