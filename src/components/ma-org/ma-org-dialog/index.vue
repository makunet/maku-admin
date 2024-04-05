<template>
	<div class="org-dialog">
		<el-dialog :model-value="visible" title="选择机构" :close-on-click-modal="false" :width="800" draggable @close="handleClose">
			<el-table v-loading="state.dataListLoading" :data="state.dataList" border row-key="id" @selection-change="selectionChangeHandle">
				<el-table-column v-if="multiple" type="selection" header-align="center" align="center" width="50"></el-table-column>
				<el-table-column v-else header-align="center" align="center" width="50">
					<template #default="scope">
						<el-radio v-model="radioValue" :value="scope.row.id"></el-radio>
					</template>
				</el-table-column>
				<el-table-column prop="name" label="名称" header-align="center"></el-table-column>
				<el-table-column prop="parentName" label="上级" header-align="center" align="center"></el-table-column>
				<el-table-column prop="sort" label="排序" header-align="center" align="center"></el-table-column>
			</el-table>
			<el-pagination
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

<script setup lang="ts" name="MaOrgDialog">
import { reactive, ref } from 'vue'
import { IHooksOptions } from '@/hooks/interface'
import { useCrud } from '@/hooks'
import { ElMessage } from 'element-plus'

const props = defineProps({
	multiple: {
		type: Boolean,
		required: false,
		default: false
	},
	visible: {
		type: Boolean,
		default: false
	}
})

const state: IHooksOptions = reactive({
	dataListUrl: '/sys/org/list'
})

const radioValue = ref()

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
	if (!radioValue.value) {
		ElMessage.warning('请选择记录')
		return
	}
	handleClose()
	emit('select', radioValue.value)
}

const handleClose = () => {
	emit('update:visible', false)
}

const { selectionChangeHandle, sizeChangeHandle, currentChangeHandle } = useCrud(state)
</script>

<style lang="scss" scoped>
.org-dialog {
	display: inline-block;
}
</style>
