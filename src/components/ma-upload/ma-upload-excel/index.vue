<template>
	<el-upload
		:action="uploadUrl"
		:headers="{ Authorization: cache.getToken() }"
		:before-upload="beforeUpload"
		:on-success="handleSuccess"
		:show-file-list="false"
	>
		<slot />
	</el-upload>
</template>

<script setup lang="ts" name="MaUploadExcel">
import type { UploadProps } from 'element-plus'
import constant from '@/utils/constant'
import { ElMessage } from 'element-plus/es'
import cache from '@/utils/cache'

const props = defineProps({
	action: {
		type: String,
		required: true
	}
})

// 上传URL
const uploadUrl = constant.apiUrl + props.action
const handleSuccess: UploadProps['onSuccess'] = (res, file) => {
	if (res.code !== 0) {
		ElMessage.error('上传失败：' + res.msg)
		return false
	}

	ElMessage.success({
		message: '上传成功',
		duration: 500,
		onClose: () => {
			//
		}
	})
}

const beforeUpload: UploadProps['beforeUpload'] = file => {
	if (file.size / 1024 / 1024 / 1024 / 1024 > 1) {
		ElMessage.error('文件大小不能超过100M')
		return false
	}
	return true
}
</script>
