<template>
	<el-card>
		<el-tabs v-model="activeName">
			<el-tab-pane v-auth="'iot:device:info'" label="设备详情" name="info">
				<DeviceInfo :device-id="props.deviceId" />
			</el-tab-pane>
			<el-tab-pane v-auth="'iot:device:info'" label="服务" name="service">
				<DeviceService :device-id="props.deviceId" />
			</el-tab-pane>
			<el-tab-pane v-auth="'iot:device:info'" label="事件" name="event">
				<DeviceEvent :device-id="props.deviceId" />
			</el-tab-pane>
			<el-tab-pane v-auth="'iot:device:update'" label="调试" name="debug">
				<DeviceDebug :device-id="props.deviceId" :protocol-type="props.protocolType" />
			</el-tab-pane>
		</el-tabs>
	</el-card>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue'
import DeviceService from './device-service.vue'
import DeviceEvent from './device-event.vue'
import DeviceInfo from './device-info.vue'
import DeviceDebug from './device-debug.vue'

// 接收来自第一个页面的 deviceId
const props = defineProps({
	deviceId: {
		type: Number,
		required: true
	},
	protocolType: {
		type: String,
		required: true
	}
})

// 默认显示的标签页名称
const activeName = ref('info')
</script>
