<template>
	<div>
		<ma-markdown v-model="editorValue" height="500px"></ma-markdown>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const editorValue = ref('maku')
</script>
