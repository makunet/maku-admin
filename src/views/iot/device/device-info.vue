<template>
	<div class="card-container">
		<el-divider content-position="left">设备标识</el-divider>
		<el-row :gutter="30">
			<el-col :span="12">
				<el-form-item label="编码">
					<el-input v-model="dataForm.code" disabled />
				</el-form-item>
			</el-col>
			<el-col :span="12">
				<el-form-item label="设备名称">
					<el-input v-model="dataForm.name" disabled />
				</el-form-item>
			</el-col>
			<el-col :span="12">
				<el-form-item label="唯一标识码">
					<el-input v-model="dataForm.uid" disabled />
				</el-form-item>
			</el-col>
			<el-col :span="12">
				<el-form-item label="设备类型">
					<ma-dict-select v-model="dataForm.type" dict-type="device_type" disabled style="width: 100%"></ma-dict-select>
				</el-form-item>
			</el-col>
		</el-row>
		<el-divider content-position="left">基本信息</el-divider>
		<el-row :gutter="30">
			<el-col :span="12">
				<el-form-item label="设备状态">
					<ma-dict-select v-model="dataForm.status" dict-type="enable_disable" disabled style="width: 100%"></ma-dict-select>
				</el-form-item>
			</el-col>
			<el-col :span="12">
				<el-form-item label="运行状态">
					<ma-dict-select v-model="dataForm.runningStatus" dict-type="device_running_status" disabled style="width: 100%"></ma-dict-select>
				</el-form-item>
			</el-col>
		</el-row>
		<el-row :gutter="30">
			<el-col :span="12">
				<el-form-item label="上线时间">
					<el-input v-model="dataForm.upTime" disabled />
				</el-form-item>
			</el-col>
			<el-col :span="12">
				<el-form-item label="下线时间">
					<el-input v-model="dataForm.downTime" disabled />
				</el-form-item>
			</el-col>
		</el-row>
		<el-row :gutter="30">
			<el-col :span="12">
				<el-form-item label="通信协议">
					<el-input v-model="dataForm.protocolType" disabled />
				</el-form-item>
			</el-col>
			<el-col :span="12">
				<el-form-item label="设备版本">
					<el-input v-model="dataForm.appVersion" disabled />
				</el-form-item>
			</el-col>
		</el-row>
		<el-row :gutter="30">
			<el-col :span="12">
				<el-form-item label="电池电量">
					<el-input v-model="dataForm.batteryPercent" disabled />
				</el-form-item>
			</el-col>
			<el-col :span="12">
				<el-form-item label="设备温度">
					<el-input v-model="dataForm.temperature" disabled />
				</el-form-item>
			</el-col>
		</el-row>
		<el-divider content-position="left">创建信息</el-divider>
		<el-row :gutter="30">
			<el-col :span="12">
				<el-form-item label="创建时间">
					<el-input v-model="dataForm.createTime" disabled />
				</el-form-item>
			</el-col>
			<el-col :span="12">
				<el-form-item label="更新时间">
					<el-input v-model="dataForm.updateTime" disabled />
				</el-form-item>
			</el-col>
		</el-row>
	</div>
</template>

<script setup lang="ts">
import { defineProps, onMounted, reactive, ref } from 'vue'
import { useIotDeviceApi } from '@/api/iot/device'

const visible = ref(false)
const dataFormRef = ref()

const dataForm = reactive({
	id: '',
	code: '',
	name: '',
	type: '',
	uid: '',
	secret: '',
	appVersion: '',
	batteryPercent: '',
	temperature: '',
	protocolType: '',
	status: '',
	runningStatus: '',
	upTime: '',
	downTime: '',
	createTime: '',
	updateTime: ''
})

const props = defineProps({
	deviceId: {
		type: Number,
		required: true
	}
})
const init = () => {
	visible.value = true
	// 重置表单数据
	if (dataFormRef.value) {
		dataFormRef.value.resetFields()
	}

	if (props.deviceId) {
		getIot_device(props.deviceId)
	}
}

const getIot_device = (id: number) => {
	useIotDeviceApi(id).then(res => {
		Object.assign(dataForm, res.data)
	})
}

onMounted(() => {
	init()
})
</script>
<style scoped>
.card-container {
	display: flex;
	flex-direction: column;
	gap: 20px;
}
</style>
