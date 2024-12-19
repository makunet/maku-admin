<template>
	<el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" @keyup.enter="onLogin">
		<el-form-item prop="mobile">
			<el-input v-model="loginForm.mobile" :prefix-icon="User" :placeholder="$t('app.mobile')"></el-input>
		</el-form-item>
		<el-form-item prop="code" class="login-code">
			<el-input v-model="loginForm.code" :placeholder="$t('app.captcha')" :prefix-icon="Key"></el-input>
			<el-button v-if="!sms.disabled" @click="sendCode">发送验证码</el-button>
			<el-button v-else disabled>{{ sms.count }} 秒后重新发送</el-button>
		</el-form-item>
		<el-form-item class="login-button">
			<el-button type="primary" @click="onLogin()">{{ $t('app.signIn') }}</el-button>
		</el-form-item>
	</el-form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { User, Key } from '@element-plus/icons-vue'
import { useUserStore } from '@/store/modules/user'
import { useSendCodeApi } from '@/api/auth'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { mobileRegExp } from '@/utils/validate'
import { ElMessage } from 'element-plus'
import constant from '@/utils/constant'
import cache from '@/utils/cache'

const userStore = useUserStore()

// 发送短信验证码
const sendCode = () => {
	if (!mobileRegExp.test(loginForm.mobile)) {
		ElMessage.error('请输入正确的手机号')
		return
	}

	useSendCodeApi(loginForm.mobile).then(() => {
		timerHandler()
	})
}

// 短信计时器
const sms = reactive({
	disabled: false,
	total: 60,
	count: 0
})

// 计时器处理器
const timerHandler = () => {
	sms.count = sms.total
	sms.disabled = true

	let timer = setInterval(() => {
		if (sms.count > 1 && sms.count <= sms.total) {
			sms.count--
		} else {
			sms.disabled = false
			clearInterval(timer)
		}
	}, 1000)
}

const router = useRouter()
const { t } = useI18n()
const loginFormRef = ref()

const loginForm = reactive({
	mobile: '',
	code: ''
})

const loginRules = ref({
	mobile: [{ required: true, message: t('required'), trigger: 'blur' }],
	code: [{ required: true, message: t('required'), trigger: 'blur' }]
})

const onLogin = () => {
	loginFormRef.value.validate((valid: boolean) => {
		if (!valid) {
			return false
		}

		// 用户登录
		userStore.mobileLoginAction(loginForm).then(() => {
			router.push({ path: cache.getRedirect() || constant.loginPage })
		})
	})
}
</script>

<style lang="scss" scoped>
.login-code {
	:deep(.el-input) {
		width: 200px;
	}
	:deep(.el-button--default) {
		width: 150px;
		height: 45px;
		margin: 5px 0 0 10px;
	}
}
.login-button {
	:deep(.el-button--primary) {
		margin-top: 10px;
		width: 100%;
		height: 45px;
		font-size: 18px;
		letter-spacing: 8px;
	}
}
</style>
