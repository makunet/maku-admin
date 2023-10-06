<template>
	<div class="navbar-left">
		<Hamburger />
		<Refresh />
		<Breadcrumb v-if="appStore.theme.isBreadcrumb" />
	</div>
</template>

<script setup lang="ts">
import Hamburger from './components/Hamburger.vue'
import Refresh from './components/Refresh.vue'
import Breadcrumb from './components/Breadcrumb.vue'
import { useAppStore } from '@/store/modules/app'

const appStore = useAppStore()
</script>

<style lang="scss" scoped>
.navbar-left {
	flex: 1;
	height: inherit;
	display: flex;
	align-items: center;
}
</style>
