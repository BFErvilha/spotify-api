import { createStore } from 'vuex'
import { spotify } from './modules/spotify'

export default createStore({
	state: {},
	getters: {},
	mutations: {},
	actions: {},

	modules: {
		spotify: spotify,
	},
})
