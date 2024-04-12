<template>
	<div>Autenticando...</div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { exchangeCodeForTokens } from '@/services/auth.services'

export default defineComponent({
	name: 'AuthHandler',
	setup() {
		const store = useStore()
		const router = useRouter()
		const route = useRoute()

		const handleAuthentication = async () => {
			const { code, state } = route.query

			if (code && state) {
				try {
					const { accessToken, refreshToken } = await exchangeCodeForTokens(code as string, state as string)
					store.dispatch('spotify/saveTokens', { accessToken, refreshToken })
					localStorage.setItem('tokenSpotify', accessToken)
					localStorage.setItem('tokenRefreshSpotify', refreshToken)
					router.push({ name: 'home' })
				} catch (error) {
					console.error(error)
					alert('Falha na autenticação. Tente novamente.')
					router.push({ name: 'login' })
				}
			} else {
				alert('Código de autorização não fornecido.')
				router.push({ name: 'login' })
			}
		}

		onMounted(() => {
			handleAuthentication()
		})
	},
})
</script>
