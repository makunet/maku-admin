import service from '@/utils/request'

export const useUserInfoApi = () => {
	return service.get('/sys/user/info')
}

export const useUserInfoSubmitApi = (dataForm: any) => {
	return service.put('/sys/user/info', dataForm)
}

export const useUserAvatarApi = (dataForm: any) => {
	return service.put('/sys/user/avatar', dataForm)
}

export const updatePasswordApi = (data: any) => {
	return service.put('/sys/user/password', data)
}

export const useUserApi = (id: number) => {
	return service.get('/sys/user/' + id)
}

export const useRealNameListApi = (idList: number[]) => {
	return service.post('/sys/user/nameList', idList)
}

export const useUserSubmitApi = (dataForm: any) => {
	if (dataForm.id) {
		return service.put('/sys/user', dataForm)
	} else {
		return service.post('/sys/user', dataForm)
	}
}
