import axios from 'axios'
export async function list (config) {
	let data = await axios.get('/api/checker', {params: config})
	return data.data.data.data
}
export async function add (config) {
	let data = await axios.post('/api/checker', config)
	return data.data
}
export async function del (config) {
	let data = await axios.post('/api/checker/del', config)
	return data.data
}