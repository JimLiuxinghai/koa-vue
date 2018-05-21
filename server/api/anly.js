import { request } from '../service/request'
/*
 * @param hasUv: true  //是否需要uv信息
*/
export async function list (ctx, config = {}) {
	try {
		let query = ctx.query
		let id = ctx.session.id
		let config = {
			url: '/prd/queryFinanceTableInfo?loginId=' + id,
			data: {
				distributeId: query.distributeId || null,
				year: query.year,
				month: query.month,
				queryAmtType: query.queryAmtType,
				queryDateType: query.queryDateType
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


export async function hour (ctx, config = {}) {
	try {
		let query = ctx.query
		let id = ctx.session.id
		let config = {
			url: '/prd/getChartHours?loginId=' + id,
			data: {
				productCode: query.productCode,
				year: query.year,
				month: query.month
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

export async function city (ctx, config = {}) {
	try {
		let query = ctx.query
		let id = ctx.session.id
		let config = {
			url: '/prd/getChartCities?loginId=' + id,
			data: {
				productCode: query.productCode,
				year: query.year,
				month: query.month
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
    'get /hour': hour,
    'get /city': city
}


