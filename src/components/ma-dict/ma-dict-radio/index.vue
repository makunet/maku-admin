<template>
	<el-radio-group v-model="model">
		<el-radio v-for="data in dataList" :key="data.dictValue" :value="data.dictValue">{{ data.dictLabel }}</el-radio>
	</el-radio-group>
</template>

<script setup lang="ts" name="MaDictRadio">
import { useAppStore } from '@/store/modules/app'
import { getDictDataList } from '@/utils/tool'

const appStore = useAppStore()
const props = defineProps({
	dictType: {
		type: String,
		required: true
	}
})

const model = defineModel<number | string>()

const dataList = getDictDataList(appStore.dictList, props.dictType)
</script>
