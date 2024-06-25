<template>
	<el-drawer v-model="visible" title="发送邮件" :size="1000">
		<el-form ref="dataFormRef" :model="dataForm" :rules="dataRules" label-width="100px" label-position="top">
			<el-tabs v-model="dataForm.platform">
				<el-tab-pane label="本地邮件" :name="-1"> </el-tab-pane>
				<el-tab-pane label="阿里云邮件" :name="0"> </el-tab-pane>
			</el-tabs>
			<el-form-item label="邮件分组" prop="id">
				<ma-data-select
					:key="dataForm.platform"
					v-model="dataForm.id"
					:url="`/sys/mail/config/list?platform=${dataForm.platform}`"
					:props="{ label: 'groupName', value: 'id' }"
					placeholder="选择邮件分组"
				></ma-data-select>
			</el-form-item>
			<el-form-item label="发送方式" prop="mailFormat">
				<el-radio-group v-model="dataForm.mailFormat">
					<el-radio value="text">纯文本</el-radio>
					<el-radio value="html">HTML</el-radio>
					<el-radio v-if="dataForm.platform === 0" value="template">模板邮件</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item v-if="dataForm.platform === 0" label="发件人邮箱" prop="mailFrom">
				<el-input v-model="dataForm.mailFrom" placeholder="发件人邮箱"></el-input>
			</el-form-item>
			<el-form-item v-if="dataForm.platform === 0 && dataForm.mailFormat !== 'template'" label="发件人昵称" prop="formAlias">
				<el-input v-model="dataForm.formAlias" placeholder="发件人昵称"></el-input>
			</el-form-item>
			<el-form-item v-if="dataForm.mailFormat === 'template'" label="收件人列表" prop="receiversName">
				<el-input v-model="dataForm.receiversName" placeholder="收件人列表名称"></el-input>
			</el-form-item>
			<el-form-item v-if="dataForm.mailFormat === 'template'" label="模板名" prop="templateName">
				<el-input v-model="dataForm.templateName" placeholder="模板名"></el-input>
			</el-form-item>
			<el-form-item v-if="dataForm.mailFormat === 'template'" label="标签名" prop="tagName">
				<el-input v-model="dataForm.tagName" placeholder="标签名"></el-input>
			</el-form-item>
			<el-form-item v-if="dataForm.mailFormat !== 'template'" label="接收人邮箱" prop="mailTos">
				<el-input v-model="dataForm.mailTos" type="textarea" :rows="2" placeholder="接收人邮箱，多个邮箱之间用英文逗号分隔"></el-input>
			</el-form-item>
			<el-form-item v-if="dataForm.mailFormat !== 'template'" label="邮件主题" prop="subject">
				<el-input v-model="dataForm.subject" placeholder="邮件主题"></el-input>
			</el-form-item>
			<el-form-item v-if="dataForm.mailFormat !== 'template'" label="邮件正文" prop="content">
				<el-input v-if="dataForm.mailFormat === 'text'" v-model="dataForm.content" type="textarea" :rows="12"></el-input>
				<ma-editor v-else v-model="dataForm.content"></ma-editor>
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
import { useMailSendApi } from '@/api/sys/mail'
const emit = defineEmits(['refreshDataList'])

const visible = defineModel<Boolean>()

const dataFormRef = ref()
const dataForm = reactive({
	id: '',
	platform: -1,
	mailFormat: 'text',
	mailFrom: '',
	formAlias: '',
	mailTos: '',
	receiversName: '',
	templateName: '',
	tagName: '',
	subject: '',
	content: ''
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
	mailFormat: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	mailFrom: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	mailTos: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	receiversName: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	templateName: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	subject: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	content: [{ required: true, message: '必填项不能为空', trigger: 'blur' }]
})

// 表单提交
const submitHandle = () => {
	dataFormRef.value.validate((valid: boolean) => {
		if (!valid) {
			return false
		}

		useMailSendApi(dataForm).then(() => {
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
