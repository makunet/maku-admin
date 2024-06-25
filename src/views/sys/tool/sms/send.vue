<template>
	<el-drawer v-model="visible" title="发送短信" :size="800">
		<el-form ref="dataFormRef" :model="dataForm" :rules="dataRules" label-width="100px" @keyup.enter="submitHandle()">
			<el-tabs v-model="dataForm.platform">
				<el-tab-pane label="阿里云" :name="0"> </el-tab-pane>
				<el-tab-pane label="腾讯云" :name="1"> </el-tab-pane>
				<el-tab-pane label="七牛云" :name="2"> </el-tab-pane>
				<el-tab-pane label="华为云" :name="3"> </el-tab-pane>
			</el-tabs>
			<el-form-item label="短信模板" prop="id">
				<ma-data-select
					:key="dataForm.platform"
					v-model="dataForm.id"
					:url="`/sys/sms/config/list?platform=${dataForm.platform}`"
					:props="{ label: 'templateId', value: 'id' }"
					placeholder="选择短信模板"
				></ma-data-select>
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
	</el-drawer>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { ElMessage } from 'element-plus/es'
import { useSmsSendApi } from '@/api/sys/sms'
const emit = defineEmits(['refreshDataList'])

const visible = defineModel<Boolean>()

const dataFormRef = ref()
const dataForm = reactive({
	id: '',
	platform: 0,
	paramKey: '',
	paramValue: '',
	mobile: ''
})

watch(
	() => dataForm.platform,
	val => {
		// 重置表单数据
		if (dataFormRef.value) {
			dataFormRef.value.resetFields()
		}
	}
)

const dataRules = ref({
	id: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
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
</script>
