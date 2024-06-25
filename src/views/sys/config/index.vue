<template>
	<el-card>
		<el-tabs v-model="activeName">
			<el-tab-pane v-auth="'sys:sms:config'" label="短信配置" name="sms">
				<SmsConfig />
			</el-tab-pane>
			<el-tab-pane v-auth="'sys:mail:config'" label="邮件配置" name="email">
				<MailConfig />
			</el-tab-pane>
			<el-tab-pane v-auth="'sys:third:config'" label="第三方登录" name="third">
				<ThirdConfig />
			</el-tab-pane>
		</el-tabs>
	</el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SmsConfig from './sms/index.vue'
import MailConfig from './mail/index.vue'
import ThirdConfig from './third/index.vue'

const activeName = ref('sms')
</script>
