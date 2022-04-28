import { defineStore } from 'pinia'
import { useLoginApi, useLogoutApi } from '@/api/oauth'
import { useUserInfoApi } from '@/api/user'
import cache from '@/utils/cache'
import { useAuthorityListApi } from '@/api/menu'

export const userStore = defineStore('userStore', {
	state: () => ({
		// 用户信息
		user: {
			id: '',
			username: '',
			avatar: ''
		},
		// 权限列表
		authorityList: [],
		// 登录token
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
			const res: any = await useLoginApi(loginForm)
			this.setToken(res.access_token)
		},
		// 获取用户信息
		async getUserInfoAction() {
			const { data } = await useUserInfoApi()
			this.setUser(data)
		},
		// 获取权限
		async getAuthorityListAction() {
			const { data } = await useAuthorityListApi()
			this.authorityList = data || []
		},
		// 用户退出
		async logoutAction() {
			await useLogoutApi()

			// 移除 token
			this.setToken(null)
		}
	}
})
