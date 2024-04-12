<template>
	<div :class="cardView">
		<router-link v-if="isLinkRequired" :to="contentLink" class="content-link">
			<img :src="contentImage" :alt="contentName" />
			<span>{{ contentName }}</span>
		</router-link>
		<div v-else class="content-link album">
			<img :src="contentImage" :alt="contentName" />
			<div class="info">
				<span class="title">{{ contentName }}</span>
				<span v-if="view === 'albums'" class="date">{{ formatDate(contentReleaseDate) }}</span>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType, ref } from 'vue'
import moment from 'moment'

class LinkManager {
	private static instance: LinkManager = new LinkManager()
	private constructor() {}

	static getInstance(): LinkManager {
		return LinkManager.instance
	}

	getLink(type: string, id: string): string {
		return type === 'artists' ? `/artists/${id}` : ''
	}
}

interface ArtistType {
	id: string
	name: string
	images: Array<{ url: string }>
	release_date: string
}

interface AlbumType {
	id: string
	title: string
	tracks: Array<{ name: string; duration: number }>
	images: Array<{ url: string }>
	name: string
	release_date: string
}
export default defineComponent({
	name: 'ArtistCard',
	props: {
		artist: { type: Object as PropType<ArtistType>, default: () => ({}) },
		album: { type: Object as PropType<AlbumType>, default: () => ({}) },
		view: { type: String, required: true },
	},
	setup(props) {
		const linkManager = LinkManager.getInstance()

		const isLinkRequired = computed(() => props.view === 'artists')
		const content = computed(() => (props.view === 'artists' ? props.artist : props.album))
		const contentLink = computed(() => (isLinkRequired.value ? linkManager.getLink(props.view, content.value.id) : ''))
		const contentImage = computed(() => content.value.images?.[0]?.url ?? '')
		const contentName = computed(() => content.value.name)
		const contentReleaseDate = computed(() => (props.view === 'albums' ? content.value.release_date : ''))
		const cardView = computed(() => (props.view === 'albums' ? 'square' : 'rounded'))

		const formatDate = (dataString: string) => {
			return moment(dataString).format('DD/MM/YYYY')
		}

		const isDropdownOpen = ref(false)

		const toggleDropdown = () => {
			isDropdownOpen.value = !isDropdownOpen.value
		}

		return {
			isLinkRequired,
			contentLink,
			contentImage,
			contentName,
			contentReleaseDate,
			cardView,
			formatDate,
			isDropdownOpen,
			toggleDropdown,
		}
	},
})
</script>
<style lang="scss" scoped>
.content-link {
	overflow: hidden;
	display: flex;
	justify-content: flex-start;
	align-items: center;

	img {
		width: 64px;
		height: 64px;
		opacity: 1;
		object-fit: cover;
	}

	span {
		padding: 10px;
		display: block;
		text-align: center;
		color: white;
		margin-left: 16px;
	}

	&.album {
		cursor: pointer;
		.info {
			span {
				text-align: start;
				padding: 0;
				font-weight: 400;
				line-height: 20px;
				letter-spacing: 0.01em;
				font-family: Rubik;

				&.text {
					font-size: 14px;
				}
				&.date {
					font-size: 12px;
				}
			}
		}
	}
}

.rounded {
	img {
		border-radius: 32px;
	}
}

.square {
	img {
		border-radius: 0px;
	}
}
</style>
