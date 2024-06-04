<template>
	<el-input v-model="userName" :clearable :disabled :placeholder @clear="model = ''">
		<template #append>
			<el-button icon="Search" @click="visible = true"></el-button>
		</template>
	</el-input>
	<ma-user-dialog v-if="!disabled && visible" :key="visible" v-model="visible" :multiple @select="userHandle"></ma-user-dialog>
</template>

<script setup lang="ts" name="MaUserInput">
import { ref, watch } from 'vue'
import { useRealNameListApi } from '@/api/sys/user'

const props = defineProps({
	multiple: {
		type: Boolean,
		required: false,
		default: false
	},
	clearable: {
		type: Boolean,
		required: false,
		default: () => true
	},
	disabled: {
		type: Boolean,
		required: false,
		default: () => false
	},
	placeholder: {
		type: String,
		required: false,
		default: () => ''
	}
})

const model = defineModel<any | any[]>()
const visible = ref(false)
const userName = ref()

watch(
	() => model.value,
	async val => {
		if (val) {
			const idList = props.multiple ? val : [val]
			if (idList.length > 0) {
				const { data } = await useRealNameListApi(idList)
				userName.value = data.join(',')
			}
		} else {
			userName.value = ''
		}
	},
	{
		immediate: true
	}
)

const emit = defineEmits(['select'])
const userHandle = (rows: any[]) => {
	if (props.multiple) {
		model.value = rows.map((item: any) => item.id)
	} else {
		model.value = rows[0].id
	}
	emit('select', rows)
}
</script>
