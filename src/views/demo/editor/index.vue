<template>
	<div>
		<ma-editor v-model="editorValue" placeholder="请输入..."></ma-editor>
		<!--		<ma-editor v-model="editorValue2" :disabled="true" placeholder=""></ma-editor>-->
	</div>
</template>

<script lang="ts" setup name="DemoEditorIndex">
import { ref } from 'vue'

const editorValue = ref('<p>maku</p>')
// const editorValue2 = ref('<p>maku</p>')
</script>
