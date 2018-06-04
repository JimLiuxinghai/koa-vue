import axios from 'axios'
export async function list (config) {
	let data = await axios.get('/api/ticket', { params: config })
	return data.data.data.data
}
export async function add (config) {
	let data = await axios.post('/api/ticket', config)
	return data.data
}

export async function time (config) {
	let data = await axios.get('/api/ticket/time', { params: config })
	return data.data.data.data
}

export async function addTime (config) {
	let data = await axios.post('/api/ticket/time', config)
	return data.data
}

export async function addSec (config) {
	let data = await axios.post('/api/ticket/addsec', config)
	return data.data
}

export async function detail (config) {
	let data = await axios.get('/api/ticket/secDetail', { params: config })
	return data.data.data.data
}