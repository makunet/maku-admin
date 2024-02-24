import service from '@/utils/request'

export const useCaptchaEnabledApi = () => {
	return service.get('/sys/auth/captcha/enabled')
}

export const useCaptchaApi = () => {
	return service.get('/sys/auth/captcha')
}

export const useSendCodeApi = (mobile: string) => {
	return service.post('/sys/auth/send/code?mobile=' + mobile)
}

export const useAccountLoginApi = (data: any) => {
	return service.post('/sys/auth/login', data)
}

export const useMobileLoginApi = (data: any) => {
	return service.post('/sys/auth/mobile', data)
}

export const useThirdLoginApi = (data: any) => {
	return service.post('/sys/auth/third', data)
}

export const useLogoutApi = () => {
	return service.post('/sys/auth/logout')
}
