<template>
	<el-dialog v-model="visible" :title="!update ? '新增' : '修改'" :close-on-click-modal="false" draggable>
		<el-form ref="dataFormRef" :model="dataForm" :rules="dataRules" label-width="120px" @keyup.enter="submitHandle()">
			<el-form-item prop="type" label="类型">
				<el-radio-group v-model="dataForm.type" :disabled="update" @change="menuTypeChange(dataForm.pid)">
					<el-radio :value="0">菜单</el-radio>
					<el-radio :value="1">按钮</el-radio>
					<el-radio :value="2">接口</el-radio>
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
				<el-input-number v-model="dataForm.sort" controls-position="right" :min="0" aria-label="排序"></el-input-number>
			</el-form-item>
			<el-form-item v-if="dataForm.type === 0" prop="openStyle" label="打开方式">
				<el-radio-group v-model="dataForm.openStyle">
					<el-radio :value="0">内部打开</el-radio>
					<el-radio :value="1">外部打开</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item prop="authority" label="授权标识">
				<el-input v-model="dataForm.authority" placeholder="多个用逗号分隔，如：sys:menu:save,sys:menu:update"></el-input>
			</el-form-item>
			<el-form-item v-if="dataForm.type === 0" prop="icon" label="图标" class="popover-list">
				<SelectIcon v-model="dataForm.icon" />
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
import { ElMessage } from 'element-plus/es'
import SelectIcon from '@/components/ma-icon-select/index.vue'
import { useMenuListApi, useMenuSubmitApi } from '@/api/sys/menu'

const emit = defineEmits(['refreshDataList'])

const visible = ref(false)
const menuList = ref([])
const dataFormRef = ref()

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

const update = ref(false)

const init = (isUpdate: boolean, row: any) => {
	visible.value = true
	update.value = isUpdate

	// 重置表单数据
	if (dataFormRef.value) {
		dataFormRef.value.resetFields()
	}

	// 存在则为修改
	if (row) {
		getMenu(isUpdate, row)
	} else {
		dataForm.pid = ''
		dataForm.parentName = ''
	}

	// 菜单列表
	getMenuList()
}

// 菜单类型改变
const menuTypeChange = (pid: any) => {
	getMenuList()
	dataForm.pid = pid
}

// 获取菜单列表
const getMenuList = async () => {
	const res = await useMenuListApi(dataForm.type)
	menuList.value = res.data
}

// 获取信息
const getMenu = (isUpdate: boolean, row: any) => {
	Object.assign(dataForm, row)
	if (!isUpdate) {
		// 是新增，重置表单数据
		dataForm.pid = row.id
		dataForm.id = ''
		dataForm.type = 0
		dataForm.name = ''
		dataForm.parentName = ''
		dataForm.url = ''
		dataForm.authority = ''
		dataForm.sort = 0
		dataForm.icon = ''
		dataForm.openStyle = 0
	}
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
}
</style>
