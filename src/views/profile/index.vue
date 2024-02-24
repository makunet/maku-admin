<template>
	<el-row :gutter="20">
		<el-col :span="8">
			<el-card class="profile-card">
				<template #header> 个人信息 </template>
				<!--				<div>头像</div>-->
				<ul>
					<li>
						<svg-icon icon="icon-user" /> 用户名 <span>{{ userStore.user.username }}</span>
					</li>
					<li>
						<svg-icon icon="icon-idcard" /> 姓名 <span>{{ userStore.user.realName }}</span>
					</li>
					<li>
						<svg-icon icon="icon-phone" /> 手机号码 <span>{{ userStore.user.mobile }}</span>
					</li>
					<li>
						<svg-icon icon="icon-mail" /> 用户邮箱 <span>{{ userStore.user.email || '/' }}</span>
					</li>
					<li>
						<svg-icon icon="icon-apartment" /> 所属机构 <span>{{ userStore.user.orgName || '/' }}</span>
					</li>
					<li>
						<svg-icon icon="icon-tag" /> 所属岗位 <span>{{ userStore.user.postNameList || '/' }} </span>
					</li>
					<li>
						<svg-icon icon="icon-calendar-check" /> 创建日期 <span>{{ userStore.user.createTime }}</span>
					</li>
				</ul>
			</el-card>
		</el-col>
		<el-col :span="16">
			<el-card>
				<template #header> 基本信息 </template>
				<el-tabs v-model="activeName">
					<el-tab-pane label="基本资料" name="info">
						<UserInfo />
					</el-tab-pane>
					<el-tab-pane label="修改密码" name="password">
						<Password />
					</el-tab-pane>
					<el-tab-pane label="第三方登录" name="third" lazy>
						<ThirdLogin />
					</el-tab-pane>
				</el-tabs>
			</el-card>
		</el-col>
	</el-row>
</template>

<script setup lang="ts" name="ProfileIndex">
import { ref } from 'vue'
import { useUserStore } from '@/store/modules/user'
import Password from '@/views/profile/password.vue'
import UserInfo from '@/views/profile/user-info.vue'
import ThirdLogin from '@/views/profile/third-login.vue'

const userStore = useUserStore()
const activeName = ref('info')
</script>

<style scoped lang="scss">
.profile-card {
	ul {
		list-style: none;
		padding: 0;
		li {
			padding: 12px 0;
			border-bottom: 1px solid #f0f0f0;
			&:last-child {
				border-bottom: none;
				padding-top: 12px;
			}
			span {
				float: right;
			}
		}
	}
}
</style>
