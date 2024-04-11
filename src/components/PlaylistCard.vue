<template>
	<div class="content-link album">
		<img :src="playlistSummary?.imageUrl" :alt="playlistSummary?.name" />
		<div class="info">
			<span class="title">{{ playlistSummary?.name }}</span>
			<span class="date">{{ playlistSummary?.ownerDisplayName }}</span>
		</div>
	</div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
	props: {
		playlist: {
			type: Object,
			required: true,
			default: () => ({}),
		},
	},
	setup(props) {
		const playlistSummary = computed(() => {
			const { playlist } = props
			console.log(playlist)

			return {
				id: playlist.id,
				name: playlist.name,
				imageUrl: playlist.images[0].url || '@/assets/images/no-image.jpg',
				ownerDisplayName: playlist.owner.display_name,
			}
		})

		return {
			playlistSummary,
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
</style>
