import axios, { AxiosResponse } from 'axios'
import qs from 'qs'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/store/modules/user'
import cache from '@/utils/cache'
import { ElMessageBox } from 'element-plus/es'

// axios实例
const service = axios.create({
	baseURL: import.meta.env.VITE_API_URL as any,
	timeout: 60000,
	headers: { 'Content-Type': 'application/json;charset=UTF-8' }
})

// 请求拦截器
service.interceptors.request.use(
	(config: any) => {
		const userStore = useUserStore()

		if (userStore?.token) {
			config.headers.Authorization = userStore.token
		}

		config.headers['Accept-Language'] = cache.getLanguage()

		// 追加时间戳，防止GET请求缓存
		if (config.method?.toUpperCase() === 'GET') {
			config.params = { ...config.params, t: new Date().getTime() }
		}

		if (Object.values(config.headers).includes('application/x-www-form-urlencoded')) {
			config.data = qs.stringify(config.data)
		}

		return config
	},
	error => {
		return Promise.reject(error)
	}
)

// 是否刷新
let isRefreshToken = false
// 重试请求
let requests: any[] = []

// 刷新token
const getRefreshToken = (refreshToken: string) => {
	return service.post('/sys/auth/token?refreshToken=' + refreshToken)
}

// 响应拦截器
service.interceptors.response.use(
	async (response: AxiosResponse<any>) => {
		const userStore = useUserStore()

		if (response.status !== 200) {
			return Promise.reject(new Error(response.statusText || 'Error'))
		}

		const res = response.data
		if (Object.prototype.toString.call(res) === '[object Blob]') {
			return response
		}

		// 响应成功
		if (res.code === 0) {
			return res
		}

		// refreshToken失效，跳转到登录页
		if (res.code === 400) {
			return handleAuthorized()
		}

		// 没有权限，如：未登录、token过期
		if (res.code === 401) {
			const config = response.config
			if (!isRefreshToken) {
				isRefreshToken = true

				// 不存在 refreshToken，重新登录
				const refreshToken = cache.getRefreshToken()
				if (!refreshToken) {
					return handleAuthorized()
				}

				try {
					const { data } = await getRefreshToken(refreshToken)
					// 设置新 token
					userStore.setToken(data.access_token)
					config.headers!.Authorization = data.access_token
					requests.forEach((cb: any) => {
						cb()
					})
					requests = []
					return service(config)
				} catch (e) {
					// 刷新失败
					requests.forEach((cb: any) => {
						cb()
					})
					return handleAuthorized()
				} finally {
					requests = []
					isRefreshToken = false
				}
			} else {
				// 多个请求的情况
				return new Promise(resolve => {
					requests.push(() => {
						config.headers!.Authorization = userStore.token
						resolve(service(config))
					})
				})
			}
		}

		// 错误提示
		ElMessage.error(res.msg)

		return Promise.reject(new Error(res.msg || 'Error'))
	},
	error => {
		ElMessage.error(error.message)
		return Promise.reject(error)
	}
)

const handleAuthorized = () => {
	ElMessageBox.confirm('登录超时，请重新登录', '提示', {
		showCancelButton: false,
		closeOnClickModal: false,
		showClose: false,
		confirmButtonText: '重新登录',
		type: 'warning'
	}).then(() => {
		const userStore = useUserStore()

		userStore?.setToken('')
		userStore?.setRefreshToken('')
		location.reload()

		return Promise.reject('登录超时，请重新登录')
	})
}

// 导出 axios 实例
export default service
