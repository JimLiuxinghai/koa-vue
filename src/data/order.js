import axios from 'axios'
export async function list (config) {
	let data = await axios.get('/api/order', { params: config })
	return data.data
}
export async function checkerList (config) {
	let data = await axios.get('/api/checker', {params: config})
	return data.data.data.data
}