<template>
	<div v-if="icon === 'home'">
		<svg width="24" height="27" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg">
			<g clip-path="url(#clip0_1_1929)">
				<path d="M12 15.3401C11.2044 15.3401 10.4413 15.683 9.87868 16.2932C9.31607 16.9035 9 17.7312 9 18.5942V26.2153H15V18.5942C15 17.7312 14.6839 16.9035 14.1213 16.2932C13.5587 15.683 12.7956 15.3401 12 15.3401Z" :fill="color" />
				<path
					d="M13.338 1.05839C12.9707 0.699826 12.4941 0.501423 12 0.501423C11.5059 0.501423 11.0293 0.699826 10.662 1.05839L0 11.4671V22.748C0 23.6685 0.337142 24.5514 0.937258 25.2024C1.53737 25.8533 2.35131 26.219 3.2 26.219H7V18.5947C7 17.1563 7.52678 15.7768 8.46447 14.7597C9.40215 13.7426 10.6739 13.1712 12 13.1712C13.3261 13.1712 14.5979 13.7426 15.5355 14.7597C16.4732 15.7768 17 17.1563 17 18.5947V26.2157H20.8C21.6487 26.2157 22.4626 25.85 23.0627 25.1991C23.6629 24.5482 24 23.6653 24 22.7447V11.4639L13.338 1.05839Z"
					:fill="color"
				/>
			</g>
			<defs>
				<clipPath id="clip0_1_1929">
					<rect width="24" height="26.0327" :fill="color" transform="translate(0 0.154716)" />
				</clipPath>
			</defs>
		</svg>
	</div>
	<div v-if="icon === 'artists'">
		<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M12 22.1874C17.5228 22.1874 22 17.7103 22 12.1874C22 6.66458 17.5228 2.18742 12 2.18742C6.47715 2.18742 2 6.66458 2 12.1874C2 17.7103 6.47715 22.1874 12 22.1874Z" :stroke="color" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
			<path d="M12 15.1874C13.6569 15.1874 15 13.8443 15 12.1874C15 10.5306 13.6569 9.18742 12 9.18742C10.3431 9.18742 9 10.5306 9 12.1874C9 13.8443 10.3431 15.1874 12 15.1874Z" :stroke="color" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
		</svg>
	</div>
	<div v-if="icon === 'playlists'">
		<svg width="24" height="25" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M1 1.21887L15 10.2189L1 19.2189V1.21887Z" :stroke="color" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
		</svg>
	</div>
	<div v-if="icon === 'profile'">
		<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M20 21.2503V19.2503C20 18.1895 19.5786 17.1721 18.8284 16.4219C18.0783 15.6718 17.0609 15.2503 16 15.2503H8C6.93913 15.2503 5.92172 15.6718 5.17157 16.4219C4.42143 17.1721 4 18.1895 4 19.2503V21.2503"
				:stroke="color"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path d="M12 11.2503C14.2091 11.2503 16 9.45947 16 7.25034C16 5.0412 14.2091 3.25034 12 3.25034C9.79086 3.25034 8 5.0412 8 7.25034C8 9.45947 9.79086 11.2503 12 11.2503Z" :stroke="color" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
		</svg>
	</div>
	<div v-if="icon === 'pwa'">
		<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M12 22.1874C17.5228 22.1874 22 17.7103 22 12.1874C22 6.66458 17.5228 2.18742 12 2.18742C6.47715 2.18742 2 6.66458 2 12.1874C2 17.7103 6.47715 22.1874 12 22.1874Z" :stroke="color" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
			<path d="M12 15.1874C13.6569 15.1874 15 13.8443 15 12.1874C15 10.5306 13.6569 9.18742 12 9.18742C10.3431 9.18742 9 10.5306 9 12.1874C9 13.8443 10.3431 15.1874 12 15.1874Z" :stroke="color" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
		</svg>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	props: {
		active: {
			type: Boolean,
			default: false,
		},
		icon: {
			type: String,
			required: true,
		},
	},
	computed: {
		color() {
			if (this.active) return 'white'
			return '#949EA2'
		},
	},
})
</script>

<style lang="scss" scoped>
div {
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
