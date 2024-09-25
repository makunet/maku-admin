import mitt, { Emitter } from 'mitt'

export default mitt() as Emitter<any>

export const enum MittEvent {
	// 左侧菜单树
	LeftTree = 'leftTree'
}
