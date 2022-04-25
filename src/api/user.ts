import request from '@/utils/request'

export function getUserInfo() {
	return request({
		url: '/sys/user/info',
		method: 'get'
	})
}

export function updatePassword(data: any) {
	return request({
		url: '/sys/user/password',
		method: 'put',
		data
	})
}
