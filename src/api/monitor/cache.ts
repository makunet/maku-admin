import service from '@/utils/request'

export const useCacheInfoApi = () => {
	return service.get('/monitor/cache/info')
}
