<template>
	<el-cascader
		v-model="data"
		:options="pcaData"
		:style="{ width: props.width }"
		:placeholder="props.placeholder"
		:clearable="props.clearable"
		:disabled="props.disabled"
		@change="handleChange"
	/>
</template>

<script lang="ts" setup name="MaAddress">
import { pcaData } from './index'
import { computed } from 'vue'

const props = defineProps({
	modelValue: {
		type: [String, Number, Boolean, Date, Array],
		default: ''
	},
	width: {
		type: String,
		default: ''
	},
	placeholder: {
		type: String,
		default: ''
	},
	disabled: {
		type: Boolean,
		default: false
	},
	clearable: {
		type: Boolean,
		default: false
	}
})

const data = computed(() => {
	if (Array.isArray(props.modelValue)) {
		return []
	}

	if (props.modelValue) {
		return (props.modelValue as string).split(',')
	}

	return []
})

// 编辑器change事件触发
const emit = defineEmits(['update:modelValue'])
const handleChange = (value: any) => {
	if (value) {
		emit('update:modelValue', value.join(','))
	} else {
		emit('update:modelValue', '')
	}
}
</script>
