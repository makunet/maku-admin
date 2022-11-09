import cache from "@/utils/cache";


// 文件导出
export const useLogLoginExportApi = () => {
	location.href = import.meta.env.VITE_API_URL + '/sys/log/login/export?access_token=' + cache.getToken()
}
