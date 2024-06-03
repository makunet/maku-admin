import service from '@/utils/request'

export const useDictTypeAllApi = () => {
	return service.get('/sys/dict/type/all')
}

export const useDictTypeApi = (id: Number) => {
	return service.get('/sys/dict/type/' + id)
}

export const useDictTypeListApi = (pid: Number) => {
	return service.get('/sys/dict/type/list?pid=' + pid)
}

export const useDictTypeSubmitApi = (dataForm: any) => {
	if (dataForm.id) {
		return service.put('/sys/dict/type', dataForm)
	} else {
		return service.post('/sys/dict/type', dataForm)
	}
}

export const useDictDataApi = (id: Number) => {
	return service.get('/sys/dict/data/' + id)
}

export const useDictDataSubmitApi = (dataForm: any) => {
	if (dataForm.id) {
		return service.put('/sys/dict/data', dataForm)
	} else {
		return service.post('/sys/dict/data', dataForm)
	}
}
