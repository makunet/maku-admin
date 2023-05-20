import service from '@/utils/request'

export const useMonitorUserLogoutApi = (accessToken: string) => {
	return service.delete('/monitor/user/' + accessToken)
}
