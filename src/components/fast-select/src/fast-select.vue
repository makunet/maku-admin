<template>
	<el-select :model-value="modelValue" :placeholder="placeholder" clearable @change="$emit('update:modelValue', $event)">
		<el-option v-for="data in dataList" :key="data.dictValue" :label="data.dictLabel" :value="data.dictValue">{{ data.dictLabel }}</el-option>
	</el-select>
</template>

<script setup lang="ts" name="FastSelect">
import store from '@/store'
import { getDictDataList } from '@/utils/tool'

const props = defineProps({
	modelValue: {
		type: [Number, String],
		required: true
	},
	dictType: {
		type: String,
		required: true
	},
	placeholder: {
		type: String,
		required: true
	}
})

const dataList = getDictDataList(store.appStore.dictList, props.dictType)
</script>
