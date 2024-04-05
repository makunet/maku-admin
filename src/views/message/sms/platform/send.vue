<template>
	<el-dialog v-model="visible" title="发送短信测试" :close-on-click-modal="false" :width="500">
		<el-form ref="dataFormRef" :model="dataForm" :rules="dataRules" label-width="100px" @keyup.enter="submitHandle()">
			<el-form-item label="平台类型" prop="platform">
				<ma-dict-select v-model="dataForm.platform" dict-type="sms_platform" placeholder="平台类型" style="width: 100%" disabled></ma-dict-select>
			</el-form-item>
			<el-form-item label="手机号" prop="mobile">
				<el-input v-model="dataForm.mobile" placeholder="手机号"></el-input>
			</el-form-item>
			<el-form-item v-if="dataForm.platform == 0 || dataForm.platform == 2" label="参数Key" prop="paramKey">
				<el-input v-model="dataForm.paramKey" placeholder="参数Key"></el-input>
			</el-form-item>
			<el-form-item label="参数Value" prop="paramValue">
				<el-input v-model="dataForm.paramValue" placeholder="参数Value"></el-input>
			</el-form-item>
		</el-form>
		<template #footer>
			<el-button @click="visible = false">取消</el-button>
			<el-button type="primary" @click="submitHandle()">发送</el-button>
		</template>
	</el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus/es'
import { useSmsSendApi } from '@/api/message/sms'

const emit = defineEmits(['refreshDataList'])

const visible = ref(false)

const dataFormRef = ref()
const dataForm = reactive({
	id: 0,
	platform: 0,
	paramKey: '',
	paramValue: '',
	mobile: ''
})

const init = (data?: any) => {
	visible.value = true
	dataForm.id = data.id

	// 重置表单数据
	if (dataFormRef.value) {
		dataFormRef.value.resetFields()
	}

	dataForm.platform = data.platform
}

const dataRules = ref({
	mobile: [{ required: true, message: '必填项不能为空', trigger: 'blur' }]
})

// 表单提交
const submitHandle = () => {
	dataFormRef.value.validate((valid: boolean) => {
		if (!valid) {
			return false
		}

		useSmsSendApi(dataForm).then(() => {
			ElMessage.success({
				message: '发送成功',
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
