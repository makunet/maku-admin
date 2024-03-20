<template>
	<el-card>
		<el-space>
			<el-space>
				<el-button v-auth="'sys:org:save'" type="primary" icon="Plus" @click="addOrUpdateHandle(false, null)">新增</el-button>
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
			row-key="id"
			border
			class="layout-table"
		>
			<el-table-column prop="name" label="名称" header-align="center"></el-table-column>
			<el-table-column prop="parentName" label="上级" header-align="center" align="center"></el-table-column>
			<el-table-column prop="sort" label="排序" header-align="center" align="center"></el-table-column>
			<el-table-column label="操作" fixed="right" header-align="center" align="center" width="160">
				<template #default="scope">
					<el-button v-auth="'sys:org:save'" type="primary" link @click="addOrUpdateHandle(false, scope.row)">新增</el-button>
					<el-button v-auth="'sys:org:update'" type="primary" link @click="addOrUpdateHandle(true, scope.row)">修改</el-button>
					<el-button v-auth="'sys:org:delete'" type="primary" link @click="deleteHandle(scope.row.id)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<add-or-update ref="addOrUpdateRef" @refresh-data-list="getDataList"></add-or-update>
	</el-card>
</template>

<script setup lang="ts">
import { useCrud } from '@/hooks'
import { nextTick, reactive, ref } from 'vue'
import AddOrUpdate from './add-or-update.vue'
import { IHooksOptions } from '@/hooks/interface'
import { ArrowDown, ArrowUp } from '@element-plus/icons-vue'

const state: IHooksOptions = reactive({
	dataListUrl: '/sys/org/list',
	deleteUrl: '/sys/org',
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
