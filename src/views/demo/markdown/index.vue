<template>
	<div>
		<MdEditor v-model="editorValue" height="500px"></MdEditor>
	</div>
</template>

<script lang="ts" setup>
import MdEditor from '@/components/md-editor/index.vue'
import { ref } from 'vue'

const editorValue = ref('maku')
</script>
