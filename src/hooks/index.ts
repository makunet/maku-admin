import { IHooksOptions } from '@/hooks/interface'
import service from '@/utils/request'
import { onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import qs from 'qs'

export const useCrud = (options: IHooksOptions) => {
	const defaultOptions: IHooksOptions = {
		createdIsNeed: true,
		dataListUrl: '',
		isPage: true,
		deleteUrl: '',
		primaryKey: 'id',
		exportUrl: '',
		queryForm: {},
		dataList: [],
		order: '',
		asc: false,
		page: 1,
		limit: 10,
		total: 0,
		pageSizes: [10, 20, 50, 100, 200, 500, 1000],
		dataListLoading: false,
		dataListSelections: [],
		dataListSelectionKeys: []
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
				params: {
					order: state.order,
					asc: state.asc,
					page: state.isPage ? state.page : null,
					limit: state.isPage ? state.limit : null,
					...state.queryForm
				},
				paramsSerializer: params => {
					return qs.stringify(params)
				}
			})
			.then((res: any) => {
				state.dataList = state.isPage ? res.data.list : res.data
				state.total = state.isPage ? res.data.total : 0
			})
			.finally(() => {
				state.dataListLoading = false
			})
	}

	const getDataList = () => {
		state.page = 1
		query()
	}

	const sizeChangeHandle = (val: number) => {
		state.page = 1
		state.limit = val
		query()
	}

	const currentChangeHandle = (val: number) => {
		state.page = val
		query()
	}

	// 多选
	const selectionChangeHandle = (selections: any[]) => {
		state.dataListSelections = selections
		state.dataListSelectionKeys = selections.map((item: any) => state.primaryKey && item[state.primaryKey])
	}

	// 单选值
	const singleSelectionHandle = () => {
		const selectionKeys = state.dataListSelectionKeys ? state.dataListSelectionKeys : []

		if (selectionKeys.length === 0) {
			ElMessage.warning('请选择一条记录')
			return
		}

		if (selectionKeys.length > 1) {
			ElMessage.warning('只能选择一条记录')
			return
		}

		return selectionKeys[0]
	}

	// 排序
	const sortChangeHandle = (data: any) => {
		const { prop, order } = data

		if (prop && order) {
			state.order = prop
			state.asc = order === 'ascending'
		} else {
			state.order = ''
		}

		query()
	}

	const deleteHandle = (key: number | string) => {
		if (!state.deleteUrl) {
			return
		}

		ElMessageBox.confirm('确定进行删除操作?', '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning'
		})
			.then(() => {
				service.delete(state.deleteUrl + '/' + key).then(() => {
					ElMessage.success('删除成功')

					query()
				})
			})
			.catch(() => {})
	}

	const deleteBatchHandle = (key?: number | string) => {
		let data: any[] = []
		if (key) {
			data = [key]
		} else {
			data = state.dataListSelectionKeys ? state.dataListSelectionKeys : []

			if (data.length === 0) {
				ElMessage.warning('请选择删除记录')
				return
			}
		}

		ElMessageBox.confirm('确定进行删除操作?', '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning'
		})
			.then(() => {
				if (state.deleteUrl) {
					service.delete(state.deleteUrl, { data }).then(() => {
						ElMessage.success('删除成功')

						query()
					})
				}
			})
			.catch(() => {})
	}

	const downloadHandle = async (url: string, filename?: string, method: string = 'GET'): Promise<any> => {
		try {
			const res = await service({
				responseType: 'blob',
				url: url,
				method: method
			})
			// 创建a标签
			const down = document.createElement('a')

			// 文件名没传，则使用时间戳
			if (filename) {
				down.download = filename
			} else {
				const downName = res.headers['content-disposition'].split('=')[1]
				down.download = decodeURI(downName)
			}

			// 隐藏a标签
			down.style.display = 'none'

			// 创建下载url
			down.href = URL.createObjectURL(
				new Blob([res.data], {
					type: res.data.type
				})
			)

			// 模拟点击下载
			document.body.appendChild(down)
			down.click()

			// 释放URL
			URL.revokeObjectURL(down.href)
			// 下载完成移除
			document.body.removeChild(down)
		} catch (err: any) {
			ElMessage.error(err.message)
		}
	}

	const reset = (queryRef: any) => {
		queryRef.resetFields()

		getDataList()
	}

	return {
		getDataList,
		sizeChangeHandle,
		currentChangeHandle,
		selectionChangeHandle,
		singleSelectionHandle,
		sortChangeHandle,
		deleteHandle,
		deleteBatchHandle,
		downloadHandle,
		reset
	}
}
