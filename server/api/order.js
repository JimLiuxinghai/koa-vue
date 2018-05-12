import { request } from '../service/request'
/*
 * @param hasUv: true  //是否需要uv信息
*/
export async function menu (ctx, config = {}) {
	try {
		let query = ctx.query
		let id = ctx.session.id
		let config = {
			url: '/actions/getUserMenus?loginId=' + id
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
    'get /': menu
}


