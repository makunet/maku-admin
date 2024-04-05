<template>
	<el-dialog v-model="visible" :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false">
		<el-form ref="dataFormRef" :model="dataForm" :rules="dataRules" label-width="100px" @keyup.enter="submitHandle()">
			<el-form-item label="昵称" prop="nickName">
				<el-input v-model="dataForm.nickName" placeholder="昵称"></el-input>
			</el-form-item>
			<el-form-item label="手机号" prop="mobile">
				<el-input v-model="dataForm.mobile" placeholder="手机号"></el-input>
			</el-form-item>
			<el-form-item label="头像" prop="avatar">
				<el-input v-model="dataForm.avatar" placeholder="头像"></el-input>
			</el-form-item>
			<el-form-item label="出生日期" prop="birthday">
				<el-input v-model="dataForm.birthday" placeholder="出生日期"></el-input>
			</el-form-item>
			<el-form-item label="性别" prop="gender">
				<el-input v-model="dataForm.gender" placeholder="性别"></el-input>
			</el-form-item>
			<el-form-item label="备注" prop="remark">
				<el-input v-model="dataForm.remark" placeholder="备注"></el-input>
			</el-form-item>
			<el-form-item label="状态" prop="status">
				<el-input v-model="dataForm.status" placeholder="状态"></el-input>
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
import { useUserApi, useUserSubmitApi } from '@/api/member/user'

const emit = defineEmits(['refreshDataList'])

const visible = ref(false)
const dataFormRef = ref()

const dataForm = reactive({
	id: '',
	nickName: '',
	mobile: '',
	avatar: '',
	birthday: '',
	gender: '',
	remark: '',
	status: ''
})

const init = (id?: number) => {
	visible.value = true
	dataForm.id = ''

	// 重置表单数据
	if (dataFormRef.value) {
		dataFormRef.value.resetFields()
	}

	if (id) {
		getUser(id)
	}
}

const getUser = (id: number) => {
	useUserApi(id).then(res => {
		Object.assign(dataForm, res.data)
	})
}

const dataRules = ref({})

// 表单提交
const submitHandle = () => {
	dataFormRef.value.validate((valid: boolean) => {
		if (!valid) {
			return false
		}

		useUserSubmitApi(dataForm).then(() => {
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
