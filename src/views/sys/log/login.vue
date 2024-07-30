<template>
	<el-card class="layout-query">
		<el-form ref="queryRef" :inline="true" :model="state.queryForm" @keyup.enter="getDataList()">
			<el-form-item prop="username">
				<el-input v-model="state.queryForm.username" placeholder="用户名"></el-input>
			</el-form-item>
			<el-form-item prop="address">
				<el-input v-model="state.queryForm.address" placeholder="登录地点"></el-input>
			</el-form-item>
			<el-form-item prop="status">
				<ma-dict-select v-model="state.queryForm.status" dict-type="success_fail" placeholder="登录状态" clearable></ma-dict-select>
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
			<el-button icon="Download" @click="downloadHandle('/sys/log/login/export')">导出</el-button>
		</el-space>
		<el-table
			v-loading="state.dataListLoading"
			show-overflow-tooltip
			:data="state.dataList"
			border
			class="layout-table"
			@selection-change="selectionChangeHandle"
		>
			<el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
			<el-table-column prop="id" label="序号" header-align="center" align="center"></el-table-column>
			<el-table-column prop="username" label="用户名" header-align="center" align="center"></el-table-column>
			<el-table-column prop="ip" label="登录IP" header-align="center" align="center"></el-table-column>
			<el-table-column prop="address" label="登录地点" header-align="center" align="center"></el-table-column>
			<el-table-column prop="userAgent" label="User Agent" header-align="center" align="center"></el-table-column>
			<ma-dict-column prop="status" label="登录状态" dict-type="success_fail"></ma-dict-column>
			<ma-dict-column prop="operation" label="操作信息" dict-type="login_operation"></ma-dict-column>
			<el-table-column prop="createTime" label="登录时间" header-align="center" align="center" width="165"></el-table-column>
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
	</el-card>
</template>

<script setup lang="ts" name="SysLogLogin">
import { useCrud } from '@/hooks'
import { reactive, ref } from 'vue'
import { IHooksOptions } from '@/hooks/interface'

const state: IHooksOptions = reactive({
	dataListUrl: '/sys/log/login/page',
	queryForm: {
		username: '',
		address: '',
		status: ''
	}
})

const queryRef = ref()

const { getDataList, selectionChangeHandle, sizeChangeHandle, currentChangeHandle, downloadHandle, reset } = useCrud(state)
</script>
