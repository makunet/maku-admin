import axios from 'axios'
import { ElMessage } from 'element-plus'
import store from '@/store'
import cache from '@/utils/cache'

// axios实例
const service = axios.create({
	baseURL: import.meta.env.VITE_API_URL as any,
	timeout: 60000,
	headers: { 'Content-Type': 'application/json;charset=UTF-8' }
})

// 请求拦截器
service.interceptors.request.use(
	(config: any) => {
		const userStore = store.userStore
		if (userStore.token) {
			config.headers.Authorization = 'Bearer ' + userStore.token
		}

		config.headers['Accept-Language'] = cache.getLanguage()

		// 追加时间戳，防止GET请求缓存
		if (config.method?.toUpperCase() === 'GET') {
			config.params = { ...config.params, t: new Date().getTime() }
		}

		return config
	},
	error => {
		return Promise.reject(error)
	}
)

// 响应拦截器
service.interceptors.response.use(
	response => {
		const res = response.data

		// 响应成功
		if (res.code === 0) {
			return res
		}

		// 错误提示
		ElMessage.error(res.message)

		// 没有权限，如：未登录、登录过期等，需要跳转到登录页
		if (res.code === 401) {
			const userStore = store.userStore
			userStore.setToken('')
			location.reload()
		}

		return Promise.reject(new Error(res.message || 'Error'))
	},
	error => {
		ElMessage.error(error.message)
		return Promise.reject(error)
	}
)

// 导出 axios 实例
export default service
