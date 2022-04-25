import request from '@/utils/request'

export function getMenu() {
	return request({
		url: '/sys/menu/nav',
		method: 'get'
	})
}
