<template>
	<el-select v-model="modelAsString" :placeholder="placeholder" :clearable="clearable">
		<el-option v-for="data in dataList" :key="data.dictValue" :label="data.dictLabel" :value="data.dictValue">{{ data.dictLabel }}</el-option>
	</el-select>
</template>

<script setup lang="ts" name="MaDictSelect">
import { getDictDataList } from '@/utils/tool'
import { useAppStore } from '@/store/modules/app'
import { computed } from 'vue'

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
const modelAsString = computed({
	get() {
		return model.value != undefined ? model.value.toString() : ''
	},
	set(value) {
		model.value = value
	}
})

const dataList = getDictDataList(appStore.dictList, props.dictType)
</script>
