import service from '@/utils/request'

export const useUserApi = (id: number) => {
	return service.get('/member/user/' + id)
}

export const useUserSubmitApi = (dataForm: any) => {
	if (dataForm.id) {
		return service.put('/member/user', dataForm)
	} else {
		return service.post('/member/user', dataForm)
	}
}
