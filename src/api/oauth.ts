import request from '@/utils/request'

export function getCaptcha() {
	return request({
		url: '/oauth/captcha',
		method: 'get'
	})
}

export function login(data: any) {
	return request({
		url: '/oauth/token',
		method: 'post',
		auth: {
			username: 'web',
			password: '123456'
		},
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		data
	})
}

export function logout() {
	return request({
		url: '/oauth/logout',
		method: 'post'
	})
}
