<template>
	<div>
		<div class="page-header p-30">
			<h1>Top Artistas</h1>
			<p>Aqui você encontra seus artistas preferidos</p>
		</div>
		<template v-if="artists.length > 0">
			<div class="artist p-30" v-infinite-scroll="getArtistsData" infinite-scroll-distance="10">
				<ul class="artist-list">
					<li v-for="(artist, index) in artists" :key="index">
						<ArtistCard :artist="artist" view="artists" />
					</li>
				</ul>
				<Alert :message="alertMessage" :type="alertType" v-model:visible="showAlert" />
			</div>
		</template>
		<template v-else>
			<div class="no-data">
				<p>{{ loading ? 'Carregando...' : 'Nenhum artista preferido encontrado' }}</p>
			</div>
		</template>
	</div>
</template>
<script lang="ts" setup>
import { onUnmounted, onMounted, ref, watch } from 'vue'
import { getTopArtists } from '@/services/user.services'
import type { Artist } from '@/types/artistType'

import Alert from '@/components/Alert.vue'
import ArtistCard from '@/components/ArtistCard.vue'

const artists = ref<Artist[]>([])
const limit = ref(30)
const offset = ref(0)
const loading = ref(false)
const hasMore = ref(true)
const showAlert = ref(false)
const alertMessage = ref('')
const alertType = ref('info')

const getArtistsData = async () => {
	if (loading.value || !hasMore.value) return

	loading.value = true
	try {
		const params = { limit: limit.value, offset: offset.value }
		const response = await getTopArtists(params)
		if (response.data.items.length > 0) {
			artists.value = [...artists.value, ...response.data.items]
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

const onScroll = async () => {
	const { scrollTop, scrollHeight, clientHeight } = document.documentElement
	if (scrollHeight - scrollTop <= clientHeight * 1.5 && hasMore.value) {
		await getArtistsData()
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
	getArtistsData()
	window.addEventListener('scroll', onScroll)
})

onUnmounted(() => {
	window.removeEventListener('scroll', onScroll)
})
</script>

<style lang="scss" scoped>
.artist {
	.artist-list {
		display: grid;
		gap: 20px;
		padding: 0;
		margin: 0;
		list-style: none;

		li {
			max-width: 400px;
			width: 100%;
		}
	}
}
</style>
