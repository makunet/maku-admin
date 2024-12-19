<template>
	<div class="login-container">
		<div class="login-intro">
			<h1>{{ $t('app.title') }}</h1>
			<div class="desc">
				{{ $t('app.description') }}
			</div>
			<div class="login-bg"><img src="@/assets/login.png" alt="" /></div>
		</div>
		<div class="login-form">
			<div class="login-title">
				<el-button link :class="loginType === 'account' ? 'account' : ''" @click="loginSwitch('account')">{{ $t('app.signIn') }}</el-button>
				<el-button link :class="loginType === 'mobile' ? 'account' : ''" @click="loginSwitch('mobile')">{{ $t('app.mobileSignIn') }}</el-button>
			</div>
			<account v-if="loginType === 'account'" />
			<mobile v-if="loginType === 'mobile'" />
			<third />
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import Account from './account.vue'
import Mobile from './mobile.vue'
import Third from './third.vue'
import { useRoute } from 'vue-router'
import cache from '@/utils/cache'

// 登录类型
const loginType = ref('account')
const loginSwitch = (type: string) => {
	loginType.value = type
}

// 登录跳转
const route = useRoute()
watch(
	() => route,
	value => {
		const redirect = route?.query?.redirect as string
		if (redirect && redirect !== '/') {
			cache.setRedirect(redirect)
		} else {
			cache.setRedirect('')
		}
	},
	{ immediate: true }
)
</script>

<style lang="scss" scoped>
.login-container {
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	height: 100vh;
}
.login-intro {
	display: flex;
	flex-direction: column;
	width: 520px;
	flex: 0 1 auto;
}
.login-intro h1 {
	color: var(--el-color-primary);
}
.login-intro .desc {
	color: rgb(113, 115, 112);
	line-height: 32px;
	padding: 15px 0;
}
.login-bg img {
	width: 520px;
}
.login-title {
	display: flex;
	justify-content: space-around;
	margin-bottom: 20px;
	:deep(.el-button) {
		font-size: 20px;
		color: #333;
		padding-bottom: 8px;
	}
	.account {
		color: var(--el-color-primary);
		border-bottom: 4px solid var(--el-color-primary) !important;
	}
}
.login-form {
	background-color: #fff;
	flex: 0 1 auto;
	padding: 40px;
	border-radius: 6px;
	box-shadow: 1px 1px 8px #aaa6a6;
	box-sizing: border-box;
	width: 440px;

	:deep(.el-input) {
		height: 45px;
		margin-top: 5px;
		.el-input__inner {
			padding: 10px 15px 10px 5px;
			height: 45px;
			line-height: 45px;
			color: #666;
			font-size: 16px;
		}
	}
}

@media only screen and (max-width: 992px) {
	.login-intro {
		display: none;
	}
}
@media only screen and (max-width: 768px) {
	.login-container {
		background: #fff;
	}
	.login-intro {
		display: none;
	}
	.login-form {
		flex: 0 1 auto;
		border-radius: 0;
		box-shadow: none;
	}
	.login-captcha {
		:deep(.el-input) {
			width: 150px;
		}
	}
}
</style>
