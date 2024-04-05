<template>
	<el-dialog v-model="visible" :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false" :width="600">
		<el-form ref="dataFormRef" :model="dataForm" :rules="dataRules" label-width="100px" @keyup.enter="submitHandle()">
			<el-form-item label="参数名称" prop="paramName">
				<el-input v-model="dataForm.paramName" placeholder="参数名称"></el-input>
			</el-form-item>
			<el-form-item label="参数键" prop="paramKey">
				<el-input v-model="dataForm.paramKey" placeholder="参数键"></el-input>
			</el-form-item>
			<el-form-item label="参数值" prop="paramValue">
				<el-input v-model="dataForm.paramValue" placeholder="参数值"></el-input>
			</el-form-item>
			<el-form-item label="备注" prop="remark">
				<el-input v-model="dataForm.remark" placeholder="备注"></el-input>
			</el-form-item>
			<el-form-item label="系统参数" prop="paramType">
				<ma-dict-radio v-model="dataForm.paramType" dict-type="params_type"></ma-dict-radio>
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
import { useParamsApi, useParamsSubmitApi } from '@/api/sys/params'

const emit = defineEmits(['refreshDataList'])

const visible = ref(false)
const dataFormRef = ref()

const dataForm = reactive({
	id: '',
	paramName: '',
	paramType: 0,
	paramKey: '',
	paramValue: '',
	remark: ''
})

const init = (id?: number) => {
	visible.value = true
	dataForm.id = ''

	// 重置表单数据
	if (dataFormRef.value) {
		dataFormRef.value.resetFields()
	}

	if (id) {
		getParams(id)
	}
}

const getParams = (id: number) => {
	useParamsApi(id).then(res => {
		Object.assign(dataForm, res.data)
	})
}

const dataRules = ref({
	paramName: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	paramType: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	paramKey: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	paramValue: [{ required: true, message: '必填项不能为空', trigger: 'blur' }]
})

// 表单提交
const submitHandle = () => {
	dataFormRef.value.validate((valid: boolean) => {
		if (!valid) {
			return false
		}

		useParamsSubmitApi(dataForm).then(() => {
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
