import service from '@/utils/request'

export const useThirdListApi = () => {
	return service.get('/sys/third/list')
}

export const useThirdBindApi = (data: any) => {
	return service.post('/sys/third/bind', data)
}

export const useThirdUnBindApi = (openType: string) => {
	return service.put('/sys/third/unbind/' + openType)
}

export const useThirdConfigApi = (id: number) => {
	return service.get('/sys/third/config/' + id)
}

export const useThirdConfigSubmitApi = (dataForm: any) => {
	if (dataForm.id) {
		return service.put('/sys/third/config', dataForm)
	} else {
		return service.post('/sys/third/config', dataForm)
	}
}
