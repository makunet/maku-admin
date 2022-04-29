<template>
	<el-dialog v-model="visible" :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false">
		<el-form ref="dataFormRef" :model="dataForm" :rules="dataRules" label-width="120px" @keyup.enter="submitHandle()">
			<el-form-item prop="name" label="名称">
				<el-input v-model="dataForm.name" placeholder="名称"></el-input>
			</el-form-item>
			<el-form-item prop="remark" label="备注">
				<el-input v-model="dataForm.remark" placeholder="备注"></el-input>
			</el-form-item>
			<el-row>
				<el-col :span="12">
					<el-form-item size="small" label="菜单权限">
						<el-tree ref="menuListTree" :data="menuList" :props="{ label: 'name', children: 'children' }" node-key="id" accordion show-checkbox>
						</el-tree>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item size="small" label="数据权限">
						<el-tree ref="orgListTree" :data="orgList" :props="{ label: 'name', children: 'children' }" node-key="id" accordion show-checkbox>
						</el-tree>
					</el-form-item>
				</el-col>
			</el-row>
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
import { useRoleApi, useRoleMenuApi, useRoleSubmitApi } from '@/api/role'
import { useOrgListApi } from '@/api/orgs'

const emit = defineEmits(['refreshDataList'])

const visible = ref(false)
const menuList = ref([])
const orgList = ref([])
const menuListTree = ref()
const orgListTree = ref()
const dataFormRef = ref()

const dataForm = reactive({
	id: '',
	name: '',
	menuIdList: [] as any[],
	orgIdList: [],
	remark: ''
})

const init = (id?: number) => {
	visible.value = true
	dataForm.id = ''

	// 重置表单数据
	if (dataFormRef.value) {
		dataFormRef.value.resetFields()
	}
	if (menuListTree.value) {
		menuListTree.value.setCheckedKeys([])
	}
	if (orgListTree.value) {
		orgListTree.value.setCheckedKeys([])
	}

	// id 存在则为修改
	if (id) {
		getRole(id)
	}

	// 菜单列表
	getMenuList()

	// 机构列表
	getOrgList()
}

// 获取菜单列表
const getMenuList = () => {
	return useRoleMenuApi().then(res => {
		menuList.value = res.data
	})
}

// 获取机构列表
const getOrgList = () => {
	return useOrgListApi().then(res => {
		orgList.value = res.data
	})
}

// 获取信息
const getRole = (id: number) => {
	useRoleApi(id).then(res => {
		Object.assign(dataForm, res.data)

		dataForm.menuIdList.forEach(item => menuListTree.value.setChecked(item, true))
		orgListTree.value.setCheckedKeys(dataForm.orgIdList)
	})
}

const dataRules = ref({
	name: [{ required: true, message: '必填项不能为空', trigger: 'blur' }]
})

// 表单提交
const submitHandle = () => {
	dataFormRef.value.validate((valid: boolean) => {
		if (!valid) {
			return false
		}
		dataForm.menuIdList = [...menuListTree.value.getHalfCheckedKeys(), ...menuListTree.value.getCheckedKeys()]
		dataForm.orgIdList = orgListTree.value.getCheckedKeys()

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
