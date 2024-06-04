<template>
	<el-card>
		<design-form :upload="upload"></design-form>
	</el-card>
</template>
<script lang="ts" setup>
// 上传路径
import constant from '@/utils/constant'
import cache from '@/utils/cache'

const upload = constant.onlineUploadUrl + '?access_token=' + cache.getToken()
</script>
