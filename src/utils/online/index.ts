import type { App } from 'vue'
import MakuOnline from 'maku-online'

const importGlobs = [import.meta.glob('@/utils/*.ts', { eager: true }), import.meta.glob('@/hooks/*.ts', { eager: true })]

export function registerOnline(app: App) {
	app.use(MakuOnline, { onlineImport })
}

function onlineImport(path: string) {
	if (path) {
		for (const glob of importGlobs) {
			for (const key of Object.keys(glob)) {
				if (path === key || `${path}.ts` === key) {
					return glob[key]
				}
			}
		}
	}
	return null
}
