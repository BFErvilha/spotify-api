<template>
	<div class="app-container">
		<sidenav v-if="!isMobile" :isCollapsed="isCollapsed" @update:isCollapsed="updateCollapse" />
		<div class="main-content" :class="{ expanded: !isCollapsed }">
			<router-view />
		</div>
		<bottomNav v-if="isMobile" />
	</div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
import sidenav from '@/layout/navbar/sidenav.vue'
import bottomNav from '@/layout/navbar/bottomNav.vue'
export default defineComponent({
	name: 'LayoutVertical',
	components: {
		sidenav,
		bottomNav,
	},
	setup() {
		const isCollapsed = ref(true)

		const toggleCollapse = () => {
			isCollapsed.value = !isCollapsed.value
		}

		const updateCollapse = (value: boolean) => {
			isCollapsed.value = value
		}

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
		return {
			isCollapsed,
			toggleCollapse,
			updateCollapse,
			isMobile,
		}
	},
})
</script>

<style lang="scss" scoped>
.main-content {
	transition: margin-left 0.3s ease;
	margin-left: 250px;
}
.main-content.expanded {
	margin-left: 70px;
}
@media (max-width: 768px) {
	.main-content {
		margin-left: 0px;
		margin-bottom: 100px;
	}
}
</style>
