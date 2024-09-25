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
			<el-image
				v-if="scope.row[props.prop]?.length > 0"
				style="height: 25px"
				preview-teleported
				:src="scope.row[props.prop].split(',')[0]"
				:preview-src-list="scope.row[props.prop].split(',')"
			/>
		</template>
	</el-table-column>
</template>

<script setup lang="ts" name="MaImageColumn">
const props = defineProps({
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
</script>
