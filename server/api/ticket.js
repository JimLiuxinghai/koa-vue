import { request } from '../service/request'
/*
 * @param hasUv: true  //是否需要uv信息
*/
export async function list (ctx, config = {}) {
	try {
		let query = ctx.query
		let id = ctx.session.id
		let config = {
			url: '/prd/getProducts/001?loginId=' + id,
			data: {
				pageSize: query.pageSize || 10,
				pageIndex: query.page || 0
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
		query.merchantCode = ENV_CONFIG.merchantCode
		query.enable = 1
		query.isRefund = 1
		let id = ctx.session.id
		let config = {
			url: '/prd/saveProduct?loginId=' + id,
			data: query
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
export async function time (ctx, config = {}) {
	try {
		let query = ctx.query
		let id = ctx.session.id
		let config = {
			url: '/prd/getProductActivities?loginId=' + id,
			data: {
				condition: {

				},
				page: {
					pageSize: 10,
					pageIndex: query.page
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

export async function addTime (ctx, config = {}) {
	try {
		let query = ctx.request.body
		let id = ctx.session.id
		let config = {
			url: '/prd/setActivity?loginId=' + id,
			data: query
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

export async function addSec (ctx, config = {}) {
	try {
		let query = ctx.request.body
		let id = ctx.session.id
		query.productInfo.merchantCode = ENV_CONFIG.merchantCode
		let config = {
			url: '/prd/secKill/create?loginId=' + id,
			data: query
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

export async function getSecDetail (ctx, config = {}) {
	try {
		let query = ctx.query
		let id = ctx.session.id
		let config = {
			url: `/prd/secKill/query/${query.productCode}?loginId=${id}`
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
    'post /': add,
    'get /time': time,
    'post /time': addTime,
    'post /addsec': addSec,
    'get /secDetail': getSecDetail
}


