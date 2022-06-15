<template>
	<div class="settings-select">
		<span> {{ title }}</span>
		<el-select :model-value="modelValue" size="default" style="width: 100px" :disabled="disabled" @change="handleChange($event)">
			<el-option v-for="option in options" :key="option.value" :label="option.label" :value="option.value"></el-option>
		</el-select>
	</div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'

defineProps({
	modelValue: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	options: {
		type: Array as PropType<any[]>,
		required: true,
		default: () => []
	},
	disabled: {
		type: Boolean
	}
})

const emit = defineEmits(['update:modelValue', 'change'])
const handleChange = (val: any) => {
	emit('update:modelValue', val)
	emit('change')
}
</script>

<style lang="scss" scoped>
.settings-select {
	display: flex;
	justify-content: space-between;
	align-items: center;
	color: var(--el-text-color-primary);
}
</style>
