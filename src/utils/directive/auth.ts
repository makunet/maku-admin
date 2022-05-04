import type { App } from 'vue'
import store from '@/store'

export function auth(app: App) {
	// 权限验证
	app.directive('auth', {
		mounted(el, binding) {
			if (!store.userStore.authorityList.some((v: string) => v === binding.value)) {
				el.parentNode.removeChild(el)
			}
		}
	})
}
