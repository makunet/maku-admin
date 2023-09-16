<template>
	<el-dialog v-model="visible" :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false" draggable>
		<el-form ref="dataFormRef" :model="dataForm" :rules="dataRules" label-width="120px" @keyup.enter="submitHandle()">
			<el-form-item prop="name" label="名称">
				<el-input v-model="dataForm.name" placeholder="名称"></el-input>
			</el-form-item>
			<el-form-item prop="roleCode" label="编码">
				<el-input v-model="dataForm.roleCode" placeholder="编码"></el-input>
			</el-form-item>
			<el-form-item prop="remark" label="备注">
				<el-input v-model="dataForm.remark" placeholder="备注"></el-input>
			</el-form-item>
			<el-form-item label="菜单权限">
				<el-tree ref="menuListTree" :data="menuList" :props="{ label: 'name', children: 'children' }" node-key="id" accordion show-checkbox></el-tree>
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
import { useRoleApi, useRoleMenuApi, useRoleSubmitApi } from '@/api/sys/role'

const emit = defineEmits(['refreshDataList'])

const visible = ref(false)
const menuList = ref([])
const menuListTree = ref()
const dataFormRef = ref()

const dataForm = reactive({
	id: '',
	name: '',
	roleCode: '',
	menuIdList: [] as any[],
	orgIdList: [],
	remark: ''
})

const init = async (id?: number) => {
	visible.value = true
	dataForm.id = ''

	// 重置表单数据
	if (dataFormRef.value) {
		dataFormRef.value.resetFields()
	}
	if (menuListTree.value) {
		menuListTree.value.setCheckedKeys([])
	}

	// 菜单列表
	await getMenuList()

	// id 存在则为修改
	if (id) {
		getRole(id)
	}
}

// 获取菜单列表
const getMenuList = async () => {
	const res = await useRoleMenuApi()
	menuList.value = res.data
}

// 获取信息
const getRole = (id: number) => {
	useRoleApi(id).then(res => {
		Object.assign(dataForm, res.data)

		dataForm.menuIdList.forEach(item => menuListTree.value.setChecked(item, true))
	})
}

const dataRules = ref({
	name: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	roleCode: [{ required: true, message: '必填项不能为空', trigger: 'blur' }]
})

// 表单提交
const submitHandle = () => {
	dataFormRef.value.validate((valid: boolean) => {
		if (!valid) {
			return false
		}
		dataForm.menuIdList = [...menuListTree.value.getHalfCheckedKeys(), ...menuListTree.value.getCheckedKeys()]

		useRoleSubmitApi(dataForm).then(() => {
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
