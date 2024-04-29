<template>
	<div class="navbar-settings">
		<ma-icon icon="icon-ellipsis-v" @click="visible = true"></ma-icon>
		<el-drawer v-model="visible" :title="$t('settings.title')" :destroy-on-close="true" :size="280">
			<el-scrollbar class="settings-container">
				<el-space direction="vertical" alignment="flex-start">
					<el-space>
						<el-tooltip key="dark" effect="dark" :content="$t('settings.sidebarDark')" placement="top">
							<div
								class="settings-box-item item-left-dark"
								:class="theme.sidebarStyle === 'dark' ? 'active' : ''"
								@click="handleSidebarTheme('dark')"
							></div>
						</el-tooltip>
						<el-tooltip key="light" effect="dark" :content="$t('settings.sidebarLight')" placement="top">
							<div
								class="settings-box-item item-left-light"
								:class="theme.sidebarStyle === 'light' ? 'active' : ''"
								@click="handleSidebarTheme('light')"
							></div>
						</el-tooltip>
					</el-space>
					<el-space>
						<el-tooltip key="light" effect="dark" :content="$t('settings.navbarLight')" placement="top">
							<div
								class="settings-box-item item-top-light"
								:class="theme.headerStyle === 'light' ? 'active' : ''"
								@click="handleHeaderTheme('light')"
							></div>
						</el-tooltip>
						<el-tooltip key="auto" effect="dark" :content="$t('settings.navbarTheme')" placement="top">
							<div
								class="settings-box-item item-top-theme"
								:class="theme.headerStyle === 'theme' ? 'active' : ''"
								@click="handleHeaderTheme('theme')"
							></div>
						</el-tooltip>
					</el-space>
					<el-space :size="2" wrap>
						<div v-for="color in colors" :key="color">
							<span
								class="theme-color"
								:class="theme.primaryColor === color ? 'active' : ''"
								:style="`background-color: ${color}`"
								@click="handleThemeColor(color)"
							></span>
						</div>
					</el-space>
				</el-space>

				<el-divider content-position="left">{{ $t('settings.layout') }}</el-divider>

				<!-- 布局切换 -->
				<el-space>
					<el-tooltip key="dark" effect="dark" placement="top" :content="$t('settings.vertical')">
						<div
							class="settings-box-item item-vertical"
							:class="theme.layout === 'vertical' ? 'active' : ''"
							@click="handleLayoutTheme('vertical')"
						></div>
					</el-tooltip>
					<el-tooltip key="light" effect="dark" placement="top" :content="$t('settings.columns')">
						<div class="settings-box-item item-columns" :class="theme.layout === 'columns' ? 'active' : ''" @click="handleLayoutTheme('columns')">
							<div class="columns-tips-box"></div>
							<div class="columns-sub-menu"></div>
						</div>
					</el-tooltip>
					<el-tooltip key="light" effect="dark" placement="top" :content="$t('settings.transverse')">
						<div
							class="settings-box-item item-transverse"
							:class="theme.layout === 'transverse' ? 'active' : ''"
							@click="handleLayoutTheme('transverse')"
						></div>
					</el-tooltip>
				</el-space>

				<el-divider content-position="left">{{ $t('settings.interface') }}</el-divider>

				<SwitchItem v-model="isDark" :title="$t('settings.dark')" />
				<SwitchItem v-model="theme.uniqueOpened" :title="$t('settings.uniqueOpened')" @change="handleOtherTheme" />
				<SwitchItem v-model="theme.isLogo" :title="$t('settings.logo')" @change="handleOtherTheme" />
				<SwitchItem v-model="theme.isBreadcrumb" :title="$t('settings.breadcrumb')" @change="handleOtherTheme" />
				<SwitchItem v-model="theme.isTabsView" :title="$t('settings.tabs')" @change="handleOtherTheme" />
				<SwitchItem v-model="theme.isTabsCache" :title="$t('settings.tabsCache')" @change="handleOtherTheme" />
				<SelectItem v-model="theme.tabsStyle" :title="$t('settings.tabsStyle')" :options="tabsStyle" @change="handleOtherTheme" />

				<el-divider />

				<el-space direction="vertical">
					<el-alert :title="$t('settings.tips')" type="warning" :closable="false"> </el-alert>
					<div class="config-btn">
						<el-button type="primary" size="default" :icon="CopyDocument" @click="handleCopyConfig">
							{{ $t('settings.copyConfig') }}
						</el-button>
						<el-button type="info" size="default" :icon="RefreshRight" @click="handleResetConfig">
							{{ $t('settings.reset') }}
						</el-button>
					</div>
				</el-space>
			</el-scrollbar>
		</el-drawer>
	</div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { CopyDocument, RefreshRight } from '@element-plus/icons-vue'
import { useClipboard, useDark } from '@vueuse/core'
import SwitchItem from './components/SwitchItem.vue'
import SelectItem from './components/SelectItem.vue'
import { ElMessage } from 'element-plus'
import { handleThemeStyle } from '@/utils/theme'
import cache from '@/utils/cache'
import emits from '@/utils/emits'
import { useAppStore } from '@/store/modules/app'

const appStore = useAppStore()

const { t } = useI18n()
const { copy } = useClipboard()

// 是否显示
const visible = ref(false)
emits.on('openThemeSettings', () => (visible.value = true))

const colors = [
	'#409eff',
	'#0BB2D4',
	'#3E8EF7',
	'#11C26D',
	'#17B3A3',
	'#667AFA',
	'#997B71',
	'#9463F7',
	'#757575',
	'#EB6709',
	'#F74584',
	'#FCB900',
	'#FF4C52'
]

const tabsStyle = [
	{ label: t('settings.style1'), value: 'style-1' },
	{ label: t('settings.style2'), value: 'style-2' }
]

// 默认主题
const theme = computed(() => appStore.theme)

// 处理布局切换
const handleLayoutTheme = (layout: string) => {
	theme.value.layout = layout
	cache.setTheme(theme.value)
}

// 处理侧边栏主题
const handleSidebarTheme = (style: string) => {
	theme.value.sidebarStyle = style
	cache.setTheme(theme.value)
}

// 处理顶栏主题
const handleHeaderTheme = (style: string) => {
	theme.value.headerStyle = style
	cache.setTheme(theme.value)
}

// 处理暗黑模式
const isDark = useDark()

// 处理其他主题
const handleOtherTheme = () => {
	cache.setTheme(theme.value)
}

// 处理主题色
const handleThemeColor = (color: string) => {
	theme.value.primaryColor = color
	cache.setTheme(theme.value)

	handleThemeStyle(theme.value)
}

// 复制配置
const handleCopyConfig = () => {
	const config = JSON.stringify(theme.value, null, 2)
	copy(config)
	ElMessage.success(t('settings.copySuc'))
}

// 恢复默认
const handleResetConfig = async () => {
	cache.removeTheme()
	window.location.reload()
}
</script>

<style lang="scss" scoped>
.navbar-settings {
	::v-deep(.el-drawer) {
		--el-drawer-padding-primary: unset !important;
	}
}
.settings-container {
	padding: 15px;
	color: #444444;
	.settings-box-item {
		position: relative;
		width: 50px;
		height: 35px;
		margin: 0 20px 20px 0;
		background-color: rgb(240 242 245);
		border-radius: 3px;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
		cursor: pointer;
		&.active {
			&:after {
				content: '';
				width: 6px;
				height: 6px;
				border-radius: 50%;
				background-color: var(--el-color-primary);
				position: absolute;
				left: 50%;
				bottom: -15px;
			}
		}
	}

	.item-left-light {
		&:before {
			position: absolute;
			top: 0;
			left: 0;
			width: 33%;
			height: 100%;
			background-color: #fff;
			content: '';
			border-top-left-radius: 3px;
			border-bottom-left-radius: 3px;
		}
	}

	.item-left-dark {
		&:before {
			position: absolute;
			top: 0;
			left: 0;
			width: 33%;
			height: 100%;
			background-color: #000;
			content: '';
			border-top-left-radius: 3px;
			border-bottom-left-radius: 3px;
		}
	}

	.item-top-light {
		&:before {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 33%;
			background-color: #fff;
			content: '';
			border-top-left-radius: 3px;
			border-top-right-radius: 3px;
		}
	}

	.item-top-theme {
		&:before {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 33%;
			background-color: var(--el-color-primary);
			content: '';
			border-top-left-radius: 3px;
			border-top-right-radius: 3px;
		}
	}

	.theme-color {
		width: 20px;
		height: 20px;
		margin: 8px 8px 0 0;
		border-radius: 2px;
		display: inline-block;
		vertical-align: top;
		position: relative;
		cursor: pointer;
		&.active {
			&:after {
				content: url('data:image/svg+xml;charset=utf-8,<svg width="14" height="14" color="rgb(255 255 255)" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-042ca774=""><path fill="currentColor" d="M406.656 706.944L195.84 496.256a32 32 0 10-45.248 45.248l256 256 512-512a32 32 0 00-45.248-45.248L406.592 706.944z"></path></svg>');
				-webkit-font-smoothing: antialiased;
				-moz-osx-font-smoothing: grayscale;
				position: absolute;
				top: 50%;
				left: 50%;
				margin: -7px 0 0 -7px;
				font-size: 14px;
				color: #ffffff;
			}
		}
	}

	.item-vertical {
		&:before {
			position: absolute;
			top: 0;
			left: 0;
			width: 33%;
			height: 100%;
			background-color: #000;
			content: '';
			border-top-left-radius: 3px;
			border-bottom-left-radius: 3px;
		}
	}

	.item-columns {
		&:before {
			position: absolute;
			top: 0;
			left: 0;
			width: 20%;
			height: 100%;
			background-color: #000;
			content: '';
			border-top-left-radius: 3px;
			border-bottom-left-radius: 3px;
		}
		.columns-tips-box {
			transition: inherit;
			position: relative;
			top: 0;
			left: 20%;
			background-color: #333;
			content: '';
			height: 30%;
			width: 83%;
			border-top-right-radius: 3px;
		}
		.columns-sub-menu {
			transition: inherit;
			position: relative;
			width: 18%;
			top: 0;
			left: 20%;
			background-color: #999;
			content: '';
			height: 70%;
		}
	}

	.item-transverse {
		&:before {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 33%;
			background-color: #333;
			content: '';
			border-top-left-radius: 3px;
			border-top-right-radius: 3px;
		}
	}

	.config-btn {
		button {
			width: 100%;
			margin-top: 10px;
		}
		.el-button + .el-button {
			margin-left: 0;
		}
	}
}
</style>
