<template>
	<div class="user-dialog">
		<el-dialog :model-value="visible" title="选择用户" :close-on-click-modal="false" :width="800" draggable @close="handleClose">
			<el-form :inline="true" :model="state.queryForm" style="margin-bottom: 15px">
				<el-form-item>
					<el-input v-model="state.queryForm.username" placeholder="用户名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-input v-model="state.queryForm.mobile" placeholder="手机号"></el-input>
				</el-form-item>
				<el-form-item>
					<ma-dict-select v-model="state.queryForm.gender" dict-type="user_gender" clearable placeholder="性别"></ma-dict-select>
				</el-form-item>
				<el-form-item>
					<el-button icon="Search" type="primary" @click="getDataList()">查询</el-button>
				</el-form-item>
			</el-form>
			<el-table v-loading="state.dataListLoading" :data="state.dataList" border style="width: 100%" @selection-change="selectionChangeHandle">
				<el-table-column v-if="multiple" type="selection" header-align="center" align="center" width="50"></el-table-column>
				<el-table-column v-else header-align="center" align="center" width="50">
					<template #default="scope">
						<el-radio v-model="radioValue" :value="scope.row.id"></el-radio>
					</template>
				</el-table-column>
				<el-table-column prop="username" label="用户名" header-align="center" align="center"></el-table-column>
				<el-table-column prop="mobile" label="手机号" header-align="center" align="center"></el-table-column>
				<el-table-column prop="realName" label="姓名" header-align="center" align="center"></el-table-column>
				<ma-dict-column prop="gender" label="性别" dict-type="user_gender"></ma-dict-column>
				<el-table-column prop="createTime" label="创建时间" header-align="center" align="center" width="180"></el-table-column>
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

<script setup lang="ts" name="MaUserDialog">
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
	dataListUrl: '/sys/user/page',
	queryForm: {
		username: '',
		mobile: '',
		gender: ''
	}
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

const { getDataList, selectionChangeHandle, sizeChangeHandle, currentChangeHandle } = useCrud(state)
</script>

<style lang="scss" scoped>
.user-dialog {
	display: inline-block;
}
</style>
