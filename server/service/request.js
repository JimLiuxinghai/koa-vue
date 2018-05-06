import axios from 'axios'
/*
 * @param hasUv: true  //是否需要uv信息
*/
export async function request (ctx, config = {}) {
	let host = ENV_CONFIG.host
	let data = await axios({
		method: config.method || 'post',
		url: host + config.url,
		data: config.data
	})
	return data;
}