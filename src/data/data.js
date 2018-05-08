import axios from 'axios'
export async function menu () {
	let data = await axios.get('/api/base')
	console.log(data, '***')
	return data
}