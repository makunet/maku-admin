<template>
	<el-card>
		<el-form :inline="true" :model="state.queryForm" @keyup.enter="getDataList()">
			<el-form-item>
				<el-input v-model="state.queryForm.username" placeholder="用户名"></el-input>
			</el-form-item>
			<el-form-item>
				<el-input v-model="state.queryForm.address" placeholder="登录地点"></el-input>
			</el-form-item>
			<el-form-item>
				<fast-select v-model="state.queryForm.status" dict-type="success_fail" placeholder="登录状态" clearable></fast-select>
			</el-form-item>
			<el-form-item>
				<el-button @click="getDataList()">查询</el-button>
			</el-form-item>
		</el-form>
		<el-table v-loading="state.dataListLoading" :data="state.dataList" border style="width: 100%" @selection-change="selectionChangeHandle">
			<el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
			<el-table-column prop="id" label="序号" header-align="center" align="center"></el-table-column>
			<el-table-column prop="username" label="用户名" header-align="center" align="center"></el-table-column>
			<el-table-column prop="ip" label="登录IP" header-align="center" align="center"></el-table-column>
			<el-table-column prop="address" label="登录地点" header-align="center" align="center"></el-table-column>
			<el-table-column prop="userAgent" label="User Agent" show-overflow-tooltip header-align="center" align="center"></el-table-column>
			<fast-table-column prop="status" label="登录状态" dict-type="success_fail"></fast-table-column>
			<fast-table-column prop="operation" label="操作信息" dict-type="login_operation"></fast-table-column>
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
import { reactive } from 'vue'
import { IHooksOptions } from '@/hooks/interface'

const state: IHooksOptions = reactive({
	dataListUrl: '/sys/log/login/page',
	queryForm: {
		username: '',
		address: '',
		status: ''
	}
})

const { getDataList, selectionChangeHandle, sizeChangeHandle, currentChangeHandle } = useCrud(state)
</script>
