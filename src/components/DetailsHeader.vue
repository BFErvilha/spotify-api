<template>
	<div class="d-flex align-center justify-content-between">
		<div class="d-flex align-center justify-start">
			<router-link :to="{ name: 'artists' }"><Icons icon="back" /></router-link>
			<span class="artist-name">{{ name }}</span>
		</div>

		<div class="artist-image">
			<img :src="image" :alt="name" loading="lazy" />
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Icons from '@/components/spotify/icons.vue'

export default defineComponent({
	name: 'DetailsHeader',
	components: {
		Icons,
	},
	props: {
		name: {
			type: String,
			required: true,
			default: 'Nome do Artista',
		},
		image: {
			type: String,
			required: true,
			default: '@/assets/images/noimage.jpg',
		},
	},
})
</script>
<style lang="scss" scoped>
.artist-image {
	width: 64px;
	height: 64px;
	overflow: hidden;
	img {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		object-fit: cover;
	}
}

.artist-name {
	margin-left: 10px;
	font-family: 'Rubik';
	font-size: 16px;
	font-weight: 700;
	line-height: 20px;
	letter-spacing: 0.01em;
	text-align: left;
}
</style>
