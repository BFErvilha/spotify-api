<template>
	<div class="container d-flex align-center p-0">
		<div class="col-md-12 profile">
			<img :src="userData.images[1].url" :alt="userData.display_name" />
			<h2>{{ userData.display_name }}</h2>

			<button class="btn btn-primary" @click="logout">Sair</button>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent, watchEffect, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default defineComponent({
	name: 'Profile',

	setup() {
		const store = useStore()
		const router = useRouter()
		const userData = ref(store.getters['spotify/userData'] || { images: [{ url: '' }], display_name: '' })

		const logout = () => {
			store.dispatch('spotify/logout')
			router.push({ name: 'login' })
		}

		watchEffect(() => {
			if (!store.getters['spotify/userData']) {
				store.dispatch('spotify/getUser').then(() => {
					userData.value = store.getters['spotify/userData'] || { images: [{ url: '' }], display_name: '' }
				})
			}
		})

		return { userData, logout }
	},
})
</script>
<style lang="scss">
.profile {
	text-align: center;
	margin-top: 20%;

	img {
		width: 128px;
		height: 128px;
		border-radius: 64px;
	}
}
</style>
