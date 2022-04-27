import service from '@/utils/request'

export const useCaptchaApi = () => {
	return service.get('/oauth/captcha')
}

export const useLoginApi = (data: any) => {
	return service.post('/oauth/token', data, {
		auth: {
			username: 'web',
			password: '123456'
		},
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})
}

export const useLogoutApi = () => {
	return service.post('/oauth/logout')
}
