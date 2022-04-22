<template>
	<div class="settings-switch">
		<span> {{ props.title }}</span>
		<el-switch v-model="value" :disabled="props.disabled" @change="handleChange"></el-switch>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
	modelValue: {
		type: Boolean,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	disabled: {
		type: Boolean
	}
})

const value = ref(props.modelValue)

const emit = defineEmits(['update:modelValue', 'change'])
const handleChange = () => {
	emit('update:modelValue', value)
	emit('change')
}
</script>

<style lang="scss" scoped>
.settings-switch {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-bottom: 15px;
	color: #444;
}
</style>
