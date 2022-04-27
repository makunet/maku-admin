import { IHooksOptions } from '@/hooks/interface'
import service from '@/utils/request'
import { onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

export const useCrud = (options: IHooksOptions) => {
	const defaultOptions: IHooksOptions = {
		createdIsNeed: true,
		dataListUrl: '',
		isPage: true,
		deleteUrl: '',
		exportUrl: '',
		queryForm: {},
		dataList: [],
		order: '',
		orderField: '',
		page: 1,
		limit: 10,
		total: 0,
		dataListLoading: false,
		dataListSelections: []
	}

	const mergeDefaultOptions = (options: any, props: any): IHooksOptions => {
		for (const key in options) {
			if (!Object.getOwnPropertyDescriptor(props, key)) {
				props[key] = options[key]
			}
		}
		return props
	}

	// 覆盖默认值
	const state = mergeDefaultOptions(defaultOptions, options)

	onMounted(() => {
		if (state.createdIsNeed) {
			query()
		}
	})

	const query = () => {
		if (!state.dataListUrl) {
			return
		}

		state.dataListLoading = true

		service
			.get(state.dataListUrl, {
				data: {
					order: state.order,
					orderField: state.orderField,
					page: state.isPage ? state.page : null,
					limit: state.isPage ? state.limit : null,
					...state.queryForm
				}
			})
			.then((res: any) => {
				state.dataList = state.isPage ? res.data.list : res.data
				state.total = state.isPage ? res.data.total : 0
			})

		state.dataListLoading = false
	}

	const getDataList = () => {
		state.page = 1
		query()
	}

	const deleteHandle = (id: Number | String) => {
		if (!state.deleteUrl) {
			return
		}

		ElMessageBox.confirm('确定进行删除操作?', '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning'
		})
			.then(() => {
				service.delete(state.deleteUrl + '/' + id).then(() => {
					ElMessage.success('删除成功')

					query()
				})
			})
			.catch(() => {})
	}

	const deleteBatchHandle = () => {
		ElMessageBox.confirm('确定进行删除操作?', '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning'
		})
			.then(() => {
				const data = state.dataListSelections
				if (state.deleteUrl) {
					service.delete(state.deleteUrl, { data }).then(() => {
						ElMessage.success('删除成功')

						query()
					})
				}
			})
			.catch(() => {})
	}

	return { getDataList, deleteHandle, deleteBatchHandle }
}
