import axios from 'axios'
export async function list (config) {
	let data = await axios.get('/api/anly', {params: config})
	return data.data
}

export async function hour (config) {
	let data = await axios.get('/api/anly/hour', {params: config})
	return data.data
}

export async function city (config) {
	let data = await axios.get('/api/anly/city', {params: config})
	return data.data
}