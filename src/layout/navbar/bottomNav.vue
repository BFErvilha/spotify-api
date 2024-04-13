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
				<li v-if="!isPwa">
					<div class="nav-link" @click="installPWA">
						<menu-icons icon="pwa" />
						<span> PWA </span>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent, computed, ref, onMounted, onUnmounted, onBeforeUnmount } from 'vue'
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
		const deferredPrompt = ref<BeforeInstallPromptEvent | null>(null)

		const handleResize = () => {
			isMobile.value = window.innerWidth <= 768
		}
		const captureInstallEvent = (event: BeforeInstallPromptEvent) => {
			if (event instanceof CustomEvent && event.type === 'beforeinstallprompt') {
				event.preventDefault()
				const beforeInstallPromptEvent = event as BeforeInstallPromptEvent
				deferredPrompt.value = beforeInstallPromptEvent
			}
		}
		const installPWA = async () => {
			if (deferredPrompt.value) {
				await deferredPrompt.value.prompt()
				const { outcome } = await deferredPrompt.value.userChoice
				if (outcome === 'accepted') {
					console.log('Usuário aceitou a instalação do PWA')
				} else {
					console.log('Usuário recusou a instalação do PWA')
				}
				deferredPrompt.value = null
			}
		}

		const isPwa = () => {
			return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true
		}

		onMounted(() => {
			window.addEventListener('resize', handleResize)
			window.addEventListener('beforeinstallprompt', captureInstallEvent)
		})

		onBeforeUnmount(() => {
			window.removeEventListener('beforeinstallprompt', captureInstallEvent)
		})

		onUnmounted(() => {
			window.removeEventListener('resize', handleResize)
		})

		const actualRoute = computed(() => route.meta.menu)

		return {
			menu,
			actualRoute,
			isMobile,
			installPWA,
			isPwa,
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
