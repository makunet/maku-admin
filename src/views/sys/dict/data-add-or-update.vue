<template>
	<el-dialog v-model="visible" :title="!dataForm.id ? '新增' : '修改'" :width="600" :close-on-click-modal="false" draggable>
		<el-form ref="dataFormRef" :model="dataForm" :rules="dataRules" label-width="80px" @keyup.enter="submitHandle()">
			<el-form-item prop="dictValue" label="字典值">
				<el-input v-model="dataForm.dictValue" placeholder="字典值"></el-input>
			</el-form-item>
			<el-form-item prop="dictLabel" label="字典标签">
				<el-input v-model="dataForm.dictLabel" placeholder="字典标签"></el-input>
			</el-form-item>
			<el-form-item prop="labelClass" label="标签样式">
				<el-select v-model="dataForm.labelClass" style="width: 100%" clearable>
					<el-option
						v-for="item in [
							{ value: 'primary', label: 'primary' },
							{ value: 'success', label: 'success' },
							{ value: 'info', label: 'info' },
							{ value: 'warning', label: 'warning' },
							{ value: 'danger', label: 'danger' }
						]"
						:key="item.value"
						:label="item.label"
						:value="item.value"
					>
						<el-tag v-if="item.value === 'primary'" style="width: 100%">{{ item.label }}</el-tag>
						<el-tag v-else style="width: 100%" :type="item.value">{{ item.label }}</el-tag>
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item prop="sort" label="排序">
				<el-input-number v-model="dataForm.sort" controls-position="right" :min="0" aria-label="排序"></el-input-number>
			</el-form-item>
			<el-form-item prop="remark" label="备注">
				<el-input v-model="dataForm.remark" placeholder="备注"></el-input>
			</el-form-item>
		</el-form>
		<template #footer>
			<el-button @click="visible = false">取消</el-button>
			<el-button type="primary" @click="submitHandle()">确定</el-button>
		</template>
	</el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus/es'
import { useDictDataApi, useDictDataSubmitApi } from '@/api/sys/dict'

const emit = defineEmits(['refreshDataList'])

const visible = ref(false)
const dataFormRef = ref()
const dataForm = reactive({
	id: '',
	dictTypeId: 0,
	dictLabel: '',
	dictValue: '',
	labelClass: '',
	sort: 0,
	remark: ''
})

const dataRules = ref({
	dictLabel: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	dictValue: [{ required: true, message: '必填项不能为空', trigger: 'blur' }]
})

const init = (id?: number) => {
	visible.value = true
	dataForm.id = ''

	// 重置表单数据
	if (dataFormRef.value) {
		dataFormRef.value.resetFields()
	}

	// id 存在则为修改
	if (id) {
		getDictData(id)
	}
}

const getDictData = (id: number) => {
	useDictDataApi(id).then(res => {
		Object.assign(dataForm, res.data)
	})
}

// 表单提交
const submitHandle = () => {
	dataFormRef.value.validate((valid: boolean) => {
		if (!valid) {
			return false
		}

		useDictDataSubmitApi(dataForm).then(() => {
			ElMessage.success({
				message: '操作成功',
				duration: 500,
				onClose: () => {
					visible.value = false
					emit('refreshDataList')
				}
			})
		})
	})
}

defineExpose({
	init,
	dataForm
})
</script>
