<template>
	<el-card>
		<online-form :route="route" :dict-list="dictList"></online-form>
	</el-card>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import store from '@/store'

const route = useRoute()
const dictList = store.appStore.dictList
</script>
