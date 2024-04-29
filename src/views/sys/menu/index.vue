<template>
	<el-card class="mod__menu">
		<el-space>
			<el-space>
				<el-button v-auth="'sys:menu:save'" icon="Plus" type="primary" @click="addOrUpdateHandle(false, null)">新增</el-button>
			</el-space>
			<el-space>
				<el-button plain @click="toggleExpandAll()">
					<template v-if="!isExpandAll">
						全部展开&nbsp;<el-icon><ArrowDown /></el-icon>
					</template>
					<template v-else>
						全部收起&nbsp;<el-icon><ArrowUp /></el-icon>
					</template>
				</el-button>
			</el-space>
		</el-space>

		<el-table
			v-if="refreshTable"
			v-loading="state.dataListLoading"
			:default-expand-all="isExpandAll"
			:data="state.dataList"
			show-overflow-tooltip
			row-key="id"
			border
			class="layout-table"
		>
			<el-table-column prop="name" label="名称" header-align="center" min-width="150"></el-table-column>
			<el-table-column prop="icon" label="图标" header-align="center" align="center">
				<template #default="scope">
					<ma-icon :icon="scope.row.icon"></ma-icon>
				</template>
			</el-table-column>
			<el-table-column prop="type" label="类型" header-align="center" align="center">
				<template #default="scope">
					<el-tag v-if="scope.row.type === 0" type="info">菜单</el-tag>
					<el-tag v-if="scope.row.type === 1" type="success">按钮</el-tag>
					<el-tag v-if="scope.row.type === 2" type="warning">接口</el-tag>
				</template>
			</el-table-column>
			<el-table-column prop="openStyle" label="打开方式" header-align="center" align="center">
				<template #default="scope">
					<span v-if="scope.row.type !== 0"></span>
					<el-tag v-else-if="scope.row.openStyle === 0">内部打开</el-tag>
					<el-tag v-else type="info">外部打开</el-tag>
				</template>
			</el-table-column>
			<el-table-column prop="sort" label="排序" header-align="center" align="center"></el-table-column>
			<el-table-column prop="url" label="路由" header-align="center" align="center" width="150"></el-table-column>
			<el-table-column prop="authority" label="授权标识" header-align="center" align="center" width="150"></el-table-column>
			<el-table-column label="操作" fixed="right" header-align="center" align="center" width="160">
				<template #default="scope">
					<el-button v-if="scope.row.type === 0" v-auth="'sys:menu:save'" type="primary" link @click="addOrUpdateHandle(false, scope.row)"
						>新增</el-button
					>
					<el-button v-auth="'sys:menu:update'" type="primary" link @click="addOrUpdateHandle(true, scope.row)">修改</el-button>
					<el-button v-auth="'sys:menu:delete'" type="primary" link @click="deleteHandle(scope.row.id)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<add-or-update ref="addOrUpdateRef" @refresh-data-list="getDataList"></add-or-update>
	</el-card>
</template>

<script setup lang="ts">
import { useCrud } from '@/hooks'
import { reactive, ref, nextTick } from 'vue'
import AddOrUpdate from './add-or-update.vue'
import { IHooksOptions } from '@/hooks/interface'
import { ArrowDown, ArrowUp } from '@element-plus/icons-vue'

const state: IHooksOptions = reactive({
	dataListUrl: '/sys/menu/list',
	deleteUrl: '/sys/menu',
	isPage: false
})

const addOrUpdateRef = ref()
const addOrUpdateHandle = (isUpdate: Boolean, row: any) => {
	addOrUpdateRef.value.init(isUpdate, row)
}

const { getDataList, deleteHandle } = useCrud(state)

// 是否展开，默认全部折叠
const isExpandAll = ref(false)
// 是否重新渲染表格状态
const refreshTable = ref(true)

// 切换 展开和折叠
const toggleExpandAll = () => {
	refreshTable.value = false
	isExpandAll.value = !isExpandAll.value
	nextTick(() => {
		refreshTable.value = true
	})
}
</script>
