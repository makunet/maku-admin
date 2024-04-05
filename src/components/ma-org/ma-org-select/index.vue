<template>
	<el-tree-select
		v-model="model"
		:data="orgList"
		value-key="id"
		check-strictly
		:render-after-expand="false"
		:props="{ label: 'name', children: 'children' }"
		style="width: 100%"
		:clearable="clearable"
		:placeholder="placeholder"
		:disabled="disabled"
	/>
</template>

<script setup lang="ts" name="MaOrgSelect">
import { ref } from 'vue'
import { useOrgListApi } from '@/api/sys/orgs'

defineProps({
	clearable: {
		type: Boolean,
		required: false,
		default: () => true
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
const orgList = ref([])

// 获取机构列表
const getOrgList = async () => {
	const res = await useOrgListApi()
	orgList.value = res.data
}

getOrgList()
</script>
