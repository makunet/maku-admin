import service from '@/utils/request'

export const useOrgListApi = () => {
	return service.get('/sys/org/list')
}

export const useOrgApi = (id: Number) => {
	return service.get('/sys/org/' + id)
}

export const useOrgNameListApi = (idList: number[]) => {
	return service.post('/sys/org/nameList', idList)
}

export const useOrgSubmitApi = (dataForm: any) => {
	if (dataForm.id) {
		return service.put('/sys/org', dataForm)
	} else {
		return service.post('/sys/org', dataForm)
	}
}
