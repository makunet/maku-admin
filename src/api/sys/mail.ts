import service from '@/utils/request'

export const useMailConfigApi = (id: number) => {
	return service.get('/sys/mail/config/' + id)
}

export const useMailConfigSubmitApi = (dataForm: any) => {
	if (dataForm.id) {
		return service.put('/sys/mail/config', dataForm)
	} else {
		return service.post('/sys/mail/config', dataForm)
	}
}

export const useMailSendApi = (dataForm: any) => {
	return service.post('/sys/mail/config/send', dataForm)
}
