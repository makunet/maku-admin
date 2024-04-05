<template>
	<el-card class="layout-query">
		<el-form ref="queryRef" :inline="true" :model="state.queryForm" @keyup.enter="getDataList()">
			<el-form-item prop="jobName">
				<el-input v-model="state.queryForm.jobName" placeholder="任务名称"></el-input>
			</el-form-item>
			<el-form-item prop="jobGroup">
				<ma-dict-select v-model="state.queryForm.jobGroup" dict-type="schedule_group" clearable placeholder="任务组名"></ma-dict-select>
			</el-form-item>
			<el-form-item prop="status">
				<ma-dict-select v-model="state.queryForm.status" dict-type="schedule_status" clearable placeholder="任务状态"></ma-dict-select>
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
				<el-button v-auth="'schedule:save'" icon="Plus" type="primary" @click="addOrUpdateHandle()">新增</el-button>
			</el-space>
			<el-space>
				<el-button v-auth="'schedule:log'" icon="Document" plain @click="logHandle()">任务日志</el-button>
			</el-space>
			<el-space>
				<el-button v-auth="'schedule:delete'" icon="Delete" plain type="danger" @click="deleteBatchHandle()">批量删除</el-button>
			</el-space>
		</el-space>

		<el-table v-loading="state.dataListLoading" :data="state.dataList" border class="layout-table" @selection-change="selectionChangeHandle">
			<el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
			<el-table-column prop="id" label="id" header-align="center" align="center"></el-table-column>
			<el-table-column prop="jobName" label="任务名称" header-align="center" align="center"></el-table-column>
			<ma-dict-column prop="jobGroup" label="任务组名" dict-type="schedule_group"></ma-dict-column>
			<el-table-column prop="beanName" label="执行方法" dict-type="schedule_group">
				<template #default="scope"> {{ scope.row.beanName }}.{{ scope.row.method }}() </template>
			</el-table-column>
			<el-table-column prop="cronExpression" label="Cron表达式" header-align="center" align="center"></el-table-column>
			<ma-dict-column prop="status" label="状态" dict-type="schedule_status"></ma-dict-column>
			<el-table-column label="操作" fixed="right" header-align="center" align="center" width="200">
				<template #default="scope">
					<el-button v-auth="'schedule:update'" type="primary" link @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
					<el-button v-if="scope.row.status === 0" v-auth="'schedule:update'" type="primary" link @click="statusHandle(scope.row, 1)">恢复</el-button>
					<el-button v-if="scope.row.status === 1" v-auth="'schedule:update'" type="primary" link @click="statusHandle(scope.row, 0)">暂停</el-button>
					<el-button v-auth="'schedule:run'" type="primary" link @click="runHandle(scope.row)">执行</el-button>
					<el-button v-auth="'schedule:delete'" type="primary" link @click="deleteBatchHandle(scope.row.id)">删除</el-button>
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

		<!-- 弹窗, 新增 / 修改 -->
		<add-or-update ref="addOrUpdateRef" @refresh-data-list="getDataList"></add-or-update>

		<!-- 日志 -->
		<el-drawer v-if="logVisible" v-model="logVisible" title="任务日志" :size="1200" :close-on-press-escape="false">
			<log />
		</el-drawer>
	</el-card>
</template>

<script setup lang="ts" name="QuartzScheduleIndex">
import { useCrud } from '@/hooks'
import { reactive, ref } from 'vue'
import AddOrUpdate from './add-or-update.vue'
import Log from '../log/index.vue'
import { IHooksOptions } from '@/hooks/interface'
import { useScheduleStatusApi, useScheduleRunApi } from '@/api/quartz/schedule'
import { ElMessage, ElMessageBox } from 'element-plus/es'

const state: IHooksOptions = reactive({
	dataListUrl: '/schedule/page',
	deleteUrl: '/schedule',
	queryForm: {
		jobName: '',
		jobGroup: '',
		status: ''
	}
})

const runHandle = (row: any) => {
	ElMessageBox.confirm('确定进行立即执行操作?', '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning'
	})
		.then(() => {
			useScheduleRunApi(row).then(() => {
				ElMessage.success({
					message: '操作成功',
					duration: 500
				})
			})
		})
		.catch(() => {})
}

const statusHandle = (row: any, status: any) => {
	const opt = status === 0 ? '暂停' : '恢复'
	ElMessageBox.confirm(`确定进行${opt}操作?`, '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning'
	})
		.then(() => {
			row.status = status
			useScheduleStatusApi(row).then(() => {
				ElMessage.success({
					message: '操作成功',
					duration: 500
				})
			})
		})
		.catch(() => {})
}

const logVisible = ref(false)
const logHandle = () => {
	logVisible.value = true
}

const queryRef = ref()
const addOrUpdateRef = ref()
const addOrUpdateHandle = (id?: number) => {
	addOrUpdateRef.value.init(id)
}

const { getDataList, selectionChangeHandle, sizeChangeHandle, currentChangeHandle, deleteBatchHandle, reset } = useCrud(state)
</script>
