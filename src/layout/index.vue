<template>
	<component :is="LayoutComponents[layout]"></component>
	<Settings></Settings>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store/modules/app'
import Settings from '@/layout/components/Settings/index.vue'
import Vertical from '@/layout/components/Theme/Vertical.vue'
import Columns from '@/layout/components/Theme/Columns.vue'
import Transverse from '@/layout/components/Theme/Transverse.vue'
import { computed } from 'vue'

const appStore = useAppStore()
const LayoutComponents: { [key: string]: any } = {
	vertical: Vertical,
	columns: Columns,
	transverse: Transverse
}

const layout = computed(() => appStore.theme.layout)
</script>
