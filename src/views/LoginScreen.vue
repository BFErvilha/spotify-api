<template>
	<div class="container d-flex align-center">
		<div class="login">
			<logo />
			<p>Entra com sua conta Spotify clicando no botão abaixo</p>
			<button class="btn btn-primary" @click="login">Entrar</button>
			<div v-if="loading">Carregando...</div>
		</div>
	</div>
</template>
<script lang="ts">
import { loginSpotify } from '@/services/auth.services'
import { defineComponent, ref } from 'vue'
import logo from '@/components/spotify/logo.vue'

export default defineComponent({
	name: 'LoginScreen',
	components: {
		logo,
	},
	setup() {
		const loading = ref(false)

		const login = async () => {
			loading.value = true
			try {
				await loginSpotify()
			} catch (error) {
				console.error('Erro ao fazer login:', error)
				alert('Erro ao fazer login. Por favor, tente novamente.')
				loading.value = false
			}
		}

		return {
			loading,
			login,
		}
	},
})
</script>

<style lang="scss" scoped>
.container {
	justify-content: center;
	height: 97vh;
	text-align: center;

	.login {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;

		p {
			font-family: Rubik;
			font-size: 14px;
			font-weight: 500;
			line-height: 20px;
			letter-spacing: 0.01em;
			text-align: center;
		}
	}
}
</style>
