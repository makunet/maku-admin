import request from '@/utils/request'

export function login(data: any) {
	return request({
		url: '/data/login.json',
		method: 'post',
		data
	})
}

export function getUserInfo() {
	return request({
		url: '/data/user.json',
		method: 'get'
	})
}

export function updatePassword(data: any) {
	return request({
		url: '/data/success.json',
		method: 'post',
		data
	})
}

export function logout() {
	return request({
		url: '/data/success.json',
		method: 'post'
	})
}
