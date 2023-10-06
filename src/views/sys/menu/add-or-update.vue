<template>
	<el-dialog v-model="visible" :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false" draggable>
		<el-form ref="dataFormRef" :model="dataForm" :rules="dataRules" label-width="120px" @keyup.enter="submitHandle()">
			<el-form-item prop="type" label="类型">
				<el-radio-group v-model="dataForm.type" :disabled="!!dataForm.id" @change="menuTypeChange()">
					<el-radio :label="0">菜单</el-radio>
					<el-radio :label="1">按钮</el-radio>
					<el-radio :label="2">接口</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item prop="name" label="名称">
				<el-input v-model="dataForm.name" placeholder="名称"></el-input>
			</el-form-item>
			<el-form-item prop="pid" label="上级菜单">
				<el-tree-select
					v-model="dataForm.pid"
					:data="menuList"
					value-key="id"
					check-strictly
					:render-after-expand="false"
					:props="{ label: 'name', children: 'children' }"
					style="width: 100%"
					clearable
				/>
			</el-form-item>
			<el-form-item v-if="dataForm.type === 0" prop="url" label="路由">
				<el-input v-model="dataForm.url" placeholder="路由"></el-input>
			</el-form-item>
			<el-form-item prop="sort" label="排序">
				<el-input-number v-model="dataForm.sort" controls-position="right" :min="0" label="排序"></el-input-number>
			</el-form-item>
			<el-form-item v-if="dataForm.type === 0" prop="openStyle" label="打开方式">
				<el-radio-group v-model="dataForm.openStyle">
					<el-radio :label="0">内部打开</el-radio>
					<el-radio :label="1">外部打开</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item prop="authority" label="授权标识">
				<el-input v-model="dataForm.authority" placeholder="多个用逗号分隔，如：sys:menu:save,sys:menu:update"></el-input>
			</el-form-item>
			<el-form-item v-if="dataForm.type === 0" prop="icon" label="图标" class="popover-list">
				<el-popover ref="iconListPopover" placement="top-start" trigger="click" width="40%" popper-class="mod__menu-icon-popover">
					<template #reference>
						<el-input v-model="dataForm.icon" :readonly="true" placeholder="图标"> </el-input>
					</template>
					<div class="mod__menu-icon-inner">
						<div class="mod__menu-icon-list">
							<el-button v-for="(item, index) in iconList" :key="index" :class="{ 'is-active': dataForm.icon === item }" @click="iconHandle(item)">
								<svg-icon size="30px" :icon="item"></svg-icon>
							</el-button>
						</div>
					</div>
				</el-popover>
			</el-form-item>
		</el-form>
		<template #footer>
			<el-button @click="visible = false">取消</el-button>
			<el-button type="primary" @click="submitHandle()">确定</el-button>
		</template>
	</el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { getIconList } from '@/utils/tool'
import { ElMessage } from 'element-plus/es'
import { useMenuApi, useMenuListApi, useMenuSubmitApi } from '@/api/sys/menu'

const emit = defineEmits(['refreshDataList'])

const visible = ref(false)
const menuList = ref([])
const iconList = ref<string[]>([])
const dataFormRef = ref()
const iconListPopover = ref()

const dataForm = reactive({
	id: '',
	type: 0,
	name: '',
	pid: '',
	parentName: '',
	url: '',
	authority: '',
	sort: 0,
	icon: '',
	openStyle: 0
})

const init = (id?: number) => {
	visible.value = true
	dataForm.id = ''

	// 重置表单数据
	if (dataFormRef.value) {
		dataFormRef.value.resetFields()
	}

	// id 存在则为修改
	if (id) {
		getMenu(id)
	}

	// 菜单列表
	getMenuList()

	// icon列表
	iconList.value = getIconList()
}

// 菜单类型改变
const menuTypeChange = () => {
	getMenuList()
	dataForm.pid = ''
}

// 获取菜单列表
const getMenuList = async () => {
	const res = await useMenuListApi(dataForm.type)
	menuList.value = res.data
}

// 获取信息
const getMenu = (id: number) => {
	useMenuApi(id).then(res => {
		Object.assign(dataForm, res.data)
	})
}

// 图标点击事件
const iconHandle = (icon: string) => {
	dataForm.icon = icon
	iconListPopover.value.hide()
}

const dataRules = ref({
	name: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	parentName: [{ required: true, message: '必填项不能为空', trigger: 'blur' }]
})

// 表单提交
const submitHandle = () => {
	dataFormRef.value.validate((valid: boolean) => {
		if (!valid) {
			return false
		}

		useMenuSubmitApi(dataForm).then(() => {
			ElMessage.success({
				message: '操作成功',
				duration: 500,
				onClose: () => {
					visible.value = false
					emit('refreshDataList')
				}
			})
		})
	})
}

defineExpose({
	init
})
</script>

<style lang="scss" scoped>
.mod__menu {
	::v-deep(.el-popover.el-popper) {
		overflow-x: hidden;
	}

	.popover-list {
		::v-deep(.el-input__inner) {
			cursor: pointer;
		}
		::v-deep(.el-input__suffix) {
			cursor: pointer;
		}
	}

	&-icon-inner {
		width: 100%;
		max-height: 350px;
		overflow-x: hidden;
		overflow-y: auto;
		// 滚动条的宽度
		&::-webkit-scrollbar {
			width: 8px;
			height: 8px;
			background: transparent;
		}
		// 滚动条的设置
		&::-webkit-scrollbar-thumb {
			background-color: #dddddd;
			background-clip: padding-box;
			min-height: 28px;
			border-radius: 4px;
		}
		&::-webkit-scrollbar-thumb:hover {
			background-color: #bbb;
		}
	}
	&-icon-list {
		width: 100% !important;
		padding: 0;
		margin: -8px 0 0 -8px;
		> .el-button {
			padding: 8px;
			margin: 18px 0 0 8px;
			height: 45px;
			width: 45px;
			> span {
				display: inline-block;
				vertical-align: middle;
				width: 18px;
				height: 18px;
				font-size: 18px;
			}
		}
	}
}
</style>
