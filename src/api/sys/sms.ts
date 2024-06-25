import service from '@/utils/request'

export const useSmsConfigApi = (id: Number) => {
	return service.get('/sys/sms/config/' + id)
}

export const useSmsConfigSubmitApi = (dataForm: any) => {
	if (dataForm.id) {
		return service.put('/sys/sms/config', dataForm)
	} else {
		return service.post('/sys/sms/config', dataForm)
	}
}

export const useSmsSendApi = (dataForm: any) => {
	return service.post('/message/sms/config/send', dataForm)
}
