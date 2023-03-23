import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import App from './App.vue'
import { createPinia } from 'pinia'
import { registerStore } from './store'
import { directive } from './utils/directive'
import { router } from './router'
import { i18n } from './i18n'
import 'virtual:svg-icons-register'
import MakuFormDesign from 'maku-form-design'
import 'maku-form-design/lib/style.css'
import 'maku-online/lib/style.css'

import '@/icons/iconfont/iconfont'
import 'element-plus/dist/index.css'
import '@/styles/index.scss'

import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'

import FastTableColumn from '@/components/fast-table-column'
import FastRadioGroup from '@/components/fast-radio-group'
import FastSelect from '@/components/fast-select'
import FastUser from '@/components/fast-user'
import SvgIcon from '@/components/svg-icon'

import { registerOnline } from './utils/online'

VXETable.setup({
	zIndex: 3000,
	select: {
		transfer: true
	}
})

const app = createApp(App)
app.use(createPinia())

// 注册 Pinia
registerStore()

// 表单设计器
app.use(MakuFormDesign)

// 注册 在线开发
registerOnline(app)

// 注册 自定义指令
directive(app)
app.use(router)
app.use(i18n)
app.use(FastTableColumn)
app.use(FastRadioGroup)
app.use(FastSelect)
app.use(FastUser)
app.use(SvgIcon)
app.use(ElementPlus)
app.use(VXETable)
app.mount('#app')
