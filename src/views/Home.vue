<template>
	<div class="container">
		<div class="col-md-12 home-user">
			<img :src="userData.images?.[1]?.url" :alt="userData.display_name" />
			<h2>
				Olá, <span>{{ userData.display_name }}! </span>
			</h2>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { getUserData } from '@/services/user.services'
import { useStore } from 'vuex'
import type { UserData } from '@/types/userTypes'

export default defineComponent({
	name: 'HomeView',

	setup() {
		const store = useStore()
		const userData = ref<UserData>({} as UserData)
		const loadUserData = async () => {
			try {
				const response = await getUserData()
				store.dispatch('spotify/saveUser', response.data)
				userData.value = response.data
			} catch (error) {
				console.error('Falha ao carregar os dados do usuário:', error)
			}
		}

		onMounted(loadUserData)
		return {
			userData,
		}
	},
})
</script>
<style lang="scss">
.home-user {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	gap: 15px;
	margin-top: 20px;
	img {
		width: 80px;
		height: 80px;
		border-radius: 64px;
	}
	h2 {
		span {
			color: #57b660;
		}
	}
}
</style>
