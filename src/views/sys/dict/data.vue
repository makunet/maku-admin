<template>
	<div>
		<el-form :inline="true" :model="state.queryForm" @keyup.enter="getDataList">
			<el-form-item>
				<el-input v-model="state.queryForm.dictLabel" placeholder="字典标签" clearable></el-input>
			</el-form-item>
			<el-form-item>
				<el-input v-model="state.queryForm.dictValue" placeholder="字典值" clearable></el-input>
			</el-form-item>
			<el-form-item>
				<el-button @click="getDataList">查询</el-button>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="addOrUpdateHandle()">新增</el-button>
			</el-form-item>
			<el-form-item>
				<el-button type="danger" @click="deleteBatchHandle()">删除</el-button>
			</el-form-item>
		</el-form>
		<el-table v-loading="state.dataListLoading" :data="state.dataList" border style="width: 100%">
			<el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
			<el-table-column prop="dictLabel" label="字典标签" header-align="center" align="center"> </el-table-column>
			<el-table-column prop="dictValue" label="字典值" header-align="center" align="center"></el-table-column>
			<el-table-column prop="sort" label="排序" sortable="custom" header-align="center" align="center"></el-table-column>
			<el-table-column prop="remark" label="备注" header-align="center" align="center"></el-table-column>
			<el-table-column prop="createTime" label="创建时间" sortable="custom" header-align="center" align="center" width="180"></el-table-column>
			<el-table-column label="操作" fixed="right" header-align="center" align="center" width="150">
				<template #default="scope">
					<el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
					<el-button type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
				</template>
			</el-table-column>
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
		<!-- 新增 / 修改 -->
		<add-or-update ref="addOrUpdateRef" @refreshDataList="getDataList"></add-or-update>
	</div>
</template>

<script setup lang="ts">
import { useCrud } from '@/hooks'
import { reactive, ref } from 'vue'
import AddOrUpdate from './data-add-or-update.vue'
import { IHooksOptions } from '@/hooks/interface'

const props = defineProps({
	dictTypeId: {
		type: Number,
		required: true
	}
})

const state: IHooksOptions = reactive({
	dataListUrl: '/sys/dict/data/page',
	deleteUrl: '/sys/dict/data',
	queryForm: {
		dictTypeId: props.dictTypeId,
		dictLabel: '',
		dictValue: ''
	}
})

const addOrUpdateRef = ref()
const addOrUpdateHandle = (id?: Number) => {
	addOrUpdateRef.value.dataForm.dictTypeId = props.dictTypeId
	addOrUpdateRef.value.init(id)
}

const { getDataList, sizeChangeHandle, currentChangeHandle, deleteHandle, deleteBatchHandle } = useCrud(state)
</script>
