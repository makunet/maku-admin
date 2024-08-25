<template>
	<el-dialog v-model="visible" :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false" draggable>
		<el-form ref="dataFormRef" :model="dataForm" :rules="dataRules" label-width="80px">
			<el-form-item prop="dictType" label="字典类型">
				<el-input v-model="dataForm.dictType" placeholder="字典类型"></el-input>
			</el-form-item>
			<el-form-item prop="dictName" label="字典名称">
				<el-input v-model="dataForm.dictName" placeholder="字典名称"></el-input>
			</el-form-item>
			<el-form-item prop="pid" label="上级节点">
				<ma-data-tree-select
					v-model="dataForm.pid"
					url="/sys/dict/type/list"
					:props="{ label: 'dictType', children: 'children' }"
					placeholder="请选择上级"
				></ma-data-tree-select>
			</el-form-item>
			<el-form-item prop="sort" label="排序">
				<el-input-number v-model="dataForm.sort" controls-position="right" :min="0" aria-label="排序"></el-input-number>
			</el-form-item>
			<el-form-item prop="remark" label="备注">
				<el-input v-model="dataForm.remark" placeholder="备注"></el-input>
			</el-form-item>
			<el-form-item label="数据来源" prop="dictSource">
				<el-radio-group v-model="dataForm.dictSource">
					<el-radio-button :value="0">字典数据</el-radio-button>
					<el-radio-button :value="1">动态SQL</el-radio-button>
				</el-radio-group>
			</el-form-item>
			<el-form-item v-if="dataForm.dictSource === 1" prop="dictSql" label="动态SQL">
				<el-input
					v-model="dataForm.dictSql"
					type="textarea"
					:rows="6"
					placeholder="如：select id as dictValue, name as dictLabel from sys_role where deleted = 0"
				></el-input>
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
import { useDictTypeApi, useDictTypeSubmitApi } from '@/api/sys/dict'

const emit = defineEmits(['refreshDataList'])

const visible = ref(false)
const dataFormRef = ref()
const dataForm = reactive({
	id: '',
	dictType: '',
	dictName: '',
	sort: 0,
	pid: '',
	dictSource: 0,
	dictSql: '',
	remark: ''
})

const dataRules = ref({
	dictType: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	dictName: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	dictSource: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	dictSql: [{ required: true, message: '必填项不能为空', trigger: 'blur' }]
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
		getDictType(id)
	}
}

const getDictType = (id: number) => {
	useDictTypeApi(id).then(res => {
		Object.assign(dataForm, res.data)
	})
}

// 表单提交
const submitHandle = () => {
	dataFormRef.value.validate((valid: boolean) => {
		if (!valid) {
			return false
		}

		useDictTypeSubmitApi(dataForm).then(() => {
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
	init
})
</script>
