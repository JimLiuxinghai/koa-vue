import { request } from '../service/request'
/*
 * @param hasUv: true  //是否需要uv信息
*/
export async function login (ctx, config = {}) {
	try {
		let query = ctx.query
		let ok = util.errorModal('ERR_OK')
		ctx.body = ok
	}
	catch(e) {
		let ok = util.errorModal('ERR_SYSTEM_ERROR')
		ctx.body = ok
	}
}
module.exports = {
    'post /': login
}


