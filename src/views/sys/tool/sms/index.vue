<template>
	<el-card class="layout-query">
		<el-form ref="queryRef" :inline="true" :model="state.queryForm" @keyup.enter="getDataList()">
			<el-form-item prop="platform">
				<ma-dict-select v-model="state.queryForm.platform" dict-type="sms_platform" clearable placeholder="平台类型"></ma-dict-select>
			</el-form-item>
			<el-form-item prop="mobile">
				<el-input v-model="state.queryForm.mobile" placeholder="手机号"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button icon="Search" type="primary" @click="getDataList()">查询</el-button>
			</el-form-item>
			<el-form-item>
				<el-button icon="RefreshRight" @click="reset(queryRef)">重置</el-button>
			</el-form-item>
		</el-form>
	</el-card>

	<el-card>
		<el-space>
			<el-space>
				<el-button icon="Plus" type="primary" @click="sendHandle()">发送短信</el-button>
			</el-space>
			<el-space>
				<el-button icon="Delete" plain type="danger" @click="deleteBatchHandle()">批量删除</el-button>
			</el-space>
		</el-space>
		<el-table v-loading="state.dataListLoading" :data="state.dataList" border class="layout-table" @selection-change="selectionChangeHandle">
			<el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
			<el-table-column prop="platformId" label="平台ID" header-align="center" align="center"></el-table-column>
			<ma-dict-column prop="platform" label="平台类型" dict-type="sms_platform"></ma-dict-column>
			<el-table-column prop="mobile" label="手机号" header-align="center" align="center"></el-table-column>
			<ma-dict-column prop="status" label="状态" dict-type="success_fail"></ma-dict-column>
			<el-table-column prop="createTime" label="创建时间" header-align="center" align="center"></el-table-column>
			<el-table-column label="操作" fixed="right" header-align="center" align="center" width="150">
				<template #default="scope">
					<el-button type="primary" link @click="detailHandle(scope.row)">详情</el-button>
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

		<!-- 详情 -->
		<detail ref="detailRef"></detail>
		<!-- 发送短信 -->
		<send v-if="sendVisible" v-model="sendVisible"></send>
	</el-card>
</template>

<script setup lang="ts">
import { useCrud } from '@/hooks'
import { reactive, ref } from 'vue'
import Detail from './detail.vue'
import Send from './send.vue'
import { IHooksOptions } from '@/hooks/interface'

const state: IHooksOptions = reactive({
	dataListUrl: '/sys/sms/log/page',
	deleteUrl: '/sys/sms/log',
	queryForm: {
		mobile: '',
		platform: ''
	}
})

const queryRef = ref()
const detailRef = ref()
const detailHandle = (row: any) => {
	detailRef.value.init(row)
}

const sendVisible = ref()
const sendHandle = () => {
	sendVisible.value = true
}

const { getDataList, selectionChangeHandle, sizeChangeHandle, currentChangeHandle, deleteBatchHandle, reset } = useCrud(state)
</script>
