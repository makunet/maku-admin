<template>
	<span v-html="getDictLabelList(dictType, dictValue)"></span>
</template>

<script setup lang="ts" name="MaDictLabel">
import { getDictLabelList } from '@/utils/tool'

defineProps({
	dictType: {
		type: String,
		required: true
	},
	dictValue: {
		type: [String, Number],
		required: true
	}
})
</script>
