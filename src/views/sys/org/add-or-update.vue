<template>
	<el-dialog v-model="visible" :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false" draggable>
		<el-form ref="dataFormRef" :model="dataForm" :rules="dataRules" label-width="120px" @keyup.enter="submitHandle()">
			<el-form-item prop="name" label="名称">
				<el-input v-model="dataForm.name" placeholder="名称"></el-input>
			</el-form-item>
			<el-form-item prop="pid" label="上级机构">
				<ma-org-select v-model="dataForm.pid" placeholder="请选择"></ma-org-select>
			</el-form-item>
			<el-form-item prop="leaderId" label="负责人">
				<ma-user-input v-model="dataForm.leaderId" placeholder="机构负责人"></ma-user-input>
			</el-form-item>
			<el-form-item prop="sort" label="排序">
				<el-input-number v-model="dataForm.sort" controls-position="right" :min="0" aria-label="排序"></el-input-number>
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
import { useOrgSubmitApi } from '@/api/sys/orgs'
import MaUserInput from '@/components/ma-user/ma-user-input/index.vue'
import MaOrgSelect from '@/components/ma-org/ma-org-select/index.vue'

const emit = defineEmits(['refreshDataList'])

const visible = ref(false)
const dataFormRef = ref()

const dataForm = reactive({
	id: '',
	name: '',
	pid: '',
	parentName: '',
	leaderId: '',
	sort: 0
})

const init = (isUpdate: boolean, row: any) => {
	visible.value = true

	// 重置表单数据
	if (dataFormRef.value) {
		dataFormRef.value.resetFields()
	}

	// 更新表单数据
	if (row) {
		getOrg(isUpdate, row)
	} else {
		dataForm.id = ''
		dataForm.pid = ''
		dataForm.parentName = ''
		dataForm.name = ''
		dataForm.sort = 0
		dataForm.leaderId = ''
	}
}

// 获取信息
const getOrg = (isUpdate: boolean, row: any) => {
	Object.assign(dataForm, row)
	if (!isUpdate) {
		// 是新增，重置表单数据
		dataForm.pid = dataForm.id
		dataForm.parentName = dataForm.name
		dataForm.id = ''
		dataForm.name = ''
		dataForm.sort = 0
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

		useOrgSubmitApi(dataForm).then(() => {
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
