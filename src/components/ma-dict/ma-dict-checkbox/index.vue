<template>
	<el-checkbox-group v-model="arrayData" :placeholder="placeholder" :clearable="clearable">
		<el-checkbox v-for="data in dataList" :key="data.dictValue" :value="data.dictValue">{{ data.dictLabel }}</el-checkbox>
	</el-checkbox-group>
</template>

<script setup lang="ts" name="MaDictCheckbox">
import { getDictDataList } from '@/utils/tool'
import { useAppStore } from '@/store/modules/app'
import { ref, watch } from 'vue'

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

const arrayData = ref<any[]>([])
const model = defineModel<any | any[]>()

watch(
	() => arrayData.value,
	val => {
		if (!val) {
			model.value = ''
		} else {
			model.value = val.join(',')
		}
	}
)

watch(
	() => model.value,
	val => {
		const value = val.toString()
		if (!value) {
			arrayData.value = []
		} else if (Array.isArray(value)) {
			arrayData.value = value
		} else {
			arrayData.value = value.split(',')
		}
	}
)

const dataList = getDictDataList(appStore.dictList, props.dictType)
</script>
