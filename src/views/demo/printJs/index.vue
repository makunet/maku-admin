<template>
	<div id="printJs-vue">
		<el-card shadow="hover" header="页面打印">
			<el-alert title="页面打印演示，使用的是 `print-js`，项目地址：https://github.com/crabbly/Print.js" type="success" :closable="false"></el-alert>
			<p style="margin-top: 10px"><el-button size="default" type="primary" @click="handlePrintJs"> 点击打印 </el-button></p>
		</el-card>
	</div>
</template>

<script lang="ts" setup>
import printJs from 'print-js'

const handlePrintJs = () => {
	printJs({
		printable: 'printJs-vue',
		type: 'html',
		css: ['//unpkg.com/element-plus/dist/index.css'],
		scanStyles: false
	})
}
</script>
