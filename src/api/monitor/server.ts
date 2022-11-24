import service from '@/utils/request'

export const useServerInfoApi = () => {
	return service.get('/monitor/server/info')
}

export const useCpuInfoApi = () => {
	return service.get('/monitor/server/cpu')
}

export const useMemInfoApi = () => {
	return service.get('/monitor/server/mem')
}

export const useJvmInfoApi = () => {
	return service.get('/monitor/server/jvm')
}

export const useSysInfoApi = () => {
	return service.get('/monitor/server/sys')
}

export const useDiskInfoApi = () => {
	return service.get('/monitor/server/disk')
}
