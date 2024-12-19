<template>
	<el-row :gutter="15">
		<el-col :span="12">
			<el-card style="height: 700px">
				<template #header>
					<span style="margin-right: 10px">WebSocket连接</span>
					<el-tag :type="openState ? 'primary' : 'danger'">{{ openState ? '已连接' : '已断开' }}</el-tag>
					<el-button :type="openState ? 'danger' : 'primary'" style="margin-left: 20px" @click="handleConnect">
						{{ openState ? '断开' : '连接' }}
					</el-button>
				</template>
				<el-form ref="dataFormRef" :model="dataForm" :rules="dataRules" label-width="80px">
					<el-form-item label="服务地址">
						<el-input v-model="webSocketUrl" disabled />
					</el-form-item>
					<el-form-item prop="userId" label="发送给谁">
						<ma-user-input v-model="dataForm.userId"></ma-user-input>
					</el-form-item>
					<el-form-item prop="content" label="发送内容">
						<el-input v-model="dataForm.content" :rows="3" type="textarea" />
					</el-form-item>
				</el-form>
				<div style="float: right">
					<el-button type="primary" :disabled="!openState" @click="submitHandle()">发送</el-button>
				</div>
			</el-card>
		</el-col>
		<el-col :span="12">
			<el-card style="height: 700px">
				<template #header> 消息列表 </template>
				<el-scrollbar height="620px">
					<chat-item
						v-for="message in messageList"
						:key="message.name"
						:avatar="message.avatar"
						:name="message.name"
						:content="message.content"
						:datetime="message.sendTime"
						role="user"
						variant="text"
					></chat-item>
				</el-scrollbar>
			</el-card>
		</el-col>
	</el-row>
</template>

<script lang="ts" setup>
import { ChatItem } from '@tdesign-vue-next/chat'
import { computed, reactive, ref, watch } from 'vue'
import constant from '@/utils/constant'
import cache from '@/utils/cache'
import MaUserInput from '@/components/ma-user/ma-user-input/index.vue'
import { ElNotification } from 'element-plus'
import service from '@/utils/request'
import { useWebSocket } from '@vueuse/core'
import { useUserStore } from '@/store/modules/user'

const webSocketUrl = ref(constant.apiUrl.replace('http://', 'ws://').replace('https://', 'wss://') + '/ws?access_token=' + cache.getToken())
const { data, status, open, close } = useWebSocket(webSocketUrl, {
	autoReconnect: true,
	onConnected() {
		console.log('websocket connected')
	},
	onError() {
		ElNotification({
			type: 'error',
			title: '连接中断',
			message: 'WebSocket连接，已断开！'
		})
	}
})
watch(
	() => data.value,
	val => {
		const result = JSON.parse(val)

		const message: any = {
			name: result.data.name,
			avatar: result.data.avatar,
			content: result.data.content,
			sendTime: result.data.sendTime
		}
		messageList.value.push(message)
	}
)

const openState = computed(() => status.value === 'OPEN')
const handleConnect = () => {
	if (openState.value) {
		close()
	} else {
		open()
	}
}

const messageList = ref<any[]>([])

const dataFormRef = ref()
const dataForm = reactive({
	content: '',
	userId: ''
})

const dataRules = ref({
	content: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	userId: [{ required: true, message: '必填项不能为空', trigger: 'blur' }]
})

const submitHandle = () => {
	dataFormRef.value.validate((valid: boolean) => {
		if (!valid) {
			return false
		}

		service.postForm('/ws/message/send', dataForm).then(() => {
			// 发送成功
			const userStore = useUserStore()
			const message: any = {
				name: userStore.user.realName,
				avatar: userStore.user.avatar,
				content: dataForm.content,
				sendTime: getCurrentDate()
			}
			messageList.value.push(message)

			// 清空输入框
			dataForm.content = ''
		})
	})
}

// 当前时间
const getCurrentDate = () => {
	return new Date().toLocaleString('zh-CN', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit'
	})
}
</script>
<style lang="scss">
@import '@tdesign-vue-next/chat/dist/tdesign-vue-chat.min.css';
</style>
