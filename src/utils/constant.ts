import appPackage from '../../package.json'
import cache from '@/utils/cache'

/**
 * 常量
 */
export default {
	// 版本号
	version: appPackage.version,

	// API地址
	apiUrl: import.meta.env.VITE_API_URL,

	// 文件上传地址
	uploadUrl: import.meta.env.VITE_API_URL + '/sys/file/upload?access_token=' + cache.getToken()
}
