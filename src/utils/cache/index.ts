import { SessionStorage, Storage } from '@/utils/storage'
import CacheKey from '@/utils/cache/key'
import { ITheme } from '@/store/theme/interface'
import { themeConfig } from '@/store/theme/config'

// 缓存
class Cache {
	getToken = (): string => {
		return Storage.getItem(CacheKey.TokenKey) || ''
	}

	setToken = (value: string) => {
		Storage.setItem(CacheKey.TokenKey, value)
	}

	getRefreshToken = (): string => {
		return Storage.getItem(CacheKey.RefreshTokenKey) || ''
	}

	setRefreshToken = (value: string) => {
		Storage.setItem(CacheKey.RefreshTokenKey, value)
	}

	getSidebarOpened = (): boolean => {
		return Storage.getItem(CacheKey.SidebarOpenedKey) || false
	}

	setSidebarOpened = (value: boolean) => {
		Storage.setItem(CacheKey.SidebarOpenedKey, value)
	}

	getLanguage = (): string => {
		return Storage.getItem(CacheKey.LangKey) || 'zh-CN'
	}

	setLanguage = (value: string) => {
		Storage.setItem(CacheKey.LangKey, value)
	}

	getComponentSize = (): string => {
		return Storage.getItem(CacheKey.ComponentSizeKey) || 'default'
	}

	setComponentSize = (value: string) => {
		Storage.setItem(CacheKey.ComponentSizeKey, value)
	}

	getTheme = (): ITheme => {
		return (SessionStorage.getItem(CacheKey.ThemeKey) as ITheme) || themeConfig
	}

	setTheme = (value: ITheme) => {
		SessionStorage.setItem(CacheKey.ThemeKey, value)
	}

	removeTheme = () => {
		SessionStorage.removeItem(CacheKey.ThemeKey)
	}

	getRedirect = (): string => {
		return Storage.getItem(CacheKey.Redirect)
	}

	setRedirect = (value: string) => {
		Storage.setItem(CacheKey.Redirect, value)
	}
}

export default new Cache()
