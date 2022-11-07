import service from '@/utils/request'

export const useLogLoginExportApi = () => {
	return service.get('/sys/log/login/export')
}
