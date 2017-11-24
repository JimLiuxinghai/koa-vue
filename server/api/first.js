import Router from 'koa-router'
import axios from 'axios'

const router = Router()
const dataUrl = 'https://api.douban.com/v2'
router.get('/getList', async (ctx, next) => {
	try {
		let response = await axios(`${dataUrl}/movie/in_theaters`);
		ctx.body = response.data;
	}
	catch (err) {
		console.log(err)
	}
})
router.get('/detail/:id', async (ctx, next) => {
	try {
		console.log(ctx.params);
		let id = ctx.params.id;
		let response = await axios(`${dataUrl}/movie/subject/${id}`);
		ctx.body = response.data;
	}
	catch (err) {
		console.log(err)
	}
})
router.get('/rest', async (ctx, next) => {
	try {
		let url = `http://api.map.baidu.com/place/v2/search?query=${encodeURIComponent('餐馆')}&location=39.915,116.404&radius=10000&output=json&ak=YgjgBL2HU88P6u6jWnjLQQpeHpgVnTfA`;
		console.log(url)
		let response = await axios(url);
		console.log(response.data)
		ctx.body = response.data;
	}
	catch (err) {

	}
})
export default router