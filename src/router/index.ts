import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { useAppStore } from '@/store/modules/app'
import { useUserStore } from '@/store/modules/user'
import { useRouterStore } from '@/store/modules/router'
import { isExternalLink, pathToCamel } from '@/utils/tool'
import constant from '@/utils/constant'

NProgress.configure({ showSpinner: false })

const constantRoutes: RouteRecordRaw[] = [
	{
		path: '/redirect',
		component: () => import('../layout/index.vue'),
		children: [
			{
				path: '/redirect/:path(.*)',
				component: () => import('../layout/components/Router/Redirect.vue')
			}
		]
	},
	{
		path: '/iframe/:query?',
		component: () => import('../layout/components/Router/Iframe.vue')
	},
	{
		path: '/login',
		component: () => import('../views/login/index.vue')
	},
	{
		path: '/404',
		component: () => import('../views/404.vue')
	}
]

const asyncRoutes: RouteRecordRaw = {
	path: '/',
	component: () => import('../layout/index.vue'),
	redirect: '/dashboard/workbench',
	children: [
		{
			path: '/profile',
			name: 'ProfileIndex',
			component: () => import('../views/profile/index.vue'),
			meta: {
				title: '个人中心',
				cache: true
			}
		}
	]
}

// 配置控制台菜单
export const dashboardMenu = [
	{
		id: 100,
		name: 'Dashboard',
		url: null,
		openStyle: 0,
		icon: 'icon-appstore',
		children: [
			{
				id: 101,
				name: '首页',
				url: 'dashboard/index',
				openStyle: 0,
				icon: 'icon-home',
				affix: true
			},
			{
				id: 102,
				name: '工作台',
				url: 'dashboard/workbench',
				openStyle: 0,
				icon: 'icon-appstore'
			}
		]
	}
]

// 配置常量菜单
export const constantMenu = [
	{
		id: 1000,
		name: 'Demo',
		url: null,
		openStyle: 0,
		icon: 'icon-windows',
		children: [
			{
				id: 1001,
				name: 'Icon 图标',
				url: 'demo/icons/index',
				openStyle: 0,
				icon: 'icon-unorderedlist'
			},
			{
				id: 1002,
				name: '二维码生成',
				url: 'demo/qrcode/index',
				openStyle: 0,
				icon: 'icon-unorderedlist'
			},
			{
				id: 1003,
				name: '页面打印',
				url: 'demo/printJs/index',
				openStyle: 0,
				icon: 'icon-unorderedlist'
			},
			{
				id: 1004,
				name: '图片裁剪',
				url: 'demo/cropper/index',
				openStyle: 0,
				icon: 'icon-unorderedlist'
			},
			{
				id: 1005,
				name: '富文本编辑器',
				url: 'demo/editor/index',
				openStyle: 0,
				icon: 'icon-unorderedlist'
			},
			{
				id: 1006,
				name: 'Markdown',
				url: 'demo/markdown/index',
				openStyle: 0,
				icon: 'icon-unorderedlist'
			},
			{
				id: 1007,
				name: 'ECharts图表',
				url: 'demo/echarts/index',
				openStyle: 0,
				icon: 'icon-unorderedlist'
			},
			{
				id: 1008,
				name: 'WebSocket',
				url: 'demo/websocket/index',
				openStyle: 0,
				icon: 'icon-unorderedlist'
			}
		]
	}
]

export const errorRoute: RouteRecordRaw = {
	path: '/:pathMatch(.*)',
	redirect: '/404'
}

export const router = createRouter({
	history: createWebHistory(),
	routes: constantRoutes
})

// 白名单列表
const whiteList = ['/login']

// 路由跳转前
router.beforeEach(async (to, from, next) => {
	NProgress.start()

	const appStore = useAppStore()
	const userStore = useUserStore()
	const routerStore = useRouterStore()

	// token存在的情况
	if (userStore.token) {
		if (to.path === '/login') {
			next(constant.loginPage)
		} else {
			// 用户信息不存在，则重新拉取
			if (!userStore.user.id) {
				try {
					await userStore.getUserInfoAction()
					await userStore.getAuthorityListAction()
					await appStore.getDictListAction()
				} catch (error) {
					// 请求异常，则跳转到登录页
					userStore?.setToken('')
					next('/login')
					return Promise.reject(error)
				}

				// 动态菜单+常量菜单
				const menuRoutes = await routerStore.getMenuRoutes()

				// 获取扁平化路由，将多级路由转换成一级路由
				const keepAliveRoutes = getKeepAliveRoutes(menuRoutes, [])

				// 添加菜单路由
				asyncRoutes.children?.push(...keepAliveRoutes)
				router.addRoute(asyncRoutes)

				// 错误路由
				router.addRoute(errorRoute)

				// 保存路由数据
				routerStore.setRoutes(constantRoutes.concat(asyncRoutes))

				// 搜索菜单需要使用
				routerStore.setSearchMenu(keepAliveRoutes)

				next({ ...to, replace: true })
			} else {
				next()
			}
		}
	} else {
		// 没有token的情况下，可以进入白名单
		if (whiteList.indexOf(to.path) > -1) {
			next()
		} else {
			if (to.fullPath === '/') {
				next('/login')
			} else {
				next(`/login?redirect=${to.fullPath}`)
			}
		}
	}
})

// 路由加载后
router.afterEach(() => {
	NProgress.done()
})

// 获取扁平化路由，将多级路由转换成一级路由
export const getKeepAliveRoutes = (rs: RouteRecordRaw[], breadcrumb: string[]): RouteRecordRaw[] => {
	const routerList: RouteRecordRaw[] = []

	rs.forEach((item: any) => {
		if (item.meta.title) {
			breadcrumb.push(item.meta.title)
		}

		if (item.children && item.children.length > 0) {
			routerList.push(...getKeepAliveRoutes(item.children, breadcrumb))
		} else {
			item.meta.breadcrumb.push(...breadcrumb)
			routerList.push(item)
		}

		breadcrumb.pop()
	})
	return routerList
}

// 加载vue组件
export interface ModuleMap {
	[key: string]: any
}

export const layoutModules = () => {
	return import.meta.glob('/src/views/**/*.vue')
}

// 根据路径，动态获取vue组件
const getDynamicComponent = (path: string): any => {
	const modules: ModuleMap = layoutModules()
	return modules[`/src/views/${path}.vue`]
}

// 根据菜单列表，生成路由数据
export const generateRoutes = (menuList: any): RouteRecordRaw[] => {
	const routerList: RouteRecordRaw[] = []

	menuList.forEach((menu: any) => {
		let component
		let path
		if (menu.children && menu.children.length > 0) {
			component = () => import('@/layout/index.vue')
			path = '/p/' + menu.id
		} else {
			// 判断是否iframe
			if (isIframeUrl(menu)) {
				component = () => import('@/layout/components/Router/Iframe.vue')
				path = '/iframe/' + menu.id
			} else {
				component = getDynamicComponent(menu.url)
				path = '/' + menu.url
			}
		}
		const route: RouteRecordRaw = {
			path: path,
			name: pathToCamel(path),
			component: component,
			children: [],
			meta: {
				title: menu.name,
				icon: menu.icon,
				id: '' + menu.id,
				url: menu.url,
				cache: true,
				newOpen: menu.openStyle === 1,
				affix: menu.affix,
				breadcrumb: []
			}
		}

		// 有子菜单的情况
		if (menu.children && menu.children.length > 0) {
			route.children?.push(...generateRoutes(menu.children))
		}

		routerList.push(route)
	})

	return routerList
}

// 判断是否iframe
const isIframeUrl = (menu: any): boolean => {
	// 如果是新页面打开，则不用iframe
	if (menu.openStyle === 1) {
		return false
	}

	// 是否外部链接
	return isExternalLink(menu.url)
}
