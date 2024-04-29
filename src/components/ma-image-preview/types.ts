export interface PreviewState {
	show: boolean // 是否显示预览
	imgIndex: number // 当前预览图片的索引
	imgList: any[] // 需要预览的图片列表
	imgTop: number // 图片定位 top
	imgLeft: number // 图片定位 left
	startPageX: number // 按下鼠标时当前鼠标所在位置x
	startPageY: number // 按下鼠标时当前鼠标所在位置y
	imgScale: number // 图片缩放
	imgRotate: number // 图片旋转
}
