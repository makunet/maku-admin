<template>
	<el-select v-model="model" :placeholder="placeholder" :clearable="clearable">
		<el-option v-for="data in dataList" :key="data.dictValue" :label="data.dictLabel" :value="data.dictValue">{{ data.dictLabel }}</el-option>
	</el-select>
</template>

<script setup lang="ts" name="MaDictSelect">
import { getDictDataList } from '@/utils/tool'
import { useAppStore } from '@/store/modules/app'

const appStore = useAppStore()
const props = defineProps({
	dictType: {
		type: String,
		required: true
	},
	clearable: {
		type: Boolean,
		required: false,
		default: () => false
	},
	placeholder: {
		type: String,
		required: false,
		default: () => ''
	}
})

const model = defineModel<number | string>()

const dataList = getDictDataList(appStore.dictList, props.dictType)
</script>
