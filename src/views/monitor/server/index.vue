<template>
	<el-card class="monitor-server">
		<el-card class="box-card">
			<template #header>
				<div class="card-header">
					<span>CPU</span>
					<el-button :icon="Refresh" size="small" circle @click="refreshCpuInfo" />
				</div>
			</template>
			<el-descriptions :column="2" border>
				<el-descriptions-item label="CPU 型号">{{ data.cpu.cpuModel }}</el-descriptions-item>
				<el-descriptions-item label="核心数">{{ data.cpu.cpuNum }}</el-descriptions-item>
				<el-descriptions-item label="用户使用率">{{ data.cpu.used }}%</el-descriptions-item>
				<el-descriptions-item label="系统使用率">{{ data.cpu.sys }}%</el-descriptions-item>
				<el-descriptions-item label="当前空闲率">{{ data.cpu.free }}%</el-descriptions-item>
			</el-descriptions>
		</el-card>

		<el-card class="box-card">
			<template #header>
				<div class="card-header">
					<span>系统内存</span>
					<el-button :icon="Refresh" size="small" circle @click="refreshMemInfo" />
				</div>
			</template>
			<el-descriptions :column="2" border>
				<el-descriptions-item label="内存总量">{{ data.mem.total }} GB</el-descriptions-item>
				<el-descriptions-item label="已用内存">{{ data.mem.used }} GB</el-descriptions-item>
				<el-descriptions-item label="剩余内存">{{ data.mem.free }} GB</el-descriptions-item>
				<el-descriptions-item label="内存使用率">{{ data.mem.usage }}%</el-descriptions-item>
			</el-descriptions>
		</el-card>

		<el-card class="box-card">
			<template #header>
				<div class="card-header">
					<span>JVM信息</span>
					<el-button :icon="Refresh" size="small" circle @click="refreshJvmInfo" />
				</div>
			</template>
			<el-descriptions :column="2" border>
				<el-descriptions-item label="名称">{{ data.jvm.name }}</el-descriptions-item>
				<el-descriptions-item label="版本">{{ data.jvm.version }}</el-descriptions-item>
				<el-descriptions-item label="厂商">{{ data.jvm.vendor }}</el-descriptions-item>
				<el-descriptions-item label="最大可用内存">{{ data.jvm.max }} GB</el-descriptions-item>
				<el-descriptions-item label="总内存">{{ data.jvm.total }} GB</el-descriptions-item>
				<el-descriptions-item label="已用内存">{{ data.jvm.used }} GB</el-descriptions-item>
				<el-descriptions-item label="空闲内存">{{ data.jvm.free }} GB</el-descriptions-item>
				<el-descriptions-item label="内存使用率">{{ data.jvm.usage }}%</el-descriptions-item>
				<el-descriptions-item label="Jvm 路径">{{ data.jvm.home }}</el-descriptions-item>
				<el-descriptions-item label="Jar 路径">{{ data.jvm.userDir }}</el-descriptions-item>
				<el-descriptions-item label="启动时间">{{ data.jvm.startTime }}</el-descriptions-item>
				<el-descriptions-item label="运行时间">{{ data.jvm.runTime }}</el-descriptions-item>
				<el-descriptions-item label="运行参数">{{ data.jvm.inputArguments }}</el-descriptions-item>
			</el-descriptions>
		</el-card>

		<el-card class="box-card">
			<template #header>
				<div class="card-header">
					<span>系统信息</span>
					<el-button :icon="Refresh" size="small" circle @click="refreshSysInfo" />
				</div>
			</template>
			<el-descriptions :column="2" border>
				<el-descriptions-item label="操作系统">{{ data.sys.osName }}</el-descriptions-item>
				<el-descriptions-item label="系统架构">{{ data.sys.osArch }}</el-descriptions-item>
				<el-descriptions-item label="系统版本">{{ data.sys.osVersion }}</el-descriptions-item>
				<el-descriptions-item label="系统名称">{{ data.sys.computerName }}</el-descriptions-item>
				<el-descriptions-item label="系统IP">{{ data.sys.computerIp }}</el-descriptions-item>
			</el-descriptions>
		</el-card>

		<el-card class="box-card">
			<template #header>
				<div class="card-header">
					<span>磁盘信息</span>
					<el-button :icon="Refresh" size="small" circle @click="refreshDiskInfo" />
				</div>
			</template>
			<el-table :data="data.disks" header-align="center" style="width: 100%">
				<el-table-column align="center" prop="diskName" label="磁盘名称" />
				<el-table-column align="center" prop="diskType" label="磁盘类型" />
				<el-table-column align="center" prop="dirName" label="磁盘路径" />
				<el-table-column align="center" prop="total" label="总内存" />
				<el-table-column align="center" prop="used" label="已用内存" />
				<el-table-column align="center" prop="free" label="空闲内存" />
				<el-table-column align="center" prop="usage" label="空间使用率">
					<template #default="scope"> {{ scope.row.usage }}% </template>
				</el-table-column>
			</el-table>
		</el-card>
	</el-card>
</template>

<script setup lang="ts">
import { useCpuInfoApi, useMemInfoApi, useJvmInfoApi, useSysInfoApi, useServerInfoApi, useDiskInfoApi } from '@/api/monitor/server'
import { onMounted, reactive } from 'vue'
import { Refresh } from '@element-plus/icons-vue'

const data = reactive({
	cpu: {
		cpuModel: '',
		cpuNum: 0,
		used: 0,
		sys: 0,
		free: 0
	},
	mem: {
		total: 0,
		used: 0,
		free: 0,
		usage: 0
	},
	jvm: {
		name: '',
		version: '',
		vendor: '',
		max: 0,
		total: 0,
		used: 0,
		free: 0,
		usage: 0,
		home: '',
		userDir: '',
		startTime: '',
		runTime: '',
		inputArguments: ''
	},
	sys: {
		osName: '',
		osArch: '',
		osVersion: '',
		computerName: '',
		computerIp: ''
	},
	disks: []
})

const init = onMounted(() => {
	getServerInfo()
})

const getServerInfo = () => {
	useServerInfoApi().then((res: any) => {
		Object.assign(data, res.data)
	})
}

const refreshCpuInfo = () => {
	useCpuInfoApi().then((res: any) => {
		data.cpu = res.data
	})
}

const refreshMemInfo = () => {
	useMemInfoApi().then((res: any) => {
		data.mem = res.data
	})
}

const refreshJvmInfo = () => {
	useJvmInfoApi().then((res: any) => {
		data.jvm = res.data
	})
}

const refreshSysInfo = () => {
	useSysInfoApi().then((res: any) => {
		data.sys = res.data
	})
}

const refreshDiskInfo = () => {
	useDiskInfoApi().then((res: any) => {
		data.disks = res.data
	})
}
</script>

<style lang="scss" scoped>
.monitor-server {
	.box-card {
		margin-bottom: 15px;
	}
	.card-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		span {
			font-size: 16px;
			font-weight: bold;
		}
	}
	::v-deep(.el-descriptions__label) {
		width: 100px !important;
	}
	::v-deep(.el-descriptions__content) {
		width: 400px !important;
	}
}
</style>
