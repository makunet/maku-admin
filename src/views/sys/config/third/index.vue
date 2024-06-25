<template>
	<div style="margin-top: 10px">
		<el-space>
			<el-space>
				<el-button type="primary" icon="Plus" @click="addOrUpdateHandle()">新增</el-button>
			</el-space>
			<el-space>
				<el-button type="danger" icon="Delete" plain @click="deleteBatchHandle()">批量删除</el-button>
			</el-space>
		</el-space>
		<el-table
			v-loading="state.dataListLoading"
			:data="state.dataList"
			show-overflow-tooltip
			border
			class="layout-table"
			@selection-change="selectionChangeHandle"
		>
			<el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
			<el-table-column prop="openType" label="平台类型" header-align="center" align="center" width="180">
				<template #default="scope">
					<el-text v-if="scope.row.openType === 'wechat_work'"><ma-icon icon="icon-workweixin" size="16" /> 企业微信</el-text>
					<el-text v-else-if="scope.row.openType === 'dingtalk'"><ma-icon icon="icon-dingding" size="16" /> 钉钉</el-text>
					<el-text v-else-if="scope.row.openType === 'feishu'"><ma-icon icon="icon-feishu" size="16" /> 飞书</el-text>
					<el-text v-else-if="scope.row.openType === 'wechat_open'"><ma-icon icon="icon-weixin" size="16" /> 微信</el-text>
				</template>
			</el-table-column>
			<el-table-column prop="clientId" label="ClientID" header-align="center" align="center"></el-table-column>
			<el-table-column prop="clientSecret" label="ClientSecret" header-align="center" align="center"></el-table-column>
			<el-table-column prop="redirectUri" label="RedirectUri" header-align="center" align="center"></el-table-column>
			<el-table-column label="操作" fixed="right" header-align="center" align="center" width="120">
				<template #default="scope">
					<el-button type="primary" link @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
					<el-button type="primary" link @click="deleteBatchHandle(scope.row.id)">删除</el-button>
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
		<add-or-update ref="addOrUpdateRef" @refreshDataList="getDataList"></add-or-update>
	</div>
</template>

<script setup lang="ts">
import { useCrud } from '@/hooks'
import { reactive, ref } from 'vue'
import { IHooksOptions } from '@/hooks/interface'
import AddOrUpdate from './add-or-update.vue'

const state: IHooksOptions = reactive({
	dataListUrl: '/sys/third/config/page',
	deleteUrl: '/sys/third/config'
})

const addOrUpdateRef = ref()
const addOrUpdateHandle = (id?: number) => {
	addOrUpdateRef.value.init(id)
}

const { getDataList, selectionChangeHandle, sizeChangeHandle, currentChangeHandle, deleteBatchHandle } = useCrud(state)
</script>
