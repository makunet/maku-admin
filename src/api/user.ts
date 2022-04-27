import service from '@/utils/request'

export const useUserInfoApi = () => {
	return service.get('/sys/user/info')
}

export const updatePasswordApi = (data: any) => {
	return service.put('/sys/user/password', data)
}
