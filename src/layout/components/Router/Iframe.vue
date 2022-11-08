<template>
	<el-card v-loading="loading">
		<iframe :src="url" class="iframe" @load="load"></iframe>
	</el-card>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { RouteLocationNormalizedLoaded, useRoute } from 'vue-router'
import { replaceLinkParam } from '@/utils/tool'

const route = useRoute()
const url = ref('')
const loading = ref(false)

watch(
	() => route,
	value => {
		if (value.path === '/iframe') {
			initUrl(value)
		}
	},
	{ deep: true }
)

onMounted(() => {
	initUrl(route)
})
const initUrl = (route: RouteLocationNormalizedLoaded): void => {
	loading.value = true

	const { meta, query } = route
	if (query.url) {
		url.value = query.url as string
	} else {
		url.value = replaceLinkParam(meta.url as string)
	}
}
const load = () => {
	loading.value = false
}
</script>

<style lang="scss" scoped>
.iframe {
	min-height: calc(100vh - 70px - var(--theme-header-height));
	width: 100%;
	border: 0;
}
</style>
