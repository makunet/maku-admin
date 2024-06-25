<template>
	<el-tree-select
		v-model="modelAsString"
		:data="dataList"
		value-key="dictValue"
		check-strictly
		:render-after-expand="false"
		:props="{
			label: 'dictLabel',
			children: 'children'
		}"
		style="width: 100%"
		:clearable="clearable"
		:placeholder="placeholder"
		:disabled="disabled"
	/>
</template>

<script setup lang="ts" name="MaDictTreeSelect">
import { getDictDataList, treeDataTranslate } from '@/utils/tool'
import { useAppStore } from '@/store/modules/app'
import { computed } from 'vue'

const appStore = useAppStore()
const prop = defineProps({
	dictType: {
		type: String,
		required: true
	},
	clearable: {
		type: Boolean,
		required: false,
		default: () => false
	},
	disabled: {
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
const modelAsString = computed({
	get() {
		return model.value != undefined ? model.value.toString() : ''
	},
	set(value) {
		model.value = value
	}
})

const dictDataList = getDictDataList(appStore.dictList, prop.dictType)
const dataList = treeDataTranslate(dictDataList, 'dictValue')
</script>
