<template>
	<div class="login-container">
		<div class="bg-decoration">
			<div class="circle circle-1"></div>
			<div class="circle circle-2"></div>
			<div class="circle circle-3"></div>
		</div>

		<div class="login-brand">
			<div class="brand-content">
				<div class="brand-logo">
					<div class="logo-icon">
						<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M24 4L6 14v20l18 10 18-10V14L24 4z" stroke="currentColor" stroke-width="2" fill="none" />
							<path d="M24 4v20m0 0l18-10m-18 10L6 14m18 30V24" stroke="currentColor" stroke-width="2" />
							<circle cx="24" cy="24" r="6" fill="currentColor" opacity="0.3" />
						</svg>
					</div>
					<h1 class="brand-title">{{ $t('app.title') }}</h1>
				</div>
				<p class="brand-slogan">企业级低代码开发平台，让开发更简单！</p>
				<div class="brand-desc">
					{{ $t('app.description') }}
				</div>
				<div class="brand-features">
					<div class="feature-item">
						<div class="feature-icon">
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
							</svg>
						</div>
						<span>安全可靠</span>
					</div>
					<div class="feature-item">
						<div class="feature-icon">
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<circle cx="12" cy="12" r="10" />
								<polyline points="12 6 12 12 16 14" />
							</svg>
						</div>
						<span>快速开发</span>
					</div>
					<div class="feature-item">
						<div class="feature-icon">
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
								<line x1="3" y1="9" x2="21" y2="9" />
								<line x1="9" y1="21" x2="9" y2="9" />
							</svg>
						</div>
						<span>灵活扩展</span>
					</div>
					<div class="feature-item">
						<div class="feature-icon">
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<rect x="4" y="4" width="16" height="16" rx="2" />
								<rect x="9" y="9" width="6" height="6" />
								<line x1="9" y1="1" x2="9" y2="4" />
								<line x1="15" y1="1" x2="15" y2="4" />
								<line x1="9" y1="20" x2="9" y2="23" />
								<line x1="15" y1="20" x2="15" y2="23" />
								<line x1="20" y1="9" x2="23" y2="9" />
								<line x1="20" y1="14" x2="23" y2="14" />
								<line x1="1" y1="9" x2="4" y2="9" />
								<line x1="1" y1="14" x2="4" y2="14" />
							</svg>
						</div>
						<span>支持信创</span>
					</div>
				</div>
			</div>
		</div>

		<!-- 右侧登录区 -->
		<div class="login-panel">
			<div class="login-card">
				<div class="card-header">
					<h2 class="card-title">欢迎使用</h2>
					<p class="card-subtitle">请登录您的账户继续使用</p>
				</div>

				<div class="login-tabs">
					<button :class="['tab-btn', { active: loginType === 'account' }]" @click="loginSwitch('account')">
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
							<circle cx="12" cy="7" r="4" />
						</svg>
						{{ $t('app.signIn') }}
					</button>
					<button :class="['tab-btn', { active: loginType === 'mobile' }]" @click="loginSwitch('mobile')">
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
							<line x1="12" y1="18" x2="12.01" y2="18" />
						</svg>
						{{ $t('app.mobileSignIn') }}
					</button>
					<div class="tab-indicator" :class="{ 'tab-mobile': loginType === 'mobile' }"></div>
				</div>

				<div class="login-form-wrapper">
					<account v-if="loginType === 'account'" />
					<mobile v-else />
				</div>

				<third />
			</div>
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
	min-height: 100vh;
	background: var(--el-color-primary-light-1);
	position: relative;
	overflow: hidden;
}

// 背景装饰
.bg-decoration {
	position: absolute;
	inset: 0;
	pointer-events: none;
	overflow: hidden;

	.circle {
		position: absolute;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.1);
	}

	.circle-1 {
		width: 400px;
		height: 400px;
		top: -100px;
		left: -100px;
	}

	.circle-2 {
		width: 300px;
		height: 300px;
		bottom: -50px;
		left: 30%;
	}

	.circle-3 {
		width: 200px;
		height: 200px;
		top: 40%;
		left: 20%;
	}
}

// 左侧品牌区
.login-brand {
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 60px;
	color: #fff;
	position: relative;
	z-index: 1;

	.brand-content {
		max-width: 500px;
	}

	.brand-logo {
		display: flex;
		align-items: center;
		gap: 16px;
		margin-bottom: 16px;

		.logo-icon {
			width: 56px;
			height: 56px;
			background: rgba(255, 255, 255, 0.2);
			border-radius: 16px;
			display: flex;
			align-items: center;
			justify-content: center;
			backdrop-filter: blur(10px);

			svg {
				width: 32px;
				height: 32px;
				color: #fff;
			}
		}
	}

	.brand-title {
		font-size: 36px;
		font-weight: 700;
		letter-spacing: 2px;
		margin: 0;
		font-family:
			'SF Pro Display',
			-apple-system,
			BlinkMacSystemFont,
			sans-serif;
	}

	.brand-slogan {
		font-size: 18px;
		opacity: 0.9;
		margin-bottom: 24px;
		font-weight: 300;
		letter-spacing: 4px;
	}

	.brand-desc {
		font-size: 14px;
		line-height: 1.8;
		opacity: 0.8;
		margin-bottom: 40px;
		padding: 20px;
		background: rgba(255, 255, 255, 0.1);
		border-radius: 12px;
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.2);
	}

	.brand-features {
		display: flex;
		gap: 32px;

		.feature-item {
			display: flex;
			align-items: center;
			gap: 8px;
			font-size: 14px;
			opacity: 0.9;

			.feature-icon {
				width: 36px;
				height: 36px;
				background: rgba(255, 255, 255, 0.15);
				border-radius: 10px;
				display: flex;
				align-items: center;
				justify-content: center;

				svg {
					width: 18px;
					height: 18px;
				}
			}
		}
	}
}

// 右侧登录区
.login-panel {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 40px;
	position: relative;
	z-index: 1;
}

.login-card {
	width: 440px;
	background: #fff;
	border-radius: 24px;
	padding: 48px 40px;
	box-shadow:
		0 25px 50px -12px rgba(0, 0, 0, 0.25),
		0 0 0 1px rgba(255, 255, 255, 0.1);

	.card-header {
		text-align: center;
		margin-bottom: 32px;

		.card-title {
			font-size: 28px;
			font-weight: 600;
			color: #1a1a2e;
			margin: 0 0 8px 0;
			font-family:
				'SF Pro Display',
				-apple-system,
				BlinkMacSystemFont,
				sans-serif;
		}

		.card-subtitle {
			font-size: 14px;
			color: #8b8b9a;
			margin: 0;
		}
	}

	.login-tabs {
		display: flex;
		position: relative;
		background: #f5f5f7;
		border-radius: 12px;
		padding: 4px;
		margin-bottom: 28px;

		.tab-btn {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 8px;
			padding: 12px 16px;
			border: none;
			background: transparent;
			color: #8b8b9a;
			font-size: 15px;
			font-weight: 500;
			cursor: pointer;
			position: relative;
			z-index: 1;
			border-radius: 10px;

			svg {
				width: 18px;
				height: 18px;
			}

			&.active {
				color: var(--el-color-primary);
			}

			&:hover:not(.active) {
				color: #555;
			}
		}

		.tab-indicator {
			position: absolute;
			top: 4px;
			left: 4px;
			width: calc(50% - 4px);
			height: calc(100% - 8px);
			background: #fff;
			border-radius: 10px;
			box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

			&.tab-mobile {
				left: calc(50% + 0px);
			}
		}
	}

	.login-form-wrapper {
		min-height: 280px;
	}

	:deep(.el-form-item) {
		margin-bottom: 20px;
	}

	:deep(.el-input) {
		height: 50px;

		.el-input__wrapper {
			padding: 0 16px;
			border-radius: 5px;
			//background: #f5f5f7;
			//box-shadow: none;
			border-color: var(--el-color-primary-light-1);
			//&:hover {
			//	background: #ebebed;
			//}

			&.is-focus {
				background: #fff;
				box-shadow: 0 0 0 2px var(--el-color-primary-light-8);
			}
		}

		.el-input__inner {
			height: 50px;
			font-size: 15px;
			color: #333;

			&::placeholder {
				color: #aaa;
			}
		}

		.el-input__prefix {
			color: #8b8b9a;
		}
	}

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
		&:hover {
			background: var(--el-color-primary-light-2);
		}
	}
}

// 响应式
@media only screen and (max-width: 1200px) {
	.login-brand {
		padding: 40px;

		.brand-title {
			font-size: 28px;
		}
	}
}

@media only screen and (max-width: 992px) {
	.login-brand {
		display: none;
	}

	.login-container {
		justify-content: center;
	}

	.login-panel {
		width: 100%;
		max-width: 500px;
	}
}

@media only screen and (max-width: 576px) {
	.login-container {
		padding: 20px;
	}

	.login-panel {
		padding: 0;
	}

	.login-card {
		width: 100%;
		padding: 32px 24px;
		border-radius: 20px;

		.card-header .card-title {
			font-size: 24px;
		}

		.login-tabs .tab-btn {
			font-size: 14px;
			padding: 10px 12px;
		}
	}
}
</style>
