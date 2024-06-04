<template>
	<el-input v-model="orgName" :clearable :disabled readonly :placeholder @clear="model = ''">
		<template #append>
			<el-button icon="Search" @click="visible = true"></el-button>
		</template>
	</el-input>
	<ma-data-table
		v-if="!disabled && visible"
		:key="visible + ''"
		v-model:visible="visible"
		title="机构选择"
		url="/sys/org/list"
		:multiple
		row-key="id"
		:page="false"
		:columns="[
			{ field: 'name', label: '名称' },
			{ field: 'parentName', label: '上级名称' }
		]"
		@select="onSelect"
	></ma-data-table>
</template>

<script setup lang="ts" name="MaOrgInput">
import { ref, watch } from 'vue'
import { useOrgNameListApi } from '@/api/sys/orgs'

const props = defineProps({
	multiple: {
		type: Boolean,
		required: false,
		default: false
	},
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

const model = defineModel<any | any[]>()
const visible = ref(false)
const orgName = ref()

watch(
	() => model.value,
	async val => {
		if (val && val.length > 0) {
			const idList = props.multiple ? model.value : [model.value]
			const { data } = await useOrgNameListApi(idList)
			orgName.value = data.join(',')
		} else {
			orgName.value = ''
		}
	},
	{
		immediate: true
	}
)

const emit = defineEmits(['select'])
const onSelect = (rows: any[]) => {
	if (props.multiple) {
		model.value = rows.map((item: any) => item.id)
	} else {
		model.value = rows[0].id
	}

	emit('select', rows)
}
</script>
