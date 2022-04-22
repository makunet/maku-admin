<template>
	<div class="settings-select">
		<span> {{ props.title }}</span>
		<el-select v-model="value" size="default" style="width: 100px" :disabled="props.disabled" @change="handleChange">
			<el-option v-for="option in props.options" :key="option.value" :label="option.label" :value="option.value"></el-option>
		</el-select>
	</div>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue'

const props = defineProps({
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

const value = ref(props.modelValue)

const emit = defineEmits(['update:modelValue', 'change'])
const handleChange = () => {
	emit('update:modelValue', value)
	emit('change')
}
</script>

<style lang="scss" scoped>
.settings-select {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
</style>
