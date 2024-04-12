<template>
	<div></div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { getUserData } from '@/services/user.services'
import { useStore } from 'vuex'

export default defineComponent({
	name: 'HomeView',

	setup() {
		const store = useStore()
		const loadUserData = async () => {
			try {
				const response = await getUserData()
				store.dispatch('spotify/saveUser', response.data)
			} catch (error) {
				console.error('Falha ao carregar os dados do usuário:', error)
			}
		}

		onMounted(loadUserData)
	},
})
</script>
