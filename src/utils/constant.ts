import appPackage from '../../package.json'

/**
 * 常量
 */
export default {
	// 版本号
	version: appPackage.version,

	// 登录成功后，跳转页面
	loginPage: '/dashboard/workbench',

	// API地址
	apiUrl: import.meta.env.VITE_API_URL,

	// 第三方登录地址
	thirdLoginUrl: import.meta.env.VITE_API_URL + '/sys/third/render/',

	// 文件上传地址
	uploadUrl: import.meta.env.VITE_API_URL + '/sys/file/upload',

	// 环境变量
	env: {
		MODE: import.meta.env.MODE,
		PROD: import.meta.env.PROD,
		DEV: import.meta.env.DEV,
		SSR: import.meta.env.SSR
	}
}
