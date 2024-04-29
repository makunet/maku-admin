<template>
	<div>
		<ma-icon icon="icon-ellipsis-v" @click="themeSettingsHandle"></ma-icon>
	</div>
</template>

<script setup lang="ts">
import emits from '@/utils/emits'
const themeSettingsHandle = () => {
	emits.emit('openThemeSettings')
}
</script>
