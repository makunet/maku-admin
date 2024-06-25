<template>
	<el-drawer v-model="visible" :title="!dataForm.id ? '新增' : '修改'" :size="800">
		<el-form ref="dataFormRef" :model="dataForm" :rules="dataRules" label-width="100px" @keyup.enter="submitHandle()">
			<el-form-item label="平台类型" prop="platform">
				<ma-dict-select v-model="dataForm.platform" dict-type="sms_platform" placeholder="平台类型" style="width: 100%"></ma-dict-select>
			</el-form-item>
			<el-form-item label="分组名称" prop="groupName">
				<el-input v-model="dataForm.groupName" placeholder="分组名称相同的配置，会轮询发送短信"></el-input>
			</el-form-item>
			<el-divider></el-divider>
			<el-form-item v-if="dataForm.platform == 3" label="接入地址" prop="url">
				<el-input v-model="dataForm.url" placeholder="APP接入地址"></el-input>
			</el-form-item>
			<el-form-item v-if="dataForm.platform == 1" label="AppId" prop="appId">
				<el-input v-model="dataForm.appId" placeholder="AppId"></el-input>
			</el-form-item>
			<el-form-item v-if="dataForm.platform != 2" label="短信签名" prop="signName">
				<el-input v-model="dataForm.signName" placeholder="短信签名"></el-input>
			</el-form-item>
			<el-form-item label="短信模板" prop="templateId">
				<el-input v-model="dataForm.templateId" placeholder="短信模板"></el-input>
			</el-form-item>
			<el-form-item label="AccessKey" prop="accessKey">
				<el-input v-model="dataForm.accessKey" placeholder="AccessKey"></el-input>
			</el-form-item>
			<el-form-item label="SecretKey" prop="secretKey">
				<el-input v-model="dataForm.secretKey" placeholder="SecretKey"></el-input>
			</el-form-item>
			<el-form-item v-if="dataForm.platform == 1" label="SenderId" prop="senderId">
				<el-input v-model="dataForm.senderId" placeholder="国际短信必填"></el-input>
			</el-form-item>
			<el-form-item v-if="dataForm.platform == 3" label="通道号" prop="senderId">
				<el-input v-model="dataForm.senderId" placeholder="通道号必填"></el-input>
			</el-form-item>
			<el-form-item label="状态" prop="status">
				<ma-dict-radio v-model="dataForm.status" dict-type="enable_disable"></ma-dict-radio>
			</el-form-item>
		</el-form>
		<template #footer>
			<el-button @click="visible = false">取消</el-button>
			<el-button type="primary" @click="submitHandle()">确定</el-button>
		</template>
	</el-drawer>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus/es'
import { useSmsConfigApi, useSmsConfigSubmitApi } from '@/api/sys/sms'

const emit = defineEmits(['refreshDataList'])

const visible = ref(false)
const dataFormRef = ref()

const dataForm = reactive({
	id: '',
	platform: 0,
	groupName: '',
	signName: '',
	templateId: '',
	appId: '',
	senderId: '',
	url: '',
	accessKey: '',
	secretKey: '',
	status: 0,
	version: '',
	createTime: ''
})

const init = (id?: number) => {
	visible.value = true
	dataForm.id = ''

	// 重置表单数据
	if (dataFormRef.value) {
		dataFormRef.value.resetFields()
	}

	if (id) {
		getSmsPlatform(id)
	}
}

const getSmsPlatform = (id: number) => {
	useSmsConfigApi(id).then(res => {
		Object.assign(dataForm, res.data)
	})
}

const dataRules = ref({
	platform: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	groupName: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	appId: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	signName: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	templateId: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	url: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	accessKey: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	secretKey: [{ required: true, message: '必填项不能为空', trigger: 'blur' }]
})

// 表单提交
const submitHandle = () => {
	dataFormRef.value.validate((valid: boolean) => {
		if (!valid) {
			return false
		}

		useSmsConfigSubmitApi(dataForm).then(() => {
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
