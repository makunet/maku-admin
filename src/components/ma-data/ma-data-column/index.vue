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
			<span>{{ getDataLabel(scope.row[props.prop]) }}</span>
		</template>
	</el-table-column>
</template>

<script setup lang="ts" name="MaDataColumn">
import { PropType, ref } from 'vue'

interface Prop {
	value: any
	label: string
}
const props = defineProps({
	data: {
		type: Array as PropType<any[]>,
		default: () => []
	},
	props: {
		type: Object as PropType<Prop>,
		required: false,
		default: () => ({
			value: 'id',
			label: 'name'
		})
	},
	prop: {
		type: String,
		required: true
	},
	label: {
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

const getDataLabel = (value: any) => {
	const val = props.data.find((item: any) => item[props.props.value] == value)
	if (val) {
		return val[props.props.label]
	}
	return ''
}
</script>
