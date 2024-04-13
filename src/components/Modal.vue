<template>
	<transition name="popup">
		<div class="modal-backdrop" @click="closeModal" v-if="visible">
			<div class="modal-content" @click.stop v-if="visible">
				<div class="modal-header">
					<button class="close-button" @click="closeModal">
						<img src="@/assets/images/close.svg" alt="Fechar" />
					</button>
				</div>
				<div class="modal-body">
					<p class="modal-message">Dê um nome a sua playlist</p>
					<input type="text" v-model="playlistName" class="modal-input" placeholder="Nome da Playlist" />
				</div>
				<div class="modal-footer">
					<button class="create-button btn btn-primary" @click="createPlaylist">Criar</button>
				</div>
			</div>
		</div>
	</transition>
</template>

<script lang="ts">
import { ref, onMounted, defineComponent } from 'vue'

export default defineComponent({
	setup(_, { emit }) {
		const playlistName = ref('')
		const visible = ref(false)

		const closeModal = () => {
			visible.value = false
			emit('close')
		}

		const createPlaylist = () => {
			emit('request', playlistName.value)
		}

		onMounted(() => {
			visible.value = true
		})

		return {
			playlistName,
			visible,
			closeModal,
			createPlaylist,
		}
	},
})
</script>

<style lang="scss" scoped>
@keyframes fadeIn {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}

@keyframes fadeOut {
	from {
		opacity: 1;
	}
	to {
		opacity: 0;
	}
}

.popup-enter-active,
.popup-leave-active {
	animation-duration: 0.5s;
	animation-timing-function: ease;
}

.popup-enter-from,
.popup-leave-to {
	opacity: 0;
}

.popup-enter-to,
.popup-leave-from {
	opacity: 1;
}

.popup-enter-active {
	animation-name: fadeIn;
}

.popup-leave-active {
	animation-name: fadeOut;
}

.modal-backdrop {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
}

.modal-content {
	background-color: #303030;
	max-width: 600px;
	width: 100%;
	height: 314px;
	border-radius: 32px;
	padding: 20px;
	position: relative;

	@media (max-width: 600px) {
		padding: 0px;
	}

	.modal-header {
		.close-button {
			position: absolute;
			top: 15px;
			right: 15px;
			border: none;
			background: none;
			cursor: pointer;
			padding: 0;
			width: 24px;
			height: 24px;

			img {
				width: 100%;
				height: auto;
			}
		}
	}

	.modal-body {
		display: grid;
		align-items: center;
		justify-content: center;
		grid-template-columns: calc(100% - 80px);
		margin: 13% auto;
		.modal-message {
			text-align: center;
			margin: 20px 0;
			font-family: Rubik;
			font-size: 14px;
			font-weight: 500;
			line-height: 20px;
			letter-spacing: 0.01em;
		}

		.modal-input {
			width: calc(100% - 23px);
			padding: 10px;
			margin-bottom: 20px;
			text-align: center;
			background: transparent;
			color: #fff;
			border: none;
			border-bottom: 1px solid #ffffff33;
			outline: none;

			font-family: Rubik;
			font-size: 24px;
			font-weight: 700;
			line-height: 20px;
			letter-spacing: 0.01em;

			&:focus-visible {
				border: none;
				border-bottom: 1px solid #ffffff33;
			}

			&::placeholder {
				color: #ffffffab;
			}
		}
	}

	.modal-footer {
		display: flex;
		justify-content: center;
		align-items: center;
		.create-button {
			width: 121px;
			padding: 10px;
			cursor: pointer;
			text-align: center;
		}
	}
}
</style>
