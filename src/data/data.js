import axios from 'axios'
export async function menu () {
	let data = await axios.get('/api/base')
	return data.data
}
export async function getRole () {
	let data = await axios.get('/api/base/roles')
	return data.data
}
export async function distributor(config) {
	let data = await axios.get('/api/base/distributor', { params: config })
	return data.data.data.data
}

export async function adddis(config) {
	let data = await axios.post('/api/base/adddis', config)
	return data.data
}

export async function actdis(config) {
	let data = await axios.post('/api/base/actdis', config)
	return data.data
}

export async function deldis(config) {
	let data = await axios.post('/api/base/deldis', config)
	return data.data
}

//个人中心
export async function userinfo(config) {
	let data = await axios.get('/api/base/ercode')
	return data.data
}

//省市区
export async function city(config) {
	let data = await axios.get('/api/base/city', { params: config })
	return data.data.data.data
}