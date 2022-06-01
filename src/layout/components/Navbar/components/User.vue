<template>
	<el-dropdown class="avatar-container" trigger="hover">
		<div class="avatar-wrapper">
			<el-avatar shape="circle" :size="30" :src="store.userStore.user.avatar"></el-avatar>
			<span>{{ store.userStore.user.username }}</span>
			<el-icon class="el-icon--right"><ArrowDown /></el-icon>
		</div>
		<template #dropdown>
			<el-dropdown-menu class="user-dropdown">
				<router-link to="/profile/password">
					<el-dropdown-item> {{ $t('router.profilePassword') }} </el-dropdown-item>
				</router-link>
				<el-dropdown-item divided @click="logout"> {{ $t('app.signOut') }} </el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
</template>

<script setup lang="ts">
import store from '@/store'
import { useRouter } from 'vue-router'
import { ArrowDown } from '@element-plus/icons-vue'

const router = useRouter()

const logout = () => {
	store.userStore.logoutAction().then(() => {
		// router.push({ path: '/login' })

		// 刷新页面
		location.reload()
	})
}
</script>

<style lang="scss" scoped>
.avatar-container {
	display: flex;
	align-items: center;
	justify-content: flex-end;
	height: var(--theme-header-height);
	.avatar-wrapper {
		display: flex;
		align-items: center;
		white-space: nowrap;
		cursor: pointer;
		padding: 0 8px;
		color: var(--theme-header-text-color);
		span {
			margin-left: 6px;
		}
	}
	//&:hover {
	//	background: var(--theme-header-hover-color);
	//}
}
</style>
