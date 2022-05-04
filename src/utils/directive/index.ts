import type { App } from 'vue'
import { auth } from './auth'

export const directive = (app: App) => {
	// 权限指令
	auth(app)
}
