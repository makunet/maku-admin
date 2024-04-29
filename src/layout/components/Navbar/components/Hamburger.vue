<template>
	<div @click="handleClick">
		<ma-icon :icon="icon"></ma-icon>
	</div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useAppStore } from '@/store/modules/app'

const appStore = useAppStore()

const screenWidth = ref(0)

const handleClick = () => {
	appStore.setSidebarOpened()
}

onMounted(() => {
	window.addEventListener('resize', () => {
		screenWidth.value = document.body.clientWidth
	})
})

watch(screenWidth, (value, oldValue) => {
	if (oldValue > value && value < 1000) {
		appStore.setSidebarStatus(false)
	} else if (oldValue < value && value > 1000) {
		appStore.setSidebarStatus(true)
	}
})
const icon = computed(() => (appStore.sidebarOpened ? 'icon-outdent' : 'icon-indent'))
</script>
