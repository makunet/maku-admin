<template>
	<el-form ref="dataFormRef" :model="dataForm" :rules="dataRules" label-width="100px">
		<el-form-item prop="realName" label="姓名">
			<el-input v-model="dataForm.realName" placeholder="姓名"></el-input>
		</el-form-item>
		<el-form-item prop="mobile" label="手机">
			<el-input v-model="dataForm.mobile" placeholder="手机号码"></el-input>
		</el-form-item>
		<el-form-item prop="email" label="邮箱">
			<el-input v-model="dataForm.email" placeholder="邮箱"></el-input>
		</el-form-item>
		<el-form-item prop="gender" label="性别">
			<ma-dict-radio v-model="dataForm.gender" dict-type="user_gender"></ma-dict-radio>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="handleDataForm">{{ $t('confirm') }}</el-button>
		</el-form-item>
	</el-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { validatePassword } from '@/utils/validate'
import { useUserInfoSubmitApi } from '@/api/sys/user'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/store/modules/user'

const userStore = useUserStore()
const { t } = useI18n()
const dataFormRef: any = ref(null)

const dataForm = reactive({
	realName: userStore.user.realName,
	mobile: userStore.user.mobile,
	email: userStore.user.email,
	gender: userStore.user.gender
})

const dataRules = ref({
	realName: [{ required: true, message: t('required'), trigger: 'blur' }],
	mobile: [{ required: true, validator: validatePassword, trigger: 'blur' }]
})

const handleDataForm = () => {
	dataFormRef.value.validate((valid: boolean) => {
		if (!valid) {
			return false
		}

		// 修改登录用户信息
		useUserInfoSubmitApi(dataForm).then(() => {
			// 更新状态管理
			userStore.user.realName = dataForm.realName
			userStore.user.mobile = dataForm.mobile
			userStore.user.email = dataForm.email
			userStore.user.gender = dataForm.gender

			ElMessage.success('修改成功')
		})
	})
}
</script>
