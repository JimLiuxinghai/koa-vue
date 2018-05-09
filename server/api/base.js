import { request } from '../service/request'
/*
 * @param hasUv: true  //是否需要uv信息
*/
export async function menu (ctx, config = {}) {
	try {
		let query = ctx.query
		let config = {
			url: '/actions/getUserMenus?loginId=1'
		}
		let data = await request(ctx, config)
		console.log(data.data)
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
export async function distributors (ctx, config = {}) {
	try {
		let query = ctx.query
		let id = ctx.session.id
		let config = {
			url: '/actions/getDistributors?loginId=' + id
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
		let query = ctx.query
		let id = ctx.session.id
		let config = {
			url: '/actions/addDistributor?loginId=' + id,
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
export async function deldis (ctx, config = {}) {
	try {
		let query = ctx.query
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
export async function actdis (ctx, config = {}) {
	try {
		let query = ctx.query
		let id = ctx.session.id
		let url = `/actions/actDistri?loginId=${id}`
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
    'post /addChecker': addChecker
}


