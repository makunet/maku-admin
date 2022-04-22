import { userStore } from './modules/user'
import { routerStore } from './modules/router'
import { appStore } from './modules/app'
import { tabsStore } from './modules/tabs'

const store: any = {}

export const registerStore = () => {
	store.userStore = userStore()
	store.routerStore = routerStore()
	store.appStore = appStore()
	store.tabsStore = tabsStore()
}

export default store
