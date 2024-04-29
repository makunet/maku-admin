import service from '@/utils/request'

export const usePostApi = (id: Number) => {
	return service.get('/sys/post/' + id)
}

export const usePostNameListApi = (idList: number[]) => {
	return service.post('/sys/post/nameList', idList)
}

export const usePostSubmitApi = (dataForm: any) => {
	if (dataForm.id) {
		return service.put('/sys/post', dataForm)
	} else {
		return service.post('/sys/post', dataForm)
	}
}

export const usePostListApi = () => {
	return service.get('/sys/post/list')
}
