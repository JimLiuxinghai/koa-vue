import axios from 'axios'
export async function list (config) {
	let data = await axios.get('/api/ticket', { params: config })
	return data.data.data.data
}
