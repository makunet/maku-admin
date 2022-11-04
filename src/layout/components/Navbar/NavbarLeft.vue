<template>
	<div class="navbar-left">
		<Hamburger />
		<Refresh />
		<Breadcrumb v-if="store.appStore.theme.isBreadcrumb" />
	</div>
</template>

<script setup lang="ts">
import store from '@/store'
import Hamburger from './components/Hamburger.vue'
import Refresh from './components/Refresh.vue'
import Breadcrumb from './components/Breadcrumb.vue'
</script>

<style lang="scss" scoped>
.navbar-left {
	flex: 1;
	height: inherit;
	display: flex;
	align-items: center;
}
</style>
