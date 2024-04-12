<template>
	<component :is="layout">
		<router-view />
	</component>
</template>
<script lang="ts">
import LayoutFull from '@/layout/layout-full.vue'
import LayoutVertical from '@/layout/layout-vertical.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

export default {
	name: 'App',
	components: {
		LayoutVertical,
		LayoutFull,
	},
	setup() {
		const route = useRoute()

		const layout = computed(() => {
			if (route.meta.layout === 'vertical') return 'layout-vertical'
			return 'layout-full'
		})

		return {
			layout,
		}
	},
}
</script>
<style lang="scss">
@import '@/assets/scss/style.scss';
</style>
