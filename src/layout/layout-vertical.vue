<template>
	<div class="app-container">
		<sidenav :isCollapsed="isCollapsed" @update:isCollapsed="updateCollapse" />
		<div class="main-content" :class="{ expanded: !isCollapsed }">
			<router-view />
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import sidenav from '@/layout/navbar/sidenav.vue'

export default defineComponent({
	name: 'LayoutVertical',
	components: {
		sidenav,
	},
	setup() {
		const isCollapsed = ref(true)

		const toggleCollapse = () => {
			isCollapsed.value = !isCollapsed.value
		}

		const updateCollapse = (value: boolean) => {
			isCollapsed.value = value
		}

		return {
			isCollapsed,
			toggleCollapse,
			updateCollapse,
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
		margin-left: 70px;
	}
}
</style>
