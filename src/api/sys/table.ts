import service from '@/utils/request'

export const useTableApi = (id: string) => {
	return service.get('/sys/online/table/' + id)
}

export const useTableSubmitApi = (dataForm: any) => {
	if (dataForm.id) {
		return service.put('/sys/online/table', dataForm)
	} else {
		return service.post('/sys/online/table', dataForm)
	}
}
