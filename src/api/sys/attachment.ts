import service from '@/utils/request'

export const useAttachmentSubmitApi = (dataForm: any) => {
	return service.post('/sys/attachment', dataForm)
}
