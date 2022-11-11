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
	uploadUrl: import.meta.env.VITE_API_URL + '/sys/file/upload?access_token=' + cache.getToken(),

	// 导入用户excel文件
	uploadUserExcelUrl: import.meta.env.VITE_API_URL + '/sys/user/import?access_token=' + cache.getToken(),

	// 环境变量
	env: {
		MODE: import.meta.env.MODE,
		PROD: import.meta.env.PROD,
		DEV: import.meta.env.DEV,
		SSR: import.meta.env.SSR
	}
}
