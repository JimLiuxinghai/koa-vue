import { request } from '../service/request'
/*
 * @param hasUv: true  //是否需要uv信息
*/
export async function list (ctx, config = {}) {
	try {
		let query = ctx.query
		let id = ctx.session.id
		if(query.distributeId == 'self') {
			query.distributeId = id
		}
		else if(query.distributeId == 'all') {
			query.distributeId = null
		}
		let config = {
			url: '/prd/getOrderBack?loginId=' + id,
			data: {
				condition: {
					orderNo: query.orderNo,
					distributeId: query.distributeId || null,
					checkerId: query.checkerId || '',
					orderBegDate: query.orderBegDate || '',
					orderEndDate: query.orderEndDate || '',
					checkStatus: query.checkStatus,
					checkBegDate: query.checkBegDate || '',
					checkEndDate: query.checkEndDate || ''
				},
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
		console.log('****')
		console.log(e)
		let ok = util.errorModal('ERR_SYSTEM_ERROR')
		ctx.body = ok
	}
}

module.exports = {
    'get /': list
}


