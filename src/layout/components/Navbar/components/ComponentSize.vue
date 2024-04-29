<template>
	<el-dropdown trigger="click" @command="componentSizeChange">
		<ma-icon icon="icon-font-size"></ma-icon>
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item command="large" :disabled="componentSize === 'large'">{{ $t('app.large') }}</el-dropdown-item>
				<el-dropdown-item command="default" :disabled="componentSize === 'default'">{{ $t('app.default') }}</el-dropdown-item>
				<el-dropdown-item command="small" :disabled="componentSize === 'small'">{{ $t('app.small') }}</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store/modules/app'
import { computed } from 'vue'

const appStore = useAppStore()
const componentSize = computed(() => appStore.componentSize)
const componentSizeChange = (size: string) => {
	appStore.setComponentSize(size)
}
</script>
