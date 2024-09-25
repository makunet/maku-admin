<template>
	<div class="ma-data-table">
		<el-dialog :model-value="visible" :title :close-on-click-modal="false" :width="800" draggable @close="handleClose">
			<el-form v-if="queryParams.length > 0" :inline="true" :model="state.queryForm" style="margin-bottom: 15px">
				<el-form-item v-for="(query, index) in queryParams" :key="index">
					<el-input v-model="state.queryForm[query.field]" :placeholder="query.label"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button icon="Search" type="primary" @click="getDataList()">查询</el-button>
				</el-form-item>
			</el-form>
			<el-table
				v-loading="state.dataListLoading"
				:data="state.dataList"
				border
				style="width: 100%"
				highlight-current-row
				show-overflow-tooltip
				:row-key="rowKey"
				@row-dblclick="handleRowClick"
				@selection-change="selectionChangeHandle"
				@current-change="currentChange"
			>
				<el-table-column v-if="multiple" type="selection" header-align="center" align="center" width="50"></el-table-column>
				<el-table-column v-for="(column, index) in columns" :key="index" :prop="column.field" :label="column.label"></el-table-column>
			</el-table>
			<el-pagination
				v-if="page"
				:current-page="state.page"
				:page-sizes="state.pageSizes"
				:page-size="state.limit"
				:total="state.total"
				layout="total, sizes, prev, pager, next, jumper"
				@size-change="sizeChangeHandle"
				@current-change="currentChangeHandle"
			>
			</el-pagination>
			<template #footer>
				<el-button @click="handleClose">取消</el-button>
				<el-button type="primary" @click="submitHandle()">确定</el-button>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts" name="MaDataTable">
import { ref, reactive, PropType } from 'vue'
import { IHooksOptions } from '@/hooks/interface'
import { useCrud } from '@/hooks'
import { ElMessage } from 'element-plus'

interface Column {
	field: string
	label: string
}

const props = defineProps({
	title: {
		type: String,
		required: true
	},
	url: {
		type: String,
		required: true
	},
	columns: {
		type: Array as PropType<Column[]>,
		required: true
	},
	queryParams: {
		type: Array as PropType<Column[]>,
		required: false,
		default: () => []
	},
	multiple: {
		type: Boolean,
		required: false,
		default: false
	},
	rowKey: {
		type: String,
		required: false,
		default: ''
	},
	page: {
		type: Boolean,
		required: false,
		default: true
	},
	visible: {
		type: Boolean,
		default: false
	}
})

const state: IHooksOptions = reactive({
	dataListUrl: props.url,
	queryForm: {},
	isPage: props.page
})

const currentRow = ref()
const currentChange = (row: any) => {
	currentRow.value = row
}

const emit = defineEmits(['select', 'update:visible'])
const submitHandle = () => {
	// 多选
	if (props.multiple) {
		const dataList = state.dataListSelections ? state.dataListSelections : []
		if (dataList.length === 0) {
			ElMessage.warning('请选择记录')
			return
		}

		handleClose()
		emit('select', dataList)
		return
	}

	// 单选
	if (!currentRow.value) {
		ElMessage.warning('请选择记录')
		return
	}
	handleClose()
	emit('select', [currentRow.value])
}

const handleRowClick = (row: any) => {
	handleClose()
	emit('select', [row])
}

const handleClose = () => {
	emit('update:visible', false)
}

const { getDataList, selectionChangeHandle, sizeChangeHandle, currentChangeHandle } = useCrud(state)
</script>

<style lang="scss" scoped>
.ma-data-table {
	display: inline-block;
}
</style>
