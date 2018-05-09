import axios from 'axios'
export async function menu () {
	let data = await axios.get('/api/base')
	return data.data
}
export async function roles () {
	let data = await axios.get('/api/base/')
	return data.data
}