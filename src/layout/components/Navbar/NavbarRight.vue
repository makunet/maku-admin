<template>
	<div class="navbar-right">
		<Lang />
		<ComponentSize />
		<a href="https://maku.net" target="_blank">
			<ma-icon icon="icon-earth"></ma-icon>
		</a>
		<a href="https://github.com/makunet/maku-admin" target="_blank">
			<ma-icon icon="icon-github-fill"></ma-icon>
		</a>
		<a href="https://gitee.com/makunet/maku-admin" target="_blank">
			<ma-icon icon="icon-gitee-fill-round"></ma-icon>
		</a>
		<Search />
		<Fullscreen />
		<User />
		<ThemeSettings />
	</div>
</template>

<script setup lang="ts">
import Lang from './components/Lang.vue'
import Search from './components/Search.vue'
import ComponentSize from './components/ComponentSize.vue'
import Fullscreen from './components/Fullscreen.vue'
import User from './components/User.vue'
import ThemeSettings from './components/ThemeSettings.vue'
</script>

<style lang="scss" scoped>
.navbar-right {
	display: flex;
	align-items: center;
	justify-content: flex-end;
	&-link {
		height: 100%;
		display: flex;
		align-items: center;
		white-space: nowrap;
		&-photo {
			width: 25px;
			height: 25px;
			border-radius: 100%;
		}
	}
}
</style>
