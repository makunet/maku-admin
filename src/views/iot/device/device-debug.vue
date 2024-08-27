<template>
	<h3>需要开启MQTT监听功能</h3>
	<el-divider>服务下发</el-divider>
	<div>
		<el-form v-loading="loading" :model="serviceDebugDataForm">
			<el-row :gutter="30">
				<el-col :span="8">
					<el-form-item label="接入协议" prop="accessProtocol">
						<el-input v-model="propertyDataForm.accessProtocol" disabled />
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="指令" prop="command">
						<ma-dict-select v-model="serviceDebugDataForm.command" dict-type="device_command" style="width: 100%"></ma-dict-select>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="30">
				<el-col :span="16">
					<el-form-item label="设备响应" prop="waitResponse">
						<el-radio-group v-model="serviceDebugDataForm.waitResponse">
							<el-radio value="0" size="large">不等待</el-radio>
							<el-radio value="1" size="large">等待</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="30">
				<el-col :span="16">
					<el-form-item label="指令内容" prop="payload">
						<el-input v-model="serviceDebugDataForm.payload" placeholder="请输入指令内容" clearable />
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="30">
				<el-col :span="8">
					<el-form-item>
						<el-button v-auth="'iot:device:send'" type="primary" @click="serviceDebugHandle(serviceDebugDataForm)"> 下发 </el-button>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
	</div>
	<el-divider>属性上报</el-divider>
	<div>
		<el-form :model="propertyDataForm">
			<el-row :gutter="30">
				<el-col :span="8">
					<el-form-item label="接入协议" prop="accessProtocol">
						<el-input v-model="propertyDataForm.accessProtocol" disabled />
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="属性" prop="propertyType">
						<ma-dict-select v-model="propertyDataForm.propertyType" dict-type="device_property" style="width: 100%"></ma-dict-select>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="30">
				<el-col :span="16">
					<el-form-item label="属性值" prop="payload">
						<template v-if="propertyDataForm.propertyType === 'RUNNING_STATUS'">
							<ma-dict-select v-model="propertyDataForm.payload" dict-type="device_running_status" style="width: 100%"></ma-dict-select>
						</template>
						<template v-else-if="propertyDataForm.propertyType === 'BATTERY_PERCENT'">
							<el-input-number v-model="propertyDataForm.payload" :min="0" :max="100" />
						</template>
						<template v-else-if="propertyDataForm.propertyType === 'TEMPERATURE'">
							<el-input-number v-model="propertyDataForm.payload" :min="0" :max="100" />
						</template>
						<template v-else>
							<el-input v-model="propertyDataForm.payload" placeholder="请输入最新的属性值" clearable />
						</template>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="30">
				<el-col :span="8">
					<el-form-item>
						<el-button v-auth="'iot:device:report'" type="primary" @click="deviceReportAttributeDataHandle(propertyDataForm)">上报 </el-button>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
	</div>
</template>

<script setup lang="ts">
import { defineProps, reactive, ref } from 'vue'
import {
	useIotDeviceAsyncSendCommandApi,
	useIotDeviceSimulateDeviceReportAttributeDataApi,
	useIotDeviceSyncSendCommandDebugApi
} from '@/api/iot/device'
import { ElMessage } from 'element-plus'

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

const serviceDebugDataForm = reactive({
	deviceId: props.deviceId,
	accessProtocol: props.protocolType,
	command: 'LOCK',
	payload: '',
	waitResponse: '0'
})

//设备属性上报表单
const propertyDataForm = reactive({
	deviceId: props.deviceId,
	accessProtocol: props.protocolType,
	propertyType: 'RUNNING_STATUS',
	command: 'LOCK',
	payload: '0'
})

const loading = ref(false)

const serviceDebugHandle = (serviceDebugDataForm: any) => {
	if (serviceDebugDataForm.waitResponse == '1') {
		loading.value = true
		useIotDeviceSyncSendCommandDebugApi(serviceDebugDataForm)
			.then(res => {
				ElMessage.success({
					message: res.data
				})
			})
			.finally(() => {
				loading.value = false
			})
	} else {
		useIotDeviceAsyncSendCommandApi(serviceDebugDataForm).then(() => {
			ElMessage.success({
				message: '服务指令下发成功！'
			})
		})
	}
}

//设备属性上报
const deviceReportAttributeDataHandle = (propertyDataForm: any) => {
	useIotDeviceSimulateDeviceReportAttributeDataApi(propertyDataForm).then(() => {
		ElMessage.success({
			message: '属性上报成功！'
		})
	})
}
</script>
