<template>
	<el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" class="login-form" @keyup.enter="onLogin">
		<el-form-item prop="mobile">
			<el-input v-model="loginForm.mobile" :placeholder="$t('app.mobile')">
				<template #prefix>
					<div class="input-icon">
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
							<line x1="12" y1="18" x2="12.01" y2="18" />
						</svg>
					</div>
				</template>
			</el-input>
		</el-form-item>
		<el-form-item prop="code" class="login-code">
			<el-input v-model="loginForm.code" :placeholder="$t('app.captcha')">
				<template #prefix>
					<div class="input-icon">
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
							<path d="M7 11V7a5 5 0 0 1 9.9-1" />
						</svg>
					</div>
				</template>
			</el-input>
			<el-button v-if="!sms.disabled" class="code-btn" @click="sendCode">
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
				</svg>
				发送验证码
			</el-button>
			<el-button v-else class="code-btn" disabled>
				<span class="countdown">{{ sms.count }}</span> 秒后重发
			</el-button>
		</el-form-item>
		<el-form-item class="login-button">
			<el-button type="primary" :loading="loading" @click="onLogin()">
				<span v-if="!loading">{{ $t('app.signIn') }}</span>
				<span v-else>登录中...</span>
			</el-button>
		</el-form-item>
	</el-form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useUserStore } from '@/store/modules/user'
import { useSendCodeApi } from '@/api/auth'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { mobileRegExp } from '@/utils/validate'
import { ElMessage } from 'element-plus'
import constant from '@/utils/constant'
import cache from '@/utils/cache'

const userStore = useUserStore()
const loading = ref(false)

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

		loading.value = true

		// 用户登录
		userStore
			.mobileLoginAction(loginForm)
			.then(() => {
				router.push({ path: cache.getRedirect() || constant.loginPage })
			})
			.finally(() => {
				loading.value = false
			})
	})
}
</script>

<style lang="scss" scoped>
.login-form {
	.input-icon {
		width: 20px;
		height: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #8b8b9a;

		svg {
			width: 18px;
			height: 18px;
		}
	}
}

.login-code {
	:deep(.el-form-item__content) {
		display: flex;
		gap: 12px;
	}

	:deep(.el-input) {
		flex: 1;
	}

	.code-btn {
		height: 50px;
		min-width: 130px;
		padding: 0 16px;
		border-radius: 12px;
		font-size: 14px;
		font-weight: 500;
		background: var(--el-color-primary);
		border: none;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 6px;
		flex-shrink: 0;
		&:hover {
			background: var(--el-color-primary-light-2);
		}
		svg {
			width: 16px;
			height: 16px;
		}

		.countdown {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			width: 24px;
			height: 24px;
			background: rgba(255, 255, 255, 0.2);
			border-radius: 6px;
			font-weight: 600;
		}

		&:disabled {
			background: #a0a0a0;
			cursor: not-allowed;
			opacity: 0.8;
		}
	}
}

.login-button {
	margin-top: 8px;

	:deep(.el-button--primary) {
		width: 100%;
		height: 50px;
		font-size: 16px;
		font-weight: 600;
		letter-spacing: 2px;
		border-radius: 12px;
		background: var(--el-color-primary);
		border: none;
		//box-shadow: 0 4px 15px var(--el-color-primary-light-5);
	}
}
</style>
