<template>
	<el-card>
		<online-table :router="router"></online-table>
	</el-card>
</template>

<script setup lang="ts" name="OnlineTableIndex">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>
