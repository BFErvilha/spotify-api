<template>
	<div class="bottom-nav" v-if="isMobile">
		<div class="nav-content">
			<ul class="nav-menu">
				<li v-for="(item, index) in menu" :key="index">
					<router-link :to="item.url" class="nav-link" :class="{ active: actualRoute === item.name }">
						<menu-icons :icon="item.icon" :active="actualRoute === item.name" />
						<span>{{ item.title }} </span>
					</router-link>
				</li>
			</ul>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent, computed, ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { menu } from './menuList'
import menuIcons from '@/components/spotify/icons.vue'

export default defineComponent({
	name: 'BottomNav',
	components: {
		menuIcons,
	},
	props: {
		isCollapsed: {
			type: Boolean,
			default: false,
		},
	},
	setup() {
		const route = useRoute()
		const isMobile = ref(window.innerWidth <= 768)

		const handleResize = () => {
			isMobile.value = window.innerWidth <= 768
		}

		onMounted(() => {
			window.addEventListener('resize', handleResize)
		})

		onUnmounted(() => {
			window.removeEventListener('resize', handleResize)
		})

		const actualRoute = computed(() => route.meta.menu)

		return {
			menu,
			actualRoute,
			isMobile,
		}
	},
})
</script>
<style lang="scss" scoped>
*,
*::before,
*::after {
	box-sizing: border-box;
}

.bottom-nav {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	max-width: 100vw;
	background-color: #000000;
	z-index: 1000;
	overflow-x: hidden;
}

.nav-content {
	display: flex;
	justify-content: space-around;
	align-items: center;
	padding: 10px 0;
}

.nav-menu {
	display: flex;
	list-style: none;
	width: 100%;
	justify-content: space-around;
	padding: 0;
	margin: 0;
	li {
		.nav-link {
			display: flex;
			flex-direction: column;
			align-items: center;
			span {
				margin-top: 8px;
				font-size: 12px;
				color: #949ea2;
			}

			&.active span {
				color: white;
			}
		}
	}
}

@media (min-width: 769px) {
	.bottom-nav {
		display: none;
	}
}
</style>
