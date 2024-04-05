<template>
	<el-input v-model="userName" :clearable="clearable" readonly :placeholder="placeholder" @clear="model = ''">
		<template #append>
			<el-button icon="Search" @click="visible = true"></el-button>
		</template>
	</el-input>
	<ma-user-dialog :key="visible" v-model:visible="visible" @select="userHandle"></ma-user-dialog>
</template>

<script setup lang="ts" name="MaUserInput">
import { ref, watch } from 'vue'
import { useUserApi } from '@/api/sys/user'

defineProps({
	clearable: {
		type: Boolean,
		required: false,
		default: () => true
	},
	placeholder: {
		type: String,
		required: false,
		default: () => ''
	}
})

const model = defineModel<number | string>()
const visible = ref(false)
const userName = ref()

watch(
	() => model.value,
	async val => {
		if (val) {
			const { data } = await useUserApi(val as string)
			userName.value = data.realName
		} else {
			userName.value = ''
		}
	},
	{
		immediate: true
	}
)

const userHandle = (userId: number) => {
	model.value = userId
}
</script>
