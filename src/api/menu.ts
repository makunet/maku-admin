import request from '@/utils/request'

export function getMenu() {
	return request({
		url: '/data/menu.json',
		method: 'get'
	})
}
