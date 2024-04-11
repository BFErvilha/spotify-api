<template>
	<div>{{ userData.display_name }}</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { getUserData } from '@/services/user.services'
import { useStore } from 'vuex'

export default defineComponent({
	name: 'HomeView',

	setup() {
		const store = useStore()
		const userData = ref({} as any | null)
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
