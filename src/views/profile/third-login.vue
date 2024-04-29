<template>
	<el-table :data="thirdList">
		<el-table-column type="index" label="序号" width="100" align="center" />
		<el-table-column prop="openType" label="平台类型" align="center">
			<template #default="scope">
				<el-text v-if="scope.row.openType === 'wechat_work'"><ma-icon icon="icon-workweixin" size="16" /> 企业微信</el-text>
				<el-text v-else-if="scope.row.openType === 'dingtalk'"><ma-icon icon="icon-dingding" size="16" /> 钉钉</el-text>
				<el-text v-else-if="scope.row.openType === 'feishu'"><ma-icon icon="icon-feishu" size="16" /> 飞书</el-text>
				<el-text v-else-if="scope.row.openType === 'wechat_open'"><ma-icon icon="icon-weixin" size="16" /> 微信</el-text>
			</template>
		</el-table-column>
		<el-table-column prop="username" label="昵称" align="center" />
		<el-table-column prop="status" label="状态" align="center">
			<template #default="scope">
				<el-tag v-if="scope.row.status === 0" type="danger">未绑定</el-tag>
				<el-tag v-else type="success">已绑定</el-tag>
			</template>
		</el-table-column>
		<el-table-column label="操作" align="center" width="100">
			<template #default="scope">
				<el-button v-if="scope.row.status === 0" type="primary" link @click="handleBind(scope.row.openType)">绑定</el-button>
				<el-button v-else type="danger" link @click="handleUnBind(scope.row.openType)">解绑</el-button>
			</template>
		</el-table-column>
	</el-table>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useThirdBindApi, useThirdListApi, useThirdUnBindApi } from '@/api/sys/third'
import { ElMessage } from 'element-plus'
import constant from '@/utils/constant'

let thirdList = reactive([
	{ openType: 'wechat_work', username: '-', status: 0 },
	{ openType: 'dingtalk', username: '-', status: 0 },
	{ openType: 'feishu', username: '-', status: 0 },
	{ openType: 'wechat_open', username: '-', status: 0 }
])

const getThirdList = async () => {
	const res = await useThirdListApi()

	thirdList.forEach(third => {
		// 初始化
		third.status = 0
		third.username = '-'

		res.data.forEach((item: any) => {
			if (third.openType === item.openType) {
				third.status = 1
				third.username = item.username
			}
		})
	})
}

getThirdList()

// 绑定
const handleBind = (openType: string) => {
	// 请求接口
	const url = constant.thirdLoginUrl + openType
	// 打开新窗口
	window.open(url, '第三方登录', 'width=600, height=400, toolbar=no')

	window.onmessage = function (e) {
		if (!e.data?.openType) {
			return
		}

		useThirdBindApi(e.data).then(() => {
			ElMessage.success({
				message: '操作成功',
				duration: 500,
				onClose: () => {
					getThirdList()
				}
			})
		})
	}
}

// 解绑
const handleUnBind = (openType: string) => {
	useThirdUnBindApi(openType).then(() => {
		ElMessage.success({
			message: '操作成功',
			duration: 500,
			onClose: () => {
				getThirdList()
			}
		})
	})
}
</script>

<style lang="scss" scoped>
.profile-password .el-input {
	--el-input-width: 280px;
}
</style>
