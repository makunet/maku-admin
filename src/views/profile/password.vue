<template>
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
</template>

<script setup lang="ts" name="ProfilePassword">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import store from '@/store'
import { useI18n } from 'vue-i18n'
import { validatePassword } from '@/utils/validate'
import { updatePassword } from '@/api/user'

const router = useRouter()
const { t } = useI18n()
const dataFormRef: any = ref(null)

const dataForm = ref({
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
		updatePassword(dataForm).then((data: any) => {
			console.log(data)
		})
	})
}
</script>
