import { createVNode, render, ComponentInternalInstance } from 'vue'
import PreviewContent from './index.vue'
import { PreviewState } from './types'

// 需要预览的图片数组
export function preview(list: any[] = []) {
	if (list.length === 0) {
		return
	}

	const vNode = createVNode(PreviewContent)
	const box = document.createElement('div')
	render(vNode, box)
	document.body.appendChild(box)
	const vm = vNode.component as ComponentInternalInstance
	const state = vm.exposed?.state as PreviewState

	state.imgIndex = 0
	state.imgList = list
	state.show = true
}
