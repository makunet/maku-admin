<template>
	<el-card class="ma-left-tree">
		<template #header>
			<div class="card-header">
				<span>{{ title }}</span>
				<el-dropdown @command="handleCommand">
					<span style="cursor: pointer">
						<ma-icon icon="icon-menu" size="18px"></ma-icon>
					</span>
					<template #dropdown>
						<el-dropdown-menu>
							<el-dropdown-item command="refresh">刷新数据</el-dropdown-item>
							<el-dropdown-item command="expand">展开全部</el-dropdown-item>
							<el-dropdown-item command="collapse">折叠全部</el-dropdown-item>
							<el-dropdown-item v-if="manage" command="manage">数据管理</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
			</div>
		</template>
		<div style="margin: 10px">
			<el-input v-model="keyword" clearable placeholder="请输入关键字" />
		</div>
		<el-tree
			ref="treeRef"
			:key="treeKey"
			:data="dataList"
			:expand-on-click-node="false"
			:default-expand-all="isExpandAll"
			:filter-node-method="filterNode"
			:props="props"
			highlight-current
			node-key="id"
			:current-node-key="currentNodeKey"
			@node-click="handleNodeClick"
		/>
	</el-card>
</template>

<script lang="ts" setup name="MaDataTreeLeft">
import { ElTree } from 'element-plus'
import { onMounted, PropType, ref, watch } from 'vue'
import emit, { MittEvent } from '@/utils/emits'
import { useDataApi } from '@/api/common'
import { generateUUID, treeDataTranslate } from '@/utils/tool'
const dataList = ref()
const keyword = ref()
const treeRef = ref()
const currentNodeKey = ref()

interface Prop {
	label: string
	children: string
}
const prop = defineProps({
	url: {
		type: String,
		default: ''
	},
	props: {
		type: Object as PropType<Prop>,
		required: false,
		default: () => ({
			label: 'name',
			children: 'children'
		})
	},
	manage: {
		type: Boolean,
		required: false,
		default: () => false
	},
	title: {
		type: String,
		required: true
	},
	treeData: {
		type: Boolean,
		required: false,
		default: () => false
	}
})

// 是否展开全部
const isExpandAll = ref(false)
const treeKey = ref(generateUUID())
const handleCommand = (command: string) => {
	switch (command) {
		case 'refresh':
			getDataList()
			break
		case 'expand':
			treeKey.value = generateUUID()
			isExpandAll.value = true
			break
		case 'collapse':
			treeKey.value = generateUUID()
			isExpandAll.value = false
			break
		case 'manage':
			emits('manage')
			break
	}
}

onMounted(async () => {
	await getDataList()
})

watch(keyword, val => {
	treeRef.value.filter(val)
})

const getDataList = async () => {
	const data = await useDataApi(prop.url)
	if (prop.treeData) {
		dataList.value = data
	} else {
		dataList.value = treeDataTranslate(data)
	}
}

const filterNode = (name: string, data: any) => {
	if (!name) {
		return true
	}
	return data.name.includes(name)
}

emit.on(MittEvent.LeftTree, () => {
	getDataList()
})

const emits = defineEmits(['click', 'manage'])
// 处理点击事件
const handleNodeClick = (row: any) => {
	if (currentNodeKey.value === row.id) {
		currentNodeKey.value = null
	} else {
		currentNodeKey.value = row.id
	}
	const idList = getAllChildNodeIds(currentNodeKey.value, dataList.value)
	emits('click', idList)
}

// 获取所有子节点 ID 的函数
function getAllChildNodeIds(nodeId: any, nodes: any) {
	if (!nodeId) {
		return []
	}
	const root = findNodeById(nodeId, nodes)
	if (!root) {
		console.warn(`Node with ID ${nodeId} not found.`)
		return []
	}
	const ids: any[] = getChildrenIdsRecursively(root)
	ids.push(root.id)
	return ids
}

// 查找指定 ID 的节点
function findNodeById(id: any, nodes: any): any {
	for (const node of nodes) {
		if (node.id === id) {
			return node
		}
		if (node.children && node.children.length > 0) {
			const result = findNodeById(id, node.children)
			if (result) {
				return result
			}
		}
	}
	return null
}

// 递归获取所有子节点 ID
function getChildrenIdsRecursively(node: any): any[] {
	const ids = []
	if (node.children && node.children.length > 0) {
		for (const child of node.children) {
			ids.push(child.id)
			ids.push(...getChildrenIdsRecursively(child))
		}
	}
	return ids
}
</script>

<style lang="scss" scoped>
.ma-left-tree {
	min-height: calc(100vh - 112px - var(--theme-header-height));
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	:deep(.el-tree-node__content) {
		padding: 20px 0;
	}
	:deep(.el-card__header) {
		padding: 15px 12px;
		font-weight: bold;
		font-size: 16px;
	}
	:deep(.el-card__body) {
		padding: 0;
	}
	.card-header {
		display: flex;
		justify-content: space-between;
	}
}
</style>
