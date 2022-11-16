import service from '@/utils/request'

export const useParamsApi = (id: number) => {
	return service.get('/sys/params/' + id)
}

export const useParamsSubmitApi = (dataForm: any) => {
	if (dataForm.id) {
		return service.put('/sys/params', dataForm)
	} else {
		return service.post('/sys/params', dataForm)
	}
}
