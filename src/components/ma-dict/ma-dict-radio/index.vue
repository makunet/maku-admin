<template>
	<el-radio-group v-model="modelAsString" :disabled="props.disabled">
		<el-radio v-for="data in dataList" :key="data.dictValue" :value="data.dictValue">{{ data.dictLabel }}</el-radio>
	</el-radio-group>
</template>

<script setup lang="ts" name="MaDictRadio">
import { useAppStore } from '@/store/modules/app'
import { getDictDataList } from '@/utils/tool'
import { computed } from 'vue'

const appStore = useAppStore()
const props = defineProps({
	dictType: {
		type: String,
		required: true
	},
	disabled: {
		type: Boolean,
		required: false,
		default: () => false
	}
})

const model = defineModel<number | string>()

const modelAsString = computed({
	get() {
		return model.value + ''
	},
	set(value) {
		model.value = value
	}
})

const dataList = getDictDataList(appStore.dictList, props.dictType)
</script>
