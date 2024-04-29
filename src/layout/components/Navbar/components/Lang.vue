<template>
	<el-dropdown trigger="click" @command="languageChange">
		<ma-icon icon="icon-translate"></ma-icon>
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item v-for="language in languages" :key="language" :disabled="locale === language" :command="language">
					{{ messages[language].langName }}
				</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { messages } from '@/i18n'
import { useAppStore } from '@/store/modules/app'

const appStore = useAppStore()
const languages = Object.keys(messages)

const { locale } = useI18n()
const languageChange = (language: string) => {
	appStore.setLanguage(language)
	locale.value = language

	// 刷新页面
	window.location.reload()
}
</script>
