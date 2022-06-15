<template>
	<div class="settings-switch">
		<span> {{ title }}</span>
		<el-switch :model-value="modelValue" :disabled="disabled" @change="handleChange($event)"></el-switch>
	</div>
</template>

<script setup lang="ts">
defineProps({
	modelValue: {
		type: Boolean,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	disabled: {
		type: Boolean
	}
})

const emit = defineEmits(['update:modelValue', 'change'])
const handleChange = (val: boolean) => {
	emit('update:modelValue', val)
	emit('change')
}
</script>

<style lang="scss" scoped>
.settings-switch {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-bottom: 15px;
	color: var(--el-text-color-primary);
}
</style>
