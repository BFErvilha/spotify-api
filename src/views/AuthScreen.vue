<template>
	<div>Autenticando...</div>
</template>
<script lang="ts">
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { defineComponent, onMounted } from 'vue'

export default defineComponent({
	name: 'AuthHandler',
	setup() {
		const store = useStore()
		const router = useRouter()
		const route = useRoute()

		const saveTokens = () => {
			const accessToken = route.query.token
			const refreshToken = route.query.refresh_token
			if (accessToken && refreshToken) {
				store.dispatch('spotify/saveTokens', { accessToken, refreshToken })
				localStorage.setItem('tokenSpotify', accessToken as string)
				router.push({ name: 'home' })
			} else {
				alert('Tokens não fornecidos')
			}
		}

		onMounted(saveTokens)
	},
})
</script>
