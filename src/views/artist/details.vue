<template>
	<div class="p-30">
		<DetailsHeader :name="artistDetails.artist?.name!" :image="artistDetails.artist?.images[0].url!" />
		<div class="row">
			<div class="col-md-12 col-lg-7 col-xl-9 mb-5" v-infinite-scroll="handleArtistAlbums" infinite-scroll-distance="10">
				<div class="row">
					<div class="col-md-6 col-lg-6 col-xl-4 mt-4 dropdown-container" v-for="album in artistDetails.albums" :key="album.id">
						<ArtistCard :album="album" view="albums" @click="toggleDropdown(album.id)" />
						<div class="dropdown-menu" :class="{ active: activeDropdownId === album.id }">
							<div class="dropdown-header">
								<div class="popularity">
									Popularidade: <span class="badge">{{ selectedAlbum?.popularity }}</span>
								</div>
								<div class="label">Gravadora: {{ selectedAlbum?.label || 'Não possui' }}</div>
							</div>
							<ul class="tracks">
								<li class="track" v-for="(track, index) in selectedAlbum?.tracks" :key="index">
									<span>{{ track.name }} </span>
									<span v-if="track.explicit" class="badge">{{ track.explicit ? 'explicito' : 'livre' }}</span>
									<span :class="{ 'no-badge': !track.explicit }">{{ formatTrackTime(track.duration) }}</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>

			<div class="col-md-12 col-lg-5 col-xl-3">
				<div class="top-ten mb-5">
					<h3 class="title">Top 10</h3>
					<div class="top-tracks" v-for="track in artistDetails.topTracks" :key="track.id">
						<span>{{ track.name }}</span> <span>{{ track.album.name }}</span
						><span> {{ formatTrackTime(track.duration_ms) }}</span>
					</div>
				</div>
				<div class="relationed-artists">
					<h3 class="title">Artistas Rlecionados</h3>
					<div class="row">
						<div class="col-xl-6 mt-3" v-for="artist in firstSixRelatedArtists" :key="artist.id">
							<ArtistCard :artist="artist" view="artists" />
						</div>
					</div>
				</div>
			</div>
		</div>
		<Alert :message="alertMessage" :type="alertType" v-model:visible="showAlert" />
	</div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, watch, computed, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { getArtistDetails, getAlbums, getTopTracks, getRelatedArtists } from '@/services/artist.services'
import { getAlbumDetails } from '@/services/album.services'

import DetailsHeader from '@/components/DetailsHeader.vue'
import ArtistCard from '@/components/ArtistCard.vue'
import Alert from '@/components/Alert.vue'

import type { ArtistDetail } from '@/types/artistType'
import type { Album, Track } from '@/types/albumType'
import moment from 'moment'
import 'moment-duration-format'

type TrackInfo = {
	name: string
	duration: number
	explicit: boolean
}

type AlbumInfo = {
	label: string
	popularity: number
	tracks: TrackInfo[]
}

export default defineComponent({
	name: 'ArtistDetails',
	components: {
		DetailsHeader,
		ArtistCard,
		Alert,
	},
	setup() {
		const route = useRoute()
		const selectedAlbumId = ref<string | null>(null)
		const selectedAlbum = ref<AlbumInfo | null>(null)
		const artistDetails = ref<ArtistDetail>({
			artist: null,
			relatedArtists: null,
			topTracks: null,
			albums: [],
		})
		const limitAlbums = ref(30)
		const offsetAlbums = ref(0)
		const loading = ref(false)
		const hasMore = ref(true)
		const artistId = ref(route.params.id as string)

		const showAlert = ref(false)
		const alertMessage = ref('')
		const alertType = ref('info')

		const handleArtistDetails = async () => {
			try {
				const response = await getArtistDetails(artistId.value)
				artistDetails.value.artist = response.data
			} catch (error) {
				console.error('Erro ao buscar detalhes do artista:', error)
			}
		}

		const handleArtistAlbums = async () => {
			if (loading.value || !hasMore.value) return

			loading.value = true
			try {
				const params = { limit: limitAlbums.value, offset: offsetAlbums.value }
				const response = await getAlbums(artistId.value, params)
				if (response.data.items.length > 0) {
					artistDetails.value.albums = [...artistDetails.value.albums, ...response.data.items]
					offsetAlbums.value += response.data.items.length
				} else {
					hasMore.value = false
				}
			} catch (error) {
				console.error('Erro ao buscar álbuns do artista:', error)
			} finally {
				loading.value = false
			}
		}
		const activeDropdownId = ref<string | null>(null)

		const toggleDropdown = (id: string) => {
			if (activeDropdownId.value === id) {
				activeDropdownId.value = null
			} else {
				activeDropdownId.value = id
				selectedAlbumId.value = id
			}
		}

		const extractAlbumInfo = (album: Album) => {
			const { label, popularity, tracks } = album

			const tracksInfo = tracks.items.map((track: Track) => ({
				name: track.name,
				duration: track.duration_ms,
				explicit: track.explicit,
			}))

			return {
				label,
				popularity,
				tracks: tracksInfo,
			}
		}

		const handleAlbumInfo = async (id: string) => {
			try {
				const response = await getAlbumDetails(id)
				selectedAlbum.value = extractAlbumInfo(response.data)
			} catch (error) {
				console.error('Erro ao buscar albuns do artista:', error)
			}
		}

		const handleTopTracks = async () => {
			try {
				const response = await getTopTracks(artistId.value)
				artistDetails.value.topTracks = response.data.tracks
			} catch (error) {
				console.error('Erro ao buscar top tracks do artista:', error)
			}
		}

		const handleRelatedArtists = async () => {
			try {
				const response = await getRelatedArtists(artistId.value)
				artistDetails.value.relatedArtists = response.data.artists
			} catch (error) {
				console.error('Erro ao buscar artistas relacionados:', error)
			}
		}

		const firstSixRelatedArtists = computed(() => {
			if (artistDetails.value.relatedArtists !== null) {
				return artistDetails.value.relatedArtists.slice(0, 6)
			} else {
				return []
			}
		})

		const formatTrackTime = (track: number) => {
			const duration = moment.duration(track)
			const minutes = Math.floor(duration.asMinutes()).toString().padStart(2, '0')
			const seconds = Math.floor(duration.seconds()).toString().padStart(2, '0')
			return `${minutes}:${seconds}`
		}

		watch(selectedAlbumId, newValue => {
			if (newValue !== null) {
				handleAlbumInfo(newValue)
			}
		})

		const checkAlertCondition = () => {
			if (loading.value) {
				alertMessage.value = 'Carregando mais albuns...'
				alertType.value = 'info'
				showAlert.value = true
			} else if (!hasMore.value) {
				alertMessage.value = 'Todos os albuns foram carregados.'
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
		const loadData = () => {
			handleArtistDetails()
			handleArtistAlbums()
			handleTopTracks()
			handleRelatedArtists()
		}

		watch(
			() => route.params.id,
			(newId, oldId) => {
				if (newId !== oldId) {
					window.location.reload()
				}
			},
		)

		const onScrollAlbums = async () => {
			const { scrollTop, scrollHeight, clientHeight } = document.documentElement
			if (scrollHeight - scrollTop <= clientHeight * 1.5 && hasMore.value) {
				await handleArtistAlbums()
			}
		}

		onMounted(() => {
			loadData()
			window.addEventListener('scroll', onScrollAlbums)
		})

		onUnmounted(() => {
			window.removeEventListener('scroll', onScrollAlbums)
		})

		return {
			artistDetails,
			activeDropdownId,
			toggleDropdown,
			selectedAlbum,
			formatTrackTime,
			firstSixRelatedArtists,
			handleArtistAlbums,
			alertMessage,
			alertType,
			showAlert,
			loading,
		}
	},
})
</script>
<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.top-tracks {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 10px;
	font-size: 14px;
	font-weight: 600;
}
</style>
