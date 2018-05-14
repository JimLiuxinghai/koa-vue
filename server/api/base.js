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
export async function roles (ctx, config = {}) {
	try {
		let query = ctx.query

		let id = ctx.session.id
		let config = {
			url: '/actions/getSetRoles?loginId=' + id
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
//经销商
export async function distributors (ctx, config = {}) {
	try {
		let query = ctx.query
		let param = {
			userInfo: {
				phone: query.phone || '',
				rate: ''
			},
			page: {
				pageIndex: query.page,
				pageSize: query.pageSize || 10
			}
		}
		let id = ctx.session.id
		let config = {
			url: '/actions/getDistributors?loginId=' + id,
			data: param
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
export async function adddis (ctx, config = {}) {
	try {
		let query = ctx.request.body;
		let id = ctx.session.id
		let config = {
			url: '/actions/addDistributor?loginId=' + id,
			data: {
				distrRole: query.distrRole,	
				name: query.name,
				password: query.password,	
				phone: query.phone,
				rate: query.rate
			}
		}
		console.log(config)
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
export async function deldis (ctx, config = {}) {
	try {
		let query = ctx.request.body
		let id = ctx.session.id
		let url = `/actions/delDistri/${query.id}?loginId=${id}`
		let config = {
			url: url
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
//激活
export async function actdis (ctx, config = {}) {
	try {
		let query = ctx.request.body;

		let id = ctx.session.id
		let url = `/actions/actDistri?loginId=${id}`
		let config = {
			url: url,
			data: {
				id: query.id
			}
		}
		console.log(config)

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

export async function addChecker (ctx, config = {}) {
	try {
		let query = ctx.query
		let id = ctx.session.id
		let url = `/actions/saveChecker?loginId=${id}`
		let config = {
			url: url,
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
module.exports = {
    'get /': menu,
    'get /roles': roles,
    'get /distributor': distributors,
    'post /adddis': adddis,
    'post /deldis': deldis,
    'post /actdis': actdis,
    'post /addChecker': addChecker
}


