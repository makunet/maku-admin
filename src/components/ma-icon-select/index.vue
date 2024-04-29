<template>
	<div class="icon-box">
		<el-input ref="inputRef" v-model="model" v-bind="$attrs" :placeholder="placeholder" :clearable="clearable" @clear="clearIcon" @click="openDialog">
			<template #append>
				<ma-icon :icon="model"></ma-icon>
			</template>
		</el-input>
		<el-dialog v-model="dialogVisible" :title="placeholder" top="50px" width="66%">
			<el-input v-model="inputValue" placeholder="搜索图标" size="large" prefix-icon="Search" />
			<el-scrollbar>
				<div class="icon-list">
					<div v-for="item in iconList" :key="item" class="icon-item" @click="selectIcon(item)">
						<ma-icon size="36px" :icon="item"></ma-icon>
						<span>{{ item.replace('icon-', '') }}</span>
					</div>
				</div>
			</el-scrollbar>
		</el-dialog>
	</div>
</template>

<script setup lang="ts" name="MaIconSelect">
import { ref, computed } from 'vue'
import { getIconList } from '@/utils/tool'
interface SelectIconProps {
	title?: string
	clearable?: boolean
	placeholder?: string
}

const props = withDefaults(defineProps<SelectIconProps>(), {
	title: '请选择图标',
	clearable: true,
	placeholder: '请选择图标'
})

const model = defineModel<string>()

// open Dialog
const dialogVisible = ref(false)
const openDialog = () => (dialogVisible.value = true)

const selectIcon = (item: any) => {
	dialogVisible.value = false
	model.value = item
	setTimeout(() => inputRef.value.blur(), 0)
}

// 清空图标
const inputRef = ref()
const clearIcon = () => {
	model.value = ''
	setTimeout(() => inputRef.value.blur(), 0)
}

// 监听搜索框值
const inputValue = ref('')
const customIcons: { [key: string]: any } = getIconList()
const iconList = computed((): { [key: string]: any } => {
	if (!inputValue.value) {
		return getIconList()
	}
	let result: { [key: number]: any } = {}
	customIcons.forEach((item: any, index: number) => {
		if (item.toLowerCase().indexOf(inputValue.value.toLowerCase()) > -1) {
			result[index] = customIcons[index]
		}
	})
	return result
})
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
