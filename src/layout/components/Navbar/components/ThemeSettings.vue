<template>
	<div>
		<svg-icon icon="icon-ellipsis-v" @click="themeSettingsHandle"></svg-icon>
	</div>
</template>

<script setup lang="ts">
import emits from '@/utils/emits'
const themeSettingsHandle = () => {
	emits.emit('openThemeSettings')
}
</script>
