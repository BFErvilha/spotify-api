import { createStore } from 'vuex'
import spotifyModule from './modules/spotify'

export default createStore({
	state: {},
	getters: {},
	mutations: {},
	actions: {},

	modules: {
		spotify: spotifyModule,
	},
})
