<template>
	<el-radio-group :model-value="modelValue + ''" @change="$emit('update:modelValue', $event)">
		<el-radio v-for="data in dataList" :key="data.dictValue" :label="data.dictValue">{{ data.dictLabel }}</el-radio>
	</el-radio-group>
</template>

<script setup lang="ts" name="FastRadioGroup">
import { useAppStore } from '@/store/modules/app'
import { getDictDataList } from '@/utils/tool'

const appStore = useAppStore()
const props = defineProps({
	modelValue: {
		type: [Number, String],
		required: true
	},
	dictType: {
		type: String,
		required: true
	}
})

const dataList = getDictDataList(appStore.dictList, props.dictType)
</script>
