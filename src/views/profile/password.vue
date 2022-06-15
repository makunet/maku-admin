<template>
	<el-card>
		<el-form ref="dataFormRef" :model="dataForm" :rules="dataRules" label-width="200px" @keyup.enter="handleDataForm()">
			<el-form-item :label="$t('profile.username')">
				<span>{{ store.userStore.user.username }}</span>
			</el-form-item>
			<el-form-item prop="password" :label="$t('profile.oldPassword')">
				<el-input v-model="dataForm.password" type="password"></el-input>
			</el-form-item>
			<el-form-item prop="newPassword" :label="$t('profile.newPassword')">
				<el-input v-model="dataForm.newPassword" type="password"></el-input>
			</el-form-item>
			<el-form-item prop="confirmPassword" :label="$t('profile.confirmPassword')">
				<el-input v-model="dataForm.confirmPassword" type="password"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="handleDataForm">{{ $t('confirm') }}</el-button>
			</el-form-item>
		</el-form>
	</el-card>
</template>

<script setup lang="ts" name="ProfilePassword">
import { reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import store from '@/store'
import { useI18n } from 'vue-i18n'
import { validatePassword } from '@/utils/validate'
import { updatePasswordApi } from '@/api/user'
import { ElMessage } from 'element-plus'
import { closeTab } from '@/utils/tabs'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()
const dataFormRef: any = ref(null)

const dataForm = reactive({
	password: '',
	newPassword: '',
	confirmPassword: ''
})

const dataRules = ref({
	password: [{ required: true, message: t('required'), trigger: 'blur' }],
	newPassword: [{ required: true, validator: validatePassword, trigger: 'blur' }],
	confirmPassword: [{ required: true, message: t('required'), trigger: 'blur' }]
})

const handleDataForm = () => {
	dataFormRef.value.validate((valid: boolean) => {
		if (!valid) {
			return false
		}

		// 修改密码
		updatePasswordApi(dataForm).then(() => {
			ElMessage.success('修改成功')
			// 关闭当前tab
			closeTab(router, route)
		})
	})
}
</script>
