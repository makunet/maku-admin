import { defineStore } from 'pinia'
import { getUserInfo, login, logout } from '@/api/user'
import cache from '@/utils/cache'

export const userStore = defineStore('userStore', {
	state: () => ({
		user: {
			id: '',
			username: '',
			email: '',
			avatar: ''
		},
		token: cache.getToken()
	}),
	actions: {
		setUser(val: any) {
			this.user = val
		},
		setToken(val: any) {
			this.token = val
			cache.setToken(val)
		},
		// 用户登录
		async loginAction(loginForm: any) {
			const { data } = await login(loginForm)
			this.setToken(data.token)
		},
		// 获取用户信息
		async getUserInfoAction() {
			const { data } = await getUserInfo()
			this.setUser(data)
		},
		// 用户退出
		async logoutAction() {
			await logout()

			// 移除 token
			this.setToken(null)
		}
	}
})
