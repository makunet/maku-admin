<template>
	<el-drawer v-model="visible" title="邮件日志详情" :size="1000">
		<el-form label-width="100px">
			<el-row>
				<el-col :span="12">
					<el-form-item label="日志ID" prop="id">
						<el-input v-model="dataForm.id" disabled></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="平台ID" prop="platformId">
						<el-input v-model="dataForm.platformId" disabled></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item label="平台类型" prop="platform">
						<ma-dict-select v-model="dataForm.platform" dict-type="mail_platform" disabled style="width: 100%"></ma-dict-select>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="状态" prop="status">
						<el-tag v-if="dataForm.status === 0" type="danger">失败</el-tag>
						<el-tag v-else type="success">成功</el-tag>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item label="发件人" prop="mailFrom">
						<el-input v-model="dataForm.mailFrom" disabled></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="发送时间" prop="createTime">
						<el-input v-model="dataForm.createTime" disabled></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-form-item label="接收人" prop="mailTos">
				<el-input v-model="dataForm.mailTos" disabled></el-input>
			</el-form-item>
			<el-form-item label="主题" prop="subject">
				<el-input v-model="dataForm.subject" disabled></el-input>
			</el-form-item>
			<el-form-item label="内容" prop="content">
				<div v-html="dataForm.content"></div>
			</el-form-item>
			<el-form-item v-if="dataForm.status === 0" label="错误信息" prop="error">
				<el-input v-model="dataForm.error" :rows="12" type="textarea" disabled />
			</el-form-item>
		</el-form>
		<template #footer>
			<el-button type="primary" @click="visible = false">关闭</el-button>
		</template>
	</el-drawer>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const visible = ref(false)
const dataForm = reactive({
	id: '',
	platformId: '',
	platform: '',
	mailFrom: '',
	status: 0,
	mailTos: '',
	subject: '',
	content: '',
	error: '',
	createTime: ''
})

const init = (data?: any) => {
	visible.value = true

	Object.assign(dataForm, data)
}

defineExpose({
	init
})
</script>
