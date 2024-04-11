<template>
	<div class="page-header p-30">
		<div class="row align-center">
			<div class="col-md-9">
				<h1>Minhas Playlists</h1>
				<p>Sua coleção pessoal de playlists</p>
			</div>
			<div class="col-md-3 text-end">
				<button class="btn btn-primary playlist">Criar Playlist</button>
			</div>
		</div>
		<div class="row mt-5" v-infinite-scroll="getPlaylists" infinite-scroll-distance="10">
			<div class="col-md-6 col-lg-3 mb-5 dropdown-container" v-for="playlist in playlists" :key="playlist.id">
				<PlaylistCard :playlist="playlist" @click="toggleDropdown(playlist.id)" />
				<div class="dropdown-menu playlist-dropdown" :class="{ active: activeDropdownId === playlist.id }">
					<div class="dropdown-header">
						<div class="popularity">
							<span class="badge">{{ playlist.public ? 'Publica' : 'Privada' }}</span>
							<span class="badge">{{ playlist.collaborative ? 'Colaborativa' : 'Pessoal' }}</span>
						</div>
						<div class="label">Total de Musicas: {{ playlist.tracks.total }}</div>
					</div>
					<div class="description" v-if="playlist.description">
						{{ playlist.description }}
					</div>
				</div>
			</div>
		</div>

		<Alert :message="alertMessage" :type="alertType" v-model:visible="showAlert" />
	</div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, watchEffect, watch, onUnmounted } from 'vue'
import { getUserPlaylists } from '@/services/user.services'
import { useStore } from 'vuex'
import type { Playlist } from '@/types/playlistType'

import PlaylistCard from '@/components/PlaylistCard.vue'
import Alert from '@/components/Alert.vue'

export default defineComponent({
	name: 'PlaylistList',
	components: {
		PlaylistCard,
		Alert,
	},
	setup() {
		const playlists = ref<Playlist[]>([])
		const store = useStore()
		const userId = ref(store.getters['spotify/userId'])

		const limit = ref(25)
		const offset = ref(0)
		const loading = ref(false)
		const hasMore = ref(true)
		const showAlert = ref(false)
		const alertMessage = ref('')
		const alertType = ref('info')

		const getPlaylists = async () => {
			if (loading.value || !hasMore.value) return

			loading.value = true
			try {
				const params = { limit: limit.value, offset: offset.value }
				const response = await getUserPlaylists(userId.value, params)
				if (response.data.items.length > 0) {
					playlists.value = [...playlists.value, ...response.data.items]
					offset.value += response.data.items.length
				} else {
					hasMore.value = false
				}
			} catch (error) {
				console.error('Falha ao carregar os dados do usuário:', error)
			} finally {
				loading.value = false
			}
		}

		const activeDropdownId = ref(null)

		const toggleDropdown = (id: any) => {
			if (activeDropdownId.value === id) {
				activeDropdownId.value = null
			} else {
				activeDropdownId.value = id
			}
		}

		watchEffect(() => {
			if (!userId.value) {
				store.dispatch('spotify/getUser').then(() => {
					userId.value = store.getters['spotify/userId']
				})
			}
		})

		const onScroll = async () => {
			const { scrollTop, scrollHeight, clientHeight } = document.documentElement
			// Certifique-se de que a chamada só aconteça se estiver próximo do final da página e não esteja carregando
			if (scrollHeight - scrollTop <= clientHeight * 1.5 && hasMore.value && !loading.value) {
				await getPlaylists()
			}
		}

		const checkAlertCondition = () => {
			if (loading.value) {
				alertMessage.value = 'Carregando mais artistas...'
				alertType.value = 'info'
				showAlert.value = true
			} else if (!hasMore.value) {
				alertMessage.value = 'Todos os artistas foram carregados.'
				alertType.value = 'success'
				showAlert.value = true
			}
		}

		watch([loading, hasMore], checkAlertCondition)
		watch(showAlert, newValue => {
			if (newValue === true) {
				setTimeout(() => {
					showAlert.value = false
				}, 2000)
			}
		})

		onMounted(() => {
			watch(
				userId,
				newUserId => {
					if (newUserId !== null) {
						getPlaylists()
					}
				},
				{ immediate: true },
			)

			window.addEventListener('scroll', onScroll)
		})

		onUnmounted(() => {
			window.removeEventListener('scroll', onScroll)
		})
		return {
			playlists,
			activeDropdownId,
			toggleDropdown,
			loading,
			hasMore,
			showAlert,
			alertMessage,
			alertType,
			getPlaylists,
		}
	},
})
</script>
<style lang="scss" scoped>
.playlist {
	padding: 10px;
	width: 12%;
	width: 185px;
	height: 42px;
	padding: 0px 40px 0px 40px;
	gap: 10px;
	border-radius: 24px;
	opacity: 0px;

	font-size: 16px;
	font-weight: 700;
	line-height: 20px;
	letter-spacing: 0.01em;
	text-align: center;
}

.playlist-dropdown {
	width: 350px;

	.description {
		padding: 10px;
	}
}
</style>
