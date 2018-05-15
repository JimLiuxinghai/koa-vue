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
		if(query.person) {
			query.phone = ctx.session.phone
		}
		let param = {
			userInfo: {
				phone: query.phone || '',
				rate: ''
			},
			page: {
				pageIndex: query.page || 0,
				pageSize: query.pageSize || 10
			}
		}
		let id = query.loginId || ctx.session.id
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
		let query = ctx.request.body;
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
export async function ercode (ctx, config = {}) {
	try {
		let query = ctx.query
		let id = ctx.session.id
		let url = `/actions/miniQrCode?loginId=${id}`
		let config = {
			url: url,
			data: {
			    appId:"wxe31cf734e187f852",
			    distributeId: id,
			    params:{
				 	path: "pages/index?disId=" + id,
				    width: 430
			    }
			}
		}
		let data = await request(ctx, config)
		console.log(data)
		if(data.data.retCode == 0) {
			
			let ok = util.errorModal('ERR_OK')
			let user =  ctx.session.user
			ok.data = {
				id: ctx.session.id,
				phone: user.phone,
				name: user.name,
				rate: user.rate,
				status: user.status,
				img: ENV_CONFIG.host + data.data.data + '.png',
				imgUrl: ENV_CONFIG.host + data.data.data
			}
			ctx.body = ok
		}
		else {
			let ok = util.errorModal('ERR_SYSTEM_ERROR')
			ctx.body = ok
		}
		
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
    'post /addChecker': addChecker,
    'get /ercode': ercode
}


