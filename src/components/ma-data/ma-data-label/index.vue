<template>
	<span>{{ label }}</span>
</template>

<script setup lang="ts" name="MaDataLabel">
import { PropType, ref } from 'vue'
import { useDataApi } from '@/api/common'

interface Prop {
	value: any
	label: string
}

const props = defineProps({
	url: {
		type: String,
		default: ''
	},
	data: {
		type: Array as PropType<any[]>,
		default: () => []
	},
	value: {
		type: [String, Number],
		required: true
	},
	props: {
		type: Object as PropType<Prop>,
		required: false,
		default: () => ({
			value: 'id',
			label: 'name'
		})
	}
})

const label = ref()

const getDataList = async () => {
	let data = props.data
	if (data.length === 0) {
		if (props.url.length === 0) {
			return
		}

		data = await useDataApi(props.url)
	}

	const val = data.find((item: any) => item[props.props.value] == props.value)
	if (val) {
		label.value = val[props.props.label]
	}
}

getDataList()
</script>
