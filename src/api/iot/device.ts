import service from '@/utils/request'

export function useIotDeviceApi(id: number) {
	return service.get('/iot/device/' + id)
}

export const useIotDeviceSubmitApi = (dataForm: any) => {
	if (dataForm.id) {
		return service.put('/iot/device', dataForm)
	} else {
		return service.post('/iot/device', dataForm)
	}
}

// 发送指令，等待设备回复
export const useIotDeviceSyncSendCommandApi = (dataForm: any) => {
	return service.post('/iot/device/syncSendCommand', dataForm)
}
// 发送指令，等待设备回复，调试模式
export const useIotDeviceSyncSendCommandDebugApi = (dataForm: any) => {
	return service.post('/iot/device/syncSendCommand/debug', dataForm)
}

// 发送指令，不等待设备回复
export function useIotDeviceAsyncSendCommandApi(dataForm: any) {
	return service.post('/iot/device/asyncSendCommand', dataForm)
}

//模拟设备属性数据上报
export function useIotDeviceSimulateDeviceReportAttributeDataApi(dataForm: any) {
	return service.post('/iot/device/simulateDeviceReportAttributeData', dataForm)
}
