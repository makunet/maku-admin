<template>
	<div v-if="icon" class="ma-icon">
		<svg :class="`${className}`" :style="`color:${color};width: ${size};height: ${size}`" aria-hidden="true">
			<use :xlink:href="iconName" />
		</svg>
	</div>
</template>

<script setup lang="ts" name="MaIcon">
import { computed } from 'vue'

const props = defineProps({
	icon: {
		type: String,
		default: ''
	},
	color: {
		type: String,
		default: ''
	},
	className: {
		type: String,
		default: ''
	},
	size: {
		type: String,
		default: ''
	}
})

// https://www.iconfont.cn 图标库需使用前缀 icon- 才能匹配
const iconName = computed(() => `#icon-${props.icon.replace('icon-', '')}`)
</script>

<style lang="scss" scoped>
.ma-icon {
	display: inline-block;
	svg {
		width: 1em;
		height: 1em;
		vertical-align: -0.15em;
		fill: currentColor;
		overflow: hidden;
		flex-shrink: 0;
	}
}
</style>
