import { ActionContext } from 'vuex'

interface SpotifyState {
	accessToken: string | null
}

export default {
	namespaced: true,
	state: {
		accessToken: null,
	},
	getters: {
		accessToken: (state: any) => state.accessToken,
	},
	mutations: {
		SET_ACCESS_TOKEN(state: any, token: string) {
			state.accessToken = token
		},
	},
	actions: {
		setAccessToken({ commit }: ActionContext<SpotifyState, any>, token: string) {
			commit('SET_ACCESS_TOKEN', token)
		},
	},
}
