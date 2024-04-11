import store from '@/store'
import axios from 'axios'

const API_URL = process.env.VUE_APP_API

export const loginSpotify = async () => {
	window.location.href = `${API_URL}/login`
}

export const refreshAccessToken = async () => {
	try {
		const refreshToken = store.getters['spotify/refreshToken'] || localStorage.getItem('tokenRefreshSpotify')
		const response = await axios.get(`${API_URL}/api/refresh_token?refresh_token=${refreshToken}`)
		store.commit('auth/setToken', response.data.access_token)
		return response.data.access_token
	} catch (error) {
		console.error('Erro ao atualizar o token:', error)
		throw error
	}
}
