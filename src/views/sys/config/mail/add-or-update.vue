<template>
	<el-drawer v-model="visible" :title="!dataForm.id ? '新增' : '修改'" :size="800">
		<el-form ref="dataFormRef" :model="dataForm" :rules="dataRules" label-width="100px" @keyup.enter="submitHandle()">
			<el-form-item label="平台类型" prop="platform">
				<ma-dict-select v-model="dataForm.platform" dict-type="mail_platform" placeholder="平台类型" style="width: 100%"></ma-dict-select>
			</el-form-item>
			<el-form-item label="分组名称" prop="groupName">
				<el-input v-model="dataForm.groupName" placeholder="分组名称相同的配置，会轮询发送邮件"></el-input>
			</el-form-item>
			<el-divider></el-divider>
			<el-form-item label="邮箱账号" prop="mailFrom" v-if="dataForm.platform == -1">
				<el-input v-model="dataForm.mailFrom" placeholder="发件邮箱"></el-input>
			</el-form-item>
			<el-form-item label="邮箱密码" prop="mailPass" v-if="dataForm.platform == -1">
				<el-input v-model="dataForm.mailPass" placeholder="邮箱密码"></el-input>
			</el-form-item>
			<el-form-item label="SMTP服务器" prop="mailHost" v-if="dataForm.platform == -1">
				<el-input v-model="dataForm.mailHost" placeholder="企业邮箱或自建的，必须要填写"></el-input>
			</el-form-item>
			<el-form-item label="SMTP端口" prop="mailPort" v-if="dataForm.platform == -1">
				<el-input v-model="dataForm.mailPort" placeholder="默认25端口"></el-input>
			</el-form-item>
			<el-form-item label="AccessKey" prop="accessKey" v-if="dataForm.platform != -1">
				<el-input v-model="dataForm.accessKey" placeholder="AccessKey"></el-input>
			</el-form-item>
			<el-form-item label="SecretKey" prop="secretKey" v-if="dataForm.platform != -1">
				<el-input v-model="dataForm.secretKey" placeholder="SecretKey"></el-input>
			</el-form-item>
			<el-form-item label="RegionId" prop="regionId" v-if="dataForm.platform != -1">
				<el-input v-model="dataForm.regionId" placeholder="RegionId"></el-input>
			</el-form-item>
			<el-form-item label="Endpoint" prop="endpoint" v-if="dataForm.platform == 0">
				<el-input v-model="dataForm.endpoint" placeholder="阿里云 endpoint"></el-input>
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
import { reactive, ref, watch } from 'vue'
import { ElMessage } from 'element-plus/es'
import { useMailConfigApi, useMailConfigSubmitApi } from '@/api/sys/mail'

const emit = defineEmits(['refreshDataList'])

const visible = ref(false)
const dataFormRef = ref()

const dataForm = reactive({
	id: '',
	platform: -1,
	groupName: '',
	mailHost: '',
	mailPort: '',
	mailFrom: '',
	mailPass: '',
	regionId: '',
	endpoint: '',
	accessKey: '',
	secretKey: '',
	status: '0'
})

const init = (id?: number) => {
	visible.value = true
	dataForm.id = ''

	// 重置表单数据
	if (dataFormRef.value) {
		dataFormRef.value.resetFields()
	}

	if (id) {
		getEmailPlatform(id)
	}
}

const getEmailPlatform = (id: number) => {
	useMailConfigApi(id).then(res => {
		Object.assign(dataForm, res.data)
	})
}

const dataRules = ref({
	platform: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	groupName: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	mailFrom: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	mailPass: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	regionId: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	endpoint: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	accessKey: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	secretKey: [{ required: true, message: '必填项不能为空', trigger: 'blur' }]
})

// 表单提交
const submitHandle = () => {
	dataFormRef.value.validate((valid: boolean) => {
		if (!valid) {
			return false
		}

		useMailConfigSubmitApi(dataForm).then(() => {
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
