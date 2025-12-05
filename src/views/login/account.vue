<template>
	<el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" class="login-form" @keyup.enter="onLogin">
		<el-form-item prop="username">
			<el-input v-model="loginForm.username" :placeholder="$t('app.username')">
				<template #prefix>
					<div class="input-icon">
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
							<circle cx="12" cy="7" r="4" />
						</svg>
					</div>
				</template>
			</el-input>
		</el-form-item>
		<el-form-item prop="password">
			<el-input v-model="loginForm.password" show-password :placeholder="$t('app.password')">
				<template #prefix>
					<div class="input-icon">
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
							<path d="M7 11V7a5 5 0 0 1 10 0v4" />
						</svg>
					</div>
				</template>
			</el-input>
		</el-form-item>
		<el-form-item v-if="captchaVisible" prop="captcha" class="login-captcha">
			<el-input v-model="loginForm.captcha" :placeholder="$t('app.captcha')">
				<template #prefix>
					<div class="input-icon">
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
							<path d="M7 11V7a5 5 0 0 1 9.9-1" />
						</svg>
					</div>
				</template>
			</el-input>
			<div class="captcha-img" @click="onCaptcha">
				<img :src="captchaBase64" alt="验证码" />
			</div>
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
import { ref, reactive, onMounted } from 'vue'
import { useCaptchaApi, useCaptchaEnabledApi } from '@/api/auth'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import constant from '@/utils/constant'
import { sm2Encrypt } from '@/utils/smCrypto'
import cache from '@/utils/cache'
import { useUserStore } from '@/store/modules/user'

const userStore = useUserStore()
const router = useRouter()
const { t } = useI18n()
const loginFormRef = ref()
const captchaBase64 = ref()
const loading = ref(false)

const loginForm = reactive({
	username: constant.env.PROD ? '' : 'admin',
	password: constant.env.PROD ? '' : 'admin',
	key: '',
	captcha: ''
})

const loginRules = ref({
	username: [{ required: true, message: t('required'), trigger: 'blur' }],
	password: [{ required: true, message: t('required'), trigger: 'blur' }],
	captcha: [{ required: true, message: t('required'), trigger: 'blur' }]
})

// 是否显示验证码
const captchaVisible = ref(false)

onMounted(() => {
	onCaptchaEnabled()
})

const onCaptchaEnabled = async () => {
	const { data } = await useCaptchaEnabledApi()
	captchaVisible.value = data

	if (data) {
		await onCaptcha()
	}
}

const onCaptcha = async () => {
	const { data } = await useCaptchaApi()
	if (data.enabled) {
		captchaVisible.value = true
	}
	loginForm.key = data.key
	captchaBase64.value = data.image
}

const onLogin = () => {
	loginFormRef.value.validate((valid: boolean) => {
		if (!valid) {
			return false
		}

		loading.value = true

		// 重新封装登录数据
		const loginData = {
			username: loginForm.username,
			password: sm2Encrypt(loginForm.password),
			key: loginForm.key,
			captcha: loginForm.captcha
		}

		// 用户登录
		userStore
			.accountLoginAction(loginData)
			.then(() => {
				router.push({ path: cache.getRedirect() || constant.loginPage })
			})
			.catch(() => {
				if (captchaVisible.value) {
					onCaptcha()
				}
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

.login-captcha {
	:deep(.el-form-item__content) {
		display: flex;
		gap: 12px;
	}

	:deep(.el-input) {
		flex: 1;
	}

	.captcha-img {
		width: 188px;
		height: 50px;
		border-radius: 5px;
		overflow: hidden;
		cursor: pointer;
		background: #f5f5f7;
		flex-shrink: 0;

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
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
		border-radius: 5px;
		background: var(--el-color-primary);
		border: none;
		//box-shadow: 0 4px 15px var(--el-color-primary-light-5);
	}
}
</style>
