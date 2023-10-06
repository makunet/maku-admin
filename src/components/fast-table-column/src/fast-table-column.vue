<template>
	<el-table-column
		:prop="prop"
		:label="label"
		:header-align="headerAlign"
		:align="align"
		:width="width"
		:min-width="minWidth"
		:class-name="className"
	>
		<template #default="scope">
			<el-tag
				v-if="getDictLabelClass(appStore.dictList, props.dictType, scope.row[props.prop])"
				:type="
					getDictLabelClass(appStore.dictList, props.dictType, scope.row[props.prop]) === 'primary'
						? ''
						: getDictLabelClass(appStore.dictList, props.dictType, scope.row[props.prop])
				"
			>
				{{ getDictLabel(appStore.dictList, props.dictType, scope.row[props.prop]) }}
			</el-tag>
			<span v-else>
				{{ getDictLabel(appStore.dictList, props.dictType, scope.row[props.prop]) }}
			</span>
		</template>
	</el-table-column>
</template>

<script setup lang="ts" name="FastTableColumn">
import { getDictLabel, getDictLabelClass } from '@/utils/tool'
import { useAppStore } from '@/store/modules/app'

const appStore = useAppStore()
const props = defineProps({
	prop: {
		type: String,
		required: true
	},
	label: {
		type: String,
		required: true
	},
	dictType: {
		type: String,
		required: true
	},
	headerAlign: {
		type: String,
		required: false,
		default: () => 'center'
	},
	align: {
		type: String,
		required: false,
		default: () => 'center'
	},
	width: {
		type: String,
		required: false,
		default: () => ''
	},
	minWidth: {
		type: String,
		required: false,
		default: () => ''
	},
	className: {
		type: String,
		required: false,
		default: () => ''
	}
})
</script>
