import { defineStore } from 'pinia'
import { getMenu } from '@/api/menu'
import { generateRoutes } from '@/router'
import { RouteRecordRaw } from 'vue-router'

export const routerStore = defineStore('routerStore', {
	state: () => ({
		menuRoutes: [] as RouteRecordRaw[],
		routes: [] as RouteRecordRaw[]
	}),
	actions: {
		async getMenuRoutes() {
			const { data } = await getMenu()
			const routes = generateRoutes(data)

			this.menuRoutes.push(...routes)

			return this.menuRoutes
		},
		setRoutes(routers: RouteRecordRaw[]) {
			this.routes = routers
		}
	}
})
