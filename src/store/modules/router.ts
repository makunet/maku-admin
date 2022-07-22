import { defineStore } from 'pinia'
import { useMenuNavApi } from '@/api/sys/menu'
import { generateRoutes, constantMenu } from '@/router'
import { RouteRecordRaw } from 'vue-router'

export const routerStore = defineStore('routerStore', {
	state: () => ({
		menuRoutes: [] as RouteRecordRaw[],
		routes: [] as RouteRecordRaw[]
	}),
	actions: {
		async getMenuRoutes() {
			const { data } = await useMenuNavApi()
			const routes = generateRoutes(data)

			this.menuRoutes.push(...routes)

			// 常量菜单
			const constantRoutes = generateRoutes(constantMenu)
			this.menuRoutes.push(...constantRoutes)

			return this.menuRoutes
		},
		setRoutes(routers: RouteRecordRaw[]) {
			this.routes = routers
		}
	}
})
