<template>
	<el-dialog v-model="visible" title="数据权限" :close-on-click-modal="false" :width="600" draggable>
		<el-form ref="dataFormRef" :model="dataForm" label-width="120px" @keyup.enter="submitHandle()">
			<el-form-item prop="name" label="名称">
				<el-input v-model="dataForm.name" disabled></el-input>
			</el-form-item>
			<el-form-item prop="dataScope" label="数据范围">
				<ma-dict-select v-model="dataForm.dataScope" dict-type="role_data_scope" placeholder="数据范围" style="width: 100%"></ma-dict-select>
			</el-form-item>
			<el-form-item v-show="dataForm.dataScope == 4" label="数据权限">
				<el-tree ref="orgListTree" :data="orgList" :props="{ label: 'name', children: 'children' }" node-key="id" accordion show-checkbox> </el-tree>
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
import { useRoleApi, useRoleDataScopeSubmitApi } from '@/api/sys/role'
import { useOrgListApi } from '@/api/sys/orgs'

const visible = ref(false)
const orgList = ref([])
const orgListTree = ref()
const dataFormRef = ref()

const dataForm = reactive({
	id: '',
	name: '',
	orgIdList: [],
	dataScope: 0,
	remark: ''
})

const init = (id?: number) => {
	visible.value = true
	dataForm.id = ''

	// 重置表单数据
	if (dataFormRef.value) {
		dataFormRef.value.resetFields()
	}
	if (orgListTree.value) {
		orgListTree.value.setCheckedKeys([])
	}

	// id 存在则为修改
	if (id) {
		getRole(id)
	}

	// 机构列表
	getOrgList()
}

// 获取机构列表
const getOrgList = async () => {
	const res = await useOrgListApi()
	orgList.value = res.data
}

// 获取信息
const getRole = (id: number) => {
	useRoleApi(id).then(res => {
		Object.assign(dataForm, res.data)

		orgListTree.value.setCheckedKeys(dataForm.orgIdList)
	})
}

// 表单提交
const submitHandle = () => {
	dataForm.orgIdList = orgListTree.value.getCheckedKeys()

	useRoleDataScopeSubmitApi(dataForm).then(() => {
		ElMessage.success({
			message: '操作成功',
			duration: 500,
			onClose: () => {
				visible.value = false
			}
		})
	})
}

defineExpose({
	init
})
</script>
