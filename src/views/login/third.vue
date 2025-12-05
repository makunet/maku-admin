<template>
	<div class="login-third">
		<div class="divider">
			<span class="divider-line"></span>
			<span class="divider-text">其他登录方式</span>
			<span class="divider-line"></span>
		</div>
		<div class="third-btns">
			<button class="third-btn wechat-work" title="企业微信" @click="thirdLogin('wechat_work')">
				<ma-icon icon="icon-workweixin" size="20" />
			</button>
			<button class="third-btn dingtalk" title="钉钉" @click="thirdLogin('dingtalk')">
				<ma-icon icon="icon-dingding" size="20" />
			</button>
			<button class="third-btn feishu" title="飞书" @click="thirdLogin('feishu')">
				<ma-icon icon="icon-feishu" size="20" />
			</button>
			<button class="third-btn wechat" title="微信" @click="thirdLogin('wechat_open')">
				<ma-icon icon="icon-weixin" size="20" />
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import constant from '@/utils/constant'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/modules/user'
import cache from '@/utils/cache'

const router = useRouter()
const userStore = useUserStore()

const thirdLogin = (openType: string) => {
	// 请求接口
	const url = constant.thirdLoginUrl + openType
	// 打开新窗口
	window.open(url, '第三方登录', 'width=600, height=400, toolbar=no')

	window.onmessage = function (e) {
		if (!e.data?.openType) {
			return
		}

		// 第三方登录
		userStore.thirdLoginAction(e.data).then(() => {
			router.push({ path: cache.getRedirect() || constant.loginPage })
		})
	}
}
</script>

<style lang="scss" scoped>
.login-third {
	margin-top: 32px;
	padding-top: 8px;

	.divider {
		display: flex;
		align-items: center;
		margin-bottom: 24px;

		.divider-line {
			flex: 1;
			height: 1px;
			background: linear-gradient(90deg, transparent, #e5e5e5, transparent);
		}

		.divider-text {
			padding: 0 16px;
			font-size: 13px;
			color: #aaa;
			white-space: nowrap;
		}
	}

	.third-btns {
		display: flex;
		justify-content: space-between;
		padding: 0 30px;
	}

	.third-btn {
		width: 48px;
		height: 48px;
		border-radius: 12px;
		border: 1px solid #e5e5e5;
		background: #fff;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;

		&:hover {
			border-color: var(--el-color-primary);
			background: var(--el-color-primary-light-9);
		}

		// 企业微信
		&.wechat-work:hover {
			border-color: #2979ff;
			background: #e3f2fd;
		}

		// 钉钉
		&.dingtalk:hover {
			border-color: #007fff;
			background: #e3f2fd;
		}

		// 飞书
		&.feishu:hover {
			border-color: #3370ff;
			background: #e8f0fe;
		}

		// 微信
		&.wechat:hover {
			border-color: #07c160;
			background: #e8f8ef;
		}
	}
}
</style>
