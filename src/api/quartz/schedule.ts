import service from '@/utils/request'

export const useScheduleApi = (id: Number) => {
	return service.get('/schedule/' + id)
}

export const useScheduleSubmitApi = (dataForm: any) => {
	if (dataForm.id) {
		return service.put('/schedule', dataForm)
	} else {
		return service.post('/schedule', dataForm)
	}
}

export const useScheduleRunApi = (dataForm: any) => {
	return service.put('/schedule/run', dataForm)
}

export const useScheduleStatusApi = (dataForm: any) => {
	return service.put('/schedule/change-status', dataForm)
}
