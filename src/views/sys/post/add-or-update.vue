<template>
	<el-dialog v-model="visible" :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false" draggable>
		<el-form ref="dataFormRef" :model="dataForm" :rules="dataRules" label-width="80px" @keyup.enter="submitHandle()">
			<el-form-item label="岗位编码" prop="postCode">
				<el-input v-model="dataForm.postCode"></el-input>
			</el-form-item>
			<el-form-item label="岗位名称" prop="postName">
				<el-input v-model="dataForm.postName"></el-input>
			</el-form-item>
			<el-form-item label="排序" prop="sort">
				<el-input-number v-model="dataForm.sort" :min="0"></el-input-number>
			</el-form-item>
			<el-form-item label="状态" prop="status">
				<ma-dict-radio v-model="dataForm.status" dict-type="post_status"></ma-dict-radio>
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
import { usePostApi, usePostSubmitApi } from '@/api/sys/post'

const emit = defineEmits(['refreshDataList'])

const visible = ref(false)
const dataFormRef = ref()

const dataForm = reactive({
	id: '',
	postCode: '',
	postName: '',
	sort: 0,
	status: 1
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
		getPost(id)
	}
}

const getPost = (id: number) => {
	usePostApi(id).then(res => {
		Object.assign(dataForm, res.data)
	})
}

const dataRules = ref({
	postCode: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	postName: [{ required: true, message: '必填项不能为空', trigger: 'blur' }]
})

// 表单提交
const submitHandle = () => {
	dataFormRef.value.validate((valid: boolean) => {
		if (!valid) {
			return false
		}

		usePostSubmitApi(dataForm).then(() => {
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
