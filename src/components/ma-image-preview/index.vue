<template>
	<div v-if="show" class="preview-wrap" @mousewheel="handleMousewheel">
		<div class="preview" @click="handleClickMask">
			<img
				class="preview-content"
				:src="imgList[imgIndex]"
				:style="{ top: imgTop + 'px', left: imgLeft + 'px', transform: `scale(${imgScale}) rotateZ(${imgRotate}deg)` }"
				@click.stop="preventDefault"
				@mousedown="handleMoveStart"
			/>
			<div class="preview-footer" @click.stop="preventDefault">
				<ul class="preview-footer-tools">
					<li v-if="imgList.length > 1" @click="handleSwitch('prev')">
						<ma-icon icon="ma-prev"></ma-icon>
					</li>

					<li @click="handleScale('reduce')">
						<ma-icon icon="ma-suoxiao"></ma-icon>
					</li>
					<li @click="handleScale('add')">
						<ma-icon icon="ma-fangda"></ma-icon>
					</li>
					<li @click="imgScale = 1">
						<ma-icon icon="ma-real-size"></ma-icon>
					</li>
					<li @click="handleRotate('left')">
						<ma-icon icon="ma-rotate-left"></ma-icon>
					</li>
					<li @click="handleRotate('right')">
						<ma-icon icon="ma-rotate-right"></ma-icon>
					</li>
					<li v-if="imgList.length > 1" @click="handleSwitch('next')">
						<ma-icon icon="ma-next"></ma-icon>
					</li>
				</ul>
			</div>
			<span class="close-icon" @click="show = false">
				<ma-icon icon="ma-close" color="#fff" style="font-size: 25px"></ma-icon>
			</span>
		</div>
	</div>
</template>

<script lang="ts" setup name="MaImagePreview">
import { reactive, toRefs, watch } from 'vue'
import { PreviewState } from './types'

const state = reactive<PreviewState>({
	show: false, // 是否显示预览
	imgIndex: 0, // 预览图片的索引
	imgList: [], // 需要预览的图片数组
	imgTop: 0, // 图片定位置top
	imgLeft: 0, // 图片定位置left
	startPageX: 0, // 按下鼠标时当前鼠标所在位置x
	startPageY: 0, // 按下鼠标时当前鼠标所在位置y
	imgScale: 1, // 图片缩放
	imgRotate: 0 // 图片旋转
})

// 旋转
const handleRotate = (type: string) => {
	if (type === 'left') {
		state.imgRotate -= 90
	} else {
		state.imgRotate += 90
	}
}
// 图片切换
const handleSwitch = (type: 'prev' | 'next') => {
	const length = state.imgList.length
	if (length < 2) {
		return
	}

	if (type === 'prev') {
		state.imgIndex = state.imgIndex === 0 ? length - 1 : state.imgIndex - 1

		return
	}

	state.imgIndex = state.imgIndex === length - 1 ? 0 : state.imgIndex + 1
}

// 点击遮罩  开启点击遮罩关闭
const handleClickMask = () => {
	//state.show = false
}
// 鼠标滚轮缩放图片  开启鼠标滚轮缩放
const handleMousewheel = (e: any) => {
	// 火狐浏览器为e.detail 其他浏览器均为e.wheelDelta
	if (e.wheelDelta > 0 || e.detail > 0) {
		handleScale('add')
	} else if (e.wheelDelta < 0 || e.detail < 0) {
		handleScale('reduce')
	}
}
// 缩放 type=add:加 reduce:减
const handleScale = (type: 'add' | 'reduce') => {
	if (type === 'add' && state.imgScale < 4) {
		state.imgScale += 0.1
	} else if (type === 'reduce' && state.imgScale > 0.5) {
		state.imgScale -= 0.1
	}
}
// 按下鼠标开始移动图片
const handleMoveStart = (e: any) => {
	const { pageX, pageY } = e
	state.startPageX = pageX - state.imgLeft
	state.startPageY = pageY - state.imgTop
	document.addEventListener('mousemove', handleMore, false)
	document.addEventListener('mouseup', clearEvent, false)
	e.preventDefault()
}
// 键盘按下  开启esc按键关闭
const listenerKeydown = () => {
	state.show = false
}
// 移除事件
const clearEvent = () => {
	document.removeEventListener('mousemove', handleMore, false)
}
// 按住鼠标移动时的处理
const handleMore = (e: any) => {
	const { pageX, pageY } = e
	state.imgTop = pageY - state.startPageY
	state.imgLeft = pageX - state.startPageX
	preventDefault(e)
}
// 阻止默认行为
const preventDefault = (e: any) => {
	e.preventDefault()
}
// 关闭时重置值
const reset = () => {
	state.imgList = []
	state.imgIndex = 0
	state.imgTop = 0
	state.imgLeft = 0
	state.startPageX = 0
	state.startPageY = 0
	state.imgScale = 1
	state.imgRotate = 0
}

watch(
	() => state.show,
	v => {
		if (v) {
			document.body.style.overflow = 'hidden'
			document.addEventListener('mousemove', preventDefault, false)
			document.addEventListener('keydown', listenerKeydown, false)
		} else {
			document.body.style.overflow = ''
			document.removeEventListener('mousemove', preventDefault, false)
			document.removeEventListener('mouseup', clearEvent, false)
			document.removeEventListener('keydown', listenerKeydown, false)
			reset()
		}
	},
	{ immediate: true }
)

const { show, imgIndex, imgList, imgTop, imgLeft, imgScale, imgRotate } = toRefs(state)

defineExpose({
	state
})
</script>

<style lang="scss" scoped>
.preview-wrap {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 99999;
	background: rgba(0, 0, 0, 0.5);
	user-select: none;

	li {
		list-style: none;
	}

	.preview {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100vw;
		height: 100vh;
		&-content {
			position: relative;
			cursor: move;
			transition: 0.2s transform;
			max-height: 100vh;
		}
		&-footer {
			position: absolute;
			bottom: 20px;
			left: 50%;
			transform: translateX(-50%);
			&-tools {
				display: flex;
				justify-content: center;
				border-radius: 20px;
				padding: 0 15px;
				background: rgba(110, 110, 110, 0.6);

				li {
					font-size: 22px;
					margin: 10px;
					color: #fff;
					&:active {
						color: #ccc;
					}
					&:hover {
						color: #ccc;
					}
					cursor: pointer;
				}
			}

			&-thumbs {
				margin-top: 20px;
				max-width: 700px;
				padding-bottom: 10px;
				overflow-x: auto;
				white-space: nowrap;
				&::-webkit-scrollbar {
					height: 10px;
				}

				&::-webkit-scrollbar-thumb {
					border-radius: 10px;
					-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
					background: #d2d2d2;
					cursor: pointer;
				}

				&::-webkit-scrollbar-track {
					border-radius: 10px;
					background: #fff;
				}
			}
		}
		.close-icon {
			padding: 10px;
			position: absolute;
			top: 30px;
			right: 30px;
			border-radius: 50%;
			background: rgba(110, 110, 110, 0.7);
			cursor: pointer;
			> img {
				display: block;
				width: 30px;
				height: 30px;
			}
			&:active {
				filter: brightness(0.8);
			}
			&:hover {
				filter: brightness(1.2);
			}
		}
	}
}
</style>
