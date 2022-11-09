import cache from '@/utils/cache'
import constant from '@/utils/constant'

// 文件导出
export const useLogLoginExportApi = () => {
	location.href = constant.apiUrl + '/sys/log/login/export?access_token=' + cache.getToken()
}
