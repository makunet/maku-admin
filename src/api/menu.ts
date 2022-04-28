import service from '@/utils/request'

export const useMenuNavApi = () => {
	return service.get('/sys/menu/nav')
}

export const useAuthorityListApi = () => {
	return service.get('/sys/menu/authority')
}

export const useMenuListApi = (type: Number) => {
	// 菜单类型 0：菜单  1：按钮  2：接口
	const menuType = type === 2 ? 2 : 0

	return service.get('/sys/menu/list?type=' + menuType)
}

export const useMenuApi = (id: Number) => {
	return service.get('/sys/menu/' + id)
}

export const useMenuSubmitApi = (dataForm: any) => {
	if (dataForm.id) {
		return service.put('/sys/menu', dataForm)
	} else {
		return service.post('/sys/menu', dataForm)
	}
}
