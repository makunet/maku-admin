<template>
	<div @click="handleClick">
		<svg-icon :icon="icon"></svg-icon>
	</div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import store from '@/store'

const screenWidth = ref(0)

const handleClick = () => {
	store.appStore.setSidebarOpened()
}

onMounted(() => {
	window.addEventListener('resize', () => {
		screenWidth.value = document.body.clientWidth
	})
})

watch(screenWidth, (value, oldValue) => {
	if (oldValue > value && value < 1000) {
		store.appStore.setSidebarStatus(false)
	} else if (oldValue < value && value > 1000) {
		store.appStore.setSidebarStatus(true)
	}
})
const icon = computed(() => (store.appStore.sidebarOpened ? 'icon-outdent' : 'icon-indent'))
</script>
