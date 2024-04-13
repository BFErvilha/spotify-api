import { Module, ActionContext } from 'vuex'
import { UserData } from '@/types/userTypes'
import { getUserData } from '@/services/user.services'

interface SpotifyState {
	accessToken: string | null
	refreshToken: string | null
	spotifyUser: UserData | null
}
type RootState = {
	[key: string]: string | number | boolean
}
export const spotify: Module<SpotifyState, RootState> = {
	namespaced: true,
	state: (): SpotifyState => ({
		accessToken: null,
		refreshToken: null,
		spotifyUser: null,
	}),

	getters: {
		accessToken: (state): string | null => state.accessToken,
		refreshToken: (state): string | null => state.refreshToken,
		userId: (state): string | null => state.spotifyUser?.id ?? null,
		userData: (state): UserData | null => state.spotifyUser,
	},

	mutations: {
		SET_ACCESS_TOKEN(state, token: string) {
			state.accessToken = token
		},
		SET_REFRESH_TOKEN(state, token: string) {
			state.refreshToken = token
		},
		SET_SPOTIFY_USER(state, spotifyUser: UserData) {
			state.spotifyUser = spotifyUser
		},
		RESET_USER_STATE(state) {
			state.accessToken = null
			state.refreshToken = null
			state.spotifyUser = null
		},
	},

	actions: {
		refreshAccessToken({ commit }, access_token: string) {
			commit('SET_ACCESS_TOKEN', access_token)
		},
		saveTokens({ commit }, payload: { accessToken: string; refreshToken: string }) {
			commit('SET_ACCESS_TOKEN', payload.accessToken)
			commit('SET_REFRESH_TOKEN', payload.refreshToken)
		},

		saveUser({ commit }: ActionContext<SpotifyState, RootState>, spotifyUser: UserData) {
			commit('SET_SPOTIFY_USER', spotifyUser)
		},

		async getUser({ commit }) {
			try {
				const data = await getUserData()
				commit('SET_SPOTIFY_USER', data.data)
			} catch (error) {
				console.error('Erro ao buscar dados do usuário:', error)
			}
		},

		logout({ commit }) {
			localStorage.removeItem('tokenSpotify')
			localStorage.removeItem('tokenRefreshSpotify')
			localStorage.removeItem('spotify_code_verifier')
			localStorage.removeItem('spotify_auth_state')
			commit('RESET_USER_STATE')
		},
	},
}
