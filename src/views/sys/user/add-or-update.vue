<template>
	<el-dialog v-model="visible" :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false" draggable>
		<el-form ref="dataFormRef" :model="dataForm" :rules="dataRules" label-width="120px" @keyup.enter="submitHandle()">
			<el-row>
				<el-col :span="12">
					<el-form-item prop="username" label="用户名">
						<el-input v-model="dataForm.username" placeholder="用户名"></el-input>
					</el-form-item>
					<el-form-item prop="orgId" label="所属机构">
						<ma-org-select v-model="dataForm.orgId" placeholder="请选择"></ma-org-select>
					</el-form-item>
					<el-form-item prop="mobile" label="手机号">
						<el-input v-model="dataForm.mobile" placeholder="手机号"></el-input>
					</el-form-item>
					<el-form-item prop="password" label="密码">
						<el-input v-model="dataForm.password" type="password" placeholder="密码"></el-input>
					</el-form-item>
					<el-form-item prop="postIdList" label="所属岗位">
						<el-select v-model="dataForm.postIdList" multiple placeholder="所属岗位" style="width: 100%">
							<el-option v-for="post in postList" :key="post.id" :label="post.postName" :value="post.id"></el-option>
						</el-select>
					</el-form-item>
				</el-col>

				<el-col :span="12">
					<el-form-item prop="realName" label="姓名">
						<el-input v-model="dataForm.realName" placeholder="姓名"></el-input>
					</el-form-item>
					<el-form-item prop="gender" label="性别">
						<ma-dict-radio v-model="dataForm.gender" dict-type="user_gender"></ma-dict-radio>
					</el-form-item>
					<el-form-item prop="email" label="邮箱">
						<el-input v-model="dataForm.email" placeholder="邮箱"></el-input>
					</el-form-item>
					<el-form-item prop="roleIdList" label="所属角色">
						<el-select v-model="dataForm.roleIdList" multiple placeholder="所属角色" style="width: 100%">
							<el-option v-for="role in roleList" :key="role.id" :label="role.name" :value="role.id"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item prop="status" label="状态">
						<ma-dict-radio v-model="dataForm.status" dict-type="user_status"></ma-dict-radio>
					</el-form-item>
				</el-col>
			</el-row>
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
import { useUserApi, useUserSubmitApi } from '@/api/sys/user'
import { usePostListApi } from '@/api/sys/post'
import { useRoleListApi } from '@/api/sys/role'

const emit = defineEmits(['refreshDataList'])

const visible = ref(false)
const postList = ref<any[]>([])
const roleList = ref<any[]>([])
const dataFormRef = ref()

const dataForm = reactive({
	id: '',
	username: '',
	realName: '',
	orgId: '',
	password: '',
	gender: 0,
	email: '',
	mobile: '',
	roleIdList: [] as any[],
	postIdList: [] as any[],
	status: 1
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
		getUser(id)
	}

	getPostList()
	getRoleList()
}

// 获取岗位列表
const getPostList = async () => {
	let res = await usePostListApi()
	postList.value = res.data
}

// 获取角色列表
const getRoleList = async () => {
	let res = await useRoleListApi()
	roleList.value = res.data
}

// 获取信息
const getUser = (id: number) => {
	useUserApi(id).then(res => {
		Object.assign(dataForm, res.data)
	})
}

const dataRules = ref({
	username: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	realName: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	mobile: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	orgId: [{ required: true, message: '必填项不能为空', trigger: 'blur' }]
})

// 表单提交
const submitHandle = () => {
	dataFormRef.value.validate((valid: boolean) => {
		if (!valid) {
			return false
		}

		useUserSubmitApi(dataForm).then(() => {
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
