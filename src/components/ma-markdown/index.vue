<template>
	<div>
		<v-md-editor :model-value="model" :height="height"></v-md-editor>
	</div>
</template>

<script lang="ts" setup name="MaMarkdown">
import VMdEditor from '@kangc/v-md-editor'
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import '@kangc/v-md-editor/lib/theme/style/github.css'

// highlight
import hljs from 'highlight.js'
VMdEditor.use(githubTheme, {
	Hljs: hljs
})

defineProps({
	height: {
		type: String,
		default: '400px'
	}
})

const model = defineModel<string>()
</script>
