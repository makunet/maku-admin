<template>
	<div class="login-third">
		<el-divider>其他登录方式</el-divider>
		<div class="third-btn">
			<el-button link title="企业微信" @click="thirdLogin('wechat_work')"><ma-icon icon="icon-workweixin" size="24" /></el-button>
			<el-button link title="钉钉" @click="thirdLogin('dingtalk')"><ma-icon icon="icon-dingding" size="24" /></el-button>
			<el-button link title="飞书" @click="thirdLogin('feishu')"><ma-icon icon="icon-feishu" size="24" /></el-button>
			<el-button link title="微信" @click="thirdLogin('wechat_open')"><ma-icon icon="icon-weixin" size="24" /></el-button>
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
	margin-top: 36px;
	:deep(.el-divider__text) {
		color: #999 !important;
		font-size: 13px;
	}
	.third-btn {
		display: flex;
		justify-content: space-around;
	}
}
</style>
