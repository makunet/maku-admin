<template>
	<el-container class="layout-container layout-columns">
		<el-aside class="layout-sidebar aside-expend" :class="sidebarClass">
			<div class="sidebar-logo">
				<el-avatar src="./favicon.ico"></el-avatar>
			</div>
			<el-scrollbar>
				<div class="columns-menu">
					<router-link to="/home">
						<div class="columns-menu-item" :class="{ active: menuPath === '/home' }">
							<svg-icon icon="icon-home"></svg-icon>
							<span class="title">首页</span>
						</div>
					</router-link>
					<div
						v-for="menu in store.routerStore.menuRoutes"
						:key="menu.path"
						class="columns-menu-item"
						:class="{ active: menuPath === menu.path }"
						@click="handleMenu(menu)"
					>
						<svg-icon :icon="menu.meta.icon"></svg-icon>
						<span class="title">{{ menu.meta.title }}</span>
					</div>
				</div>
			</el-scrollbar>
		</el-aside>
		<el-container>
			<el-header class="layout-header" :style="layoutHeaderHeight">
				<div class="navbar-container" :class="headerClass">
					<NavbarLeft />
					<NavbarRight />
				</div>
			</el-header>
			<div class="layout-main">
				<div v-if="subMenus.length > 0 && store.appStore.sidebarOpened" class="columns-sub-menu">
					<el-menu
						:default-active="defaultActive"
						:collapse="!store.appStore.sidebarOpened"
						:unique-opened="store.appStore.theme.uniqueOpened"
						background-color="transparent"
						:collapse-transition="false"
						mode="vertical"
					>
						<menu-item v-for="menu in subMenus" :key="menu.path" :menu="menu"></menu-item>
					</el-menu>
				</div>
				<Tabs v-if="theme.isTabsView" />
				<Main />
			</div>
		</el-container>
	</el-container>
</template>

<script setup lang="ts">
import store from '@/store'
import NavbarLeft from '@/layout/components/Navbar/NavbarLeft.vue'
import NavbarRight from '@/layout/components/Navbar/NavbarRight.vue'
import Main from '@/layout/components/Main/index.vue'
import Tabs from '@/layout/components/Tabs/index.vue'
import MenuItem from '@/layout/components/Menu/MenuItem.vue'
import { computed, onMounted, ref, watch } from 'vue'
import { RouteRecordRaw, useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const defaultActive = computed(() => {
	const { path } = route
	return path
})

const subMenus = ref<any[]>([])
watch(route, () => {
	subMenus.value = []
	initSubMenu()
})

onMounted(() => {
	initSubMenu()
})

const menuPath = ref<string>('')
const initSubMenu = () => {
	menuPath.value = defaultActive.value
	for (const menu of store.routerStore.menuRoutes) {
		// 是否包含当前路由
		const exist = findRoute(menu.children)
		if (exist) {
			subMenus.value = menu.children

			menuPath.value = menu.path
			break
		}
	}
}

const findRoute = (menus: RouteRecordRaw[]): boolean => {
	for (const menu of menus) {
		// 有子菜单的情况
		if (menu.children && menu.children.length > 0) {
			if (findRoute(menu.children)) {
				return true
			}
		} else if (menu.path === defaultActive.value) {
			return true
		}
	}
	return false
}

const handleMenu = (menu: any) => {
	if (menu.children && menu.children.length > 0) {
		const leafRoute = findLeafRoute(menu.children)
		router.push(leafRoute.path)
	} else {
		router.push(menu.path)
	}
}

const findLeafRoute = (menus: RouteRecordRaw[]): any => {
	for (const menu of menus) {
		// 有子菜单的情况
		if (menu.children && menu.children.length > 0) {
			return findLeafRoute(menu.children)
		} else {
			return menu
		}
	}
	return null
}

const headerClass = computed(() => (store.appStore.theme.headerStyle === 'theme' ? 'header-theme' : ''))

const sidebarClass = computed(() => {
	return store.appStore.theme.sidebarStyle === 'dark' ? 'sidebar-dark' : ''
})

const theme = computed(() => store.appStore.theme)
const layoutHeaderHeight = computed(() => {
	if (!theme.value.isTabsView) {
		return 'height:var(--theme-header-height) !important'
	} else {
		return ''
	}
})
</script>

<style lang="scss" scoped>
.sidebar-logo {
	height: var(--theme-header-height);
	line-height: var(--theme-header-height);
	border-bottom: var(--theme-border-color-light) 1px solid;
	text-align: center;
	.el-avatar {
		width: 30px;
		height: 30px;
		vertical-align: middle;
	}
}
.columns-menu {
	flex: 1;
	.columns-menu-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 70px;
		cursor: pointer;
		transition: all 0.3s ease;
		&:hover {
			background-color: var(--el-color-primary);
		}
		::v-deep(.svg-icon) {
			align-items: center;
			cursor: pointer;
			svg {
				font-size: 21px;
				color: var(--theme-menu-text-color) !important;
			}
		}
		.title {
			margin-top: 6px;
			font-size: 12px;
			color: var(--theme-menu-text-color);
		}
	}
	.active {
		background-color: var(--el-color-primary);
	}
}

.layout-sidebar {
	&.aside-expend {
		width: 75px !important;
	}
	::v-deep(.el-menu-item) {
		padding-left: 6px !important;
		padding-right: 10px !important;
	}
}

.layout-header {
	height: var(--theme-header-height) !important;
	border-bottom: 51px solid #8c8c8c !important;
}
.layout-main {
	display: block;
	width: 100%;
	height: 100%;
	.el-menu {
		border-right: none !important;
	}
	.el-menu-item {
		height: 40px !important;
		line-height: 40px !important;
		font-size: 14px !important;
		color: var(--theme-menu-text-color) !important;
		&:hover {
			color: var(--el-color-primary) !important;
		}
	}
	.el-menu-item.is-active {
		border-right: none;
		right: 0;
		color: var(--theme-menu-hover-color) !important;
	}
}
.column-menu {
	display: block;
}
.columns-sub-menu {
	width: 120px;
	height: 100%;
	display: block;
	float: left;
	border-right: var(--theme-border-color-light) 1px solid;
	background: #fff;
}
.navbar-container {
	height: var(--theme-header-height);
	display: flex;
	align-items: center;
	background: var(--theme-header-bg-color);
	border-bottom: 1px solid var(--theme-border-color-light);
	color: var(--theme-header-text-color);
	::v-deep(.svg-icon) {
		align-items: center;
		cursor: pointer;
		height: var(--theme-header-height);
		line-height: var(--theme-header-height);
		padding: 0 12px;
		svg {
			color: var(--theme-header-text-color) !important;
			font-size: 16px;
		}
		&:hover {
			background: var(--theme-header-hover-color);
		}
	}
}
</style>
