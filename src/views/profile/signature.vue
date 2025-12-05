<template>
	<div class="signature-container">
		<el-card shadow="never">
			<div class="signature-header">
				<el-text type="info">我的签名（可直接在画布上签名，完成后点击保存）</el-text>
			</div>
			<div class="signature-content">
				<div class="canvas-wrapper">
					<canvas
						ref="canvasRef"
						class="signature-canvas"
						@mousedown="startDrawing"
						@mousemove="draw"
						@mouseup="stopDrawing"
						@mouseleave="stopDrawing"
						@touchstart="handleTouchStart"
						@touchmove="handleTouchMove"
						@touchend="stopDrawing"
					></canvas>
				</div>
				<div class="signature-actions">
					<el-button @click="clearCanvas">清空</el-button>
					<el-button type="primary" @click="saveSignature">保存签名</el-button>
				</div>
			</div>
		</el-card>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { uploadImg } from '@/api/sys/upload'
import { useUserSignatureApi } from '@/api/sys/user'
import { useUserStore } from '@/store/modules/user'
const userStore = useUserStore()

const canvasRef = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
const isDrawing = ref(false)
const savedSignature = ref<string>('')

// 从本地存储加载已保存的签名
onMounted(() => {
	initCanvas()
	loadSavedSignature()
	window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
	window.removeEventListener('resize', handleResize)
})

// 监听用户信息变化，当签名更新时重新加载
watch(
	() => userStore.user?.signature,
	newSignature => {
		if (newSignature && newSignature !== savedSignature.value) {
			savedSignature.value = newSignature
			setTimeout(() => {
				loadSignatureToCanvas(newSignature)
			}, 100)
		}
	}
)

const initCanvas = () => {
	if (!canvasRef.value) {
		return
	}

	const canvas = canvasRef.value
	const container = canvas.parentElement

	if (container) {
		canvas.width = container.clientWidth - 4
		canvas.height = 400
	}

	ctx = canvas.getContext('2d')
	if (ctx) {
		ctx.lineCap = 'round'
		ctx.lineJoin = 'round'
		ctx.strokeStyle = '#000000'
		ctx.lineWidth = 3
		// 填充背景色
		ctx.fillStyle = '#ffffff'
		ctx.fillRect(0, 0, canvas.width, canvas.height)
	}
}

const handleResize = () => {
	// 保存当前画布内容
	if (!canvasRef.value || !ctx) {
		return
	}
	const imageData = canvasRef.value.toDataURL()

	// 重新初始化画布
	initCanvas()

	// 恢复画布内容
	const img = new Image()
	img.onload = () => {
		if (ctx && canvasRef.value) {
			ctx.drawImage(img, 0, 0)
		}
	}
	img.src = imageData
}

const startDrawing = (e: MouseEvent) => {
	if (!ctx || !canvasRef.value) {
		return
	}
	isDrawing.value = true

	const rect = canvasRef.value.getBoundingClientRect()
	const x = e.clientX - rect.left
	const y = e.clientY - rect.top

	ctx.beginPath()
	ctx.moveTo(x, y)
}

const draw = (e: MouseEvent) => {
	if (!isDrawing.value || !ctx || !canvasRef.value) {
		return
	}

	const rect = canvasRef.value.getBoundingClientRect()
	const x = e.clientX - rect.left
	const y = e.clientY - rect.top

	ctx.lineTo(x, y)
	ctx.stroke()
}

const stopDrawing = () => {
	if (isDrawing.value && ctx) {
		ctx.closePath()
	}
	isDrawing.value = false
}

// 触摸事件支持移动端
const handleTouchStart = (e: TouchEvent) => {
	e.preventDefault()
	if (!ctx || !canvasRef.value) {
		return
	}
	isDrawing.value = true

	const rect = canvasRef.value.getBoundingClientRect()
	const touch = e.touches[0]
	const x = touch.clientX - rect.left
	const y = touch.clientY - rect.top

	ctx.beginPath()
	ctx.moveTo(x, y)
}

const handleTouchMove = (e: TouchEvent) => {
	e.preventDefault()
	if (!isDrawing.value || !ctx || !canvasRef.value) {
		return
	}

	const rect = canvasRef.value.getBoundingClientRect()
	const touch = e.touches[0]
	const x = touch.clientX - rect.left
	const y = touch.clientY - rect.top

	ctx.lineTo(x, y)
	ctx.stroke()
}

const clearCanvas = () => {
	if (!ctx || !canvasRef.value) {
		return
	}

	ctx.fillStyle = '#ffffff'
	ctx.fillRect(0, 0, canvasRef.value.width, canvasRef.value.height)
	ElMessage.success('画布已清空')
}

const saveSignature = async () => {
	if (!canvasRef.value) {
		return
	}

	const dataURL = canvasRef.value.toDataURL('image/png')

	// 将base64转换为Blob对象
	const base64Data = dataURL.split(',')[1]
	const byteCharacters = atob(base64Data)
	const byteNumbers = new Array(byteCharacters.length)
	for (let i = 0; i < byteCharacters.length; i++) {
		byteNumbers[i] = byteCharacters.charCodeAt(i)
	}
	const byteArray = new Uint8Array(byteNumbers)
	const blob = new Blob([byteArray], { type: 'image/png' })

	// 将Blob转换为File对象
	const file = new File([blob], `${userStore.user.username}.png`, { type: 'image/png' })

	// 创建FormData上传图片
	const formData = new FormData()
	formData.append('file', file)

	// 上传签名图片
	const { data } = await uploadImg(formData)
	savedSignature.value = dataURL

	// 更新用户签名
	await useUserSignatureApi({ signature: data.url })

	ElMessage.success('签名已保存')
}

const loadSignatureToCanvas = (imageUrl: string) => {
	if (!ctx || !canvasRef.value) {
		return
	}

	const img = new Image()
	// 设置跨域属性，允许从服务器加载图片
	img.crossOrigin = 'anonymous'
	img.onload = () => {
		if (ctx && canvasRef.value) {
			// 先清空画布并填充白色背景
			ctx.fillStyle = '#ffffff'
			ctx.fillRect(0, 0, canvasRef.value.width, canvasRef.value.height)
			// 绘制签名图片
			ctx.drawImage(img, 0, 0, canvasRef.value.width, canvasRef.value.height)
		}
	}
	img.onerror = error => {
		console.error('加载签名图片失败:', error)
	}
	img.src = imageUrl
}

const loadSavedSignature = () => {
	try {
		const signature = userStore.user?.signature
		if (signature) {
			savedSignature.value = signature
			// 延迟加载签名到画布，确保canvas已初始化
			setTimeout(() => {
				loadSignatureToCanvas(signature)
			}, 100)
		}
	} catch (error) {
		console.error('加载签名失败:', error)
	}
}
</script>

<style scoped lang="scss">
.signature-container {
	.signature-header {
		margin-bottom: 20px;
		font-weight: 600;
	}

	.signature-content {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.canvas-wrapper {
		width: 100%;
		background-color: #f5f5f5;
		border: 2px dashed #dcdfe6;
		border-radius: 8px;
		overflow: hidden;
	}

	.signature-canvas {
		display: block;
		cursor: crosshair;
		touch-action: none;
	}

	.signature-actions {
		display: flex;
		justify-content: center;
		gap: 15px;
	}
}
</style>
