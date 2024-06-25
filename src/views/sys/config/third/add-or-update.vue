<template>
	<el-drawer v-model="visible" :title="!dataForm.id ? '新增' : '修改'" :size="800">
		<el-form ref="dataFormRef" :model="dataForm" :rules="dataRules" label-width="100px" @keyup.enter="submitHandle()">
			<el-form-item label="平台类型" prop="openType">
				<el-select v-model="dataForm.openType" placeholder="请选择" style="width: 100%">
					<el-option label="企业微信" value="wechat_work"></el-option>
					<el-option label="钉钉" value="dingtalk"></el-option>
					<el-option label="飞书" value="feishu"></el-option>
					<el-option label="微信" value="wechat_open"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="ClientID" prop="clientId">
				<el-input v-model="dataForm.clientId" placeholder="ClientID"></el-input>
			</el-form-item>
			<el-form-item label="ClientSecret" prop="clientSecret">
				<el-input v-model="dataForm.clientSecret" placeholder="ClientSecret"></el-input>
			</el-form-item>
			<el-form-item label="RedirectUri" prop="redirectUri">
				<el-input v-model="dataForm.redirectUri" placeholder="RedirectUri"></el-input>
			</el-form-item>
			<el-form-item label="AgentID" prop="agentId" v-if="dataForm.openType === 'wechat_work'">
				<el-input v-model="dataForm.agentId" placeholder="AgentID"></el-input>
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
import { useThirdConfigApi, useThirdConfigSubmitApi } from '@/api/sys/third'

const emit = defineEmits(['refreshDataList'])

const visible = ref(false)
const dataFormRef = ref()

const dataForm = reactive({
	id: '',
	openType: '',
	clientId: '',
	clientSecret: '',
	redirectUri: '',
	agentId: '',
	tenantId: '',
	version: '',
	deleted: '',
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
		getSys_third_login_config(id)
	}
}

const getSys_third_login_config = (id: number) => {
	useThirdConfigApi(id).then(res => {
		Object.assign(dataForm, res.data)
	})
}

const dataRules = ref({
	openType: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	clientId: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	clientSecret: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	redirectUri: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	agentId: [{ required: true, message: '必填项不能为空', trigger: 'blur' }]
})

// 表单提交
const submitHandle = () => {
	dataFormRef.value.validate((valid: boolean) => {
		if (!valid) {
			return false
		}

		useThirdConfigSubmitApi(dataForm).then(() => {
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
