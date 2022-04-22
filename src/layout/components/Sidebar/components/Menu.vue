<template>
	<el-scrollbar>
		<el-menu
			:default-active="defaultActive"
			:collapse="!store.appStore.sidebarOpened"
			:unique-opened="store.appStore.theme.uniqueOpened"
			background-color="transparent"
			:collapse-transition="false"
			mode="vertical"
			router
		>
			<menu-item v-for="menu in store.routerStore.menuRoutes" :key="menu.path" :menu="menu"></menu-item>
		</el-menu>
	</el-scrollbar>
</template>

<script setup lang="ts">
import store from '@/store'
import MenuItem from './MenuItem.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const defaultActive = computed(() => {
	const { path } = route
	return path
})
</script>
