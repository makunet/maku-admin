<template>
	<ma-icon icon="icon-reload" @click="refresh"></ma-icon>
</template>

<script setup lang="ts">
import { useTabsStore } from '@/store/modules/tabs'
import { useRouter, useRoute } from 'vue-router'
import { nextTick } from 'vue'

const tabsStore = useTabsStore()
const router = useRouter()
const route = useRoute()

const refresh = () => {
	tabsStore.delCachedView(route).then(() => {
		nextTick(() => {
			router.replace({ path: '/redirect' + route.path }).catch(err => {
				console.warn(err)
			})
		})
	})
}
</script>
