<template>
	<div class="navbar-search">
		<ma-icon icon="icon-search" @click="openSearch"></ma-icon>
		<el-dialog v-model="visible" :width="280" :destroy-on-close="true" :modal="false" fullscreen :show-close="false">
			<el-autocomplete
				ref="menuAutocompleteRef"
				v-model="menuValue"
				size="large"
				:prefix-icon="Search"
				:fetch-suggestions="menuSearch"
				placeholder="菜单搜索"
				@select="handleSelect"
				@blur="handleBlur"
			>
				<template #default="{ item }">
					<ma-icon :icon="item.meta.icon" />
					{{ item.meta.title }}
				</template>
			</el-autocomplete>
		</el-dialog>
	</div>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import { nextTick, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useRouterStore } from '@/store/modules/router'

const routerStore = useRouterStore()
const router = useRouter()
const menuAutocompleteRef = ref()
const visible = ref(false)
const menuValue = ref('')

const openSearch = () => {
	visible.value = true

	nextTick(() => {
		setTimeout(() => {
			menuAutocompleteRef.value.focus()
		})
	})
}

interface Restaurant {
	path: string
	meta: {
		title: string
	}
}

// 获取菜单列表
const menuList = routerStore.searchMenu

// 菜单搜索
const menuSearch = (queryString: string, cb: any) => {
	const results = queryString ? menuList.filter(createFilter(queryString)) : menuList
	cb(results)
}

const createFilter: any = (queryString: string) => {
	return (restaurant: Restaurant) => {
		return (
			restaurant.path.toLowerCase().indexOf(queryString.toLowerCase()) > -1 ||
			restaurant.meta.title.toLowerCase().indexOf(queryString.toLowerCase()) > -1
		)
	}
}

const handleSelect = (item: Restaurant) => {
	router.push(item.path)
	visible.value = false
}
const handleBlur = () => {
	visible.value = false
}
</script>

<style lang="scss" scoped>
.navbar-search {
	:deep(.el-dialog) {
		box-shadow: unset !important;
		border-radius: 0 !important;
		background: rgba(0, 0, 0, 0.5);
	}
	:deep(.el-autocomplete) {
		width: 560px;
		position: absolute;
		top: 100px;
		left: 50%;
		transform: translateX(-50%);
	}
}
</style>
