<template>
	<div>
		<div>sidebar</div>
	</div>
	<main>
		<router-view />
	</main>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'LayoutVertical',
})
</script>
