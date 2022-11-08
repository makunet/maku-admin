<template>
	<el-container class="layout-container layout-vertical">
		<el-aside class="layout-sidebar" :class="sidebarClass">
			<Logo v-if="store.appStore.theme.isLogo" />
			<el-scrollbar>
				<el-menu
					:default-active="defaultActive"
					:collapse="!store.appStore.sidebarOpened"
					:unique-opened="store.appStore.theme.uniqueOpened"
					background-color="transparent"
					:collapse-transition="false"
					mode="vertical"
				>
					<menu-item v-for="menu in store.routerStore.menuRoutes" :key="menu.path" :menu="menu"></menu-item>
				</el-menu>
			</el-scrollbar>
		</el-aside>
		<el-container>
			<el-header class="layout-header" :style="layoutHeaderHeight">
				<div class="navbar-container" :class="headerClass">
					<NavbarLeft />
					<NavbarRight />
				</div>
				<Tabs v-if="theme.isTabsView" />
			</el-header>
			<Main />
		</el-container>
	</el-container>
</template>

<script setup lang="ts">
import store from '@/store'
import NavbarLeft from '@/layout/components/Navbar/NavbarLeft.vue'
import NavbarRight from '@/layout/components/Navbar/NavbarRight.vue'
import Main from '@/layout/components/Main/index.vue'
import Tabs from '@/layout/components/Tabs/index.vue'
import Logo from '@/layout/components/Logo/index.vue'
import MenuItem from '@/layout/components/Menu/MenuItem.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const defaultActive = computed(() => {
	const { path } = route
	return path
})

const headerClass = computed(() => (store.appStore.theme.headerStyle === 'theme' ? 'header-theme' : ''))

const sidebarClass = computed(() => {
	const sidebarOpened = store.appStore.sidebarOpened ? 'aside-expend' : 'aside-compress'
	const isDark = store.appStore.theme.sidebarStyle === 'dark' ? 'sidebar-dark' : ''
	return sidebarOpened + ' ' + isDark
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
