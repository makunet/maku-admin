import type { App, Plugin } from 'vue'
import SvgIcon from '@/components/svg-icon/index.vue'
import MaDictLabel from '@/components/ma-dict/ma-dict-label/index.vue'
import MaDictColumn from '@/components/ma-dict/ma-dict-column/index.vue'
import MaDictRadio from '@/components/ma-dict/ma-dict-radio/index.vue'
import MaDictSelect from '@/components/ma-dict/ma-dict-select/index.vue'
import MaUserInput from '@/components/ma-user/ma-user-input/index.vue'
import MaUserDialog from '@/components/ma-user/ma-user-dialog/index.vue'
import MaOrgSelect from '@/components/ma-org/ma-org-select/index.vue'
import MaOrgDialog from '@/components/ma-org/ma-org-dialog/index.vue'

const components = [SvgIcon, MaDictLabel, MaDictColumn, MaDictRadio, MaDictSelect, MaUserInput, MaUserDialog, MaOrgSelect, MaOrgDialog]

const MaComponent: Plugin = {
	install(app: App) {
		components.forEach((component: any) => {
			app.component(component.name, component)
		})
	}
}

export default MaComponent
