import service from '@/utils/request'
import cache from "@/utils/cache";

export const useUserInfoApi = () => {
	return service.get('/sys/user/info')
}

export const updatePasswordApi = (data: any) => {
	return service.put('/sys/user/password', data)
}

export const useUserApi = (id: number) => {
	return service.get('/sys/user/' + id)
}

export const useUserExportApi = () => {
	location.href = import.meta.env.VITE_API_URL + '/sys/user/export?access_token=' + cache.getToken()
}

export const useUserSubmitApi = (dataForm: any) => {
	if (dataForm.id) {
		return service.put('/sys/user', dataForm)
	} else {
		return service.post('/sys/user', dataForm)
	}
}
