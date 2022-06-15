<template>
	<el-container class="layout-container">
		<Sidebar />
		<el-container>
			<el-header class="layout-header" :style="layoutHeaderHeight">
				<Navbar />
				<Tabs v-if="theme.isTabsView" />
			</el-header>
			<el-scrollbar>
				<el-main class="layout-main">
					<el-scrollbar class="layout-scrollbar">
						<div class="layout-card" :style="layoutMainHeight">
							<router-view v-slot="{ Component, route }">
								<keep-alive v-if="theme.isTabsCache" :include="[...store.tabsStore.cachedViews]">
									<component :is="Component" :key="route.name" />
								</keep-alive>
								<component :is="Component" v-else :key="route.name" />
							</router-view>
						</div>
					</el-scrollbar>
				</el-main>
			</el-scrollbar>
		</el-container>
	</el-container>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import store from '@/store'
import Sidebar from '@/layout/components/Sidebar/index.vue'
import Navbar from '@/layout/components/Navbar/index.vue'
import Tabs from '@/layout/components/Tabs/index.vue'
import { computed } from 'vue'

const theme = computed(() => store.appStore.theme)
const layoutHeaderHeight = computed(() => {
	if (!theme.value.isTabsView) {
		return 'height:var(--theme-header-height) !important'
	} else {
		return ''
	}
})
const layoutMainHeight = computed(() => {
	if (!theme.value.isTabsView) {
		return 'min-height: calc(100vh - var(--theme-header-height) - 30px) !important'
	} else {
		return ''
	}
})
</script>
